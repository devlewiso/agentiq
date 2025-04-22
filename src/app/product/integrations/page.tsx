import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function Integrations() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            Integrations
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Connect AgentIQ with your favorite tools to maximize the value of your call analysis
          </p>
        </div>

        {/* Report export section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Advanced Report Export</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Get the maximum value from your call analysis with our flexible export options, designed to meet the needs of the most demanding teams.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold">Multiple formats:</span> Export your reports in PDF, Excel, CSV, or JSON to suit your analysis and presentation needs.</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold">Customizable reports:</span> Select exactly which metrics and data you want to include in each report to focus on what really matters.</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold">Report automation:</span> Schedule automatic generation and distribution of daily, weekly, or monthly reports to key members of your team.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-2xl transform -rotate-3"></div>
              <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 overflow-hidden">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">PDF</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Professional reports ready for presentation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Excel/CSV</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Tabular data for detailed analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">JSON/API</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Integration with other systems and tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future integrations */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Future Integrations</h2>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We are constantly working to expand our integration capabilities. Soon we will add connections with the most popular platforms in the market.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Do you have any suggestions about integrations you would like to see in AgentIQ? Let us know through our contact form.
            </p>
          </div>
        </div>



        {/* CTA */}
        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to integrate AgentIQ with your systems?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Our team of experts can help you configure the integrations you need to maximize the value of your call analysis.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors">
              Contact an Expert
            </Link>
            <Link href="/documentation" className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              View Technical Documentation
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}