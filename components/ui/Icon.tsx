import {
  ArrowUpRight,
  Camera,
  ChevronDown,
  ChevronLeft,
  Download,
  Film,
  type LucideProps,
  MonitorPlay,
  Moon,
  PenTool,
  Radio,
  Sun,
  SunMoon,
  Video,
} from "lucide-react";

const ICONS = {
  "arrow-up-right": ArrowUpRight,
  camera: Camera,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  download: Download,
  film: Film,
  "monitor-play": MonitorPlay,
  moon: Moon,
  "pen-tool": PenTool,
  radio: Radio,
  sun: Sun,
  "sun-moon": SunMoon,
  video: Video,
} as const;

export type IconName = keyof typeof ICONS;

export const ICON_SIZE = {
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
} as const;

export type IconSize = keyof typeof ICON_SIZE;

type IconProps = Omit<LucideProps, "ref" | "strokeWidth" | "size"> & {
  name: IconName;
  size?: IconSize;
};

export function Icon({ name, size = "lg", className = "", ...props }: IconProps) {
  const Glyph = ICONS[name];

  return (
    <Glyph
      size={ICON_SIZE[size]}
      aria-hidden
      focusable={false}
      className={`[stroke-width:var(--stroke-icon)] ${className}`}
      {...props}
    />
  );
}
