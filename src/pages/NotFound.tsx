import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)] px-4">
      <h1 className="text-9xl font-bold text-[var(--netflix-red)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Lost your way?
      </h2>
      <p className="text-[var(--text-secondary)] text-center max-w-md mb-8">
        Sorry, we can't find that page. You'll find lots to explore on the home page.
      </p>
      <Link
        to="/"
        className="bg-[var(--netflix-red)] text-[var(--text-inverse)] font-medium px-6 py-3 rounded transition-all duration-300 ease-in-out hover:bg-[var(--netflix-red-hover)] hover:scale-105"
      >
        Netflix Home
      </Link>
    </div>
  );
}
