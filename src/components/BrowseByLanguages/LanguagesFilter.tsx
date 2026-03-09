import { memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Slider from "@/components/shared/Slider/slider";

export interface Language {
  code: string;
  name: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "ko", name: "Korean" },
  { code: "ja", name: "Japanese" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "zh", name: "Chinese" },
  { code: "tr", name: "Turkish" },
  { code: "ru", name: "Russian" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "id", name: "Indonesian" },
  { code: "el", name: "Greek" },
  { code: "he", name: "Hebrew" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" },
];

interface LanguagesFilterProps {
  selectedLanguage: string;
  onLanguageSelect: (code: string) => void;
}

const LanguagesFilter = memo(function LanguagesFilter({
  selectedLanguage,
  onLanguageSelect,
}: LanguagesFilterProps) {
  return (
    <div className="w-full relative py-2">
      <div className="px-4 sm:px-8">
        <Slider
          slidesPerView={8}
          slidesPerViewMobile={3.5}
          spaceBetween={12}
          hideNavigation={false}
          swiperOptions={{
            autoplay: false,
            pagination: false,
            freeMode: true,
            breakpoints: {
              640: { slidesPerView: 4, spaceBetween: 12 },
              768: { slidesPerView: 5, spaceBetween: 12 },
              1024: { slidesPerView: 7, spaceBetween: 12 },
              1280: { slidesPerView: 9, spaceBetween: 12 },
            }
          }}
          className="languages-slider"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = selectedLanguage === lang.code;

            return (
              <motion.button
                key={lang.code}
                onClick={() => onLanguageSelect(lang.code)}
                className={cn(
                  "w-full px-2 py-2 cursor-pointer sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 border",
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-[#141414] text-white border-[#404040] hover:border-white hover:bg-[#202020]"
                )}
              >
                {lang.name}
              </motion.button>
            );
          })}
        </Slider>
      </div>
    </div>
  );
});

export default LanguagesFilter;
