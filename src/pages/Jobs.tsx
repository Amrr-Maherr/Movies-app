import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Globe, Award, Heart } from "lucide-react";

export default function Jobs() {
  const departments = [
    { icon: <Globe className="w-6 h-6" />, name: "Engineering", openings: 45 },
    { icon: <Award className="w-6 h-6" />, name: "Content & Creative", openings: 28 },
    { icon: <Briefcase className="w-6 h-6" />, name: "Marketing", openings: 19 },
    { icon: <Heart className="w-6 h-6" />, name: "Customer Service", openings: 67 }
  ];

  const featuredJobs = [
    { title: "Senior Software Engineer", location: "Los Gatos, CA", type: "Full-time" },
    { title: "Content Acquisition Manager", location: "Los Angeles, CA", type: "Full-time" },
    { title: "Data Scientist, Analytics", location: "Remote", type: "Full-time" },
    { title: "UX Designer, Original Series", location: "New York, NY", type: "Full-time" },
    { title: "Marketing Manager, EMEA", location: "London, UK", type: "Full-time" },
    { title: "Customer Service Representative", location: "Remote", type: "Part-time" }
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
          Jobs at Netflix
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Join us and help shape the future of entertainment
        </p>

        {/* Hero Section */}
        <div className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Why Work at Netflix?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-[var(--netflix-red)]">Freedom & Responsibility</h3>
              <p className="text-[var(--text-secondary)]">
                We trust our employees to make great decisions with minimal oversight.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[var(--netflix-red)]">Top of Market Pay</h3>
              <p className="text-[var(--text-secondary)]">
                We pay at the top of your personal market for exceptional talent.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[var(--netflix-red)]">Inclusive Culture</h3>
              <p className="text-[var(--text-secondary)]">
                We celebrate diversity and create an inclusive environment for all.
              </p>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Departments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer"
              >
                <div className="text-[var(--netflix-red)] mb-4">{dept.icon}</div>
                <h3 className="font-semibold mb-2">{dept.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {dept.openings} openings
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Positions</h2>
          <div className="space-y-4">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 bg-[var(--netflix-red)] text-white px-6 py-2 rounded font-medium hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
