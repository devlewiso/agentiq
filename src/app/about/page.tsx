import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            About Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Empowering call center supervisors with intelligent call analysis
          </p>
        </div>

        {/* Our mission */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At AgentIQ, our mission is to provide call center supervisors and managers with advanced AI-powered call analysis tools. These tools enable them to objectively evaluate their agents' performance, identify areas for improvement, and offer personalized coaching based on concrete data.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We firmly believe that objective AI-based conversation analysis can transform how agent performance is evaluated and improved, allowing supervisors to make data-driven decisions and provide more effective, personalized training.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-2xl transform -rotate-3"></div>
              <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 overflow-hidden">
                <div className="w-full h-[200px] bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-semibold">Our Mission</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our history */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -z-10 inset-0 bg-green-100 dark:bg-green-900/20 rounded-2xl transform rotate-2"></div>
              <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 overflow-hidden">
                <div className="w-full h-[200px] bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xl font-semibold">Our History</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our History</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AgentIQ was born in 2023 from the shared vision of a group of artificial intelligence experts and professionals with extensive experience in call center supervision. Frustrated by the subjectivity and time consumed in traditional call evaluations, they decided to create an analysis tool that would provide supervisors with objective data and actionable insights about their agents&apos; performance.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Since then, we have been on a mission to provide call center supervisors and managers of all sizes with advanced analysis tools that were previously only available to large corporations, enabling them to continuously improve their teams' service quality through objective evaluations and data-driven coaching.
              </p>
            </div>
          </div>
        </div>

        {/* Our values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We act with honesty and transparency in everything we do. We are committed to maintaining the highest ethical standards in the development of our analysis algorithms and in protecting the data from analyzed calls.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We constantly strive to innovate and improve our analysis tools, anticipating the changing needs of call center supervisors and managers.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We work closely with supervisors and managers, valuing their perspectives and collaborating to develop evaluation metrics that truly impact service quality.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Customer Focus</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We put supervisors and their evaluation needs at the center of everything we do, ensuring that our tools facilitate their daily work.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Responsibility</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We recognize the importance of fair and objective evaluations for agents, and we strive to provide tools that foster a positive and growth-oriented work environment.
              </p>
            </div>
          </div>
        </div>

        {/* Our team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full overflow-hidden mb-6 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">CEO</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Carlos Rodriguez</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">CEO & Co-Founder</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Technology visionary with over 15 years of experience in call center management. Carlos leads AgentIQ&apos;s strategy and overall vision, focusing on how call analysis can transform supervision.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full overflow-hidden mb-6 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-semibold">CTO</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ana Martinez</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">CTO & Co-Founder</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Software engineer specialized in natural language processing and voice analysis. Ana oversees the development of our call analysis algorithms to ensure accurate and useful evaluations.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-purple-100 dark:bg-purple-900/20 rounded-full overflow-hidden mb-6 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">COO</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Miguel Sanchez</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">COO</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                With a solid background as a call center supervisor, Miguel ensures that our analysis tools adapt to the real evaluation and coaching needs of supervisors.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to improve your agent evaluations?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Discover how AgentIQ can help you objectively analyze calls, provide specific feedback, and improve your team's performance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors">
              Contact Us
            </Link>
            <Link href="/pricing" className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              View Plans
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}