import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { GROUND } from "@/lib/brand";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "OnDeck",
  description:
    "Guia da equipe de mídia: o passo a passo de cada departamento do culto.",
  applicationName: "OnDeck",
  appleWebApp: {
    capable: true,
    title: "OnDeck",
    statusBarStyle: "black-translucent",
  },
  icons: { apple: "/icons/apple-icon.png" },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  // OnDeck is dark, full stop: a volunteer reads it in a dim room, and the
  // room does not change with the phone's setting. Next renders both metas,
  // so the browser chrome and its form controls match the app from the first
  // paint, with no script and nothing to flash.
  colorScheme: "dark",
  themeColor: GROUND,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
