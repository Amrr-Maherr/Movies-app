import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, FileText, Scale, Shield } from "lucide-react";

export default function LegalNotices() {
  const notices = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Copyright Notice",
      content: "© 1997-2026 Netflix, Inc. All rights reserved. Netflix and the N logo are trademarks or registered trademarks of Netflix, Inc. All other trademarks and registered trademarks are the property of their respective owners."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "DMCA Notice",
      content: "Netflix respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, we will respond expeditiously to claims of copyright infringement committed using the Netflix service."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trademark Notice",
      content: "All trademarks, service marks, trade names, trade dress, product names and logos appearing on the service are either the property of their respective owners or displayed with their permission. You may not use any of these without prior written permission."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Content Ratings",
      content: "Content ratings are provided for informational purposes only. Ratings may vary by region. Netflix does not guarantee the accuracy of ratings and encourages parents to review content before allowing children to view it."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Accessibility",
      content: "Netflix is committed to providing an accessible experience for all users. If you encounter accessibility barriers, please contact us at accessibility@netflix.com. We are continuously working to improve the accessibility of our service."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Children's Privacy",
      content: "Netflix does not knowingly collect personal information from children under 13 without parental consent. Our Kids profile provides a safe, age-appropriate viewing experience with parental controls."
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
          Legal Notices
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Important legal information and notices
        </p>

        {/* Notices */}
        <div className="max-w-4xl space-y-6">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1">
                  {notice.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">{notice.title}</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mt-12 pt-8 border-t border-[var(--card-border)]">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            For more information about our legal policies and practices, please see:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms-of-use" className="text-[var(--netflix-red)] hover:underline">
              Terms of Use
            </Link>
            <Link to="/privacy" className="text-[var(--netflix-red)] hover:underline">
              Privacy Policy
            </Link>
            <Link to="/cookie-preferences" className="text-[var(--netflix-red)] hover:underline">
              Cookie Preferences
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="max-w-4xl mt-8 pt-8 border-t border-[var(--card-border)]">
          <h2 className="text-xl font-semibold mb-4">Legal Contact</h2>
          <p className="text-[var(--text-secondary)] mb-2">
            For legal inquiries, please contact:
          </p>
          <a
            href="mailto:legal@netflix.com"
            className="text-[var(--netflix-red)] hover:underline"
          >
            legal@netflix.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}
