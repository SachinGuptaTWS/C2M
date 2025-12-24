import { NextResponse } from 'next/server';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader?.split('token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    
    // Get user progress data
    const videoProgressQuery = `
      SELECT 
        v.category,
        COUNT(v.id) as total_videos,
        COUNT(CASE WHEN vp.video_id IS NOT NULL THEN 1 END) as watched_videos,
        COALESCE(SUM(CASE WHEN vp.video_id IS NOT NULL THEN v.duration END), 0) as total_watched_seconds
      FROM videos v
      LEFT JOIN video_progress vp ON v.id = vp.video_id AND vp.user_id = $1
      GROUP BY v.category
    `;
    
    const videoProgress = await db.query(videoProgressQuery, [decoded.userId]);

    // Calculate overall stats
    const totalVideos = videoProgress.rows.reduce((sum, cat) => sum + parseInt(cat.total_videos), 0);
    const watchedVideos = videoProgress.rows.reduce((sum, cat) => sum + parseInt(cat.watched_videos), 0);
    const totalWatchedSeconds = videoProgress.rows.reduce((sum, cat) => sum + parseInt(cat.total_watched_seconds), 0);
    
    // Calculate streak (simplified - consecutive days with activity)
    const activityQuery = `
      SELECT DISTINCT DATE(created_at) as activity_date
      FROM video_progress 
      WHERE user_id = $1 
      ORDER BY activity_date DESC 
      LIMIT 30
    `;
    
    const activity = await db.query(activityQuery, [decoded.userId]);
    const streak = calculateStreak(activity.rows);

    const progressData = {
      stats: {
        totalVideos,
        watchedVideos,
        totalWatchedSeconds,
        totalWatchedHours: Math.floor(totalWatchedSeconds / 3600),
        completionPercentage: totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0,
        streak
      },
      categories: videoProgress.rows.map(cat => ({
        category: cat.category,
        totalVideos: parseInt(cat.total_videos),
        watchedVideos: parseInt(cat.watched_videos),
        completionPercentage: parseInt(cat.total_videos) > 0 
          ? Math.round((parseInt(cat.watched_videos) / parseInt(cat.total_videos)) * 100) 
          : 0,
        watchedHours: Math.floor(parseInt(cat.total_watched_seconds) / 3600)
      }))
    };

    return NextResponse.json(progressData);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

function calculateStreak(activityDates: any[]): number {
  if (activityDates.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (let i = 0; i < 30; i++) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const hasActivity = activityDates.some(row => 
      new Date(row.activity_date).toISOString().split('T')[0] === dateStr
    );
    
    if (hasActivity) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}
