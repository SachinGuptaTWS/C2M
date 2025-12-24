'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// --- ASSETS: PROFESSIONAL ICONOGRAPHY (1.5px Stroke) ---
const Icons = {
  Video: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Plus: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  X: (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>,
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

// --- PAGE CONTENT ---
function VideosContent() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    youtube_id: '',
    title: '',
    description: '',
    category: 'DEVELOPMENT',
    mentor_name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Video added successfully!');
        setFormData({
          youtube_id: '',
          title: '',
          description: '',
          category: 'DEVELOPMENT',
          mentor_name: '',
        });
        setShowAddForm(false);
        fetchVideos();
      } else {
        setError(data.error || 'Failed to add video');
      }
    } catch (error) {
      setError('Failed to add video');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Video deleted successfully!');
        fetchVideos();
      } else {
        setError('Failed to delete video');
      }
    } catch (error) {
      setError('Failed to delete video');
    }
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
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Video Management
          </h1>
          <p className="text-sm text-zinc-500 max-w-2xl">
            Add, edit, and organize video content across all learning tracks and categories.
          </p>
        </div>
        <motion.button
          variants={itemVariants}
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors duration-200 font-medium text-sm"
        >
          {showAddForm ? <Icons.X className="w-4 h-4" /> : <Icons.Plus className="w-4 h-4" />}
          {showAddForm ? 'Cancel' : 'Add Video'}
        </motion.button>
      </motion.div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Video Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            variants={itemVariants}
            className="bg-[#050505] border border-zinc-800/60 rounded-xl p-6 overflow-hidden"
          >
            <h2 className="text-lg font-semibold text-white mb-6 tracking-tight">Add New Video</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">YouTube ID</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all placeholder:text-zinc-600"
                  placeholder="e.g., dQw4w9WgXcQ"
                  value={formData.youtube_id}
                  onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Mentor Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all placeholder:text-zinc-600"
                  value={formData.mentor_name}
                  onChange={(e) => setFormData({ ...formData, mentor_name: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all placeholder:text-zinc-600"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all placeholder:text-zinc-600 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                <select
                  className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="DEVELOPMENT">Development</option>
                  <option value="DSA">DSA</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors duration-200 font-medium text-sm"
                >
                  Add Video
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Videos Table */}
      <motion.div variants={itemVariants} className="bg-[#050505] border border-zinc-800/60 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Mentor</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">YouTube ID</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {videos.map((video, index) => (
                <motion.tr 
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">{video.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      video.category === 'DEVELOPMENT' 
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {video.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{video.mentor_name}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400 font-mono">{video.youtube_id}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Icons.Trash className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {videos.length === 0 && (
            <div className="text-center py-12">
              <Icons.Video className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm">No videos found. Add your first video to get started.</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminVideos() {
  return <VideosContent />;
}
