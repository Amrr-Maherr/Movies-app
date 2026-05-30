import { memo, useState, useCallback, useMemo } from "react";

interface BiographyPreviewProps {
  biography: string;
}

const BiographyPreview = memo(function BiographyPreview({
  biography,
}: BiographyPreviewProps) {
  const [expanded, setExpanded] = useState(false);

  const needsTruncation = useMemo(
    () => biography.length > 300 || (biography.match(/\n/g) || []).length > 4,
    [biography],
  );

  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  if (!biography) return null;

  return (
    <div className="space-y-2">
      <p
        className={`text-gray-300 text-[15px] leading-relaxed transition-all duration-300 ${
          !expanded ? "line-clamp-5" : ""
        }`}
      >
        {biography}
      </p>
      {needsTruncation && (
        <button
          onClick={toggleExpand}
          className="text-[var(--netflix-red)] hover:text-[var(--netflix-red-hover)] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--netflix-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
});

export default BiographyPreview;
