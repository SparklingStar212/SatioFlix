// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically refreshes the app when updates are pushed
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "SatioFlix - Global Culinary Reels",
        short_name: "SatioFlix",
        description: "Immersive global recipe feed and video reels platform",
        theme_color: "#f43f5e", // Matches your gorgeous rose-500 theme
        background_color: "#09090b", // Matches zinc-950 dark background
        display: "standalone", // Hides the browser URL bar on mobile!
        orientation: "portrait",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
