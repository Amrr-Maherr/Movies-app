import { memo, lazy, Suspense, useMemo } from "react";
import type { HeroMedia } from "@/types";
import Card from "@/components/shared/Card/Card";

const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface MediaRowProps {
  title: string;
  items: HeroMedia[];
}

const MediaRow = memo(function MediaRow({ title, items }: MediaRowProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-5">
          {title}
        </h2>

        <Suspense
          fallback={
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[160px] md:w-[200px] aspect-[2/3] rounded-md bg-zinc-800 skeleton shrink-0"
                />
              ))}
            </div>
          }
        >
          <Slider
            slidesPerView={6}
            slidesPerViewMobile={2.5}
            spaceBetween={8}
            hideNavigation={false}
          >
            {items.map((item) => (
              <Card key={item.id} movie={item} />
            ))}
          </Slider>
        </Suspense>
      </div>
    </section>
  );
});

export default MediaRow;
