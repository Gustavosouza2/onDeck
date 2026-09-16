import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-(length:--text-label) font-medium tracking-(--tracking-label) uppercase ${className}`}
    >
      {children}
    </span>
  );
}
