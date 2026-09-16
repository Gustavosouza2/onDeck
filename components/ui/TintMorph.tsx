import { ViewTransition } from "react";
import type { ReactNode } from "react";

export function TintMorph({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <ViewTransition name={`tint-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
