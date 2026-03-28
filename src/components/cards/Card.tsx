import { memo } from "react";
import type { CardProps } from "./types";
import {
  StandardCard,
  CompactCard,
  Top10Card,
  NewReleaseCard,
  AwardWinnerCard,
  RecommendationCard,
  EpisodeCard,
  PersonCard,
  ReviewCard,
  SeasonCard,
  TrailerCard,
  PromoCard,
  ContinueWatchingCard,
  ShowcaseCard,
  HorizontalCard,
  LandscapeCard,
} from "./variants";

/**
 * Card — pure dispatcher.
 * Selects the correct variant component based on the `variant` prop.
 * No business logic lives here.
 */
const Card = memo((props: CardProps) => {
  const { variant = "standard" } = props;

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
          isHot={props.isHot}
          matchPercentageProp={props.matchPercentageProp}
        />
      );

    case "standard":
    default:
      return (
        <StandardCard
          movie={props.movie}
          rank={props.rank}
          onClick={props.onClick}
          showBadge={props.showBadge}
          badgeType={props.badgeType}
          matchPercentageProp={props.matchPercentageProp}
        />
      );
  }
});

Card.displayName = "Card";
export default Card;
