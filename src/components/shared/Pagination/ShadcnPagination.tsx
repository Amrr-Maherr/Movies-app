import { memo, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

/**
 * Shadcn/ui-based Pagination component
 * Features:
 * - Previous/Next buttons with icons
 * - Page numbers with smart ellipsis for many pages
 * - Active page highlighting
 * - Disabled states for boundary conditions
 * - Loading state support
 * - Accessible (ARIA labels, keyboard navigation)
 */
const ShadcnPagination = memo(function ShadcnPagination({
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange,
}: PaginationProps) {
  // Generate page numbers to display with ellipsis logic
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 7; // Maximum page numbers to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near start: show 1, 2, 3, 4, 5, ..., last
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: show 1, ..., last-4, last-3, last-2, last-1, last
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In middle: show 1, ..., current-1, current, current+1, ..., last
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="py-6">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            disabled={currentPage === 1 || isLoading}
            aria-disabled={currentPage === 1 || isLoading}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageClick(page as number)}
                isActive={page === currentPage}
                disabled={isLoading}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            disabled={currentPage === totalPages || isLoading}
            aria-disabled={currentPage === totalPages || isLoading}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

export default ShadcnPagination;
