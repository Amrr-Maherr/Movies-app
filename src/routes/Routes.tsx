import { lazy, Suspense, memo, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/shared/PageTransition";
import { Loader } from "@/components/ui";
import "@/index.css";

// ScrollToTop component - scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Lazy-loaded page components
const MovieDetails = lazy(() => import("@/pages/MovieDetails"));
const TVShowDetailsPage = lazy(() => import("@/pages/TVShowDetails"));
const PersonDetailsPage = lazy(() => import("@/pages/PersonDetails"));
const EpisodeDetailsPage = lazy(() => import("@/pages/EpisodeDetailsPage"));
const SeasonDetailsPage = lazy(() => import("@/pages/SeasonDetailsPage"));

// Main pages
const Home = lazy(() => import("../pages/Home"));
const Actor = lazy(() => import("@/pages/Actor"));
const Movie = lazy(() => import("@/pages/Movie"));
const TVShow = lazy(() => import("@/pages/TVShow"));
const Session = lazy(() => import("@/pages/Session"));
const Kids = lazy(() => import("@/pages/Kids"));
const NewPopular = lazy(() => import("@/pages/NewPopular"));
const MyList = lazy(() => import("@/pages/MyList"));
const BrowseByLanguages = lazy(() => import("@/pages/BrowseByLanguages"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Auth pages
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));

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

// Memoized loading fallback to prevent re-renders on every render
const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
      <Loader />
    </div>
  );
});

// Memoized AppRoutes component - avoids re-renders when parent updates
const AppRoutes = memo(function AppRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Main routes */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/tv-shows" element={<PageTransition><TVShow /></PageTransition>} />
          <Route path="/movies" element={<PageTransition><Movie /></PageTransition>} />
          <Route path="/kids" element={<PageTransition><Kids /></PageTransition>} />
          <Route path="/new-popular" element={<PageTransition><NewPopular /></PageTransition>} />
          <Route path="/my-list" element={<PageTransition><MyList /></PageTransition>} />
          <Route path="/browse/languages" element={<PageTransition><BrowseByLanguages /></PageTransition>} />
          <Route path="/actors" element={<PageTransition><Actor /></PageTransition>} />
          <Route path="/actor/:slugWithId" element={<PageTransition><PersonDetailsPage /></PageTransition>} />
          <Route path="/session" element={<PageTransition><Session /></PageTransition>} />

          {/* Auth routes */}
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />

          {/* Details routes */}
          <Route path="/movie/:slugWithId" element={<PageTransition><MovieDetails /></PageTransition>} />
          <Route path="/tv/:slugWithId" element={<PageTransition><TVShowDetailsPage /></PageTransition>} />
          <Route path="/tv/:tvId/season/:seasonNumber" element={<PageTransition><SeasonDetailsPage /></PageTransition>} />
          <Route
            path="/tv/:tvId/season/:seasonNumber/episode/:episodeNumber"
            element={<PageTransition><EpisodeDetailsPage /></PageTransition>}
          />
          <Route path="/person/:slugWithId" element={<PageTransition><PersonDetailsPage /></PageTransition>} />

          {/* Footer routes */}
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/help-center" element={<PageTransition><HelpCenter /></PageTransition>} />
          <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
          <Route path="/media-center" element={<PageTransition><MediaCenter /></PageTransition>} />
          <Route path="/investor-relations" element={<PageTransition><InvestorRelations /></PageTransition>} />
          <Route path="/jobs" element={<PageTransition><Jobs /></PageTransition>} />
          <Route path="/ways-to-watch" element={<PageTransition><WaysToWatch /></PageTransition>} />
          <Route path="/terms-of-use" element={<PageTransition><TermsOfUse /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="/cookie-preferences" element={<PageTransition><CookiePreferences /></PageTransition>} />
          <Route path="/corporate-information" element={<PageTransition><CorporateInformation /></PageTransition>} />
          <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
          <Route path="/speed-test" element={<PageTransition><SpeedTest /></PageTransition>} />
          <Route path="/legal-notices" element={<PageTransition><LegalNotices /></PageTransition>} />
          <Route path="/only-on-netflix" element={<PageTransition><OnlyOnNetflix /></PageTransition>} />

          {/* 404 route */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
});

export default AppRoutes;
