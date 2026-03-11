import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function MyList() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HelmetMeta
        name="My List"
        description="Your personal list of saved movies and TV shows on Netflix."
      />

      <LazyWrapper>
        <h1>My List</h1>
      </LazyWrapper>
    </motion.div>
  );
}
