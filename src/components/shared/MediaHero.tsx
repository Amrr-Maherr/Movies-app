import { useState, useMemo, useCallback } from 'react';
import { Play, Plus, Info } from 'lucide-react';
import type { MediaDetails, Video, Genre, CastMember, Keyword } from '@/types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

interface MediaHeroProps {
  media: MediaDetails;
  onPlayTrailer?: () => void;
  onAddToList?: () => void;
}

export default function MediaHero({ media, onPlayTrailer, onAddToList }: MediaHeroProps) {
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  // Get first YouTube trailer
  const trailerUrl = useMemo(() => {
    if (!media?.videos?.results) return null;
    const trailer = media.videos.results.find(
      (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? `${YOUTUBE_BASE_URL}${trailer.key}` : null;
  }, [media]);

  // Get first 3 cast members
  const topCast = useMemo(() => {
    if (!media?.credits?.cast) return [];
    return media.credits.cast.slice(0, 3);
  }, [media]);

  // Get release year (supports both movie and TV show)
  const releaseYear = useMemo(() => {
    const date = 'release_date' in media ? media.release_date : media.first_air_date;
    if (!date) return '';
    return new Date(date).getFullYear().toString();
  }, [media]);

  // Truncate overview to 150 characters
  const truncatedOverview = useMemo(() => {
    if (!media?.overview) return '';
    if (media.overview.length <= 150) return media.overview;
    return media.overview.slice(0, 150) + '...';
  }, [media]);

  // Format rating to one decimal place
  const formattedRating = useMemo(() => {
    if (!media?.vote_average) return 'N/A';
    return media.vote_average.toFixed(1);
  }, [media]);

  const handlePlayTrailer = useCallback(() => {
    if (onPlayTrailer) {
      onPlayTrailer();
    } else if (trailerUrl) {
      window.open(trailerUrl, '_blank');
    }
  }, [onPlayTrailer, trailerUrl]);

  const handleAddToList = useCallback(() => {
    if (onAddToList) {
      onAddToList();
    } else {
      setIsAddedToList((prev) => !prev);
    }
  }, [onAddToList]);

  const backdropUrl = media.backdrop_path
    ? `${IMAGE_BASE_URL}${media.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=No+Image';

  const posterUrl = media.poster_path
    ? `${POSTER_BASE_URL}${media.poster_path}`
    : null;

  // Get title (supports both movie.title and tv.name)
  const title = 'title' in media ? media.title : media.name;
console.log(media);

  return (
    <div className="relative w-full h-[85vh] min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--background-primary)] to-transparent" />

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-8 lg:px-16 flex items-end pb-20 md:pb-24">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end w-full">
          {/* Poster (Hidden on mobile, visible on tablet+) */}
          {posterUrl && (
            <div className="hidden md:block flex-shrink-0">
              <img
                src={posterUrl}
                alt={title}
                className="w-56 rounded-lg shadow-2xl border-2 border-white/20"
                loading="lazy"
              />
            </div>
          )}

          {/* Media Info */}
          <div className="flex-1 space-y-4 md:space-y-5">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight max-w-4xl">
              {title}
            </h1>

            {/* Meta Row - Release Year, Rating, Genres */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Release Year */}
              {releaseYear && (
                <span className="text-[var(--text-secondary)] text-base font-medium">
                  {releaseYear}
                </span>
              )}

              {/* Rating Badge */}
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-5 h-5 text-[var(--netflix-red)] fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-white font-semibold">{formattedRating}</span>
              </div>

              {/* Separator */}
              <span className="text-[var(--text-muted)]">•</span>

              {/* Genres */}
              {media.genres && media.genres.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {media.genres.slice(0, 4).map((genre: Genre) => (
                    <span
                      key={genre.id}
                      className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-default"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <p className="text-[var(--text-primary)] text-base md:text-lg leading-relaxed max-w-3xl">
              {truncatedOverview || 'No description available.'}
            </p>

            {/* Cast (Optional) */}
            {topCast.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[var(--text-muted)] text-sm">Starring:</span>
                {topCast.map((actor: CastMember) => (
                  <span
                    key={actor.id}
                    className="text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors cursor-default"
                  >
                    {actor.name}
                  </span>
                ))}
              </div>
            )}

            {/* Keywords/Tags (Optional) */}
            {media.keywords && 'keywords' in media.keywords && media.keywords.keywords && media.keywords.keywords.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2">
                {media.keywords.keywords.slice(0, 5).map((keyword: Keyword) => (
                  <span
                    key={keyword.id}
                    className="text-[var(--text-muted)] text-xs bg-[var(--background-secondary)] px-2 py-1 rounded hover:bg-[var(--background-tertiary)] transition-colors cursor-default"
                  >
                    #{keyword.name.replace(/\s/g, '')}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 flex-wrap">
              {/* Play Trailer Button */}
              <button
                onClick={handlePlayTrailer}
                className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-3.5 rounded font-bold text-sm md:text-base hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <Play className="w-5 h-5 fill-black" />
                Play Trailer
              </button>

              {/* Add to List Button */}
              <button
                onClick={handleAddToList}
                className={`flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded font-bold text-sm md:text-base transition-all transform hover:scale-105 active:scale-95 border-2 ${
                  isAddedToList
                    ? 'bg-[var(--netflix-red)] border-[var(--netflix-red)] text-white hover:bg-[var(--netflix-red-hover)]'
                    : 'bg-[var(--background-secondary)]/80 backdrop-blur-sm border-white/40 text-white hover:bg-white/20'
                }`}
              >
                <Plus className="w-5 h-5" />
                {isAddedToList ? 'Added to List' : 'Add to List'}
              </button>

              {/* More Info Button */}
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2 bg-[var(--background-secondary)]/50 backdrop-blur-sm text-white px-4 md:px-6 py-3 md:py-3.5 rounded font-bold text-sm md:text-base hover:bg-[var(--background-secondary)]/70 transition-all transform hover:scale-105 active:scale-95 border-2 border-white/20"
              >
                <Info className="w-5 h-5" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video mx-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-[var(--netflix-red)] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={trailerUrl.replace('watch?v=', 'embed/')}
              title="Media Trailer"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
