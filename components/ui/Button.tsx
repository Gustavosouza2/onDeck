"use client";

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

type Variant = "primary" | "outline";
type Size = "sm" | "lg";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-(--accent) text-ink border-transparent active:bg-(--accent-press)",
  outline:
    "bg-transparent text-(--color-title) border-(--border-strong) active:bg-(--surface-input)",
};

const SIZE: Record<Size, string> = {
  sm: "h-(--control-h-sm) px-(--space-5) text-(length:--text-xs)",
  lg: "h-(--control-h-lg) px-(--space-7) text-(length:--text-base)",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  className = "",
  ref,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      className={`${VARIANT[variant]} ${SIZE[size]} ${
        fullWidth ? "w-full" : ""
      } inline-flex cursor-pointer items-center justify-center gap-(--space-3) rounded-control border font-semibold whitespace-nowrap transition-colors duration-(--dur-fast) disabled:cursor-not-allowed disabled:opacity-(--disabled-opacity) focus-visible:outline-2 focus-visible:outline-offset-(--focus-offset) focus-visible:outline-(--accent) ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
