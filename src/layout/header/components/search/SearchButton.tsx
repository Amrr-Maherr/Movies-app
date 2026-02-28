import { SearchIcon } from "lucide-react";

export default function SearchButton() {
  return (
    <button
      className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/10 transition-colors duration-200"
      aria-label="Search"
    >
      <SearchIcon className="w-5 h-5" />
    </button>
  );
}
