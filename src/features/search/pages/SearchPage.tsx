import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Film, Tv, User, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/features/onboarding/providers/OnboardingProvider";
import {
  useSearch,
  type MovieSearchResult,
  type TvShowSearchResult,
  type PersonSearchResultItem,
} from "@/features/search/hooks/FetchSearch";
import { useDebounce } from "@/utils";
import { SectionSkeleton } from "@/components/ui";
import { ReactQueryErrorState } from "@/components/errors";
import HelmetMeta from "@/components/shared/HelmetMeta";
import Card from "@/components/shared/Card/Card";
import PersonCard from "@/components/shared/MediaCard/PersonCard";
import type { HeroMedia } from "@/types";
import NetflixLogo from "@/assets/logos/Netflix_Symbol_RGB.png";

type FilterType = "all" | "movie" | "tv" | "person";

export default function SearchPage() {
  const { startTour } = useOnboarding();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryParam = searchParams.get("q") || "";
  const [filter, setFilter] = useState<FilterType>("all");
  const [inputValue, setInputValue] = useState(queryParam);
  const debouncedQuery = useDebounce(inputValue, 800);
  const currentLang = i18n.language || 'en';

  const { results, isLoading, error } = useSearch(debouncedQuery);

  // Filter results based on selected type
  const filteredResults = useMemo(() => {
    if (filter === "all") return results;
    return results.filter((result) => result.type === filter);
  }, [results, filter]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const movies = results.filter(
      (r): r is MovieSearchResult => r.type === "movie",
    );
    const tvShows = results.filter(
      (r): r is TvShowSearchResult => r.type === "tv",
    );
    const people = results.filter(
      (r): r is PersonSearchResultItem => r.type === "person",
    );
    return { movies, tvShows, people };
  }, [results]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/${currentLang}/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const clearSearch = () => {
    setInputValue("");
    navigate(`/${currentLang}/search`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startTour("search");
    }, 1500);
    return () => clearTimeout(timer);
  }, [startTour]);

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name={queryParam ? `Search: ${queryParam}` : t('common:search.title')}
        description={t('common:search.searchPageDescription')}
      />

      {/* Hero Search Section */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-netflix-red/10 via-transparent to-transparent" />

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" />
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.img
              src={NetflixLogo}
              alt="Netflix"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-60 w-auto mx-auto mb-8"
            />

            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-netflix-red to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative flex items-center bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
                  <Search className="absolute left-6 w-7 h-7 text-white/40" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t('common:search.searchPlaceholder')}
                    className="w-full bg-transparent text-white text-xl placeholder:text-white/30 outline-none pl-16 pr-14 py-6"
                    autoFocus
                  />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-6 p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-white/50" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Quick stats */}
            {!isLoading && results.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/40 text-sm mt-6"
              >
                {t('common:search.foundResults', { count: results.length, query: debouncedQuery })}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-40 bg-[var(--background-primary)]/95 backdrop-blur-md border-b border-white/5 search-filters">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto flex-wrap">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              icon={<Search className="w-4 h-4" />}
              label={t('common:search.all')}
              count={results.length}
            />
            <FilterButton
              active={filter === "movie"}
              onClick={() => setFilter("movie")}
              icon={<Film className="w-4 h-4" />}
              label={t('common:search.movies')}
              count={groupedResults.movies.length}
            />
            <FilterButton
              active={filter === "tv"}
              onClick={() => setFilter("tv")}
              icon={<Tv className="w-4 h-4" />}
              label={t('common:search.tvShows')}
              count={groupedResults.tvShows.length}
            />
            <FilterButton
              active={filter === "person"}
              onClick={() => setFilter("person")}
              icon={<User className="w-4 h-4" />}
              label={t('common:search.people')}
              count={groupedResults.people.length}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {isLoading && debouncedQuery.length >= 2 ? (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
              <p className="text-white/50">{t('common:search.searching')}</p>
            </div>
            <SectionSkeleton variant="grid" cardCount={12} />
          </div>
        ) : error ? (
          <ReactQueryErrorState
            error={error}
            retry={() => window.location.reload()}
          />
        ) : debouncedQuery.length < 2 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/5 mb-8">
              <Search className="w-16 h-16 text-white/20" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-4">
              {t('common:search.startSearch')}
            </h2>
            <p className="text-white/40 text-lg max-w-md mx-auto">
              {t('common:search.startSearchDescription')}
            </p>

            {/* Search suggestions */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <SuggestionChip
                text={t('common:search.suggestions.actionMovies')}
                onClick={() => setInputValue("action")}
              />
              <SuggestionChip
                text={t('common:search.suggestions.popularTVShows')}
                onClick={() => setInputValue("popular")}
              />
              <SuggestionChip
                text={t('common:search.suggestions.comedy')}
                onClick={() => setInputValue("comedy")}
              />
              <SuggestionChip
                text={t('common:search.suggestions.animation')}
                onClick={() => setInputValue("animation")}
              />
            </div>
          </motion.div>
        ) : filteredResults.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/5 mb-8">
              <Film className="w-16 h-16 text-white/20" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-4">
              {t('common:search.noResults')}
            </h2>
            <p className="text-white/40 text-lg">
              {t('common:search.noResultsFor', { query: debouncedQuery })}
            </p>
            <p className="text-white/30 text-sm mt-4">
              {t('common:search.tryDifferentKeywords')}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {filter === "all" ? (
              <motion.div
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
                {/* Movies Section */}
                {groupedResults.movies.length > 0 && (
                  <section>
                    <SectionHeader
                      icon={<Film className="w-6 h-6" />}
                      title={t('common:search.movies')}
                      count={groupedResults.movies.length}
                      color="from-blue-500 to-cyan-500"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                      {groupedResults.movies.map(({ item }) => (
                        <Card
                          key={item.id}
                          movie={item as unknown as HeroMedia}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* TV Shows Section */}
                {groupedResults.tvShows.length > 0 && (
                  <section>
                    <SectionHeader
                      icon={<Tv className="w-6 h-6" />}
                      title={t('common:search.tvShows')}
                      count={groupedResults.tvShows.length}
                      color="from-purple-500 to-pink-500"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                      {groupedResults.tvShows.map(({ item }) => (
                        <Card
                          key={item.id}
                          movie={item as unknown as HeroMedia}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* People Section */}
                {groupedResults.people.length > 0 && (
                  <section>
                    <SectionHeader
                      icon={<User className="w-6 h-6" />}
                      title={t('common:search.people')}
                      count={groupedResults.people.length}
                      color="from-orange-500 to-red-500"
                    />
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 md:gap-5">
                      {groupedResults.people.map(({ item }) => (
                        <PersonCard
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          profilePath={item.profile_path || ""}
                          role={t('common:search.actor')}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="filtered"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5"
              >
                {filteredResults.map((result) => {
                  if (result.type === "person") {
                    const personResult = result as PersonSearchResultItem;
                    return (
                      <PersonCard
                        key={personResult.item.id}
                        id={personResult.item.id}
                        name={personResult.item.name}
                        profilePath={personResult.item.profile_path || ""}
                        role={t('common:search.actor')}
                      />
                    );
                  } else {
                    const mediaResult = result as
                      | MovieSearchResult
                      | TvShowSearchResult;
                    return (
                      <Card
                        key={(mediaResult.item as HeroMedia).id}
                        movie={mediaResult.item as unknown as HeroMedia}
                      />
                    );
                  }
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// Filter Button Component
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}

function FilterButton({
  active,
  onClick,
  icon,
  label,
  count,
}: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300
        ${
          active
            ? "bg-netflix-red text-white shadow-lg shadow-netflix-red/25"
            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {icon}
      <span>{label}</span>
      <span
        className={`
        px-2 py-0.5 rounded-full text-xs
        ${active ? "bg-white/20" : "bg-white/10"}
      `}
      >
        {count}
      </span>
    </motion.button>
  );
}

// Section Header Component
interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  color: string;
}

function SectionHeader({ icon, title, count, color }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-xl bg-gradient-to-br ${color}`}>{icon}</div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm font-medium">
        {count}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent ml-4" />
    </div>
  );
}

// Suggestion Chip Component
interface SuggestionChipProps {
  text: string;
  onClick: () => void;
}

function SuggestionChip({ text, onClick }: SuggestionChipProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-netflix-red/50 transition-all duration-200 text-sm font-medium"
    >
      {text}
    </motion.button>
  );
}
