import { memo, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { HeaderLinks } from "@/data/header";
import { cn } from "@/lib/utils";

interface BrowseDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const BrowseDropdown = memo(function BrowseDropdown({
  isOpen,
  onClose,
  onToggle,
}: BrowseDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative md:hidden ml-4" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-[var(--text-primary)] font-medium hover:text-[var(--text-secondary)] transition-colors text-sm"
      >
        Browse
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-64 bg-black/90 border-t-2 border-[#e50914] shadow-xl py-2 z-50">
          <div className="flex flex-col">
            {HeaderLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 text-sm text-center font-medium transition-colors hover:bg-white/10",
                    isActive ? "text-white font-bold" : "text-[#b3b3b3]"
                  )
                }
                onClick={onClose}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default BrowseDropdown;
