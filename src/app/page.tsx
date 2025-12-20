import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-zinc-800">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-zinc-800 opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Navbar (Simplified) */}
        <nav className="flex items-center justify-between py-8 border-b border-white/5">
            <div className="text-sm font-medium tracking-tight text-white flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                Mentor<span className="text-zinc-500">Connect</span>
            </div>
            <div className="flex gap-6 text-sm">
                <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">Log in</Link>
                <Link href="/register" className="text-white hover:text-zinc-300 transition-colors">Sign up</Link>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400 backdrop-blur-xl mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            New sessions available for December
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-white mb-8 mx-auto max-w-4xl">
            Master your craft with <br className="hidden sm:block" />
            <span className="text-zinc-500">world-class guidance.</span>
          </h1>
          
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Direct access to engineers and leaders from the world's most innovative companies. No fluff, just technical mentorship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="h-10 px-6 rounded bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all flex items-center justify-center"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="h-10 px-6 rounded border border-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-900 transition-all flex items-center justify-center"
            >
              View Schedule
              <svg className="w-4 h-4 ml-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
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
            <Link href="/sessions" className="text-xs text-zinc-400 hover:text-white transition-colors">View all &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative bg-zinc-900/30 border border-white/5 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Dec 25 · 15:00</span>
                    <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">Advanced React Patterns</h3>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                Render props, HOCs, and custom hooks implementation strategies for enterprise apps.
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300">JD</div>
                  <span className="text-xs text-zinc-400">John Doe, Google</span>
                </div>
                <button className="text-xs text-white border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors">Join</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-zinc-900/30 border border-white/5 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Dec 27 · 17:00</span>
                    <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">System Design Arch</h3>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                Fundamentals of distributed systems and scaling for millions of users.
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300">SJ</div>
                  <span className="text-xs text-zinc-400">Sarah Johnson, Meta</span>
                </div>
                <button className="text-xs text-white border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors">Join</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-zinc-900/30 border border-white/5 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Dec 30 · 14:00</span>
                    <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">ML Interview Prep</h3>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                Real-world problem solving and best practices for Machine Learning roles.
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300">MC</div>
                  <span className="text-xs text-zinc-400">Michael Chen, OpenAI</span>
                </div>
                <button className="text-xs text-white border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors">Join</button>
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
            {/* Mentor 1 */}
            <div className="bg-black border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/40 transition-colors cursor-default">
               <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-medium text-white">JD</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">John Doe</h4>
                  <p className="text-xs text-zinc-500">Google · Frontend</p>
               </div>
            </div>

             {/* Mentor 2 */}
             <div className="bg-black border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/40 transition-colors cursor-default">
               <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-medium text-white">SJ</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">Sarah Johnson</h4>
                  <p className="text-xs text-zinc-500">Meta · Systems</p>
               </div>
            </div>

             {/* Mentor 3 */}
             <div className="bg-black border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/40 transition-colors cursor-default">
               <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-medium text-white">MC</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">Michael Chen</h4>
                  <p className="text-xs text-zinc-500">OpenAI · ML</p>
               </div>
            </div>

             {/* Mentor 4 */}
             <div className="bg-black border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:bg-zinc-900/40 transition-colors cursor-default">
               <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-medium text-white">EP</div>
               <div>
                  <h4 className="text-sm font-medium text-zinc-200">Emily Parker</h4>
                  <p className="text-xs text-zinc-500">Microsoft · Product</p>
               </div>
            </div>
          </div>
        </section>

        {/* Minimal CTA */}
        <section className="py-24 border-t border-white/5 text-center">
            <h2 className="text-2xl font-medium text-white mb-6">Ready to accelerate your career?</h2>
            <div className="flex justify-center gap-4">
                <Link href="/register" className="text-sm bg-white text-black px-5 py-2.5 rounded hover:bg-zinc-200 transition-colors">Start Learning</Link>
            </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
            <p>© 2024 MentorConnect Inc.</p>
            <div className="flex gap-6">
                <Link href="#" className="hover:text-zinc-400">Terms</Link>
                <Link href="#" className="hover:text-zinc-400">Privacy</Link>
                <Link href="#" className="hover:text-zinc-400">Twitter</Link>
            </div>
        </footer>

      </div>
    </div>
  );
}