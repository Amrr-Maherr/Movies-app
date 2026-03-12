import { useState, useEffect, memo } from "react";
import { Bell, ChevronDown } from "lucide-react";
import Logo from "@/components/shared/logo/Logo";
import NavLinks from "./components/NavLinks";
import SearchButton from "./components/search/SearchButton";
import ProfileMenu from "./components/ProfileMenu";
import BrowseDropdown from "./components/BrowseDropdown";
import { HeaderLinks } from "@/data/header";
import { cn } from "@/lib/utils";

const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isBrowseMenuOpen, setIsBrowseMenuOpen] = useState(false);

  // FIX: Throttle scroll events using requestAnimationFrame to prevent excessive re-renders
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      // Only update if scroll position changed significantly (prevents micro-updates)
      if (Math.abs(window.scrollY - lastScrollY) < 5) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10); // Add small threshold to avoid flickering
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
        isScrolled
          ? "bg-[#141414] shadow-lg"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      )}
    >
      <div className="px-4 md:px-12 lg:px-16 flex items-center py-4">
        {/* Left section: Logo + Desktop Nav + Mobile Browse */}
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <Logo className="w-20 h-6 sm:w-24 sm:h-7 md:w-28 md:h-8" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            {HeaderLinks.map((link, index) => (
              <NavLinks key={index} link={link} />
            ))}
          </nav>

          {/* Mobile Browse Dropdown */}
          <BrowseDropdown
            isOpen={isBrowseMenuOpen}
            onToggle={() => setIsBrowseMenuOpen(!isBrowseMenuOpen)}
            onClose={() => setIsBrowseMenuOpen(false)}
          />
        </div>

        {/* Right section: Search + Bell + Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          <SearchButton />

          <button className="text-white hover:text-gray-300 transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Profile Menu Dropdown Container */}
          <div className="relative z-50" data-profile-menu>
            <div
              className="flex items-center gap-2 cursor-pointer pb-2 -mb-2"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-8 h-8 rounded bg-blue-500 overflow-hidden flex items-center justify-center text-white text-sm font-bold">
                K
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-white transition-transform duration-300 hidden sm:block",
                  isProfileMenuOpen && "rotate-180"
                )}
              />
            </div>

            {/* Profile Dropdown rendered absolute relative to this container */}
            <ProfileMenu
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;

