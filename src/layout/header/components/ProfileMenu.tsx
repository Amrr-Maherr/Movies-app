import { memo, useCallback } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Memoized ProfileMenu component - avoids re-renders when parent updates
const ProfileMenu = memo(function ProfileMenu({
  isOpen,
  onClose,
}: ProfileMenuProps) {
  // Memoized: Handler functions
  const handleLogout = useCallback(() => {
    console.log("Logout clicked");
    onClose();
  }, [onClose]);

  const handleAccount = useCallback(() => {
    console.log("Account clicked");
    onClose();
  }, [onClose]);

  const handleSettings = useCallback(() => {
    console.log("Settings clicked");
    onClose();
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "absolute top-full right-0 mt-2 w-48 rounded-md border border-[var(--card-border)] bg-[var(--card-background)] shadow-lg z-50 overflow-hidden",
        !isOpen && "hidden",
      )}
    >
      <div className="py-1">
        <button
          onClick={handleAccount}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--hover-overlay)] transition-colors duration-200"
        >
          <User className="w-4 h-4" />
          Account
        </button>

        <button
          onClick={handleSettings}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--hover-overlay)] transition-colors duration-200"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>

        <div className="border-t border-[var(--separator)] my-1" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--error)] hover:bg-[var(--hover-overlay)] transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </motion.div>
  );
});

export default ProfileMenu;
