import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Button Variants with Accessibility Improvements
 *
 * ACCESSIBILITY FIX: All button sizes now meet WCAG 2.1 minimum touch target
 * requirements of 48px × 48px (24px × 24px minimum with adequate spacing).
 *
 * Changes made:
 * - default: h-9 → min-h-[48px] (was 36px, now 48px for touch accessibility)
 * - sm: h-8 → min-h-[48px] (was 32px, now 48px)
 * - lg: h-10 → min-h-[48px] (was 40px, now 48px)
 * - icon: size-9 → min-w-[48px] min-h-[48px] (was 36px)
 * - xs/sm icon sizes increased to meet touch target requirements
 * - Added touch-manipulation for better mobile touch behavior
 * - Added adequate spacing between interactive elements
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // ACCESSIBILITY: Minimum 48px touch target for all sizes
        default: "min-h-[48px] px-4 py-3 has-[>svg]:px-3",
        xs: "min-h-[48px] min-w-[48px] gap-1 rounded-md px-3 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-4",
        sm: "min-h-[48px] rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "min-h-[48px] rounded-md px-6 has-[>svg]:px-4",
        // Icon buttons: 48px × 48px minimum touch target
        icon: "min-w-[48px] min-h-[48px]",
        "icon-xs":
          "min-w-[48px] min-h-[48px] rounded-md [&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "min-w-[48px] min-h-[48px]",
        "icon-lg": "min-w-[48px] min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
