import { useQuery } from "@tanstack/react-query";
import { searchMovies, searchTvShows } from "@/services";
import type { Movie, TvShow } from "@/types/movies";

export interface SearchResult {
  item: Movie | TvShow;
  type: "movie" | "tv";
}

/**
 * Hook for searching movies and TV shows
 * Uses debouncing to avoid excessive API calls
 */
export function useSearch(query: string) {
  const {
    data: movies = [],
    isLoading: isMoviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["search", "movies", query],
    queryFn: () => searchMovies(query) as Promise<Movie[]>,
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data: tvShows = [],
    isLoading: isTvLoading,
    error: tvError,
  } = useQuery({
    queryKey: ["search", "tv", query],
    queryFn: () => searchTvShows(query) as Promise<TvShow[]>,
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Combine results with type information
  const results: SearchResult[] = [
    ...movies.map((item) => ({ item, type: "movie" as const })),
    ...tvShows.map((item) => ({ item, type: "tv" as const })),
  ];

  return {
    results,
    isLoading: isMoviesLoading || isTvLoading,
    error: moviesError || tvError,
  };
}
