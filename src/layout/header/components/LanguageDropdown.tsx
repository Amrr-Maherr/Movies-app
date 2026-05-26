import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = i18n.language || 'en';
  const currentLangName = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)?.name || 'English';

  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem('app_language', langCode);
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        aria-label={t('header.language')}
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
