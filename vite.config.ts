import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// 📌 Reemplaza "Prompt" por el nombre EXACTO de tu repo
const repoName = "Prompt";

export default defineConfig({
  base: `/${repoName}/`,

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      // ❗IMPORTANTE: No incluimos background.png ni ningún asset obsoleto
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "icons/icon-72.png",
        "icons/icon-96.png",
        "icons/icon-128.png",
        "icons/icon-192.png",
        "icons/icon-256.png",
        "icons/icon-384.png",
        "icons/icon-512.png"
      ],

      manifest: {
        name: "Prompt AI",
        short_name: "Prompt",
        description: "Aplicación PWA optimizada para generación de prompts y herramientas AI.",
        theme_color: "#000000",
        background_color: "#FFFFFF",
        scope: "./",
        start_url: "./",
        display: "standalone",
        orientation: "portrait",

        icons: [
          { src: "icons/icon-72.png",  sizes: "72x72",   type: "image/png" },
          { src: "icons/icon-96.png",  sizes: "96x96",   type: "image/png" },
          { src: "icons/icon-128.png", sizes: "128x128", type: "image/png" },
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-256.png", sizes: "256x256", type: "image/png" },
          { src: "icons/icon-384.png", sizes: "384x384", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },

      workbox: {
        // ✔ Limpia cualquier cache vieja (incluyendo background.png)
        cleanupOutdatedCaches: true,

        // ✔ Mantiene solo assets válidos
        globPatterns: ["**/*.{js,css,html,ico,png,webmanifest,svg}"],

        // ✔ Evita que se generen rutas obsoletas
        navigateFallback: "index.html"
      }
    })
  ],
  resolve: {
      alias: {
      "@": "/src"
    }
  }
});