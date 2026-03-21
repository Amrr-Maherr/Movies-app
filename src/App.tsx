import "./App.css";
import { Suspense, lazy } from "react";
import MainLayout from "./layout/mainLayout/MainLayout";
// FIX: Lazy load PWAInstallPrompt - not critical for initial render
// Reduces initial bundle size by deferring non-essential UI components
const PWAInstallPrompt = lazy(
  () => import("./components/shared/PWAInstallPrompt"),
);
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main>
        <MainLayout />
        {/* Lazy-loaded PWA prompt with null fallback (non-critical UI) */}
        <Suspense fallback={null}>
          <PWAInstallPrompt />
        </Suspense>
        <Toaster position="bottom-left" reverseOrder={false} />
      </main>
    </>
  );
}

export default App;
