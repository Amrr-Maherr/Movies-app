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
const MovieDetails = lazy(() => import("@/features/movies/pages/MovieDetails"));
const ProtectedRoute = lazy(() => import("@/features/auth/components/ProtectedRoute"));
const TVShowDetailsPage = lazy(() => import("@/features/tv-shows/pages/TVShowDetails"));
const PersonDetailsPage = lazy(() => import("@/features/people/pages/PersonDetails"));
const TagsPage = lazy(() => import("@/features/discover/pages/Tags"));
const SearchPage = lazy(() => import("@/features/search/pages/SearchPage"));

// Movies list pages
const NowPlayingMoviesPage = lazy(
  () => import("@/features/movies/pages/NowPlayingMoviesPage"),
);

// Main pages
const Home = lazy(() => import("../features/home/pages/Home"));
const Actor = lazy(() => import("@/features/people/pages/Actor"));
const Movie = lazy(() => import("@/features/movies/pages/Movie"));
const TVShow = lazy(() => import("@/features/tv-shows/pages/TVShow"));
const Session = lazy(() => import("@/features/discover/pages/Session"));
const Kids = lazy(() => import("@/features/discover/pages/Kids"));
const NewPopular = lazy(() => import("@/features/discover/pages/NewPopular"));
const MyList = lazy(() => import("@/features/my-list/pages/MyList"));
const BrowseByLanguages = lazy(() => import("@/features/discover/pages/BrowseByLanguages"));
const Company = lazy(() => import("@/features/discover/pages/Company"));
const Collection = lazy(() => import("@/features/discover/pages/Collection"));
const Network = lazy(() => import("@/features/discover/pages/Network"));
const Genres = lazy(() => import("@/features/discover/pages/Genres"));
const GenreMovies = lazy(() => import("@/features/discover/pages/GenreMovies"));
const GenreTV = lazy(() => import("@/features/discover/pages/GenreTV"));
const Platform = lazy(() => import("@/features/discover/pages/Platform"));
const Platforms = lazy(() => import("@/features/discover/pages/Platforms"));
const TrendingPeople = lazy(() => import("@/features/people/pages/TrendingPeople"));
const SeasonDetailsPage = lazy(() => import("@/features/tv-shows/pages/SeasonDetailsPage"));
const EpisodeDetailsPage = lazy(() => import("@/features/tv-shows/pages/EpisodeDetailsPage"));
const NotFound = lazy(() => import("@/features/info-pages/pages/NotFound"));
const Offline = lazy(() => import("@/features/info-pages/pages/Offline"));

// Auth pages
const Login = lazy(() => import("@/features/auth/pages/Login"));
const Signup = lazy(() => import("@/features/auth/pages/Signup"));

// Footer pages
const FAQ = lazy(() => import("@/features/info-pages/pages/FAQ"));
const HelpCenter = lazy(() => import("@/features/info-pages/pages/HelpCenter"));
const Account = lazy(() => import("@/features/info-pages/pages/Account"));
const MediaCenter = lazy(() => import("@/features/info-pages/pages/MediaCenter"));
const InvestorRelations = lazy(() => import("@/features/info-pages/pages/InvestorRelations"));
const Jobs = lazy(() => import("@/features/info-pages/pages/Jobs"));
const WaysToWatch = lazy(() => import("@/features/info-pages/pages/WaysToWatch"));
const TermsOfUse = lazy(() => import("@/features/info-pages/pages/TermsOfUse"));
const Privacy = lazy(() => import("@/features/info-pages/pages/Privacy"));
const CookiePreferences = lazy(() => import("@/features/info-pages/pages/CookiePreferences"));
const CorporateInformation = lazy(() => import("@/features/info-pages/pages/CorporateInformation"));
const ContactUs = lazy(() => import("@/features/info-pages/pages/ContactUs"));
const SpeedTest = lazy(() => import("@/features/info-pages/pages/SpeedTest"));
const LegalNotices = lazy(() => import("@/features/info-pages/pages/LegalNotices"));
const OnlyOnNetflix = lazy(() => import("@/features/discover/pages/OnlyOnNetflix"));
const SubscribePage = lazy(() => import("@/features/subscription/pages/SubscribePage"));

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
          <Route element={<ProtectedRoute />}>
            <Route
              path="/tv-shows"
              element={
                <PageTransition>
                  <TVShow />
                </PageTransition>
              }
            />
            <Route
              path="/tags/:slug"
              element={
                <PageTransition>
                  <TagsPage />
                </PageTransition>
              }
            />
            <Route
              path="/search"
              element={
                <PageTransition>
                  <SearchPage />
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
              path="/tv/:slugWithId"
              element={
                <PageTransition>
                  <TVShowDetailsPage />
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

            <Route
              path="/offline"
              element={
                <PageTransition>
                  <Offline />
                </PageTransition>
              }
            />
          </Route>
          {/* Subscribe page */}
          <Route
            path="/subscribe"
            element={
              <PageTransition>
                <SubscribePage />
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
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
});

export default AppRoutes;
