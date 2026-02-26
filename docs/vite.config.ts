import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const repoName = "Prompt";

export default defineConfig({
  base: `/${repoName}/`,

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null, // no genera sw-disabled.js
      disable: false,       // no desactiva PWA

      // 🚫 ELIMINADO: NO usar injectManifest
      // strategies: "injectManifest",
      // srcDir: "src",
      // filename: "sw-disabled.js",

      manifest: {
        name: "Prompt AI",
        short_name: "Prompt",
        description: "Aplicación PWA optimizada para generación de prompts.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        scope: "./",
        start_url: "./",
        display: "standalone",
        orientation: "portrait",

        icons: [
          { src: "icons/icon-1024.png", sizes: "1024x1024", type: "image/png", purpose: "any maskable" },
          { src: "icons/icon-72.png", sizes: "72x72", type: "image/png" },
          { src: "icons/icon-96.png", sizes: "96x96", type: "image/png" },
          { src: "icons/icon-128.png", sizes: "128x128", type: "image/png" },
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-256.png", sizes: "256x256", type: "image/png" },
          { src: "icons/icon-384.png", sizes: "384x384", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },

      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,webmanifest,svg}"],
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