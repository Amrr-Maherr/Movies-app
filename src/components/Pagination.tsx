import { memo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  isLoading,
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
        disabled={currentPage === 1 || isLoading}
        className="px-6 py-3 bg-[var(--background-secondary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--background-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-w-[120px] flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin" />
        ) : null}
        Previous
      </button>
      <span className="text-[var(--text-primary)] font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        className="px-6 py-3 bg-[var(--background-secondary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--background-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-w-[120px] flex items-center justify-center gap-2"
      >
        Next
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin" />
        ) : null}
      </button>
    </div>
  );
});

export default Pagination;
