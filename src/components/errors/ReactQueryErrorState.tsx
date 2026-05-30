import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  WifiOff,
  AlertTriangle,
  SearchX,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { classifyQueryError, extractQueryErrorMessage } from "./error.utils";
import type { QueryErrorType, QueryErrorConfig } from "./error.types";

const ERROR_CONFIG: Record<QueryErrorType, QueryErrorConfig> = {
  network: {
    icon: WifiOff,
    defaultTitle: "errors.networkError",
    defaultMessage: "errors.networkError",
    gradientFrom: "from-orange-500/20",
    gradientTo: "to-red-600/20",
  },
  server: {
    icon: AlertTriangle,
    defaultTitle: "errors.somethingWentWrong",
    defaultMessage: "errors.somethingWentWrong",
    gradientFrom: "from-red-500/20",
    gradientTo: "to-red-600/20",
  },
  notFound: {
    icon: SearchX,
    defaultTitle: "errors.notFound",
    defaultMessage: "errors.somethingWentWrong",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-purple-600/20",
  },
  timeout: {
    icon: Clock,
    defaultTitle: "errors.somethingWentWrong",
    defaultMessage: "errors.networkError",
    gradientFrom: "from-yellow-500/20",
    gradientTo: "to-orange-600/20",
  },
  unknown: {
    icon: AlertCircle,
    defaultTitle: "errors.somethingWentWrong",
    defaultMessage: "errors.somethingWentWrong",
    gradientFrom: "from-red-500/20",
    gradientTo: "to-red-600/20",
  },
};

export interface ReactQueryErrorStateProps {
  error: unknown;
  retry?: () => void;
  title?: string;
  description?: string;
  showRetry?: boolean;
  fullscreen?: boolean;
  className?: string;
}

const ReactQueryErrorState = memo(function ReactQueryErrorState({
  error,
  retry,
  title,
  description,
  showRetry = true,
  fullscreen = false,
  className,
}: ReactQueryErrorStateProps) {
  const { t } = useTranslation();

  const errorType = useMemo(() => classifyQueryError(error), [error]);
  const config = ERROR_CONFIG[errorType];
  const IconComponent = config.icon;
  const errorMessage = useMemo(() => extractQueryErrorMessage(error), [error]);

  const resolvedTitle = title ?? t(config.defaultTitle);
  const resolvedDescription = description ?? (errorMessage || t(config.defaultMessage));

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center relative overflow-hidden",
        fullscreen
          ? "fixed inset-0 z-50 bg-background"
          : "w-full h-full min-h-[200px] p-6",
        className,
      )}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-b opacity-20",
          config.gradientFrom,
          config.gradientTo,
        )}
        aria-hidden="true"
      />

      <div className="flex items-center justify-center rounded-full bg-destructive/10 dark:bg-destructive/20 mb-6 w-20 h-20">
        <IconComponent className="w-10 h-10 text-destructive" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-2">{resolvedTitle}</h2>

      <p className="text-muted-foreground max-w-md mb-2">{resolvedDescription}</p>

      {retry && showRetry && (
        <Button
          onClick={retry}
          variant="default"
          size="lg"
          className={cn(
            "mt-4 min-w-[120px]",
            "bg-netflix-red hover:bg-netflix-red-hover",
            "transition-colors duration-200",
          )}
          aria-label={`${t("common.retry")}: ${resolvedTitle}`}
        >
          <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
          {t("common.retry")}
        </Button>
      )}
    </div>
  );
});

export { ReactQueryErrorState };
