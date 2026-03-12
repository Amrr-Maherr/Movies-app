import { Suspense, lazy } from "react";
import AppRoutes from "@/routes/Routes";
import Header from "../header/Header";
import SharedMovieModal from "@/components/shared/SharedMovieModal";

// FIX: Lazy load Footer component - it's below-fold content that doesn't need to load immediately
// This reduces initial bundle size by ~5-10KB
const Footer = lazy(() => import("../footer").then(module => ({ default: module.Footer })));

export default function MainLayout() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {/* Shared MovieModal - rendered once at app level */}
      <SharedMovieModal />
    </>
  );
}
