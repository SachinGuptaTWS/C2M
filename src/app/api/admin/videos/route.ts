import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { youtube_id, title, description, category, mentor_name } = await request.json();

    const result = await db.query(
      `INSERT INTO videos (youtube_id, title, description, category, mentor_name) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [youtube_id, title, description, category, mentor_name]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding video:', error);
    return NextResponse.json(
      { error: 'Failed to add video' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM videos ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
