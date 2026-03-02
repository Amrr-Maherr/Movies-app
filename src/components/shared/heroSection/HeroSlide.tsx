import { motion } from "framer-motion";
import { VolumeX } from "lucide-react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import type { HeroSlideProps } from "@/types";

// ============================================
// COMPONENT
// ============================================
export default function HeroSlide({ movie }: HeroSlideProps) {
  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden">
      {/* Background */}
      <HeroBackground movie={movie} />

      {/* Content */}
      <HeroContent movie={movie} />

      {/* Mute Button - Repositioned for mobile (top-right on small screens) */}
      {/* Theme-aware colors for border and background */}
      <motion.div
        className="absolute top-4 right-4 sm:bottom-32 sm:right-8 md:bottom-40 md:right-12 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white/50 text-white flex items-center justify-center backdrop-blur-sm bg-black/30 hover:bg-black/50 hover:border-white transition-all duration-200 touch-manipulation active:scale-95"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mute"
        >
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
