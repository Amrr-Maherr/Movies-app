import { memo, useCallback, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export interface PeopleFiltersProps {
  selectedGender: string;
  onGenderSelect: (gender: string) => void;
  selectedLetter: string;
  onLetterSelect: (letter: string) => void;
}

const GENDERS = [
  { label: "All", value: "all" },
  { label: "Female", value: "1" },
  { label: "Male", value: "2" },
];

const ALPHABET = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

// Memoized Gender Button
const GenderButton = memo(function GenderButton({
  label,
  value,
  isActive,
  onClick,
}: {
  label: string;
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
}) {
  const handleClick = useCallback(() => onClick(value), [value, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 sm:px-5 sm:py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${isActive
        ? "bg-white text-black shadow-lg"
        : "bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white border border-zinc-700"
        }`}
    >
      {label}
    </button>
  );
});

// Memoized Letter Button
const LetterButton = memo(function LetterButton({
  letter,
  isActive,
  onClick,
}: {
  letter: string;
  isActive: boolean;
  onClick: (value: string) => void;
}) {
  const value = letter === "All" ? "all" : letter;
  const handleClick = useCallback(() => onClick(value), [value, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-200 ${isActive
        ? "bg-white text-black shadow-lg scale-110"
        : "bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white border border-zinc-700"
        }`}
    >
      {letter}
    </button>
  );
});

const PeopleFilters = memo(({
  selectedGender,
  onGenderSelect,
  selectedLetter,
  onLetterSelect,
}: PeopleFiltersProps) => {
  // Collapsible on mobile
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((v) => !v), []);

  // Active filter count for badge
  const activeCount =
    (selectedGender !== "all" ? 1 : 0) +
    (selectedLetter !== "all" ? 1 : 0);

  return (
    <div className="px-4 sm:px-8 mb-6">
      {/* Mobile Toggle Button */}
      <div className="sm:hidden mb-4">
        <button
          onClick={toggleOpen}
          className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium text-sm"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            Filters
            {activeCount > 0 && (
              <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      {/* Filters Body — always visible on sm+, collapsible on mobile */}
      <div className={`space-y-5 ${isOpen ? "block" : "hidden"} sm:block`}>
        {/* Gender Filter */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Gender
          </h3>
          {/* Horizontally scrollable on mobile */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
              {GENDERS.map((gender) => (
                <GenderButton
                  key={gender.value}
                  label={gender.label}
                  value={gender.value}
                  isActive={selectedGender === gender.value}
                  onClick={onGenderSelect}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Alphabet Filter */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Filter by Name
          </h3>
          <div className="pb-1">
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {ALPHABET.map((letter) => {
                const value = letter === "All" ? "all" : letter;
                return (
                  <LetterButton
                    key={letter}
                    letter={letter}
                    isActive={selectedLetter === value}
                    onClick={onLetterSelect}
                  />
                );
              })}
            </div>
          </div>
          {/* Scroll hint on mobile */}
          <p className="text-xs text-gray-600 mt-2 sm:hidden">← Scroll to see all letters</p>
        </div>
      </div>
    </div>
  );
});

export default PeopleFilters;
