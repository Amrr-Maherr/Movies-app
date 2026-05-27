import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";

const DEFAULT_LANG = "en";
const SUPPORTED_LANGS = ["en", "ar"];

export function useCurrentLang(): string {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  return lang && SUPPORTED_LANGS.includes(lang) ? lang : i18n.language || DEFAULT_LANG;
}

export function useLocalizedPath() {
  const currentLang = useCurrentLang();
  const navigate = useNavigate();

  const getLocalizedPath = useCallback(
    (path: string): string => {
      if (!path) return `/${currentLang}`;
      const cleanPath = path.startsWith("/") ? path : `/${path}`;
      return `/${currentLang}${cleanPath}`;
    },
    [currentLang],
  );

  const localizedNavigate = useCallback(
    (path: string, options?: Parameters<typeof navigate>[1]) => {
      navigate(getLocalizedPath(path), options);
    },
    [navigate, getLocalizedPath],
  );

  return { getLocalizedPath, localizedNavigate, currentLang };
}

export function getLocalizedPath(
  path: string,
  lang: string,
): string {
  if (!path) return `/${lang}`;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}
