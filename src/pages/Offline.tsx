import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OfflinePage() {
  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)] p-4">
      <div className="text-center max-w-md">
        {/* Offline Icon */}
        <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="h-12 w-12 text-gray-400" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">You're Offline</h1>
        
        {/* Description */}
        <p className="text-gray-400 mb-8">
          It looks like you've lost your internet connection. Check your network settings and try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded font-semibold hover:bg-white/20 transition-colors"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>

        {/* Tips */}
        <div className="mt-12 text-left bg-white/5 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Tips:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Check your Wi-Fi or mobile data connection</li>
            <li>• Try refreshing the page</li>
            <li>• Some content may still be available from cache</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
