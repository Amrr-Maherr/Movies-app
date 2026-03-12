import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { HeroMedia } from "@/types";

interface MovieModalContextType {
  selectedMovie: HeroMedia | null;
  isOpen: boolean;
  openModal: (movie: HeroMedia) => void;
  closeModal: () => void;
}

const MovieModalContext = createContext<MovieModalContextType | undefined>(undefined);

export function MovieModalProvider({ children }: { children: ReactNode }) {
  const [selectedMovie, setSelectedMovie] = useState<HeroMedia | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((movie: HeroMedia) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedMovie(null);
  }, []);

  return (
    <MovieModalContext.Provider value={{ selectedMovie, isOpen, openModal, closeModal }}>
      {children}
    </MovieModalContext.Provider>
  );
}

export function useMovieModal() {
  const context = useContext(MovieModalContext);
  if (context === undefined) {
    throw new Error("useMovieModal must be used within a MovieModalProvider");
  }
  return context;
}
