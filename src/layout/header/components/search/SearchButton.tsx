import { useState, lazy, Suspense } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

// const SearchPopup = lazy(() => import("./SearchPopup"));

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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
             <div className="bg-zinc-900 p-8 rounded shadow-xl relative">
                <button onClick={() => setIsPopupOpen(false)} className="absolute top-2 right-2 text-white">X</button>
                <p className="text-white">Search popup is currently unavailable</p>
             </div>
          </div>
        </Suspense>
      )}
    </>
  );
}
