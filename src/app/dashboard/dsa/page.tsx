'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';

// --- ASSETS: PRECISION ICON SET ---
const Logo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 12L9 17L20 6" stroke="currentColor" strokeWidth="0" className="opacity-0" />
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" className="text-white opacity-20"/>
    <path d="M12 7V17M8 12L12 7M16 12L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" transform="rotate(180 12 12)"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" className="text-white opacity-20" />
    <path d="M12 17L12 11" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Icons = {
  Grid: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>,
  Play: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="6 3 20 12 6 21 6 3" /></svg>,
  Search: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  LogOut: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Code: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Cpu: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1V4"/><path d="M15 1V4"/><path d="M9 20V23"/><path d="M15 20V23"/><path d="M20 9H23"/><path d="M20 14H23"/><path d="M1 9H4"/><path d="M1 14H4"/></svg>,
  Shield: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4" /></svg>,
  Command: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>,
  Download: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
};

// --- TYPES ---
interface Video {
  id: number;
  youtube_id: string;
  title: string;
  description: string;
  category: string;
  mentor_name: string;
  created_at: string;
  duration?: string;
}

// --- DASHBOARD LAYOUT COMPONENT ---
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Overview', href: '/dashboard', icon: Icons.Grid },
    { name: 'Development', href: '/dashboard/development', icon: Icons.Code },
    { name: 'Algorithms', href: '/dashboard/dsa', icon: Icons.Cpu, active: true },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ name: 'Admin Console', href: '/admin', icon: Icons.Shield });
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-indigo-500/20 selection:text-indigo-200 flex">
      
      {/* Sidebar - Linear/Cursor Style */}
      <nav className="w-64 h-screen border-r border-white/[0.08] bg-[#050505] flex flex-col fixed inset-y-0 z-20">
        <div className="h-14 flex items-center px-4 border-b border-white/[0.08]">
          <a href="/dashboard" className="flex items-center gap-2 group">
            <Logo className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white tracking-tight">Connect<span className="text-zinc-500">2</span>Mentor</span>
          </a>
        </div>

        <div className="p-2 space-y-0.5 mt-2 flex-1">
          <div className="px-2 py-1.5 text-[10px] uppercase font-semibold text-zinc-600 tracking-wider">Workspace</div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all group ${
                link.active 
                  ? 'bg-zinc-800/50 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <link.icon className={`w-4 h-4 ${link.active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
              {link.name}
            </a>
          ))}
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between gap-3 px-2 py-2 rounded-md hover:bg-zinc-900/50 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3 min-w-0">
               <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-white/10">
                 {user?.full_name?.charAt(0)}
               </div>
               <div className="flex flex-col min-w-0">
                 <span className="text-xs font-medium text-zinc-200 truncate">{user?.full_name}</span>
                 <span className="text-[10px] text-zinc-600 truncate">{user?.email}</span>
               </div>
            </div>
            <button
                onClick={logout}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-zinc-500 transition-all"
                title="Logout"
              >
                <Icons.LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen relative flex flex-col">
        {/* Header - Vercel Style */}
        <header className="h-14 border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-10 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-500">Dashboard</span>
                <span className="text-zinc-700">/</span>
                <span className="text-white font-medium">Algorithms</span>
            </div>
            
            <div className="flex items-center gap-3">
                 <div className="relative group">
                    <Icons.Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-[#0A0A0A] border border-white/[0.08] rounded-md pl-9 pr-12 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 placeholder:text-zinc-600 w-64 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
                        <span className="text-[10px] text-zinc-600 bg-zinc-900 border border-white/5 px-1 rounded">⌘K</span>
                    </div>
                 </div>
            </div>
        </header>

        <div className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
             {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// --- PAGE CONTENT COMPONENT ---
function DSAContent() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos?category=DSA');
      const data = await response.json();
      setVideos(data);
      if (data.length > 0) {
        setSelectedVideo(data[0]); // Auto-select first video for better UX
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1&color=white`;
  };

  if (loading) {
     return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
             <div className="lg:col-span-8 bg-zinc-900/20 rounded-lg animate-pulse border border-white/[0.04]"></div>
             <div className="lg:col-span-4 space-y-2">
                 {[1,2,3,4].map(i => (
                     <div key={i} className="h-20 bg-zinc-900/20 rounded-lg animate-pulse border border-white/[0.04]"></div>
                 ))}
             </div>
        </div>
     )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-full">
        {/* Main Video Player Area */}
        <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="wait">
                {selectedVideo ? (
                    <motion.div 
                        key="player"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-video bg-[#000] rounded-lg overflow-hidden shadow-2xl border border-white/[0.08] group">
                            <iframe
                                src={getYouTubeEmbedUrl(selectedVideo.youtube_id)}
                                title={selectedVideo.title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        
                        <div className="flex items-start justify-between gap-6 px-1">
                             <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-1.5 py-0.5 rounded-md bg-green-500/20 text-green-300 text-[10px] font-medium border border-green-500/20 uppercase tracking-wider">
                                        {selectedVideo.category}
                                    </span>
                                    <span className="text-[10px] text-zinc-500">•</span>
                                    <span className="text-xs text-zinc-500">{new Date(selectedVideo.created_at).toLocaleDateString()}</span>
                                </div>
                                <h1 className="text-xl font-medium text-white tracking-tight">{selectedVideo.title}</h1>
                                <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">{selectedVideo.description}</p>
                             </div>

                             <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-black text-xs font-medium rounded hover:bg-zinc-200 transition-colors">
                                    <Icons.Download className="w-3.5 h-3.5" />
                                    Assets
                                </button>
                             </div>
                        </div>

                        <div className="pt-6 border-t border-white/[0.08]">
                             <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white">
                                     {selectedVideo.mentor_name.charAt(0)}
                                 </div>
                                 <div className="flex flex-col">
                                     <span className="text-xs font-medium text-white">{selectedVideo.mentor_name}</span>
                                     <span className="text-[10px] text-zinc-500">Senior Software Engineer</span>
                                 </div>
                             </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>

        {/* Playlist Sidebar */}
        <div className="lg:col-span-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Session Queue</h3>
                <span className="text-[10px] text-zinc-600 font-mono">{videos.length} ITEMS</span>
            </div>
            
            <div className="space-y-1 max-h-[calc(100vh-10rem)] overflow-y-auto pr-1">
                {videos.map((video) => {
                    const isSelected = selectedVideo?.id === video.id;
                    return (
                        <div
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className={`group p-2 rounded-lg border transition-all cursor-pointer flex gap-3 ${
                                isSelected
                                ? 'bg-zinc-900 border-white/[0.08]' 
                                : 'bg-transparent border-transparent hover:bg-zinc-900/50 hover:border-white/[0.04]'
                            }`}
                        >
                            <div className="w-24 h-14 bg-zinc-900 rounded border border-white/[0.04] flex-shrink-0 relative overflow-hidden">
                                <img 
                                    src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} 
                                    alt="thumbnail"
                                    className={`w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-80' : 'opacity-40 group-hover:opacity-60'}`}
                                />
                                {isSelected && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
                                <h4 className={`text-xs font-medium truncate mb-1 leading-tight ${
                                    isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                                }`}>
                                    {video.title}
                                </h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 group-hover:text-zinc-500">
                                    <Icons.Play className="w-3 h-3" />
                                    <span>{video.duration || '45m'}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                {videos.length === 0 && (
                    <div className="text-center py-8 text-zinc-500">
                        No DSA videos available yet.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

// --- MAIN EXPORT ---
export default function DSAPage() {
  return (
    <DashboardLayout>
       <DSAContent />
    </DashboardLayout>
  );
}
