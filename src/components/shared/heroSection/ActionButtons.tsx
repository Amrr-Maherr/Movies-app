import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";

// ============================================
// COMPONENT
// ============================================
export default function ActionButtons() {
  return (
    <motion.div
      className="flex flex-wrap gap-3 pt-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {/* Play Button - White bg, black text (Netflix primary) */}
      <motion.button
        className="flex items-center gap-2 bg-white text-[var(--text-inverse)] px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/90 active:scale-95 min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current" />
        Play
      </motion.button>

      {/* More Info Button - Semi-transparent with blur (theme-aware) */}
      <motion.button
        className="flex items-center gap-2 bg-white/20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/30 active:scale-95 backdrop-blur-sm min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Info className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        More Info
      </motion.button>
    </motion.div>
  );
}
