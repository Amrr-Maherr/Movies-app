import { useQuery } from "@tanstack/react-query";
import { getMovieGenres, getTvGenres, discoverMoviesByGenre, discoverTvShowsByGenre, type Genre, type DiscoverResponse } from "@/services";

/**
 * Hook for fetching movie genres
 * @returns Movie genres data and query state
 * 
 * @example
 * const { data, isLoading, error } = useMovieGenres();
 */
export function useMovieGenres() {
  return useQuery<Genre[] | null>({
    queryKey: ["genres", "movie"],
    queryFn: () => getMovieGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - genres don't change often
    retry: 2,
  });
}

/**
 * Hook for fetching TV show genres
 * @returns TV show genres data and query state
 * 
 * @example
 * const { data, isLoading, error } = useTvGenres();
 */
export function useTvGenres() {
  return useQuery<Genre[] | null>({
    queryKey: ["genres", "tv"],
    queryFn: () => getTvGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 2,
  });
}

/**
 * Hook for discovering movies by genre
 * @param genreId - Genre ID to filter by
 * @param page - Page number (default: 1)
 * @returns Movies data and query state
 * 
 * @example
 * const { data, isLoading } = useMoviesByGenre(28); // Action movies
 */
export function useMoviesByGenre(genreId: number, page: number = 1) {
  return useQuery<DiscoverResponse | null>({
    queryKey: ["discover", "movies", genreId, page],
    queryFn: () => discoverMoviesByGenre(genreId, { page }),
    enabled: !!genreId,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
  });
}

/**
 * Hook for discovering TV shows by genre
 * @param genreId - Genre ID to filter by
 * @param page - Page number (default: 1)
 * @returns TV shows data and query state
 * 
 * @example
 * const { data, isLoading } = useTvShowsByGenre(10759); // Action & Adventure TV
 */
export function useTvShowsByGenre(genreId: number, page: number = 1) {
  return useQuery<DiscoverResponse | null>({
    queryKey: ["discover", "tv", genreId, page],
    queryFn: () => discoverTvShowsByGenre(genreId, { page }),
    enabled: !!genreId,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
  });
}

export default useMovieGenres;
