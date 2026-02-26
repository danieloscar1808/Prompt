import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ✔ Registrar Service Worker para Vite PWA
import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log("Nueva versión disponible. Refresca la página.");
  },
  onOfflineReady() {
    console.log("La app está lista para funcionar offline.");
  }
});

createRoot(document.getElementById("root")!).render(<App />);