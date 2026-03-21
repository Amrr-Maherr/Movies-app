import { useState, useEffect, memo, useCallback } from "react";
import { X, Download, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Memoized PWA Install Prompt Component
 * Prevents unnecessary re-renders since it only renders when showPrompt is true
 */
const PWAInstallPrompt = memo(function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    // Check if user dismissed before
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const daysSinceDismissal =
        (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissal < 7) {
        return;
      }
    }

    // Check for iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    if (!isIOSDevice) {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowPrompt(true);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt,
        );
      };
    }
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setShowPrompt(false);
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.error("Error installing PWA:", err);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-[var(--background-secondary)] border border-white/20 rounded-lg shadow-2xl p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="bg-white/10 p-2 rounded-lg">
              {isIOS ? (
                <Share className="h-6 w-6 text-white" />
              ) : (
                <Download className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">
                {isIOS ? "Install on iPhone" : "Install Netflix App"}
              </h3>
              <p className="text-gray-300 text-sm">
                {isIOS
                  ? 'Tap the Share button, then "Add to Home Screen"'
                  : "Get quick access to your favorite movies and TV shows"}
              </p>
              {!isIOS && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleInstall}
                    className="bg-white text-black px-4 py-2 rounded font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="bg-white/10 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-white/20 transition-colors"
                  >
                    Later
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isIOS && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>1.</span>
              <Share className="h-4 w-4" />
              <span>Tap Share</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
              <span>2.</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span>Scroll down and tap "Add to Home Screen"</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PWAInstallPrompt;
