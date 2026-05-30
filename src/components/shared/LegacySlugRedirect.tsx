import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buildMediaUrl } from "@/utils/url";

type LegacySlugRedirectProps = {
  type: "movie" | "tv" | "series" | "actor" | "person";
};

/**
 * Redirects old /:slugWithId routes to new /:slug/:id format.
 * Old: /movie/iron-man-123  ->  New: /movie/iron-man/123
 */
export function LegacySlugRedirect({ type }: LegacySlugRedirectProps) {
  const { lang, slugWithId } = useParams<{ lang: string; slugWithId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slugWithId || !lang) return;

    const match = slugWithId.match(/^(.+)-(\d+)$/);
    if (!match) {
      navigate(`/${lang}`, { replace: true });
      return;
    }

    const rawSlug = match[1];
    const id = match[2];
    const newPath = buildMediaUrl(type, rawSlug.replace(/-/g, " "), id);
    navigate(`/${lang}${newPath}`, { replace: true });
  }, [slugWithId, lang, navigate, type]);

  return null;
}
