import { j as e } from "./animation-vendor.v8GfB2uW.js";
import { r as i } from "./react-vendor.CdCUh6yn.js";
import { Card as s } from "./index.BmFO-ehj.js";
import { S as o } from "./slider.BDpQsuDG.js";
import "./page-details.flLJVcKW.js";
import "./ui-vendor.CehWLD9p.js";
import "./utils-vendor.pW3su-B-.js";
import "./data-vendor.DeZI3VHS.js";
import "./index.BiP4qT1I.js";
import "./page-home.PJ1mmOcw.js";
import "./hooks.C6YmLRyB.js";
import "./swiper-vendor.CuHYTmQV.js";
const r = i.memo(function ({ similar: r }) {
  const t = i.useMemo(
    () => r.filter((e) => null !== e.poster_path).slice(0, 15),
    [r],
  );
  return 0 === t.length
    ? null
    : e.jsx("section", {
        className: "bg-black py-4 md:py-12",
        children: e.jsxs("div", {
          className: "container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl",
          children: [
            e.jsx("h2", {
              className: "text-xl md:text-2xl font-bold text-white mb-4",
              children: "More Like This",
            }),
            e.jsx(o, {
              slidesPerView: 6,
              slidesPerViewMobile: 3,
              spaceBetween: 16,
              hideNavigation: !1,
              children: t.map((i) =>
                e.jsx(s, { movie: i, variant: "recommendation" }, i.id),
              ),
            }),
          ],
        }),
      });
});
export { r as default };
