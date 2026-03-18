import { memo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  هسمخش
  onPageChange: (page: number) => void;
}

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-6 py-3 bg-[var(--background-secondary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--background-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Previous
      </button>
      <span className="text-[var(--text-primary)] font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-6 py-3 bg-[var(--background-secondary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--background-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Next
      </button>
    </div>
  );
});

export default Pagination;
