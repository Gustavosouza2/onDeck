import type { MetadataRoute } from "next";

import { GROUND } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OnDeck — Equipe de Mídia",
    short_name: "OnDeck",
    description:
      "O passo a passo de cada departamento da mídia, na ordem em que acontece no culto.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "pt-BR",
    dir: "ltr",
    background_color: GROUND.dark,
    theme_color: GROUND.dark,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
