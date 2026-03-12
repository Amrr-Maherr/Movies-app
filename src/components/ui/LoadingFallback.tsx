import { memo } from "react";

export const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="py-12 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
});
