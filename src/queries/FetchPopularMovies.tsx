import { GetPopularMovies } from '@/api/PopularMovies'
import {
  useQuery,
} from '@tanstack/react-query'
export default function FetchPopularMovies() {
     const { data, error,refetch,isLoading } = useQuery({
    queryKey: ['PopularMovies'],
    queryFn: GetPopularMovies,
  })
  return { data, error, refetch, isLoading };
}
