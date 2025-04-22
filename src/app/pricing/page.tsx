import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            Plans and Pricing
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Choose the plan that best fits your call center needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="bg-gray-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Free Plan</h2>
              <p className="text-gray-100 mt-1">To try the service</p>
            </div>
            <div className="p-8">
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$0</span>
                <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">/month</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">5 call analyses/day</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Maximum 15 analyses/month</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Maximum duration: 5 minutes per call</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Basic transcription</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Limited dashboard</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">No premium support</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Ideal for evaluating the service</p>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Start Free
                </button>
              </div>
            </div>
          </div>
          {/* Standard Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="bg-blue-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Standard Plan</h2>
              <p className="text-blue-100 mt-1">For small and medium call centers</p>
            </div>
            <div className="p-8">
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$99</span>
                <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">/month</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">100 call analyses/month</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Maximum duration: 10 minutes per call</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Basic sentiment analysis</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Call transcription</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Basic dashboard</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Email support</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Additional calls at $1.20 per analysis</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Choose Standard Plan
                </button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 relative">
            <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-45 origin-bottom-left">
              POPULAR
            </div>
            <div className="bg-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Premium Plan</h2>
              <p className="text-purple-100 mt-1">For high-volume call centers</p>
            </div>
            <div className="p-8">
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$249</span>
                <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">/month</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">300 call analyses/month</span></p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Maximum duration: <span className="font-bold">20 minutes</span> per call</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Advanced sentiment and emotion analysis</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Call transcription with speaker identification</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Advanced dashboard with customizable metrics</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Personalized improvement recommendations</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300">Priority 24/7 support</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Additional calls at $0.95 per analysis</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Choose Premium Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What does each call analysis include?</h3>
              <p className="text-gray-600 dark:text-gray-300">Each analysis includes complete transcription, sentiment detection, keyword identification, and AI-based improvement recommendations.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Can I change plans at any time?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes, you can upgrade or change your plan at any time. Changes will apply at the beginning of the next billing cycle.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What happens if I exceed my monthly call limit?</h3>
              <p className="text-gray-600 dark:text-gray-300">You can continue using the service and you will be charged for each additional analysis according to your plan rate. You can also upgrade to a higher plan if you regularly exceed your limit.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How is the privacy of my data guaranteed?</h3>
              <p className="text-gray-600 dark:text-gray-300">All calls and data are securely stored with end-to-end encryption. We comply with GDPR and other privacy regulations. We do not share your data with third parties.</p>
            </div>
          </div>
        </div>

        {/* Contact section for enterprise plans */}
        <div className="mt-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need a custom plan?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">If your call center handles a large volume of calls or you have specific needs, contact us to create a tailored plan for your business.</p>
          <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Contact for Enterprise Plan
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}