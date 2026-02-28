import Home from "@/pages/Home";
import Actor from "@/pages/Actor";
import Movie from "@/pages/Movie";
import TVShow from "@/pages/TVShow";
import Session from "@/pages/Session";
import Kids from "@/pages/Kids";
import NewPopular from "@/pages/NewPopular";
import MyList from "@/pages/MyList";
import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Footer pages
import FAQ from "@/pages/FAQ";
import HelpCenter from "@/pages/HelpCenter";
import Account from "@/pages/Account";
import MediaCenter from "@/pages/MediaCenter";
import InvestorRelations from "@/pages/InvestorRelations";
import Jobs from "@/pages/Jobs";
import WaysToWatch from "@/pages/WaysToWatch";
import TermsOfUse from "@/pages/TermsOfUse";
import Privacy from "@/pages/Privacy";
import CookiePreferences from "@/pages/CookiePreferences";
import CorporateInformation from "@/pages/CorporateInformation";
import ContactUs from "@/pages/ContactUs";
import SpeedTest from "@/pages/SpeedTest";
import LegalNotices from "@/pages/LegalNotices";
import OnlyOnNetflix from "@/pages/OnlyOnNetflix";

export default function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
    <Routes>
      <Route path="/home" element={<Home />} />
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
      <Route path="/corporate-information" element={<CorporateInformation />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/speed-test" element={<SpeedTest />} />
      <Route path="/legal-notices" element={<LegalNotices />} />
      <Route path="/only-on-netflix" element={<OnlyOnNetflix />} />
      
      <Route path="*" element={<NotFound />} />
      </Routes>
      </AnimatePresence>
  );
}
