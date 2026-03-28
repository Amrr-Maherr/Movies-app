import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieModal } from "@/contexts/MovieModalContext";
import type { HeroMedia } from "@/types";

/**
 * Encapsulates navigation, play, and modal actions for a card.
 */
export function useCardActions(detailsUrl: string, movie?: HeroMedia, onClick?: () => void) {
  const navigate = useNavigate();
  const { openModal } = useMovieModal();

  const handleNavigate = useCallback(() => {
    if (onClick) {
      onClick();
    } else if (detailsUrl) {
      navigate(detailsUrl);
    }
  }, [onClick, navigate, detailsUrl]);

  const handlePlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      handleNavigate();
    },
    [handleNavigate],
  );

  const handleMoreInfoClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (movie) openModal(movie);
    },
    [openModal, movie],
  );

  return { handleNavigate, handlePlayClick, handleMoreInfoClick };
}
