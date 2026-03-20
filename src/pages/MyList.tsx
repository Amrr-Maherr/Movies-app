import { memo, lazy, Suspense } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectList, removeFromList } from "@/store/ListReucer";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";
import { getTitle } from "@/utils";

const Card = lazy(() => import("@/components/shared/Card/Card"));

const MyList = memo(function MyList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myList = useAppSelector(selectList);

  const handleRemove = (e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeFromList(itemId));
  };

  const handlePlay = (
    e: React.MouseEvent,
    mediaType: string,
    itemId: number,
    title: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const slug = generateSlug(title);
    const slugWithId = formatSlugWithId(slug, itemId);
    navigate(`/${mediaType}/${slugWithId}`);
  };

  const isTvShow = (item: (typeof myList)[0]): boolean => {
    if ("media_type" in item && item.media_type) {
      return item.media_type === "tv";
    }
    return "first_air_date" in item;
  };

  const getMediaType = (item: (typeof myList)[0]): string => {
    return isTvShow(item) ? "tv" : "movie";
  };

  if (myList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]">
        <HelmetMeta
          name="My List"
          description="Your personal list of saved movies and TV shows on Netflix."
        />
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">My List</h1>
          <p className="text-lg text-gray-400 mb-6">
            Your list is empty. Start adding movies and TV shows to watch later!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            Browse Content
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name="My List"
        description="Your personal list of saved movies and TV shows on Netflix."
      />

      <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">My List</h1>
        <p className="text-gray-400 mb-8">
          {myList.length} title{myList.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <Suspense
            fallback={<SectionSkeleton variant="grid" cardCount={12} />}
          >
            <LazyWrapper height={500}>
              {myList.map((item) => {
                const mediaType = getMediaType(item);
                const title = getTitle(item);

                return (
                  <div key={item.id} className="relative group">
                    <Card movie={item} variant="standard" />

                    {/* Remove button overlay */}
                    <button
                      onClick={(e) => handleRemove(e, item.id)}
                      className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                      title="Remove from My List"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Quick play button overlay */}
                    <button
                      onClick={(e) => handlePlay(e, mediaType, item.id, title)}
                      className="absolute bottom-20 right-2 bg-white/90 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      title="Play"
                    >
                      <Play className="h-4 w-4 fill-black" />
                    </button>
                  </div>
                );
              })}
            </LazyWrapper>
          </Suspense>
        </div>
      </div>
    </div>
  );
});

export default MyList;
