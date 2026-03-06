import { useState, useEffect, useCallback, memo } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/shared/logo/Logo";
import NavLinks from "./components/NavLinks";
import SearchButton from "./components/search/SearchButton";
import ProfileMenu from "./components/ProfileMenu";
import MobileSidebar from "./components/MobileSidebar";
import { HeaderLinks } from "@/data/header";
import { cn } from "@/lib/utils";

// Memoized Header component - avoids re-renders when parent updates
const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoized: Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoized: Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-profile-menu]")) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoized: Profile menu toggle handler
  const handleProfileMenuToggle = useCallback(() => {
    setIsProfileMenuOpen((prev) => !prev);
  }, []);

  // Memoized: Mobile menu handlers
  const handleMobileMenuOpen = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const handleMobileMenuClose = useCallback((open: boolean) => {
    setIsMobileMenuOpen(open);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[var(--header-bg-scrolled)] shadow-lg"
            : "bg-gradient-to-b from-black/80 to-transparent",
        )}
      >
        <div className="container mx-auto px-4 md:px-12 lg:px-16">
          <div className="flex items-center justify-between gap-4 py-3 md:py-4">
            {/* Left section: Logo + Desktop Nav */}
            <div className="flex items-center gap-4 md:gap-8">
              {/* Logo */}
              <Logo className="w-20 h-6 sm:w-24 sm:h-7 md:w-28 md:h-8" />

              {/* Desktop Navigation - Hidden on mobile */}
              <nav className="hidden md:flex items-center gap-5">
                {HeaderLinks.map((link, index) => (
                  <NavLinks key={index} link={link} />
                ))}
              </nav>
            </div>

            {/* Right section: Search + Profile */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Button */}
              <SearchButton />

              {/* Profile Menu - Desktop */}
              <div
                className="relative hidden md:block"
                data-profile-menu
              >
                <button
                  onClick={handleProfileMenuToggle}
                  className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-200"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded bg-[var(--netflix-red)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                </button>

                <ProfileMenu
                  isOpen={isProfileMenuOpen}
                  onClose={() => setIsProfileMenuOpen(false)}
                />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden text-[var(--text-primary)] p-2"
                onClick={handleMobileMenuOpen}
                whileTap={{ scale: 0.95 }}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={isMobileMenuOpen}
        onOpenChange={handleMobileMenuClose}
      />
    </>
  );
});

export default Header;
