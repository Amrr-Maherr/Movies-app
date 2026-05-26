"use client";
import { memo } from "react";
import { Card } from "@/components/shared/Card";

interface MoviePromoProps {
  movie: any;
  mediaType: "movie" | "tv";
  variant?: "left" | "right" | "center";
}

const MoviePromo = memo(function MoviePromo({
  movie,
  mediaType,
  variant = "left",
}: MoviePromoProps) {
  if (!movie) return null;

  return (
    <Card
      variant="promo"
      movie={movie}
      mediaType={mediaType}
      promoVariant={variant}
    />
  );
});

export default MoviePromo;
