'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Video {
  id: number;
  youtube_id: string;
  title: string;
  description: string;
  category: string;
  mentor_name: string;
  created_at: string;
}

export default function DSAPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos?category=DSA');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}`;
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">DSA Track</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Videos</h2>
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow ${
                    selectedVideo?.id === video.id ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <h3 className="font-semibold text-gray-900">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Mentor: {video.mentor_name}</p>
                  {video.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{video.description}</p>
                  )}
                </div>
              ))}
              
              {videos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No DSA videos available yet.
                </div>
              )}
            </div>
          </div>

          {/* Video Player */}
          <div>
            {selectedVideo ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedVideo.youtube_id)}
                    title={selectedVideo.title}
                    className="w-full h-96"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedVideo.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Mentor: {selectedVideo.mentor_name}</p>
                  {selectedVideo.description && (
                    <p className="text-gray-700 mt-2">{selectedVideo.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Added: {new Date(selectedVideo.created_at).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      DSA
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2">Select a video to start learning</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
