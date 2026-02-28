import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsOfUse() {
  const sections = [
    {
      title: "1. Membership",
      content: "Netflix service is an individual, non-transferable, non-assignable subscription for your personal and non-commercial use. During your membership, you are granted a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Netflix service and to view, download and print content."
    },
    {
      title: "2. Billing & Cancellation",
      content: "Netflix offers various subscription plans. You agree to pay all charges at the prices then in effect for your use of the Netflix service and any applicable taxes. We may change our subscription plans and the prices for such plans at any time, upon notice to you."
    },
    {
      title: "3. Content",
      content: "The Netflix service includes a collection of content that varies by country and changes from time to time at the sole discretion of Netflix. Netflix may add or remove content at any time without prior notice."
    },
    {
      title: "4. Passwords & Account Sharing",
      content: "You may create a password and limit access to the Netflix service and devices used to access the service by selecting the 'Profile Lock' feature. You agree not to share your password with anyone outside your household unless you are on a plan that allows multiple households."
    },
    {
      title: "5. Device Limits",
      content: "The Netflix service and any content viewed through the service are for your personal and non-commercial use only. During your membership, you are granted a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Netflix service."
    },
    {
      title: "6. Disclaimer of Warranties",
      content: "The Netflix service and any content viewed through the service are provided 'as is' and 'as available' without warranty of any kind, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement."
    },
    {
      title: "7. Limitation of Liability",
      content: "Netflix shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Netflix service or any content, including but not limited to lost profits, loss of data, or business interruption."
    },
    {
      title: "8. Governing Law",
      content: "These Terms of Use shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising out of these Terms shall be resolved in the courts of Santa Clara County, California."
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
          Terms of Use
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Last updated: January 1, 2026
        </p>

        {/* Content */}
        <div className="max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="max-w-4xl mt-12 pt-8 border-t border-[var(--card-border)]">
          <p className="text-[var(--text-secondary)] mb-4">
            For more information, please see our:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="text-[var(--netflix-red)] hover:underline">
              Privacy Policy
            </Link>
            <Link to="/cookie-preferences" className="text-[var(--netflix-red)] hover:underline">
              Cookie Preferences
            </Link>
            <Link to="/legal-notices" className="text-[var(--netflix-red)] hover:underline">
              Legal Notices
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
