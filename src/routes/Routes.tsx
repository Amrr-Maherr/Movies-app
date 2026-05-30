import { lazy, Suspense, memo, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
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

// Language sync component - syncs URL lang param with i18n
const LanguageSync = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const supportedLangs = ['en', 'ar'];

  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    const langFromUrl = parts[0];
    if (langFromUrl && supportedLangs.includes(langFromUrl) && langFromUrl !== i18n.language) {
      i18n.changeLanguage(langFromUrl);
      localStorage.setItem('app_language', langFromUrl);
    }
  }, [pathname, i18n]);

  return null;
};

// Language redirect component
const LanguageRedirect = () => {
  const currentLang = localStorage.getItem('app_language') || 'en';
  return <Navigate to={`/${currentLang}/`} replace />;
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
      <LanguageSync />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Language redirect */}
          <Route path="/" element={<LanguageRedirect />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<LanguageRedirect />} />
          
          {/* Main routes */}
          <Route
            path="/:lang/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/:lang/tv-shows"
              element={
                <PageTransition>
                  <TVShow />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/tags/:slug"
              element={
                <PageTransition>
                  <TagsPage />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/search"
              element={
                <PageTransition>
                  <SearchPage />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/movies"
              element={
                <PageTransition>
                  <Movie />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/kids"
              element={
                <PageTransition>
                  <Kids />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/new-popular"
              element={
                <PageTransition>
                  <NewPopular />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/my-list"
              element={
                <PageTransition>
                  <MyList />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/browse/languages"
              element={
                <PageTransition>
                  <BrowseByLanguages />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/company/:slug/:id"
              element={
                <PageTransition>
                  <Company />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/company/:id"
              element={
                <PageTransition>
                  <Company />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/collection/:slug/:id"
              element={
                <PageTransition>
                  <Collection />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/collection/:id"
              element={
                <PageTransition>
                  <Collection />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/network/:slug/:id"
              element={
                <PageTransition>
                  <Network />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/network/:id"
              element={
                <PageTransition>
                  <Network />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/genres"
              element={
                <PageTransition>
                  <Genres />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/movie/genre/:slug/:id"
              element={
                <PageTransition>
                  <GenreMovies />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/movie/genre/:id"
              element={
                <PageTransition>
                  <GenreMovies />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/tv/genre/:slug/:id"
              element={
                <PageTransition>
                  <GenreTV />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/tv/genre/:id"
              element={
                <PageTransition>
                  <GenreTV />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/platform/:slug/:id"
              element={
                <PageTransition>
                  <Platform />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/platform/:id"
              element={
                <PageTransition>
                  <Platform />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/platforms"
              element={
                <PageTransition>
                  <Platforms />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/trending/actors"
              element={
                <PageTransition>
                  <TrendingPeople />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/actors"
              element={
                <PageTransition>
                  <Actor />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/actor/:slug/:id"
              element={
                <PageTransition>
                  <PersonDetailsPage />
                </PageTransition>
              }
            />
            {/* Backward compatibility for actor */}
            <Route
              path="/:lang/actor/:id"
              element={
                <PageTransition>
                  <PersonDetailsPage />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/person/:slug/:id"
              element={
                <PageTransition>
                  <PersonDetailsPage />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/person/:id"
              element={
                <PageTransition>
                  <PersonDetailsPage />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/session"
              element={
                <PageTransition>
                  <Session />
                </PageTransition>
              }
            />

            {/* Auth routes */}

            {/* Details routes — SEO-friendly /:slug/:id format */}
            <Route
              path="/:lang/movie/:slug/:id"
              element={
                <PageTransition>
                  <MovieDetails />
                </PageTransition>
              }
            />
            {/* Backward compatibility for movie */}
            <Route
              path="/:lang/movie/:id"
              element={
                <PageTransition>
                  <MovieDetails />
                </PageTransition>
              }
            />

            <Route
              path="/:lang/series/:slug/:id"
              element={
                <PageTransition>
                  <TVShowDetailsPage />
                </PageTransition>
              }
            />
            {/* Backward compatibility for series/tv */}
            <Route
              path="/:lang/series/:id"
              element={
                <PageTransition>
                  <TVShowDetailsPage />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/tv/:slug/:id"
              element={
                <PageTransition>
                  <TVShowDetailsPage />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/tv/:id"
              element={
                <PageTransition>
                  <TVShowDetailsPage />
                </PageTransition>
              }
            />

            <Route
              path="/:lang/series/:slug/:id/season/:seasonNumber"
              element={
                <PageTransition>
                  <SeasonDetailsPage />
                </PageTransition>
              }
            />

            <Route
              path="/:lang/series/:slug/:id/season/:seasonNumber/episode/:episodeNumber"
              element={
                <PageTransition>
                  <EpisodeDetailsPage />
                </PageTransition>
              }
            />

            {/* Movies list routes */}
            <Route
              path="/:lang/now-playing"
              element={
                <PageTransition>
                  <NowPlayingMoviesPage />
                </PageTransition>
              }
            />

            {/* Footer routes */}
            <Route
              path="/:lang/faq"
              element={
                <PageTransition>
                  <FAQ />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/help-center"
              element={
                <PageTransition>
                  <HelpCenter />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/account"
              element={
                <PageTransition>
                  <Account />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/media-center"
              element={
                <PageTransition>
                  <MediaCenter />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/investor-relations"
              element={
                <PageTransition>
                  <InvestorRelations />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/jobs"
              element={
                <PageTransition>
                  <Jobs />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/ways-to-watch"
              element={
                <PageTransition>
                  <WaysToWatch />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/terms-of-use"
              element={
                <PageTransition>
                  <TermsOfUse />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/privacy"
              element={
                <PageTransition>
                  <Privacy />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/cookie-preferences"
              element={
                <PageTransition>
                  <CookiePreferences />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/corporate-information"
              element={
                <PageTransition>
                  <CorporateInformation />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/contact-us"
              element={
                <PageTransition>
                  <ContactUs />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/speed-test"
              element={
                <PageTransition>
                  <SpeedTest />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/legal-notices"
              element={
                <PageTransition>
                  <LegalNotices />
                </PageTransition>
              }
            />
            <Route
              path="/:lang/only-on-netflix"
              element={
                <PageTransition>
                  <OnlyOnNetflix />
                </PageTransition>
              }
            />

            <Route
              path="/:lang/offline"
              element={
                <PageTransition>
                  <Offline />
                </PageTransition>
              }
            />
          </Route>
          {/* Subscribe page */}
          <Route
            path="/:lang/subscribe"
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
            path="/:lang/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />
          <Route
            path="/:lang/signup"
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
