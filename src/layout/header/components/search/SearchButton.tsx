import { useState, lazy, Suspense } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchPopup = lazy(() => import("./SearchPopup"));

interface SearchButtonProps {
  className?: string;
}

export default function SearchButton({ className }: SearchButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        className={cn(
          "cursor-pointer flex items-center justify-center w-9 h-9 rounded-full",
          "text-[var(--text-primary)] hover:bg-[var(--hover-overlay)]",
          "transition-all duration-200",
          className
        )}
        aria-label="Search"
        onClick={() => setIsPopupOpen(true)}
      >
        <Search className="w-5 h-5" />
      </button>

      {isPopupOpen && (
        <Suspense fallback={null}>
          <SearchPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
