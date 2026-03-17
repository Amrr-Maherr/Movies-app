import { useParams, Link } from "react-router-dom";
import { memo, useMemo } from "react";
import { useCollectionDetails } from "@/queries";
import { SectionSkeleton, Error, OptimizedImage } from "@/components/ui";
import MediaSection from "@/components/shared/MediaSection";
import { Film, Calendar, Star } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Collection = memo(function Collection() {
  const { id } = useParams<{ id: string }>();
  const collectionId = id ? parseInt(id, 10) : 0;

  const {
    data: collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useCollectionDetails(collectionId);

  const backdropUrl = useMemo(
    () =>
      collection?.backdrop_path
        ? `${IMAGE_BASE_URL}${collection.backdrop_path}`
        : null,
    [collection?.backdrop_path]
  );

  const posterUrl = useMemo(
    () =>
      collection?.poster_path
        ? `${POSTER_BASE_URL}${collection.poster_path}`
        : null,
    [collection?.poster_path]
  );

  const totalMovies = useMemo(
    () => collection?.parts?.length || 0,
    [collection?.parts]
  );

  const averageRating = useMemo(() => {
    if (!collection?.parts || collection.parts.length === 0) return 0;
    const sum = collection.parts.reduce((acc, movie) => acc + movie.vote_average, 0);
    return (sum / collection.parts.length).toFixed(1);
  }, [collection?.parts]);

  if (collectionLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (collectionError || !collection) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Collection not found"
          retryButtonText="Go Back"
          onRetry={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        {backdropUrl ? (
          <OptimizedImage
            src={backdropUrl}
            alt={collection.name}
            className="w-full h-full"
            objectFit="cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/80 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-end">
              {/* Poster */}
              {posterUrl ? (
                <div className="hidden md:block w-48 lg:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={posterUrl}
                    alt={collection.name}
                    className="w-full h-full"
                    objectFit="cover"
                  />
                </div>
              ) : null}

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                  {collection.name}
                </h1>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base">
                  <div className="flex items-center gap-2 text-[var(--success)]">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">{averageRating} Average</span>
                  </div>

                  <div className="flex items-center gap-2 text-white">
                    <Film className="w-5 h-5" />
                    <span>{totalMovies} Movies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {collection.overview && (
        <div className="border-y border-[#222] bg-black/40">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-6 md:py-8">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
              About the Collection
            </h2>
            <p className="text-sm md:text-base text-[#b3b3b3] leading-relaxed">
              {collection.overview}
            </p>
          </div>
        </div>
      )}

      {/* Movies Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          All Movies in Collection
        </h2>

        {collection.parts && collection.parts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {collection.parts.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  {movie.poster_path ? (
                    <OptimizedImage
                      src={`${POSTER_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#333]">
                      <Film className="w-12 h-12 text-[#555]" />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium px-2 text-center">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="mt-2 md:mt-3">
                  <h3 className="text-xs md:text-sm text-white font-medium line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[#737373] text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "TBA"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-[var(--success)]" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#737373]">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No movies in this collection</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default Collection;
