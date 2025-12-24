'use client';

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import db from '@/lib/db';

// --- ASSETS: PROFESSIONAL ICONOGRAPHY (1.5px Stroke) ---
const Icons = {
  Grid: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>,
  Code: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Cpu: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1V4"/><path d="M15 1V4"/><path d="M9 20V23"/><path d="M15 20V23"/><path d="M20 9H23"/><path d="M20 14H23"/><path d="M1 9H4"/><path d="M1 14H4"/></svg>,
  Users: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75 0"/></svg>,
  Video: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  ChevronRight: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>,
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

// 1. Stat Card
const StatCard = ({ label, value, icon: Icon }: any) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2, scale: 1.02 }}
    className="bg-[#050505] border border-zinc-800/60 rounded-xl p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 group"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-lg bg-zinc-900/50 border border-zinc-700/50 flex items-center justify-center group-hover:bg-zinc-800/50 group-hover:border-zinc-600/50 transition-all duration-300">
        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{value}</h3>
    <p className="text-sm text-zinc-500 tracking-tight">{label}</p>
  </motion.div>
);

// 2. Action Card
const ActionCard = ({ title, description, icon: Icon, href }: any) => (
  <motion.a
    variants={itemVariants}
    href={href}
    whileHover={{ y: -2, scale: 1.02 }}
    className="group bg-[#050505] border border-zinc-800/60 rounded-xl p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 cursor-pointer block"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-lg bg-zinc-900/50 border border-zinc-700/50 flex items-center justify-center group-hover:bg-zinc-800/50 group-hover:border-zinc-600/50 transition-all duration-300">
        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
      </div>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2 tracking-tight flex items-center gap-2">
      {title}
      <Icons.ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500" />
    </h3>
    <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{description}</p>
  </motion.a>
);

// --- PAGE CONTENT ---
function AdminContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVideos: 0,
    developmentVideos: 0,
    dsaVideos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersResult = await db.query('SELECT COUNT(*) as count FROM profiles');
        const videosResult = await db.query('SELECT COUNT(*) as count FROM videos');
        const devResult = await db.query("SELECT COUNT(*) as count FROM videos WHERE category = 'DEVELOPMENT'");
        const dsaResult = await db.query("SELECT COUNT(*) as count FROM videos WHERE category = 'DSA'");

        setStats({
          totalUsers: parseInt(usersResult.rows[0].count),
          totalVideos: parseInt(videosResult.rows[0].count),
          developmentVideos: parseInt(devResult.rows[0].count),
          dsaVideos: parseInt(dsaResult.rows[0].count),
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
          Admin Overview
        </h1>
        <p className="text-sm text-zinc-500 max-w-2xl">
          Monitor platform metrics, manage content, and oversee user activity across all domains.
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} icon={Icons.Users} />
        <StatCard label="Total Videos" value={stats.totalVideos.toLocaleString()} icon={Icons.Video} />
        <StatCard label="Development" value={stats.developmentVideos.toLocaleString()} icon={Icons.Code} />
        <StatCard label="DSA Videos" value={stats.dsaVideos.toLocaleString()} icon={Icons.Cpu} />
      </div>

      <div className="w-full h-px bg-white/[0.06]" />

      {/* Quick Actions */}
      <div className="space-y-5">
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white tracking-tight">Quick Actions</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ActionCard 
            title="Video Management" 
            description="Add, edit, and organize video content across all learning tracks and categories."
            icon={Icons.Video}
            href="/admin/videos"
          />
          <ActionCard 
            title="User Management" 
            description="View user profiles, manage permissions, and monitor platform engagement."
            icon={Icons.Users}
            href="/admin/users"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  return <AdminContent />;
}
