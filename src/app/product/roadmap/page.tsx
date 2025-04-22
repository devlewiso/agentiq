import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            Product Roadmap
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Discover what we're building and where AgentIQ is headed
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900/50"></div>
          
          {/* Q2 2025 */}
          <div className="relative mb-16">
            <div className="flex items-center mb-4">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full inline-block ml-auto mr-auto lg:mr-[calc(50%-3rem)] lg:ml-0">
                Q2 2025
              </div>
            </div>
            <div className="lg:ml-[calc(50%+2rem)] lg:w-[calc(50%-3rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Initial Launch</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Basic call analysis with automatic transcription</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Dashboard with key performance metrics</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Export reports in basic formats (PDF, CSV)</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Q3 2025 */}
          <div className="relative mb-16">
            <div className="flex items-center mb-4">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full inline-block ml-auto mr-auto lg:ml-[calc(50%-3rem)] lg:mr-0">
                Q3 2025
              </div>
            </div>
            <div className="lg:mr-[calc(50%+2rem)] lg:w-[calc(50%-3rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analysis Improvements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Advanced sentiment analysis to detect customer emotions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Automatic topic identification and call categorization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Customizable alerts for critical situations</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Q4 2025 */}
          <div className="relative mb-16">
            <div className="flex items-center mb-4">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full inline-block ml-auto mr-auto lg:mr-[calc(50%-3rem)] lg:ml-0">
                Q4 2025
              </div>
            </div>
            <div className="lg:ml-[calc(50%+2rem)] lg:w-[calc(50%-3rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intelligent Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Personalized coaching suggestions for agents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Analysis-based recommendations for script optimization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Identification of cross-selling and upselling opportunities</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Q1 2026 */}
          <div className="relative mb-16">
            <div className="flex items-center mb-4">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full inline-block ml-auto mr-auto lg:ml-[calc(50%-3rem)] lg:mr-0">
                Q1 2026
              </div>
            </div>
            <div className="lg:mr-[calc(50%+2rem)] lg:w-[calc(50%-3rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Integrations and Expansion</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Integrations with popular CRMs (Salesforce, Zendesk)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Public API for developers</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Support for multiple languages</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Q2 2026 */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full inline-block ml-auto mr-auto lg:mr-[calc(50%-3rem)] lg:ml-0">
                Q2 2026
              </div>
            </div>
            <div className="lg:ml-[calc(50%+2rem)] lg:w-[calc(50%-3rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced AI and Automation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Real-time virtual assistant for agents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Post-call task automation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">Customer behavior prediction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Note about the roadmap */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 mb-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Commitment</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This roadmap is a vision of our current plans and may be subject to changes based on market needs and customer feedback. We are committed to maintaining transparency about our development and prioritizing features that generate the most value for our users.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Do you have ideas for our roadmap?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">We would love to hear your suggestions about features you would like to see in AgentIQ. Your feedback is invaluable to us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors">
              Share Ideas
            </Link>
            <Link href="/pricing" className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              View Current Plans
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}