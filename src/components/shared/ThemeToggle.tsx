import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="text-white hover:text-gray-300 transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-white hover:text-gray-300 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
      ) : (
        <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
      )}
    </button>
  );
}
