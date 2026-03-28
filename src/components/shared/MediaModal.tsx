import { memo, useMemo } from "react";
import { X, Play, Plus, Check, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog as DialogPrimitive } from "radix-ui";
import { getMatchScore, getYear, getAgeRating, getGenres } from "@/utils/movieHelpers";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToList, removeFromList, selectIsInList } from "@/store/ListReucer";

interface MediaModalProps {
  movie: HeroMedia | null;
  isOpen: boolean;
  onClose: () => void;
}

const getBackdropUrl = (p: string | null) =>
  p ? `https://image.tmdb.org/t/p/w1280${p}` : "";

const getPosterUrl = (p: string | null) =>
  p ? `https://image.tmdb.org/t/p/w342${p}` : "";

const MediaModal = memo(function MovieModal({ movie, isOpen, onClose }: MediaModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const matchScore = useMemo(() => (movie ? getMatchScore(movie.vote_average) : 0), [movie]);
  const year = useMemo(
    () => (movie ? getYear("release_date" in movie ? movie.release_date : movie.first_air_date) : ""),
    [movie],
  );
  const ageRating = useMemo(() => (movie ? getAgeRating(movie.vote_average) : ""), [movie]);
  const title = useMemo(() => (movie ? ("title" in movie ? movie.title : movie.name) : ""), [movie]);
  const genres = useMemo(() => (movie ? getGenres(movie.genre_ids) : []), [movie]);

  const isTvShow = movie ? "first_air_date" in movie : false;
  const detailsUrl = movie
    ? `/${isTvShow ? "tv" : "movie"}/${formatSlugWithId(generateSlug(title), movie.id)}`
    : "#";

  const isInList = useAppSelector((state) => (movie ? selectIsInList(state, movie.id) : false));

  const handlePlay = () => {
    if (detailsUrl !== "#") { navigate(detailsUrl); onClose(); }
  };

  const handleList = () => {
    if (!movie) return;
    isInList ? dispatch(removeFromList(movie.id)) : dispatch(addToList(movie));
  };

  if (!movie || !isOpen) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Modal */}
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-[850px] max-h-[90vh] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          style={{ width: "min(850px, 95vw)" }}
        >
          <div className="relative bg-[#181818] rounded-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]">

            {/* ── Hero backdrop ── */}
            <div className="relative w-full aspect-video flex-shrink-0">
              <OptimizedImage
                src={getBackdropUrl(movie.backdrop_path)}
                alt={title}
                className="w-full h-full"
                objectFit="cover"
                priority
              />
              {/* bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />

              {/* title over backdrop */}
              <div className="absolute bottom-0 left-0 right-0 px-10 pb-6">
                <h2 className="text-white font-black drop-shadow-lg"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", lineHeight: 1.1 }}>
                  {title}
                </h2>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#181818] hover:bg-[#2a2a2a] border border-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="overflow-y-auto flex-1 px-10 pb-10 pt-4">

              {/* Action row + meta */}
              <div className="flex items-start gap-4 mb-5">
                {/* Left: buttons */}
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  {/* Play */}
                  <button
                    onClick={handlePlay}
                    className="flex items-center gap-2 bg-white text-black font-bold text-sm px-6 py-2 rounded hover:bg-white/85 transition-colors"
                  >
                    <Play className="w-5 h-5 fill-black" />
                    Play
                  </button>

                  {/* My List */}
                  <button
                    onClick={handleList}
                    title={isInList ? "Remove from My List" : "Add to My List"}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/50 hover:border-white text-white transition-colors bg-transparent"
                  >
                    {isInList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>


                </div>

                {/* Right: more info */}
                <button
                  onClick={handlePlay}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/50 hover:border-white text-white transition-colors bg-transparent flex-shrink-0"
                  title="More Info"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Two-column: meta + overview */}
              <div className="flex gap-8">
                {/* Left col — overview */}
                <div className="flex-1 min-w-0">
                  {/* Match / year / rating / HD */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="text-[#46d369] font-semibold text-sm">{matchScore}% Match</span>
                    <span className="text-white/70 text-sm">{year}</span>
                    <span className="border border-white/40 text-white/70 text-[11px] px-1.5 py-0.5 rounded-sm">
                      {ageRating}
                    </span>
                    <span className="border border-white/40 text-white/70 text-[11px] px-1.5 py-0.5 rounded-sm">
                      HD
                    </span>
                  </div>

                  <p className="text-white/90 text-sm leading-relaxed line-clamp-4">
                    {movie.overview || "No description available."}
                  </p>
                </div>

                {/* Right col — cast / genres */}
                <div className="w-44 flex-shrink-0 text-sm space-y-2">
                  {genres.length > 0 && (
                    <p className="text-white/90 leading-snug">
                      <span className="text-white/40">Genres: </span>
                      {genres.slice(0, 3).join(", ")}
                    </p>
                  )}
                  {movie.vote_average > 0 && (
                    <p className="text-white/90">
                      <span className="text-white/40">Rating: </span>
                      {movie.vote_average.toFixed(1)} / 10
                    </p>
                  )}
                  {isTvShow ? (
                    <p className="text-white/90">
                      <span className="text-white/40">Type: </span>TV Series
                    </p>
                  ) : (
                    <p className="text-white/90">
                      <span className="text-white/40">Type: </span>Movie
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

export default MediaModal;
