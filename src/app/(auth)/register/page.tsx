'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from "framer-motion";

// Consistent Logo
const Logo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 12L9 17L20 6" stroke="currentColor" strokeWidth="0" className="opacity-0" />
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" className="text-white opacity-20"/>
    <path d="M12 7V17M8 12L12 7M16 12L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" transform="rotate(180 12 12)"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" className="text-white opacity-20" />
    <path d="M12 17L12 11" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone_number: '',
    interest: 'development',
    college_name: '',
    grad_year: 1,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'grad_year' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.error || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden px-4 font-sans text-zinc-300 selection:bg-indigo-500/30 selection:text-indigo-200 py-12">
      
      {/* --- Ambient Background Effects --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen opacity-20 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen opacity-20 animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]">
                <Logo className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
                Create your account
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
                Join the elite engineering mentorship network.
            </p>
        </div>

        <div className="bg-[#0F0F11] border border-white/[0.06] rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {error}
                    </div>
                )}
                
                {/* Grid for compact layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label htmlFor="full_name" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                            Full Name
                        </label>
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            required
                            className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-600 group-hover:border-white/20"
                            placeholder="John Doe"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="group">
                        <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-600 group-hover:border-white/20"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="group">
                        <label htmlFor="password" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-600 group-hover:border-white/20"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="group">
                        <label htmlFor="phone_number" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            required
                            className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-600 group-hover:border-white/20"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="group">
                        <label htmlFor="interest" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                            Area of Interest
                        </label>
                        <div className="relative">
                            <select
                                id="interest"
                                name="interest"
                                required
                                className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer group-hover:border-white/20"
                                value={formData.interest}
                                onChange={handleChange}
                            >
                                <option value="development">Development</option>
                                <option value="dsa">Data Structures & Algorithms</option>
                                <option value="system_design">System Design</option>
                                <option value="ai_ml">AI / Machine Learning</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label htmlFor="college_name" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                            College / Company
                        </label>
                        <input
                            id="college_name"
                            name="college_name"
                            type="text"
                            required
                            className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-600 group-hover:border-white/20"
                            placeholder="Stanford University"
                            value={formData.college_name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="group md:col-span-2">
                        <label htmlFor="grad_year" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                            Current Year / Experience Level
                        </label>
                        <div className="relative">
                             <select
                                id="grad_year"
                                name="grad_year"
                                required
                                className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer group-hover:border-white/20"
                                value={formData.grad_year}
                                onChange={handleChange}
                            >
                                <option value={1}>1st Year Student</option>
                                <option value={2}>2nd Year Student</option>
                                <option value={3}>3rd Year Student</option>
                                <option value={4}>4th Year Student</option>
                                <option value={5}>Professional (0-2 Years)</option>
                                <option value={6}>Professional (2+ Years)</option>
                            </select>
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : 'Create Account'}
                    </button>
                </div>
            </form>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-white hover:text-zinc-300 transition-colors">
                Sign in here
            </Link>
        </p>
      </motion.div>
    </div>
  );
}
