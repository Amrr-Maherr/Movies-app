import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Users, Award, Globe } from "lucide-react";

export default function CorporateInformation() {
  const info = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Company Overview",
      content: "Netflix, Inc. is an American subscription video on-demand over-the-top streaming service. The company primarily distributes original and acquired films and television shows from various genres."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Presence",
      content: "Netflix is available in over 190 countries worldwide, with regional headquarters in Los Gatos (USA), Amsterdam (EMEA), Singapore (APAC), and São Paulo (Latin America)."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Leadership Team",
      content: "Led by co-founder and CEO Ted Sarandos and co-CEO Greg Peters, Netflix's leadership team brings decades of experience in technology, entertainment, and global business operations."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Awards & Recognition",
      content: "Netflix has won numerous Emmy Awards, Golden Globes, and Academy Awards for its original content, making it one of the most awarded streaming platforms in the world."
    }
  ];

  const stats = [
    { label: "Founded", value: "1997" },
    { label: "Headquarters", value: "Los Gatos, California" },
    { label: "Employees", value: "12,800+" },
    { label: "Subscribers", value: "260+ Million" }
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
          Corporate Information
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Learn about Netflix's mission, leadership, and global impact
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--netflix-red)] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Info Sections */}
        <div className="max-w-4xl space-y-6 mb-12">
          {info.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8">
          <h2 className="text-2xl font-bold mb-6">Corporate Headquarters</h2>
          <address className="not-italic text-[var(--text-secondary)] space-y-2">
            <p>100 Winchester Circle</p>
            <p>Los Gatos, CA 95032</p>
            <p>United States</p>
            <p className="mt-4">
              Phone: <a href="tel:+14085403700" className="text-[var(--netflix-red)] hover:underline">+1 (408) 540-3700</a>
            </p>
          </address>
        </div>
      </div>
    </motion.div>
  );
}
