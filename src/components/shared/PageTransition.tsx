import { motion } from "framer-motion";
import { memo, ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Memoized PageTransition Component
 *
 * Wraps page content with Framer Motion animations for smooth transitions.
 * Memoized to prevent unnecessary re-renders during route changes.
 */
const PageTransition = memo(function PageTransition({
  children,
}: PageTransitionProps) {
  return (
    <motion.div
      // initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
});

export default PageTransition;
