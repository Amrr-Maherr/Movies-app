import { lazy, Suspense, memo, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/shared/PageTransition";
import "@/index.css";
import { PageSkeleton } from "@/components/ui";

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

// Movie detail sub-pages
const MovieReviewsPage = lazy(() => import("@/pages/movie/MovieReviewsPage"));
const MovieVideosPage = lazy(() => import("@/pages/movie/MovieVideosPage"));
const MovieImagesPage = lazy(() => import("@/pages/movie/MovieImagesPage"));
const MovieWatchProvidersPage = lazy(
  () => import("@/pages/movie/MovieWatchProvidersPage"),
);
const MovieCreditsPage = lazy(() => import("@/pages/movie/MovieCreditsPage"));
const MovieRecommendationsPage = lazy(
  () => import("@/pages/movie/MovieRecommendationsPage"),
);

// TV detail sub-pages
const TVReviewsPage = lazy(() => import("@/pages/tv/TVReviewsPage"));
const TVVideosPage = lazy(() => import("@/pages/tv/TVVideosPage"));
const TVImagesPage = lazy(() => import("@/pages/tv/TVImagesPage"));
const TVWatchProvidersPage = lazy(
  () => import("@/pages/tv/TVWatchProvidersPage"),
);
const TVCreditsPage = lazy(() => import("@/pages/tv/TVCreditsPage"));
const TVRecommendationsPage = lazy(
  () => import("@/pages/tv/TVRecommendationsPage"),
);

// Person detail sub-pages
const PersonMovieCreditsPage = lazy(
  () => import("@/pages/person/PersonMovieCreditsPage"),
);
const PersonTVCreditsPage = lazy(
  () => import("@/pages/person/PersonTVCreditsPage"),
);
const PersonImagesPage = lazy(() => import("@/pages/person/PersonImagesPage"));

// Movies list pages
const NowPlayingMoviesPage = lazy(
  () => import("@/pages/movies/NowPlayingMoviesPage"),
);

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
const Company = lazy(() => import("@/pages/Company"));
const Collection = lazy(() => import("@/pages/Collection"));
const Network = lazy(() => import("@/pages/Network"));
const Genres = lazy(() => import("@/pages/Genres"));
const GenreMovies = lazy(() => import("@/pages/GenreMovies"));
const GenreTV = lazy(() => import("@/pages/GenreTV"));
const Platform = lazy(() => import("@/pages/Platform"));
const Platforms = lazy(() => import("@/pages/Platforms"));
const TrendingPeople = lazy(() => import("@/pages/TrendingPeople"));
const SeasonDetailsPage = lazy(() => import("@/pages/SeasonDetailsPage"));
const EpisodeDetailsPage = lazy(() => import("@/pages/EpisodeDetailsPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Offline = lazy(() => import("@/pages/Offline"));

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

// Memoized AppRoutes component - avoids re-renders when parent updates
const AppRoutes = memo(function AppRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Main routes */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/tv-shows"
            element={
              <PageTransition>
                <TVShow />
              </PageTransition>
            }
          />
          <Route
            path="/movies"
            element={
              <PageTransition>
                <Movie />
              </PageTransition>
            }
          />
          <Route
            path="/kids"
            element={
              <PageTransition>
                <Kids />
              </PageTransition>
            }
          />
          <Route
            path="/new-popular"
            element={
              <PageTransition>
                <NewPopular />
              </PageTransition>
            }
          />
          <Route
            path="/my-list"
            element={
              <PageTransition>
                <MyList />
              </PageTransition>
            }
          />
          <Route
            path="/browse/languages"
            element={
              <PageTransition>
                <BrowseByLanguages />
              </PageTransition>
            }
          />
          <Route
            path="/company/:id"
            element={
              <PageTransition>
                <Company />
              </PageTransition>
            }
          />
          <Route
            path="/collection/:id"
            element={
              <PageTransition>
                <Collection />
              </PageTransition>
            }
          />
          <Route
            path="/network/:id"
            element={
              <PageTransition>
                <Network />
              </PageTransition>
            }
          />
          <Route
            path="/genres"
            element={
              <PageTransition>
                <Genres />
              </PageTransition>
            }
          />
          <Route
            path="/movie/genre/:id"
            element={
              <PageTransition>
                <GenreMovies />
              </PageTransition>
            }
          />
          <Route
            path="/tv/genre/:id"
            element={
              <PageTransition>
                <GenreTV />
              </PageTransition>
            }
          />
          <Route
            path="/platform/:id"
            element={
              <PageTransition>
                <Platform />
              </PageTransition>
            }
          />
          <Route
            path="/platforms"
            element={
              <PageTransition>
                <Platforms />
              </PageTransition>
            }
          />
          <Route
            path="/trending/actors"
            element={
              <PageTransition>
                <TrendingPeople />
              </PageTransition>
            }
          />
          <Route
            path="/actors"
            element={
              <PageTransition>
                <Actor />
              </PageTransition>
            }
          />
          <Route
            path="/actor/:slugWithId"
            element={
              <PageTransition>
                <PersonDetailsPage />
              </PageTransition>
            }
          />
          <Route
            path="/session"
            element={
              <PageTransition>
                <Session />
              </PageTransition>
            }
          />

          {/* Auth routes */}
          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />
          <Route
            path="/signup"
            element={
              <PageTransition>
                <Signup />
              </PageTransition>
            }
          />

          {/* Details routes */}
          <Route
            path="/movie/:slugWithId"
            element={
              <PageTransition>
                <MovieDetails />
              </PageTransition>
            }
          />
          <Route
            path="/movie/:slugWithId/reviews"
            element={
              <PageTransition>
                <MovieReviewsPage />
              </PageTransition>
            }
          />
          <Route
            path="/movie/:slugWithId/videos"
            element={
              <PageTransition>
                <MovieVideosPage />
              </PageTransition>
            }
          />
          <Route
            path="/movie/:slugWithId/images"
            element={
              <PageTransition>
                <MovieImagesPage />
              </PageTransition>
            }
          />
          <Route
            path="/movie/:slugWithId/watch"
            element={
              <PageTransition>
                <MovieWatchProvidersPage />
              </PageTransition>
            }
          />
          <Route
            path="/movie/:slugWithId/credits"
            element={
              <PageTransition>
                <MovieCreditsPage />
              </PageTransition>
            }
          />
          <Route
            path="/movie/:slugWithId/recommendations"
            element={
              <PageTransition>
                <MovieRecommendationsPage />
              </PageTransition>
            }
          />

          <Route
            path="/tv/:slugWithId"
            element={
              <PageTransition>
                <TVShowDetailsPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/reviews"
            element={
              <PageTransition>
                <TVReviewsPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/videos"
            element={
              <PageTransition>
                <TVVideosPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/images"
            element={
              <PageTransition>
                <TVImagesPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/watch"
            element={
              <PageTransition>
                <TVWatchProvidersPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/credits"
            element={
              <PageTransition>
                <TVCreditsPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/recommendations"
            element={
              <PageTransition>
                <TVRecommendationsPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/season/:seasonNumber"
            element={
              <PageTransition>
                <SeasonDetailsPage />
              </PageTransition>
            }
          />
          <Route
            path="/tv/:slugWithId/season/:seasonNumber/episode/:episodeNumber"
            element={
              <PageTransition>
                <EpisodeDetailsPage />
              </PageTransition>
            }
          />

          <Route
            path="/person/:slugWithId"
            element={
              <PageTransition>
                <PersonDetailsPage />
              </PageTransition>
            }
          />
          <Route
            path="/person/:slugWithId/movies"
            element={
              <PageTransition>
                <PersonMovieCreditsPage />
              </PageTransition>
            }
          />
          <Route
            path="/person/:slugWithId/tv"
            element={
              <PageTransition>
                <PersonTVCreditsPage />
              </PageTransition>
            }
          />
          <Route
            path="/person/:slugWithId/images"
            element={
              <PageTransition>
                <PersonImagesPage />
              </PageTransition>
            }
          />

          {/* Movies list routes */}
          <Route
            path="/now-playing"
            element={
              <PageTransition>
                <NowPlayingMoviesPage />
              </PageTransition>
            }
          />

          {/* Footer routes */}
          <Route
            path="/faq"
            element={
              <PageTransition>
                <FAQ />
              </PageTransition>
            }
          />
          <Route
            path="/help-center"
            element={
              <PageTransition>
                <HelpCenter />
              </PageTransition>
            }
          />
          <Route
            path="/account"
            element={
              <PageTransition>
                <Account />
              </PageTransition>
            }
          />
          <Route
            path="/media-center"
            element={
              <PageTransition>
                <MediaCenter />
              </PageTransition>
            }
          />
          <Route
            path="/investor-relations"
            element={
              <PageTransition>
                <InvestorRelations />
              </PageTransition>
            }
          />
          <Route
            path="/jobs"
            element={
              <PageTransition>
                <Jobs />
              </PageTransition>
            }
          />
          <Route
            path="/ways-to-watch"
            element={
              <PageTransition>
                <WaysToWatch />
              </PageTransition>
            }
          />
          <Route
            path="/terms-of-use"
            element={
              <PageTransition>
                <TermsOfUse />
              </PageTransition>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageTransition>
                <Privacy />
              </PageTransition>
            }
          />
          <Route
            path="/cookie-preferences"
            element={
              <PageTransition>
                <CookiePreferences />
              </PageTransition>
            }
          />
          <Route
            path="/corporate-information"
            element={
              <PageTransition>
                <CorporateInformation />
              </PageTransition>
            }
          />
          <Route
            path="/contact-us"
            element={
              <PageTransition>
                <ContactUs />
              </PageTransition>
            }
          />
          <Route
            path="/speed-test"
            element={
              <PageTransition>
                <SpeedTest />
              </PageTransition>
            }
          />
          <Route
            path="/legal-notices"
            element={
              <PageTransition>
                <LegalNotices />
              </PageTransition>
            }
          />
          <Route
            path="/only-on-netflix"
            element={
              <PageTransition>
                <OnlyOnNetflix />
              </PageTransition>
            }
          />

          {/* 404 route */}
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />

          {/* Offline route */}
          <Route
            path="/offline"
            element={
              <PageTransition>
                <Offline />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
});

export default AppRoutes;
