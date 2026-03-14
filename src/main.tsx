import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./providers/Providers.tsx";
import { registerSW } from "virtual:pwa-register";

// Register service worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    // Notify user about update available
    if (confirm("New content available. Reload to update?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
  onRegistered(registration) {
    console.log("SW registered:", registration);
    // Check for updates periodically
    setInterval(
      () => {
        registration?.update();
      },
      60 * 60 * 1000,
    ); // Check every hour
  },
  onRegisterError(error) {
    console.error("SW registration error:", error);
  },
});

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);
