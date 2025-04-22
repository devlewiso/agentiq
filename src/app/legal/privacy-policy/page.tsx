import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Last updated: April 17, 2025
          </p>
        </div>

        <div className="prose prose-blue max-w-none dark:prose-invert">
          <p>
            At AgentIQ, we value and respect your privacy. This Privacy Policy describes how we collect, use, share, and protect the personal information we obtain through our call analysis service for call centers, as well as your choices regarding this information.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect the following types of information:
          </p>
          <ul>
            <li><strong>Account Information:</strong> When you register with AgentIQ, we collect information such as your name, email address, company name, position, and contact details.</li>
            <li><strong>Usage Information:</strong> We collect data about how you interact with our services, including the features you use, the time you spend on the platform, and the actions you take.</li>
            <li><strong>Call Information:</strong> To provide our analysis services, we process call recordings that you provide to us. These recordings may contain personal information about your customers and employees.</li>
            <li><strong>Technical Information:</strong> We collect information about the device and connection you use to access our services, including IP address, browser type, operating system, and cookie data.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the collected information to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our call analysis services.</li>
            <li>Process and complete transactions, and send related information, including confirmations and invoices.</li>
            <li>Send technical communications, updates, security alerts, and support and administrative messages.</li>
            <li>Respond to your comments, questions, and requests, and provide customer service.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
            <li>Personalize and improve the services, and provide content and features relevant to your interests.</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We may share your personal information in the following circumstances:
          </p>
          <ul>
            <li><strong>With Service Providers:</strong> We work with third parties that provide services such as data hosting, analytics, payment processing, and customer support. These providers have access to your personal information only to perform these tasks on our behalf.</li>
            <li><strong>With Your Consent:</strong> We may share your personal information when you give us consent to do so, such as when you authorize an integration with a third-party service.</li>
            <li><strong>For Legal Reasons:</strong> We may share information if we believe it is necessary to comply with applicable law, regulations, legal processes, or governmental requests.</li>
            <li><strong>In Case of Business Transfer:</strong> If AgentIQ is involved in a merger, acquisition, or sale of all or a portion of its assets, your personal information could be transferred as part of that transaction.</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            The security of your personal information is important to us. We implement technical, administrative, and physical security measures designed to protect your personal information from unauthorized access, use, or disclosure. However, no security system is impenetrable, and we cannot guarantee the absolute security of your information.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer have a legitimate business need to process your personal information, we will delete it or anonymize it.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as:
          </p>
          <ul>
            <li>Access the personal information we have about you.</li>
            <li>Correct inaccurate or incomplete personal information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Object to the processing of your personal information.</li>
            <li>Request restriction of processing of your personal information.</li>
            <li>Request portability of your personal information.</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice on our website before the change takes effect. We encourage you to review this page periodically to get the latest information about our privacy practices.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p>
            AgentIQ<br />
            Email: privacy@agentiq.com<br />
            Address: Av. Insurgentes Sur 1602, Mexico City, Mexico
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}