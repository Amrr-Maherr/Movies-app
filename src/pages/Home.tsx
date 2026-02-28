import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Home Page</h1>
    </motion.div>
  );
};

export default Home;
