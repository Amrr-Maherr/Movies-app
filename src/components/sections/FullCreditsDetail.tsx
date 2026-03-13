import { memo, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/shared/Card";
import { cn } from "@/lib/utils";
import type { CastMember } from "@/types";
import type { CrewMember } from "@/utils/filterKeyCrew";

interface FullCreditsDetailProps {
  cast: CastMember[];
  crew: CrewMember[];
  title?: string;
}

// Memoized CastCard component
const CastCard = memo(function CastCard({
  actor,
  index,
}: {
  actor: CastMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
    >
      <Card
        variant="person"
        person={{
          id: actor.id,
          name: actor.name,
          profileImage: actor.profile_path,
          role: actor.character || "Unknown role",
        }}
      />
    </motion.div>
  );
});

// Memoized CrewCard component
const CrewCard = memo(function CrewCard({
  member,
  index,
}: {
  member: CrewMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
    >
      <Card
        variant="person"
        person={{
          id: member.id,
          name: member.name,
          profileImage: member.profile_path,
          role: `${member.job} • ${member.department}`,
        }}
      />
    </motion.div>
  );
});

/**
 * FullCreditsDetail Component
 * Displays comprehensive cast and crew information in a detailed grid layout
 * with search and filter capabilities
 */
const FullCreditsDetail = memo(function FullCreditsDetail({
  cast,
  crew,
  title = "Cast & Crew",
}: FullCreditsDetailProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");

  // Memoized: Filter cast by search query
  const filteredCast = useMemo(() => {
    if (!searchQuery) return cast;
    const query = searchQuery.toLowerCase();
    return cast.filter(
      (actor) =>
        actor.name.toLowerCase().includes(query) ||
        (actor.character && actor.character.toLowerCase().includes(query))
    );
  }, [cast, searchQuery]);

  // Memoized: Get unique departments from crew
  const departments = useMemo(() => {
    const depts = new Set(crew.map((m) => m.department));
    return ["all", ...Array.from(depts)];
  }, [crew]);

  // Memoized: Filter crew by search and department
  const filteredCrew = useMemo(() => {
    let result = crew;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.job.toLowerCase().includes(query) ||
          member.department.toLowerCase().includes(query)
      );
    }

    // Filter by department
    if (filterDepartment !== "all") {
      result = result.filter((member) => member.department === filterDepartment);
    }

    return result;
  }, [crew, searchQuery, filterDepartment]);

  // Memoized: Handle search change
  const handleSearchChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  }, []);

  // Memoized: Handle department filter change
  const handleDepartmentChange = useCallback((
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterDepartment(e.target.value);
  }, []);

  return (
    <section className="bg-black py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            <p className="text-white/60 text-sm">
              {cast.length} cast members • {crew.length} crew members
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search cast & crew..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={cn(
                  "w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg",
                  "bg-white/10 border border-white/20 text-white",
                  "placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                )}
                aria-label="Search cast and crew"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                value={filterDepartment}
                onChange={handleDepartmentChange}
                className={cn(
                  "w-full sm:w-48 pl-10 pr-8 py-2 rounded-lg appearance-none cursor-pointer",
                  "bg-white/10 border border-white/20 text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/30"
                )}
                aria-label="Filter by department"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-zinc-900">
                    {dept === "all" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {filteredCast.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-600 rounded" />
              Cast ({filteredCast.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredCast.map((actor, index) => (
                <CastCard key={actor.id} actor={actor} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Crew Section */}
        {filteredCrew.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded" />
              Crew ({filteredCrew.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredCrew.map((member, index) => (
                <CrewCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredCast.length === 0 && filteredCrew.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">
              No cast or crew members found matching your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

export default FullCreditsDetail;
