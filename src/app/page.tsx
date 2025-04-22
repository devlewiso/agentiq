import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Revolutionize your <span className="text-blue-600 dark:text-blue-400">Call Center</span> with Artificial Intelligence
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              AgentIQ automatically analyzes your calls to improve service quality, identify opportunities, and optimize customer experience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Request Demo
              </button>
              <a href="/features" className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors text-center inline-block">
                View Features
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">AgentIQ Dashboard</div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-blue-100 dark:bg-blue-900/30 rounded p-3">
                    <div className="h-4 w-1/2 bg-blue-200 dark:bg-blue-800 rounded mb-2"></div>
                    <div className="h-8 w-3/4 bg-blue-300 dark:bg-blue-700 rounded"></div>
                  </div>
                  <div className="h-24 bg-green-100 dark:bg-green-900/30 rounded p-3">
                    <div className="h-4 w-1/2 bg-green-200 dark:bg-green-800 rounded mb-2"></div>
                    <div className="h-8 w-3/4 bg-green-300 dark:bg-green-700 rounded"></div>
                  </div>
                </div>
                <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Power Your Call Center with AI</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Discover how AgentIQ transforms your calls into actionable insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Conversation Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Automatically transcribe and analyze each call to identify patterns and improvement opportunities.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-Time Metrics</h3>
              <p className="text-gray-600 dark:text-gray-300">Monitor your agents' performance and customer satisfaction with real-time dashboards.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Intelligent Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive personalized suggestions to improve service quality based on data analysis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
