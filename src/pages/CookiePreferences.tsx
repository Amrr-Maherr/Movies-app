import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Cookie, Settings, BarChart3 } from "lucide-react";

export default function CookiePreferences() {
  const cookieCategories = [
    {
      icon: <Settings className="w-8 h-8" />,
      name: "Essential Cookies",
      status: "required",
      description: "These cookies are necessary for the Netflix service to function properly. They enable core functionality such as security, network management, and accessibility."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      name: "Analytics Cookies",
      status: "optional",
      description: "These cookies help us understand how you use the Netflix service by collecting and reporting information anonymously. This helps us improve our service."
    },
    {
      icon: <Cookie className="w-8 h-8" />,
      name: "Personalization Cookies",
      status: "optional",
      description: "These cookies allow us to remember your preferences and provide enhanced, personalized features. They help us show you content that matches your interests."
    },
    {
      icon: <Cookie className="w-8 h-8" />,
      name: "Advertising Cookies",
      status: "optional",
      description: "These cookies are used to deliver relevant advertisements to you and limit the number of times you see an advertisement. They help measure the effectiveness of advertising campaigns."
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
          Cookie Preferences
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Manage how we use cookies to improve your Netflix experience
        </p>

        {/* Cookie Categories */}
        <div className="max-w-4xl space-y-4">
          {cookieCategories.map((category, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-[var(--netflix-red)] mt-1">
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      {category.status === "required" && (
                        <span className="text-xs bg-[var(--netflix-red)] text-white px-2 py-1 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    disabled={category.status === "required"}
                    defaultChecked={category.status === "required"}
                  />
                  <div className="w-14 h-7 bg-[var(--background-tertiary)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--netflix-red)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--netflix-red)] peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mt-8 flex flex-wrap gap-4">
          <button className="bg-[var(--netflix-red)] text-white px-8 py-3 rounded font-medium hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
            Save Preferences
          </button>
          <button className="bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-8 py-3 rounded font-medium hover:border-[var(--netflix-red)] hover:text-[var(--netflix-red)] transition-colors duration-300">
            Reject All Optional
          </button>
          <button className="bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-8 py-3 rounded font-medium hover:border-[var(--netflix-red)] hover:text-[var(--netflix-red)] transition-colors duration-300">
            Accept All
          </button>
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mt-12 pt-8 border-t border-[var(--card-border)]">
          <h2 className="text-xl font-semibold mb-4">About Cookies</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and 
            understanding how you use our service.
          </p>
          <Link to="/privacy" className="text-[var(--netflix-red)] hover:underline">
            Learn more in our Privacy Policy
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
