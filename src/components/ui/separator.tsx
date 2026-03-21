import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Memoized Separator Component
 *
 * A visual divider component that can be horizontal or vertical.
 * Memoized to prevent unnecessary re-renders when used in lists or complex layouts.
 */
const Separator = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      orientation?: "horizontal" | "vertical";
    }
  >(({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn(
        "shrink-0 bg-neutral-700",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  )),
);
Separator.displayName = "Separator";

export { Separator };
