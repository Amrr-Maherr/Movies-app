import { motion } from "framer-motion";

export default function Account() {
  const accountSections = [
    {
      title: "Membership & Billing",
      items: [
        { label: "Email", value: "user@example.com" },
        { label: "Password", value: "••••••••" },
        { label: "Plan", value: "Premium - $19.99/month" }
      ]
    },
    {
      title: "Profile Settings",
      items: [
        { label: "Profiles", value: "Manage profiles" },
        { label: "Parental Controls", value: "Set restrictions" },
        { label: "Profile Lock", value: "Add PIN" }
      ]
    },
    {
      title: "Playback Settings",
      items: [
        { label: "Video Quality", value: "Auto (up to 4K Ultra HD)" },
        { label: "Data Usage", value: "High" },
        { label: "Autoplay", value: "Enabled" }
      ]
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Account Settings
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Manage your Netflix account settings and preferences
        </p>

        {/* Account Sections */}
        <div className="max-w-4xl space-y-8">
          {accountSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md overflow-hidden"
            >
              <div className="bg-[var(--background-tertiary)] px-6 py-4 border-b border-[var(--card-border)]">
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <div className="divide-y divide-[var(--card-border)]">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between px-6 py-4 hover:bg-[var(--hover-overlay)] transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-[var(--text-secondary)]">
                      {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mt-8 flex flex-wrap gap-4">
          <button className="bg-[var(--netflix-red)] text-white px-6 py-3 rounded font-medium hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
            Save Changes
          </button>
          <button className="bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-6 py-3 rounded font-medium hover:border-[var(--netflix-red)] hover:text-[var(--netflix-red)] transition-colors duration-300">
            Cancel Membership
          </button>
        </div>
      </div>
    </motion.div>
  );
}
