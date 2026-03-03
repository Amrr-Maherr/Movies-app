import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/ui";

// Main pages
const Home = lazy(() => import("../pages/Home"));
const Actor = lazy(() => import("@/pages/Actor"));
const Movie = lazy(() => import("@/pages/Movie"));
const TVShow = lazy(() => import("@/pages/TVShow"));
const Session = lazy(() => import("@/pages/Session"));
const Kids = lazy(() => import("@/pages/Kids"));
const NewPopular = lazy(() => import("@/pages/NewPopular"));
const MyList = lazy(() => import("@/pages/MyList"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Footer pages
const FAQ = lazy(() => import("@/pages/FAQ"));
const HelpCenter = lazy(() => import("@/pages/HelpCenter"));
const Account = lazy(() => import("@/pages/Account"));
const MediaCenter = lazy(() => import("@/pages/MediaCenter"));
const InvestorRelations = lazy(() => import("@/pages/InvestorRelations"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const WaysToWatch = lazy(() => import("@/pages/WaysToWatch"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const CookiePreferences = lazy(() => import("@/pages/CookiePreferences"));
const CorporateInformation = lazy(() => import("@/pages/CorporateInformation"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const SpeedTest = lazy(() => import("@/pages/SpeedTest"));
const LegalNotices = lazy(() => import("@/pages/LegalNotices"));
const OnlyOnNetflix = lazy(() => import("@/pages/OnlyOnNetflix"));


export default function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<TVShow />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/new-popular" element={<NewPopular />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/actor" element={<Actor />} />
          <Route path="/session" element={<Session />} />

          {/* Footer pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/account" element={<Account />} />
          <Route path="/media-center" element={<MediaCenter />} />
          <Route path="/investor-relations" element={<InvestorRelations />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/ways-to-watch" element={<WaysToWatch />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-preferences" element={<CookiePreferences />} />
          <Route
            path="/corporate-information"
            element={<CorporateInformation />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/speed-test" element={<SpeedTest />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          <Route path="/only-on-netflix" element={<OnlyOnNetflix />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
