import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Film, Tv, Newspaper, Video } from "lucide-react";

export default function MediaCenter() {
  const news = [
    {
      icon: <Newspaper className="w-6 h-6" />,
      title: "Netflix Announces New Original Series for 2026",
      date: "February 15, 2026",
      description: "Discover the exciting new shows coming to Netflix this year, including drama, comedy, and documentary series."
    },
    {
      icon: <Film className="w-6 h-6" />,
      title: "Top 10 Most Watched Movies of January",
      date: "February 1, 2026",
      description: "See what everyone was watching last month. From action blockbusters to heartwarming romances."
    },
    {
      icon: <Tv className="w-6 h-6" />,
      title: "Renewed: Your Favorite Shows Return",
      date: "January 20, 2026",
      description: "Good news! These fan-favorite series have been renewed for another season."
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Behind the Scenes: Making of Netflix Originals",
      date: "January 10, 2026",
      description: "Go behind the camera and discover how your favorite Netflix shows are made."
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
          Media Center
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Latest news, press releases, and updates from Netflix
        </p>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <article
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-[var(--text-muted)]">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 text-[var(--netflix-red)] font-medium mt-4 hover:underline"
                  >
                    Read More
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Press Contact */}
        <div className="mt-12 bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8">
          <h2 className="text-2xl font-bold mb-4">Press Contact</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            For media inquiries, please contact our press team:
          </p>
          <a
            href="mailto:press@netflix.com"
            className="text-[var(--netflix-red)] hover:underline text-lg"
          >
            press@netflix.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}
