'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

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
  Video: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Users: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75 0"/></svg>,
  LogOut: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Search: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
};

// --- COMPONENTS ---

// 1. Sidebar Nav Item
const NavItem = ({ href, icon: Icon, children, active }: any) => (
  <Link
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
  </Link>
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Protect Route
  useEffect(() => { 
    if (!loading && (!user || user.role !== 'admin')) router.push('/login'); 
  }, [user, loading, router]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-5 h-5 border border-zinc-800 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-white/20 selection:text-white flex overflow-hidden">
      {/* Background Noise Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3Cfilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Sidebar */}
      <nav className="w-[260px] h-screen border-r border-white/[0.06] bg-black/50 backdrop-blur-xl flex flex-col fixed inset-y-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-center">
               <Logo className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">Admin Console</span>
          </div>
        </div>

        <div className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 mb-2 text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Admin</div>
            <NavItem href="/admin" icon={Icons.Grid} active={pathname === '/admin'}>Overview</NavItem>
            <NavItem href="/admin/videos" icon={Icons.Video} active={pathname === '/admin/videos'}>Videos</NavItem>
          </div>

          <div className="space-y-1">
            <div className="px-3 mb-2 text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Platform</div>
            <NavItem href="/dashboard" icon={Icons.Grid}>Dashboard</NavItem>
          </div>
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
             <span>Admin</span>
             <span className="text-zinc-700">/</span>
             <span className="text-zinc-200 font-medium">
               {pathname === '/admin' ? 'Overview' : pathname === '/admin/videos' ? 'Videos' : 'Admin'}
             </span>
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
