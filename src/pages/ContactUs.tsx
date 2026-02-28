import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageSquare, HelpCircle, ChevronLeft } from "lucide-react";

export default function ContactUs() {
  const contactMethods = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      available: true
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      description: "Speak directly with a support representative",
      action: "1-866-579-7172",
      available: true
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a message and we'll respond within 24 hours",
      action: "support@netflix.com",
      available: true
    }
  ];

  const faqLinks = [
    "How do I reset my password?",
    "How can I update my payment method?",
    "What are the available subscription plans?",
    "How do I cancel my membership?",
    "Why is my video quality poor?"
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          We're here to help. Choose how you'd like to get in touch.
        </p>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 text-center hover:border-[var(--netflix-red)] transition-colors duration-300"
            >
              <div className="text-[var(--netflix-red)] flex justify-center mb-6">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                {method.description}
              </p>
              <button
                className={`w-full py-3 rounded font-medium transition-colors duration-300 ${
                  method.action.includes("@") || method.action.includes("-")
                    ? "bg-transparent border border-[var(--netflix-red)] text-[var(--netflix-red)] hover:bg-[var(--netflix-red)] hover:text-white"
                    : "bg-[var(--netflix-red)] text-white hover:bg-[var(--netflix-red-hover)]"
                }`}
              >
                {method.action}
              </button>
              {method.available && (
                <span className="inline-block mt-4 text-sm text-[#46d369]">
                  ● Available 24/7
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Quick FAQ */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-[var(--netflix-red)]" />
            <h2 className="text-2xl font-bold">Quick Answers</h2>
          </div>
          <ul className="space-y-3">
            {faqLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to="#"
                  className="text-[var(--text-secondary)] hover:text-[var(--netflix-red)] transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--netflix-red)] rounded-full"></span>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-[var(--netflix-red)] font-medium mt-6 hover:underline"
          >
            View all FAQs
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
