// src/layout/header/components/authButton/AuthButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
}

export default function AuthButton({
  label,
  onClick,
  className,
  ...props
}: AuthButtonProps) {
  return (
    <Button
      className={cn(
        "dark:bg-[var(--primary)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--hover-bg)] rounded px-5 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
}
