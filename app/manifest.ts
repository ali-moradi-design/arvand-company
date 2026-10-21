import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arvand Partners",
    short_name: "Arvand",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#0f2a47",
    background_color: "#faf8f4",
    display: "standalone",
    start_url: "/en/",
  };
}
