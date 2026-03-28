import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToList, removeFromList, selectIsInList } from "@/store/ListReucer";
import type { HeroMedia } from "@/types";

/**
 * Encapsulates all watchlist (My List) add/remove logic.
 */
export function useWatchlist(movie?: HeroMedia) {
  const dispatch = useAppDispatch();

  const isInList = useAppSelector((state) =>
    movie ? selectIsInList(state, movie.id) : false,
  );

  const toggleWatchlist = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!movie) return;
      if (isInList) {
        dispatch(removeFromList(movie.id));
      } else {
        dispatch(addToList(movie));
      }
    },
    [dispatch, movie, isInList],
  );

  return { isInList, toggleWatchlist };
}
