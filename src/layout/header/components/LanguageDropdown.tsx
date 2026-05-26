import { useState, memo } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
];

const LanguageDropdown = memo(function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  
  const getCurrentLanguage = () => {
    // Try URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang) return urlLang;

    // Try localStorage
    const storedLang = localStorage.getItem('app_language');
    if (storedLang) return storedLang;

    // Default to English
    return 'en';
  };

  const currentLanguage = getCurrentLanguage();
  const currentLangName = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)?.name || 'English';

  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem('app_language', langCode);
    setIsOpen(false);
    // Reload page to apply new language
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden sm:inline text-sm">{currentLangName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#141414] border border-white/20 rounded-lg shadow-xl py-2 z-50">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/10",
                currentLanguage === lang.code && "bg-white/20 font-semibold"
              )}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default LanguageDropdown;
