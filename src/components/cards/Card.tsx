import { memo, lazy, Suspense } from "react";
import type { CardProps } from "./types";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";

// Lazy load card variants to reduce initial bundle size and bundle each variant separately
const StandardCard = lazy(() => import("./variants/StandardCard"));
const CompactCard = lazy(() => import("./variants/CompactCard"));
const Top10Card = lazy(() => import("./variants/Top10Card"));
const NewReleaseCard = lazy(() => import("./variants/NewReleaseCard"));
const AwardWinnerCard = lazy(() => import("./variants/AwardWinnerCard"));
const RecommendationCard = lazy(() => import("./variants/RecommendationCard"));
const EpisodeCard = lazy(() => import("./variants/EpisodeCard"));
const PersonCard = lazy(() => import("./variants/PersonCard"));
const ReviewCard = lazy(() => import("./variants/ReviewCard"));
const SeasonCard = lazy(() => import("./variants/SeasonCard"));
const TrailerCard = lazy(() => import("./variants/TrailerCard"));
const PromoCard = lazy(() => import("./variants/PromoCard"));
const ContinueWatchingCard = lazy(() => import("./variants/ContinueWatchingCard"));
const ShowcaseCard = lazy(() => import("./variants/ShowcaseCard"));
const HorizontalCard = lazy(() => import("./variants/HorizontalCard"));
const LandscapeCard = lazy(() => import("./variants/LandscapeCard"));

/**
 * Card — pure dispatcher.
 * Selects the correct variant component based on the `variant` prop.
 * No business logic lives here.
 * Uses lazy loading for all variants to optimize bundle size.
 */
const Card = memo((props: CardProps) => {
  const { variant = "standard" } = props;

  const renderVariant = () => {
    switch (variant) {
      case "compact":
        return <CompactCard movie={props.movie} onClick={props.onClick} matchPercentageProp={props.matchPercentageProp} />;

      case "top10":
        return <Top10Card movie={props.movie} rank={props.rank} />;

      case "newRelease":
        return <NewReleaseCard movie={props.movie} matchPercentageProp={props.matchPercentageProp} />;

      case "awardWinner":
        return <AwardWinnerCard movie={props.movie} matchPercentageProp={props.matchPercentageProp} />;

      case "recommendation":
        return <RecommendationCard movie={props.movie} matchPercentageProp={props.matchPercentageProp} />;

      case "episode":
        return (
          <EpisodeCard
            episode={props.episode}
            tvShowId={props.tvShowId}
            seasonNumber={props.seasonNumber}
            onClick={props.onClick}
          />
        );

      case "person":
        return <PersonCard person={props.person} />;

      case "review":
        return <ReviewCard review={props.review} />;

      case "season":
        return <SeasonCard season={props.season} tvShowId={props.tvShowId} />;

      case "trailer":
        return <TrailerCard trailer={props.trailer} onClick={props.onClick} />;

      case "promo":
        return (
          <PromoCard
            movie={props.movie}
            promoVariant={props.promoVariant}
            mediaType={props.mediaType}
            matchPercentageProp={props.matchPercentageProp}
          />
        );

      case "continueWatching":
        return <ContinueWatchingCard movie={props.movie} progress={props.progress} />;

      case "showcase":
        return (
          <ShowcaseCard
            movie={props.movie}
            mediaType={props.mediaType}
            isNew={props.isNew}
            isFeatured={props.isFeatured}
            aspectRatio={props.aspectRatio}
            matchPercentageProp={props.matchPercentageProp}
          />
        );

      case "horizontal":
        return (
          <HorizontalCard
            movie={props.movie}
            mediaType={props.mediaType}
            isOriginal={props.isOriginal}
            plainLayout={props.plainLayout}
            matchPercentageProp={props.matchPercentageProp}
          />
        );

      case "landscape":
        return (
          <LandscapeCard
            movie={props.movie}
            mediaType={props.mediaType}
            matchPercentageProp={props.matchPercentageProp}
          />
        );

      default:
        return <StandardCard movie={props.movie} onClick={props.onClick} matchPercentageProp={props.matchPercentageProp} />;
    }
  };

  return (
    <Suspense fallback={<SectionSkeleton variant="grid" cardCount={1} />}>
      <LazyWrapper height={variant === "landscape" || variant === "horizontal" ? 180 : 250}>
        {renderVariant()}
      </LazyWrapper>
    </Suspense>
  );
});

Card.displayName = "Card";
export default Card;
