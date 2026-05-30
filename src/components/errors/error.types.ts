import type { LucideIcon } from "lucide-react";

export type QueryErrorType = "network" | "server" | "notFound" | "timeout" | "unknown";

export interface QueryErrorConfig {
  icon: LucideIcon;
  defaultTitle: string;
  defaultMessage: string;
  gradientFrom: string;
  gradientTo: string;
}
