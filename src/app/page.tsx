import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Connect to <span className="text-blue-600">Mentor</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Unlock your potential with expert guidance from industry leaders. 
              Join live mentoring sessions and accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Mentoring Sessions
            </h2>
            <p className="text-lg text-gray-600">
              Don't miss these opportunities to learn from industry experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Session Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Upcoming
                  </span>
                  <span className="text-gray-500 text-sm">Dec 25, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Advanced React Patterns
                </h3>
                <p className="text-gray-600 mb-4">
                  Master advanced React patterns including render props, HOCs, and custom hooks.
                </p>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">Senior Frontend Engineer at Google</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  3:00 PM - 4:30 PM EST
                </div>
                <button className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>

            {/* Session Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Upcoming
                  </span>
                  <span className="text-gray-500 text-sm">Dec 27, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  System Design Fundamentals
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn the fundamentals of system design and architecture for scalable applications.
                </p>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    SJ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Staff Engineer at Meta</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  5:00 PM - 6:30 PM EST
                </div>
                <button className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>

            {/* Session Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    Limited Seats
                  </span>
                  <span className="text-gray-500 text-sm">Dec 30, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Machine Learning Interview Prep
                </h3>
                <p className="text-gray-600 mb-4">
                  Prepare for ML interviews with real-world problem solving and best practices.
                </p>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    MC
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-500">ML Lead at OpenAI</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  2:00 PM - 3:30 PM EST
                </div>
                <button className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Mentors
            </h2>
            <p className="text-lg text-gray-600">
              Learn from the best in the industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mentor 1 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                JD
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">John Doe</h3>
              <p className="text-gray-600 text-sm mb-2">Senior Frontend Engineer</p>
              <p className="text-gray-500 text-xs mb-3">Google</p>
              <div className="flex flex-wrap gap-1 justify-center">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">TypeScript</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Node.js</span>
              </div>
            </div>

            {/* Mentor 2 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                SJ
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-gray-600 text-sm mb-2">Staff Engineer</p>
              <p className="text-gray-500 text-xs mb-3">Meta</p>
              <div className="flex flex-wrap gap-1 justify-center">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">System Design</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Distributed Systems</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Cloud</span>
              </div>
            </div>

            {/* Mentor 3 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                MC
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Michael Chen</h3>
              <p className="text-gray-600 text-sm mb-2">ML Lead</p>
              <p className="text-gray-500 text-xs mb-3">OpenAI</p>
              <div className="flex flex-wrap gap-1 justify-center">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Machine Learning</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Deep Learning</span>
              </div>
            </div>

            {/* Mentor 4 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                EP
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Emily Parker</h3>
              <p className="text-gray-600 text-sm mb-2">Product Manager</p>
              <p className="text-gray-500 text-xs mb-3">Microsoft</p>
              <div className="flex flex-wrap gap-1 justify-center">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Product Strategy</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Agile</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who are already learning from industry experts.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Learning Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Connect to Mentor</h3>
            <p className="text-gray-400 mb-4">
              Empowering professionals through expert mentorship
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link href="/register" className="hover:text-white transition-colors">Register</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
            <p className="text-gray-500 text-sm mt-8">
              © 2024 Connect to Mentor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
