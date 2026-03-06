import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import MediaHero from "@/components/shared/MediaHero";
import MediaInfoSection from "@/components/sections/MediaInfoSection";
import TrailersSection from "@/components/sections/TrailersSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import KeywordsSection from "@/components/sections/KeywordsSection";
import WatchProvidersSection from "@/components/sections/WatchProvidersSection";
import EpisodesSection from "@/components/sections/EpisodesSection";
import MoreLikeThisSection from "@/components/sections/MoreLikeThisSection";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { extractKeywords, extractWatchProviders } from "@/utils";
import type { Video } from "@/types";

export default function TVShowDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data, error, refetch } = FetchTvShowDetails(Number(id));

  if (isLoading) {
    return <Loader fullscreen size="lg" />;
  }

  if (error || !data) {
    return (
      <Error
        fullscreen
        title="Failed to load TV show details"
        message="We couldn't load the TV show information. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  // Extract and prepare data for child components
  const trailers: Video[] = data.videos?.results?.filter(
    (video: Video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser" || video.type === "Clip")
  ) || [];

  const reviews = data.reviews?.results?.filter(
    (review: { author: string; content: string }) =>
      review.author && review.content?.trim()
  ) || [];

  const keywords = extractKeywords(data.keywords);
  const watchProviders = extractWatchProviders(data);
  const similar = data.similar?.results || [];
  const seasons = data.seasons || [];

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section - Backdrop, Poster, Title, Meta info */}
      <MediaHero media={data} />

      {/* Media Info Section - Overview, Tagline, Cast, Metadata */}
      <MediaInfoSection media={data} />

      {/* Episodes/Seasons Section - TV Show specific */}
      {seasons.length > 0 && (
        <EpisodesSection seasons={seasons} tvShowId={data.id} />
      )}

      {/* Trailers Section - YouTube trailers */}
      {trailers.length > 0 && (
        <TrailersSection videos={trailers} />
      )}

      {/* Reviews Section - User reviews */}
      {reviews.length > 0 && (
        <ReviewsSection reviews={reviews} />
      )}

      {/* Keywords Section - Tags/Topics */}
      {keywords.length > 0 && (
        <section className="bg-black py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Tags
            </h3>
            <KeywordsSection keywords={keywords} />
          </div>
        </section>
      )}

      {/* Watch Providers Section - Streaming platforms */}
      {watchProviders.length > 0 && (
        <WatchProvidersSection providers={watchProviders} />
      )}

      {/* More Like This Section - Similar TV shows */}
      {similar.length > 0 && (
        <MoreLikeThisSection similar={similar} />
      )}
    </motion.div>
  );
}
