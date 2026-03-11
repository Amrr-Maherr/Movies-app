import { lazy, Suspense, memo, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/ui";

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

// Memoized loading fallback to prevent re-creation on every render
const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
      <Loader />
    </div>
  );
});

// Memoized AppRoutes component - avoids re-renders when parent updates
const AppRoutes = memo(function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <ScrollToTop />
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<TVShow />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/new-popular" element={<NewPopular />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/browse/languages" element={<BrowseByLanguages />} />
          <Route path="/actors" element={<Actor />} />
          <Route path="/actor/:slugWithId" element={<PersonDetailsPage />} />
          <Route path="/session" element={<Session />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Details routes */}
          <Route path="/movie/:slugWithId" element={<MovieDetails />} />
          <Route path="/tv/:slugWithId" element={<TVShowDetailsPage />} />
          <Route path="/tv/:tvId/season/:seasonNumber" element={<SeasonDetailsPage />} />
          <Route
            path="/tv/:tvId/season/:seasonNumber/episode/:episodeNumber"
            element={<EpisodeDetailsPage />}
          />
          <Route path="/person/:slugWithId" element={<PersonDetailsPage />} />

          {/* Footer routes */}
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
          <Route path="/corporate-information" element={<CorporateInformation />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/speed-test" element={<SpeedTest />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          <Route path="/only-on-netflix" element={<OnlyOnNetflix />} />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
});

export default AppRoutes;
