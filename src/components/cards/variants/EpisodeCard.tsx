import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { EpisodeLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useEpisodeDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type EpisodeCardProps = Pick<CardProps, "episode" | "tvShowId" | "seasonNumber" | "onClick">;

const EpisodeCard = memo(({ episode, tvShowId, seasonNumber, onClick }: EpisodeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { imageUrl, link, airDate, runtime } = useEpisodeDerivedValues(episode, tvShowId, seasonNumber);

  if (!episode) return null;

  return (
    <LazyWrapper height={250}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <Link
          to={link}
          className="block group"
          onClick={onClick ? () => onClick() : undefined}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <EpisodeLayout
            episode={episode}
            title={episode.name}
            imageUrl={imageUrl}
            formattedRuntime={runtime}
            formattedAirDate={airDate}
            isHovered={isHovered}
          />
        </Link>
      </motion.div>
    </LazyWrapper>
  );
});

EpisodeCard.displayName = "EpisodeCard";
export default EpisodeCard;
