import { User, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
    onClose();
  };

  const handleAccount = () => {
    // TODO: Navigate to account page
    console.log("Account clicked");
    onClose();
  };

  const handleSettings = () => {
    // TODO: Navigate to settings page
    console.log("Settings clicked");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "absolute top-full right-0 mt-2 w-48 rounded-md border border-[var(--card-border)] bg-[var(--card-background)] shadow-lg z-50 overflow-hidden",
        !isOpen && "hidden"
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
}
