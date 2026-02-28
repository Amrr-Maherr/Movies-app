import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Star, Film, Tv, Award } from "lucide-react";

export default function OnlyOnNetflix() {
  const categories = [
    {
      icon: <Star className="w-8 h-8" />,
      title: "Netflix Originals",
      description: "Exclusive series and films you can only watch on Netflix",
      examples: ["Stranger Things", "The Crown", "Bridgerton", "Wednesday"]
    },
    {
      icon: <Film className="w-8 h-8" />,
      title: "Netflix Films",
      description: "Award-winning movies produced exclusively for Netflix",
      examples: ["The Irishman", "Roma", "Marriage Story", "Don't Look Up"]
    },
    {
      icon: <Tv className="w-8 h-8" />,
      title: "Netflix Series",
      description: "Binge-worthy shows created by Netflix",
      examples: ["Ozark", "The Witcher", "Money Heist", "Dark"]
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winners",
      description: "Emmy, Golden Globe, and Academy Award winning content",
      examples: ["The Queen's Gambit", "King Richard", "Power of the Dog"]
    }
  ];

  const featured = [
    { title: "Stranger Things", type: "Series", rating: "TV-14", seasons: "4 Seasons" },
    { title: "The Crown", type: "Series", rating: "TV-MA", seasons: "6 Seasons" },
    { title: "Wednesday", type: "Series", rating: "TV-14", seasons: "1 Season" },
    { title: "The Irishman", type: "Movie", rating: "R", duration: "3h 29m" }
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
          Only on Netflix
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          Discover exclusive content you can't find anywhere else
        </p>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[var(--netflix-red)] to-[var(--netflix-red-dark)] rounded-md p-8 mb-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Exclusive Entertainment
          </h2>
          <p className="text-white/90 mb-6">
            Netflix Originals bring you stories that can't be found anywhere else. 
            From groundbreaking series to award-winning films, experience the best in streaming entertainment.
          </p>
          <button className="bg-white text-[var(--netflix-red)] px-8 py-3 rounded font-bold hover:bg-white/90 transition-colors duration-300">
            Browse All Originals
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 hover:border-[var(--netflix-red)] transition-colors duration-300"
            >
              <div className="text-[var(--netflix-red)] mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.examples.map((example, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[var(--background-tertiary)] text-[var(--text-secondary)] px-3 py-1 rounded-full"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Content */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Netflix Originals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((item, index) => (
              <div
                key={index}
                className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md overflow-hidden hover:border-[var(--netflix-red)] transition-colors duration-300 cursor-pointer group"
              >
                <div className="aspect-[2/3] bg-[var(--background-tertiary)] flex items-center justify-center">
                  <Film className="w-12 h-12 text-[var(--text-muted)]" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.rating}</span>
                    <span>•</span>
                    <span>{item.seasons || item.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--text-secondary)] mb-6">
            Want more? Explore our full library of Netflix Originals
          </p>
          <Link
            to="/home"
            className="inline-flex items-center gap-2 bg-[var(--netflix-red)] text-white px-8 py-3 rounded font-bold hover:bg-[var(--netflix-red-hover)] transition-colors duration-300"
          >
            Start Watching
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
