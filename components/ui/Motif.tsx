import Image from "next/image";

import type { MotifName } from "@/lib/content";

export function Motif({
  name,
  width = 120,
  height = 90,
  className,
}: {
  name: MotifName;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={`/motifs/${name}.svg`}
      alt=""
      aria-hidden
      width={width}
      height={height}
      unoptimized
      className={className}
    />
  );
}
