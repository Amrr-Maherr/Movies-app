import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, HelpCircle, Book, MessageSquare, Phone } from "lucide-react";

export default function HelpCenter() {
  const helpCategories = [
    {
      icon: <Book className="w-8 h-8" />,
      title: "Account & Billing",
      description: "Manage your account, update payment info, and view billing history"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Watching Netflix",
      description: "Learn about streaming quality, supported devices, and troubleshooting"
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "Plans & Pricing",
      description: "Compare plans, upgrade or downgrade, and understand what's included"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Contact Us",
      description: "Get in touch with our support team for personalized help"
    }
  ];

  const quickLinks = [
    "How to reset your password",
    "Update your payment method",
    "Cancel your membership",
    "Browse TV shows by genre",
    "Browse movies by genre"
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
          Help Center
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          We're here to help you get the most out of Netflix
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full bg-[var(--background-secondary)] border border-[var(--input-border)] text-[var(--text-primary)] px-4 py-3 rounded-md focus:outline-none focus:border-[var(--netflix-red)] transition-colors duration-300"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpCategories.map((category, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 cursor-pointer hover:border-[var(--netflix-red)] transition-colors duration-300"
            >
              <div className="text-[var(--netflix-red)] mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {category.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
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
        </div>
      </div>
    </motion.div>
  );
}
