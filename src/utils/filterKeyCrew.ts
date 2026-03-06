/**
 * Crew member interface for TMDB crew data
 */
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

/**
 * Key crew jobs to display in the Crew section
 */
const KEY_CREW_JOBS = [
  "Director",
  "Producer",
  "Writer",
  "Screenplay",
  "Executive Producer",
  "Director of Photography",
  "Editor",
  "Original Music Composer",
  "Production Design",
  "Casting",
];

/**
 * Filters and sorts crew members to show only key roles.
 * Removes duplicates by job, keeping the first occurrence.
 *
 * @param crew - Array of crew members
 * @returns Filtered array of key crew members with unique jobs
 *
 * @example
 * filterKeyCrew(crewMembers) // Returns crew with key roles only
 */
export function filterKeyCrew(crew: CrewMember[]): CrewMember[] {
  const filtered = crew.filter((member) =>
    KEY_CREW_JOBS.includes(member.job)
  );

  // Remove duplicates by job (keep first occurrence)
  const uniqueJobs = new Map<string, CrewMember>();
  filtered.forEach((member) => {
    if (!uniqueJobs.has(member.job)) {
      uniqueJobs.set(member.job, member);
    }
  });

  return Array.from(uniqueJobs.values());
}
