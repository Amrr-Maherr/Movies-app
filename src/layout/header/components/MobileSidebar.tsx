import { memo, useCallback } from "react";
import { X } from "lucide-react";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { HeaderLinks } from "@/data/header";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Memoized MobileSidebar component - avoids re-renders when parent updates
const MobileSidebar = memo(function MobileSidebar({
  open,
  onOpenChange,
}: MobileSidebarProps) {
  // Memoized: Handle logout click
  const handleLogout = useCallback(() => {
    console.log("Logout clicked");
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[var(--background-secondary)] border-r border-[var(--card-border)]">
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--separator)]">
            <span className="text-lg font-bold text-[var(--text-primary)]">
              Menu
            </span>
            <DrawerClose className="text-[var(--text-primary)] hover:bg-[var(--hover-overlay)] p-2 rounded-full transition-colors duration-200">
              <X className="w-6 h-6" />
            </DrawerClose>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 py-4">
            {HeaderLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={({ isActive }) =>
                  cn(
                    "block px-6 py-3 text-[var(--text-primary)] font-medium transition-colors duration-200",
                    "hover:bg-[var(--hover-overlay)]",
                    isActive &&
                      "bg-[var(--hover-overlay)] text-[var(--netflix-red)] font-semibold",
                  )
                }
                onClick={() => onOpenChange(false)}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Bottom section with profile options */}
          <div className="border-t border-[var(--separator)] p-4 space-y-2">
            <NavLink
              to="/account"
              className="block px-6 py-3 text-[var(--text-primary)] font-medium hover:bg-[var(--hover-overlay)] rounded transition-colors duration-200"
              onClick={() => onOpenChange(false)}
            >
              Account
            </NavLink>
            <NavLink
              to="/settings"
              className="block px-6 py-3 text-[var(--text-primary)] font-medium hover:bg-[var(--hover-overlay)] rounded transition-colors duration-200"
              onClick={() => onOpenChange(false)}
            >
              Settings
            </NavLink>
            <button
              className="w-full text-left px-6 py-3 text-[var(--error)] font-medium hover:bg-[var(--hover-overlay)] rounded transition-colors duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});

export default MobileSidebar;
