import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 font-sans selection:bg-zinc-800 overflow-hidden relative">
      
      {/* --- BACKGROUND ANIMATIONS START --- */}
      
      {/* 1. Animated Gradient Orbs (The "Aurora" effect) */}
      {/* We use inline styles for the animations to avoid cluttering tailwind config for a single page copy-paste */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <style jsx>{`
            @keyframes aurora-drift-1 {
                0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.2; }
                50% { transform: translate(200px, -100px) rotate(45deg); opacity: 0.4; }
            }
             @keyframes aurora-drift-2 {
                0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translate(-150px, 100px) rotate(-45deg); opacity: 0.1; }
            }
          `}</style>
          
          {/* Top Left Orb - subtle blue/white */}
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0)_70%)] blur-[120px]"
               style={{ animation: 'aurora-drift-1 20s ease-in-out infinite alternate' }}></div>
          
          {/* Bottom Right Orb - subtle zinc */}
          <div className="absolute bottom-[10%] right-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(161,161,170,0.05)_0%,rgba(0,0,0,0)_70%)] blur-[100px]"
               style={{ animation: 'aurora-drift-2 25s ease-in-out infinite alternate-reverse' }}></div>
      </div>

      {/* 2. Technical Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] mask-gradient">
         {/* CSS Mask to fade grid out at edges */}
         <style jsx>{`
            .mask-gradient {
                mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
                -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 100%);
            }
         `}</style>
      </div>
      
      {/* --- BACKGROUND ANIMATIONS END --- */}


      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Navbar with Professional SVG Logo */}
        <nav className="flex items-center justify-between py-8">
            <Link href="/" className="flex items-center gap-3 group">
                {/* Professional Abstract Connector Logo SVG */}
                <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center transition-transform group-hover:scale-105">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M7 17H12.5C14.9853 17 17 14.9853 17 12.5C17 10.0147 14.9853 8 12.5 8H7V17ZM17 7V12.5C17 14.9853 14.9853 17 12.5 17H17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 7H12.5C14.9853 7 17 9.01472 17 11.5V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"/>
                    </svg>
                </div>
                <div className="text-base font-semibold tracking-tight text-white">
                    Connect2<span className="text-zinc-400">Mentor</span>
                </div>
            </Link>
            <div className="flex items-center gap-6 text-sm">
                <Link href="/login" className="hidden sm:block text-zinc-400 hover:text-white transition-colors">Log in</Link>
                <Link href="/register" className="px-4 py-2 rounded-md bg-white/10 text-white border border-white/10 hover:bg-white hover:text-black transition-all backdrop-blur-sm">Sign up</Link>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-zinc-900/30 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md mb-8 ring-1 ring-white/5">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Winter cohort applications now open
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-white mb-8 mx-auto max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
            Unlock your potential with <br className="hidden sm:block" />
            industry leaders.
          </h1>
          
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Direct access to engineers and leaders from the world's most innovative companies. No fluff, just technical mentorship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="h-11 px-8 rounded bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Get Started
            </Link>
            <Link
              href="/sessions"
              className="h-11 px-8 rounded border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/5 hover:text-white transition-all flex items-center justify-center backdrop-blur-sm"
            >
              Browse Mentors
            </Link>
          </div>
        </section>

        {/* Sessions Grid */}
        <section className="py-20 border-t border-white/5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xl font-medium text-white mb-2">Upcoming Sessions</h2>
              <p className="text-sm text-zinc-500">Live technical deep-dives.</p>
            </div>
            <Link href="/sessions" className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                View all 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative bg-zinc-900/20 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:bg-zinc-900/40 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Dec 25 · 15:00</span>
                    <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">Advanced React Patterns</h3>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                Render props, HOCs, and custom hooks implementation strategies for enterprise apps.
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-[10px] text-zinc-300">JD</div>
                  <span className="text-xs text-zinc-400">John Doe, Google</span>
                </div>
                <button className="text-xs text-white border border-white/10 bg-white/5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">Join</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-zinc-900/20 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:bg-zinc-900/40 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Dec 27 · 17:00</span>
                    <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">System Design Arch</h3>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                Fundamentals of distributed systems and scaling for millions of users.
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-[10px] text-zinc-300">SJ</div>
                  <span className="text-xs text-zinc-400">Sarah Johnson, Meta</span>
                </div>
                <button className="text-xs text-white border border-white/10 bg-white/5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">Join</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-zinc-900/20 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:bg-zinc-900/40 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Dec 30 · 14:00</span>
                    <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">ML Interview Prep</h3>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                Real-world problem solving and best practices for Machine Learning roles.
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-[10px] text-zinc-300">MC</div>
                  <span className="text-xs text-zinc-400">Michael Chen, OpenAI</span>
                </div>
                <button className="text-xs text-white border border-white/10 bg-white/5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">Join</button>
              </div>
            </div>
          </div>
        </section>

        {/* Mentors List */}
        <section className="py-20 border-t border-white/5">
          <div className="mb-12">
              <h2 className="text-xl font-medium text-white mb-2">Featured Mentors</h2>
              <p className="text-sm text-zinc-500">Learn from engineers at the forefront.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mentor Cards - utilizing backdrop blur for modern feel */}
            <div className="bg-zinc-900/20 border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/50 hover:border-white/20 transition-all cursor-default backdrop-blur-sm">
               <div className="w-10 h-10 rounded bg-zinc-900/50 border border-white/10 flex items-center justify-center text-xs font-medium text-white">JD</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">John Doe</h4>
                  <p className="text-xs text-zinc-500">Google · Frontend</p>
               </div>
            </div>
             <div className="bg-zinc-900/20 border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/50 hover:border-white/20 transition-all cursor-default backdrop-blur-sm">
               <div className="w-10 h-10 rounded bg-zinc-900/50 border border-white/10 flex items-center justify-center text-xs font-medium text-white">SJ</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">Sarah Johnson</h4>
                  <p className="text-xs text-zinc-500">Meta · Systems</p>
               </div>
            </div>
             <div className="bg-zinc-900/20 border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/50 hover:border-white/20 transition-all cursor-default backdrop-blur-sm">
               <div className="w-10 h-10 rounded bg-zinc-900/50 border border-white/10 flex items-center justify-center text-xs font-medium text-white">MC</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">Michael Chen</h4>
                  <p className="text-xs text-zinc-500">OpenAI · ML</p>
               </div>
            </div>
             <div className="bg-zinc-900/20 border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/50 hover:border-white/20 transition-all cursor-default backdrop-blur-sm">
               <div className="w-10 h-10 rounded bg-zinc-900/50 border border-white/10 flex items-center justify-center text-xs font-medium text-white">EP</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">Emily Parker</h4>
                  <p className="text-xs text-zinc-500">Microsoft · Product</p>
               </div>
            </div>
          </div>
        </section>

        {/* Minimal CTA */}
        <section className="py-32 border-t border-white/5 text-center relative overflow-hidden rounded-2xl my-12">
            {/* Subtle inner glow for CTA area */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-medium text-white mb-6">Ready to accelerate your career?</h2>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">Join the network today and start connecting with the mentors who can change your trajectory.</p>
                <div className="flex justify-center gap-4">
                    <Link href="/register" className="text-sm bg-white text-black px-6 py-3 rounded hover:bg-zinc-200 transition-colors font-medium">Start Learning Now</Link>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
            <div className="flex items-center gap-2">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-500">
                    <path d="M7 17L17 7M7 17H12.5C14.9853 17 17 14.9853 17 12.5C17 10.0147 14.9853 8 12.5 8H7V17ZM17 7V12.5C17 14.9853 14.9853 17 12.5 17H17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>© 2024 Connect2Mentor Inc.</p>
            </div>
            <div className="flex gap-6">
                <Link href="#" className="hover:text-zinc-400 transition-colors">Terms</Link>
                <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-zinc-400 transition-colors">Twitter</Link>
            </div>
        </footer>

      </div>
    </div>
  );
}