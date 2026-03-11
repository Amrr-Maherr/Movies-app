import { motion } from "framer-motion";
import { useLazyLoad } from "@/hooks/useLazyLoad";

export default function MyList() {
  // Lazy load hook for the content section
  const { ref: contentRef, isVisible: contentVisible } = useLazyLoad<HTMLDivElement>();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={contentRef}>
        {contentVisible && <h1>My List</h1>}
      </div>
    </motion.div>
  );
}
