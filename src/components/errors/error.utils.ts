import type { QueryErrorType } from "./error.types";

export function classifyQueryError(error: unknown): QueryErrorType {
  if (!error) return "unknown";

  if (error instanceof Error) {
    const msg = error.message.toLowerCase();

    if (
      msg.includes("network error") ||
      msg.includes("failed to fetch") ||
      msg.includes("network") ||
      msg.includes("enotfound") ||
      msg.includes("econnrefused") ||
      msg.includes("econnreset")
    ) {
      return "network";
    }

    if (msg.includes("timeout") || msg.includes("time out") || msg.includes("abort")) {
      return "timeout";
    }

    if (msg.includes("404") || msg.includes("not found") || msg.includes("no data")) {
      return "notFound";
    }

    if (
      msg.includes("500") ||
      msg.includes("502") ||
      msg.includes("503") ||
      msg.includes("5xx") ||
      msg.includes("server error") ||
      msg.includes("internal server")
    ) {
      return "server";
    }
  }

  const err = error as Record<string, unknown>;
  const status =
    (err as any)?.response?.status ?? (err as any)?.status ?? (err as any)?.statusCode;

  if (status === 404) return "notFound";
  if (status && status >= 500 && status < 600) return "server";
  if (status === 408 || status === 429) return "timeout";

  return "unknown";
}

export function extractQueryErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    const axiosMsg = (err as any)?.response?.data?.status_message;
    if (axiosMsg && typeof axiosMsg === "string") return axiosMsg;
    if (err.message && typeof err.message === "string") return err.message;
  }
  return "";
}
