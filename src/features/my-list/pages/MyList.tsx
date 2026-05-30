import { memo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectList, removeFromList } from "@/features/my-list/store/listSlice";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildMediaUrl } from "@/utils/url";
import { getTitle } from "@/utils";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import Card from "@/components/shared/Card/Card";
import { useOnboarding } from "@/features/onboarding/providers/OnboardingProvider";

const MyList = memo(function MyList() {
  const { startTour } = useOnboarding();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myList = useAppSelector(selectList);
  const currentLang = i18n.language || 'en';

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
    navigate(`/${currentLang}${buildMediaUrl(mediaType, title, itemId)}`);
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

  useEffect(() => {
    if (myList.length > 0) {
      const timer = setTimeout(() => {
        startTour("my-list");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [myList.length, startTour]);

  if (myList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]">
        <HelmetMeta
          name={t("myList.title")}
          description={t("myList.title")}
        />
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">{t("myList.title")}</h1>
          <p className="text-lg text-gray-400 mb-6">
            {t("myList.empty")}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            {t("common.getStarted")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] my-list-container">
      <HelmetMeta
        name={t("myList.title")}
        description={t("myList.title")}
      />

      <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t("myList.title")}</h1>
        <p className="text-gray-400 mb-8">
          {myList.length} {t("myList.title")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <OptimizedSectionWrapper
            data={myList.length > 0 ? myList : null}
            isLoading={false}
            fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            height={500}
            title="My List"
          >
            {(listData) => (
              <>
                {listData.map((item) => {
                  const mediaType = getMediaType(item);
                  const title = getTitle(item);

                  return (
                    <div key={item.id} className="relative group">
                      <Card movie={item} />

                      {/* Remove button overlay */}
                      <button
                        onClick={(e) => handleRemove(e, item.id)}
                        className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                        title={t("myList.removeFrom")}
                      >
                        <X className="h-4 w-4" />
                      </button>

                      {/* Quick play button overlay */}
                      <button
                        onClick={(e) => handlePlay(e, mediaType, item.id, title)}
                        className="absolute bottom-20 right-2 bg-white/90 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        title={t("buttons.play")}
                      >
                        <Play className="h-4 w-4 fill-black" />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </OptimizedSectionWrapper>
        </div>
      </div>
    </div>
  );
});

export default MyList;
