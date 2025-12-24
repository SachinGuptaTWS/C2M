'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';

// --- ASSETS: PROFESSIONAL ICONOGRAPHY (1.5px Stroke) ---
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
  Code: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Cpu: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1V4"/><path d="M15 1V4"/><path d="M9 20V23"/><path d="M15 20V23"/><path d="M20 9H23"/><path d="M20 14H23"/><path d="M1 9H4"/><path d="M1 14H4"/></svg>,
  Shield: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Search: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  LogOut: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  ChevronRight: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>,
  Activity: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Clock: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Command: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>,
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 200, damping: 20 }
  }
};

// --- COMPONENTS ---

// 1. Sidebar Nav Item
const NavItem = ({ href, icon: Icon, children, active }: any) => (
  <a
    href={href}
    className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200 relative overflow-hidden ${
      active 
        ? 'text-white bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
    }`}
  >
    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
    <span className="font-medium tracking-tight">{children}</span>
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      />
    )}
  </a>
);

// 2. Dashboard Stats Card
const StatCard = ({ label, value, icon: Icon, delay = 0 }: any) => (
  <motion.div 
    variants={itemVariants}
    className="group relative p-5 bg-black rounded-xl border border-zinc-800/60 hover:border-zinc-700 transition-colors duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-[13px] font-medium text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
        <h4 className="text-2xl font-semibold text-white tracking-tight font-sans">{value}</h4>
      </div>
      <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800 group-hover:bg-zinc-800 transition-colors">
        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
      </div>
    </div>
  </motion.div>
);

// 3. Track Selection Card
const TrackCard = ({ title, subtitle, icon: Icon, href, progress = 0 }: any) => (
  <motion.a 
    href={href}
    variants={itemVariants}
    className="group relative flex flex-col p-6 h-full bg-[#050505] rounded-xl border border-zinc-800/60 hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/0 via-zinc-900/0 to-zinc-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    
    <div className="relative z-10 flex-1">
      <div className="w-10 h-10 mb-4 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-300">
        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight flex items-center gap-2">
        {title}
        <Icons.ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500" />
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{subtitle}</p>
    </div>
    
    <div className="relative z-10 mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-600 font-medium">
      <span>{progress}% Completed</span>
      <span className="group-hover:text-white transition-colors">Start Track &rarr;</span>
    </div>
  </motion.a>
);

// --- LAYOUT SHELL ---
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Protect Route
  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-5 h-5 border border-zinc-800 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-white/20 selection:text-white flex overflow-hidden">
      {/* Background Noise Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Sidebar */}
      <nav className="w-[260px] h-screen border-r border-white/[0.06] bg-black/50 backdrop-blur-xl flex flex-col fixed inset-y-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-center">
               <Logo className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">Connect2Mentor</span>
          </div>
        </div>

        <div className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 mb-2 text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Platform</div>
            <NavItem href="/dashboard" icon={Icons.Grid} active={pathname === '/dashboard'}>Overview</NavItem>
            <NavItem href="/dashboard/development" icon={Icons.Code}>Development</NavItem>
            <NavItem href="/dashboard/dsa" icon={Icons.Cpu}>Algorithms</NavItem>
          </div>

          {user?.role === 'admin' && (
            <div className="space-y-1">
               <div className="px-3 mb-2 text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Admin</div>
               <NavItem href="/admin" icon={Icons.Shield}>Console</NavItem>
            </div>
          )}
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/[0.06] bg-black/40">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white group-hover:border-zinc-500 transition-colors">
              {user?.full_name?.charAt(0)}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-medium text-zinc-200 truncate group-hover:text-white transition-colors">{user?.full_name}</span>
              <span className="text-[10px] text-zinc-500 truncate">{user?.email}</span>
            </div>
            <button onClick={logout} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-all">
              <Icons.LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden relative z-10 bg-black">
        {/* Header */}
        <header className="h-16 border-b border-white/[0.06] bg-black/80 backdrop-blur-sm px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
             <span>Space</span>
             <span className="text-zinc-700">/</span>
             <span className="text-zinc-200 font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Icons.Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 bg-zinc-900/50 border border-white/[0.08] hover:border-zinc-700 focus:border-zinc-600 rounded-md pl-9 pr-10 py-1.5 text-xs text-white focus:outline-none focus:ring-0 transition-all placeholder:text-zinc-600"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                 <kbd className="hidden sm:inline-block h-4 px-1.5 bg-zinc-800 border border-zinc-700 rounded text-[9px] font-sans text-zinc-400">⌘K</kbd>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-6xl mx-auto pb-10">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- PAGE CONTENT ---
function DashboardContent() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await fetch('/api/user-progress');
      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-zinc-500 max-w-2xl">
          Welcome back, {user?.full_name}. Manage your learning tracks and monitor your progress across all domains.
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          label="Time Spent" 
          value={formatTime(progressData?.stats?.totalWatchedSeconds || 0)} 
          icon={Icons.Clock} 
        />
        <StatCard 
          label="Current Streak" 
          value={`${progressData?.stats?.streak || 0} Days`} 
          icon={Icons.Activity} 
        />
        <StatCard 
          label="Progress" 
          value={`${progressData?.stats?.watchedVideos || 0}/${progressData?.stats?.totalVideos || 0}`} 
          icon={Icons.Command} 
        />
      </div>

      <div className="w-full h-px bg-white/[0.06]" />

      {/* Tracks Section */}
      <div className="space-y-5">
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white tracking-tight">Active Tracks</h2>
          <button className="text-xs text-zinc-500 hover:text-white transition-colors">View All</button>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TrackCard 
            title="Full Stack Engineering" 
            subtitle="Master modern web development. From React server components to scalable backend architecture using Node and PostgreSQL."
            icon={Icons.Code}
            href="/dashboard/development"
            progress={progressData?.categories?.find((cat: any) => cat.category === 'DEVELOPMENT')?.completionPercentage || 0}
          />
          <TrackCard 
            title="Data Structures & Algorithms" 
            subtitle="Deep dive into algorithmic complexity, data structures, and pattern recognition for technical interviews."
            icon={Icons.Cpu}
            href="/dashboard/dsa"
            progress={progressData?.categories?.find((cat: any) => cat.category === 'DSA')?.completionPercentage || 0}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}