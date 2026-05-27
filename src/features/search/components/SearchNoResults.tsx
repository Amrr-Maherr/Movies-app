import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Film } from "lucide-react";

interface SearchNoResultsProps {
  query: string;
}

const SearchNoResults = memo(function SearchNoResults({
  query,
}: SearchNoResultsProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <Film className="w-12 h-12 text-white/20" />
      </div>
      <p className="text-white/60 text-center text-lg font-medium">
        {t('common:search.noResults')}
      </p>
      <p className="text-white/30 text-sm mt-2">
        {t('common:search.noResultsFor', { query })}
      </p>
    </div>
  );
});

export default SearchNoResults;
