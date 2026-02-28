import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Shield, Lock, Eye, Database } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create or modify your account, request customer support, or otherwise communicate with us. This may include your name, email address, phone number, billing information, and payment method."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, to process your requests, and to send you related information. We also use this information to personalize your experience and to show you content that we think you might be interested in."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Information Sharing",
      content: "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, in response to legal requests, or to protect our rights and the rights of others."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Retention",
      content: "We retain your personal information for as long as your account is active or as needed to provide you services. We may also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You can do this through your account settings or by contacting us. You may also have the right to data portability and to object to certain processing of your information."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Security",
      content: "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever completely secure."
    }
  ];

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-12">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Your privacy is important to us. Here's how we protect your data.
        </p>

        {/* Content */}
        <div className="max-w-4xl space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">
                    {section.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mt-12 bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            If you have questions about this Privacy Policy or our data practices, 
            please contact our Privacy Office:
          </p>
          <a
            href="mailto:privacy@netflix.com"
            className="text-[var(--netflix-red)] hover:underline text-lg"
          >
            privacy@netflix.com
          </a>
        </div>

        {/* Related Links */}
        <div className="max-w-4xl mt-8 pt-8 border-t border-[var(--card-border)]">
          <p className="text-[var(--text-secondary)] mb-4">Related policies:</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms-of-use" className="text-[var(--netflix-red)] hover:underline">
              Terms of Use
            </Link>
            <Link to="/cookie-preferences" className="text-[var(--netflix-red)] hover:underline">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
