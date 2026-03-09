import { memo, useCallback } from "react";
import { User, Settings, HelpCircle, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const profiles = [
  { id: 1, name: "Kids", color: "bg-blue-500" },
  { id: 2, name: "Guest", color: "bg-green-500" },
];

const ProfileMenu = memo(function ProfileMenu({
  isOpen,
  onClose,
}: ProfileMenuProps) {
  const handleLogout = useCallback(() => {
    console.log("Logout clicked");
    onClose();
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "absolute top-full right-0 mt-4 w-56 rounded-md border border-[var(--card-border)] bg-black/95 shadow-xl z-50 overflow-hidden",
        !isOpen && "hidden"
      )}
    >
      <div className="flex flex-col text-sm text-[#e5e5e5]">
        {/* Profiles List */}
        <div className="p-3 space-y-3">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={onClose}
            >
              <div className={cn("w-8 h-8 rounded", profile.color)} />
              <span className="group-hover:underline">{profile.name}</span>
            </div>
          ))}
          
          <Link
            to="/manage-profiles"
            className="flex items-center gap-3 mt-2 hover:underline cursor-pointer text-[#b3b3b3] group"
            onClick={onClose}
          >
            <Users className="w-5 h-5 text-[#b3b3b3] group-hover:text-white transition-colors" />
            Manage Profiles
          </Link>
        </div>

        <div className="border-t border-gray-800" />

        {/* Links */}
        <div className="py-2">
          <Link
            to="/account"
            className="flex items-center gap-3 px-4 py-2 hover:underline"
            onClick={onClose}
          >
            <User className="w-4 h-4 text-[#b3b3b3]" />
            Account
          </Link>
          <Link
            to="/help-center"
            className="flex items-center gap-3 px-4 py-2 hover:underline"
            onClick={onClose}
          >
            <HelpCircle className="w-4 h-4 text-[#b3b3b3]" />
            Help Center
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-2 hover:underline"
            onClick={onClose}
          >
            <Settings className="w-4 h-4 text-[#b3b3b3]" />
            Settings
          </Link>
        </div>

        <div className="border-t border-gray-800" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full text-center px-4 py-4 text-sm hover:underline"
        >
          Sign out of Netflix
        </button>
      </div>
    </motion.div>
  );
});

export default ProfileMenu;
