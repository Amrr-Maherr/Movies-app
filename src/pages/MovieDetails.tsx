import FetchMovieDetails from '@/queries/FetchMovieDetails';
import { useParams } from 'react-router-dom';
import MovieHero from '@/components/sections/MovieHero';
import { Loader } from '@/components/ui/loader';
import { Error } from '@/components/ui/error';
import type { MovieDetails } from '@/types';

export default function MovieDetails() {
  const { id } = useParams();
  const { isLoading, data, error, refetch } = FetchMovieDetails(Number(id));

  if (isLoading) {
    return <Loader fullscreen size="lg" />;
  }

  if (error || !data) {
    return (
      <Error
        fullscreen
        title="Failed to load movie details"
        message="We couldn't load the movie information. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--background-primary)]">
      {/* Netflix-style Hero Section */}
      <MovieHero movie={data} />
    </div>
  );
}
