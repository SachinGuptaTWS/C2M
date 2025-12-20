"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// --- ASSETS: ULTRA-PREMIUM GEOMETRIC ICONS ---
// Bespoke 1.5px stroke icons, optically aligned for a technical SaaS aesthetic.

const Logo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 12L9 17L20 6" stroke="currentColor" strokeWidth="0" className="opacity-0" />
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" className="text-white opacity-20"/>
    <path d="M12 7V17M8 12L12 7M16 12L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" transform="rotate(180 12 12)"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" className="text-white opacity-20" />
    <path d="M12 17L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-indigo-400" />
  </svg>
);

// Modern Geometric Icon Set
const Icons = {
  Grid: ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" opacity="0.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" opacity="0.5"/>
    </svg>
  ),
  Users: ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="9" cy="7" r="4"/>
      <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" strokeLinecap="round"/>
      <path d="M23 21V19C22.9993 17.1137 21.7044 15.464 19.8858 14.9085C19.6015 14.8214 19.3056 14.7708 19 14.7607" strokeLinecap="round"/>
      <path d="M16 3.13C17.7656 3.66667 19.0063 5.30902 19.0063 7.25C19.0063 9.19098 17.7656 10.8333 16 11.37" strokeLinecap="round"/>
    </svg>
  ),
  Activity: ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 12H18L15 21L9 3L6 12H2"/>
    </svg>
  ),
  Message: ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0791 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92088 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12H19"/>
      <path d="M12 5L19 12L12 19"/>
    </svg>
  ),
  Bolt: ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
       <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
    </svg>
  ),
  Shield: ({ className }: { className?: string }) => (
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
       <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
     </svg>
  ),
  Trending: ({ className }: { className?: string }) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M23 6L13.5 15.5L8.5 10.5L1 18" />
        <path d="M17 6H23V12" />
      </svg>
  )
};

// --- ADVANCED SCROLL PHYSICS WRAPPER ---
// Uses Framer Motion's spring physics and viewport detection to create a living page.
// The `once: false` prop allows elements to re-animate when scrolling back up.

const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }} // Triggers animation both ways
      transition={{ 
        duration: 1.2, 
        delay, 
        type: "spring",
        bounce: 0,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- PARALLAX WRAPPER ---
// Adds a subtle floating effect relative to scroll position
const Parallax = ({ children, offset = 50, className = "" }: { children: React.ReactNode, offset?: number, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  // Smooth out the parallax movement
  const ySmooth = useSpring(y, { stiffness: 400, damping: 90 });

  return <motion.div ref={ref} style={{ y: ySmooth }} className={className}>{children}</motion.div>;
};

// --- COMPONENT: PRO DASHBOARD MOCKUP ---
const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dataPoints, setDataPoints] = useState([30, 45, 35, 60, 40, 75, 50, 80, 65, 90]);

  // Gentle data breathing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => prev.map(p => Math.max(20, Math.min(95, p + (Math.random() - 0.5) * 15))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl bg-[#0F0F11] border border-white/[0.08] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex font-sans text-xs sm:text-sm select-none h-[420px] relative group">
      {/* Ambient Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Sidebar */}
      <div className="w-16 sm:w-52 border-r border-white/[0.06] bg-black/40 p-3 flex flex-col gap-1 z-10 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
           <div className="w-5 h-5 rounded-sm bg-white text-black flex items-center justify-center">
             <div className="w-2.5 h-2.5 bg-current rounded-full" />
           </div>
           <span className="hidden sm:inline font-semibold text-white tracking-tight">Nexus</span>
        </div>
        
        {/* Navigation Items */}
        {[
          { label: 'Overview', icon: Icons.Grid },
          { label: 'Network', icon: Icons.Users },
          { label: 'Analytics', icon: Icons.Activity },
          { label: 'Inbox', icon: Icons.Message, badge: 2 }
        ].map((item, i) => (
          <div 
            key={item.label} 
            onClick={() => setActiveTab(i)}
            className={`px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer transition-all duration-300 relative overflow-hidden ${
              i === activeTab 
                ? 'text-white' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {i === activeTab && (
              <motion.div 
                layoutId="activeTabBg"
                className="absolute inset-0 bg-white/[0.08] rounded-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon className="w-4 h-4 relative z-10" />
            <span className="hidden sm:inline font-medium relative z-10">{item.label}</span>
            {item.badge && (
              <span className="ml-auto hidden sm:flex w-4 h-4 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px] rounded items-center justify-center font-bold relative z-10">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#0A0A0A] relative flex flex-col z-10">
        {/* Header */}
        <div className="h-14 border-b border-white/[0.06] flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-zinc-500">
               <span>App</span>
               <span className="opacity-30">/</span>
               <span className="text-zinc-200">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    <span className="text-zinc-400 text-xs">System Optimal</span>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-3 gap-4 h-full">
            
            {/* Main Chart Card */}
            <div className="col-span-2 rounded-lg border border-white/[0.06] bg-zinc-900/20 p-5 flex flex-col relative group/card hover:border-white/[0.1] transition-colors">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="text-zinc-500 text-[10px] uppercase tracking-wider font-medium mb-1">Growth Metric</div>
                        <div className="text-2xl font-medium text-white tracking-tight">94.2%</div>
                    </div>
                </div>
                
                <div className="flex items-end gap-2 flex-1 pb-2">
                    {dataPoints.map((h, i) => (
                        <div key={i} className="flex-1 h-full flex items-end">
                            <motion.div 
                                layout
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="w-full bg-zinc-800 rounded-sm hover:bg-indigo-500 transition-colors duration-300 relative"
                            >
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Card */}
            <div className="col-span-1 flex flex-col gap-4">
                <div className="flex-1 rounded-lg border border-white/[0.06] bg-zinc-900/20 p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="text-zinc-400 mb-2">Next Session</div>
                    <div className="text-white font-medium mb-1">System Architecture</div>
                    <div className="text-zinc-500 text-xs">Today, 15:00</div>
                    <div className="mt-4 flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-black ring-1 ring-white/10" />
                        ))}
                    </div>
                </div>
                
                <div className="h-1/3 rounded-lg border border-white/[0.06] bg-zinc-900/20 p-4 flex items-center justify-between group/item cursor-pointer hover:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white">
                            <Icons.Message className="w-3.5 h-3.5" />
                         </div>
                         <div className="text-zinc-300">Mentors</div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      
      {/* Smoothed Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Parallax offset={20}>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse" style={{ animationDuration: '8s' }} />
        </Parallax>
        <Parallax offset={30}>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse" style={{ animationDuration: '10s' }} />
        </Parallax>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <ScrollReveal className="flex items-center justify-between py-8">
            <a href="/" className="flex items-center gap-3 group">
                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <Logo className="w-8 h-8 text-white relative z-10" />
                </div>
                <div className="text-sm font-medium tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                    Connect2Mentor
                </div>
            </a>
            <div className="flex items-center gap-8 text-sm font-medium">
                <a href="/login" className="hidden sm:block text-zinc-400 hover:text-white transition-colors">Log in</a>
                <a href="/register" className="group relative px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-medium text-xs tracking-wide overflow-hidden">
                    <span className="relative z-10">GET STARTED</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </a>
            </div>
        </ScrollReveal>

        {/* Hero Section */}
        <section className="pt-24 pb-40 text-center relative">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-400 backdrop-blur-md mb-8 hover:bg-white/[0.08] transition-colors cursor-default tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.8)]"></span>
              <span>Winter Cohort Now Open</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-white mb-8 mx-auto max-w-4xl leading-[1.05]">
              Accelerate your engineering <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                career velocity.
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
              Direct, 1-on-1 technical mentorship from Principal Engineers at the world's most innovative companies.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <a href="/register" className="h-11 px-8 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center hover:scale-105 active:scale-95">
              Start Free Trial
            </a>
            <a href="/mentors" className="h-11 px-8 rounded-full border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/5 transition-all flex items-center justify-center hover:text-white">
              View Mentors
            </a>
          </ScrollReveal>

          {/* DASHBOARD PREVIEW with PARALLAX */}
          <Parallax offset={-30} className="relative max-w-5xl mx-auto px-4">
             <ScrollReveal delay={0.5}>
                {/* Dynamic Glow */}
                <div className="absolute -inset-px bg-gradient-to-t from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 rounded-2xl blur-xl opacity-50" />
                <div className="relative">
                    <DashboardPreview />
                </div>
             </ScrollReveal>
          </Parallax>
        </section>

        {/* Brand Logos (Minimalist) */}
        <section className="py-12 border-y border-white/[0.04] bg-white/[0.01]">
            <p className="text-center text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-10">Trusted by engineers from</p>
            <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale mix-blend-screen">
               {['Google', 'Meta', 'Netflix', 'Airbnb', 'Stripe'].map(brand => (
                   <span key={brand} className="text-lg font-bold text-white tracking-tighter hover:opacity-100 transition-opacity cursor-default">{brand}</span>
               ))}
            </div>
        </section>

        {/* Feature Grid */}
        <section className="py-32">
            <ScrollReveal className="mb-20">
              <h2 className="text-3xl font-medium text-white mb-4 tracking-tight">Engineered for growth</h2>
              <p className="text-zinc-500 max-w-md">The platform built for serious engineering career development.</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Direct Access", desc: "Skip the HR screen. Book technical sessions directly.", icon: Icons.Users },
                    { title: "Code Reviews", desc: "Get architecture-level feedback on your actual PRs.", icon: Icons.Bolt },
                    { title: "Career Strategy", desc: "Data-driven paths to Staff and Principal roles.", icon: Icons.Trending }
                ].map((feature, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="group h-full p-8 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent hover:bg-white/[0.04] transition-all duration-500 hover:border-white/[0.1]">
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500 group-hover:text-white">
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-white text-lg font-medium mb-3">{feature.title}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{feature.desc}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>

        {/* Live Sessions (Grid Layout) */}
        <section className="py-20 border-t border-white/[0.04]">
          <ScrollReveal className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-medium text-white tracking-tight">Live this week</h2>
            <a href="/sessions" className="text-xs text-indigo-400 hover:text-white transition-colors flex items-center gap-1">
                Full Schedule <Icons.ArrowRight className="w-3 h-3" />
            </a>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
                { title: "Advanced Patterns", author: "JD", role: "Google", color: "bg-blue-500" },
                { title: "System Design", author: "SJ", role: "Meta", color: "bg-purple-500" },
                { title: "ML Deployment", author: "MC", role: "OpenAI", color: "bg-emerald-500" }
            ].map((session, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="group relative h-48 bg-[#0F0F11] border border-white/[0.06] rounded-xl p-6 hover:border-white/[0.15] transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${session.color} rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity`} />
                        
                        <div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-white/5 text-zinc-400 border border-white/5 mb-3">Live</span>
                            <h3 className="text-lg font-medium text-white group-hover:translate-x-1 transition-transform">{session.title}</h3>
                        </div>
                        
                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold">{session.author}</div>
                            <span className="text-xs text-zinc-500">{session.role}</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                <Icons.ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-6">
            <div className="flex items-center gap-2">
                <Logo className="w-4 h-4 text-zinc-600" />
                <p>© 2025 Connect2Mentor Inc.</p>
            </div>
            <div className="flex gap-8 font-medium">
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
        </footer>

      </div>
    </div>
  );
}