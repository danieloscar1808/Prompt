import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  // Detectar si estamos en GitHub Pages
  const isGithub = window.location.hostname.includes("github.io");

  useEffect(() => {
    const handler = (e: any) => {
      // Solo mostrar si estamos en GitHub Pages
      if (!isGithub) return;

      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isGithub]);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      setVisible(false);
      localStorage.setItem("pwa-installed", "true");
    }
  };

  // Si ya está instalada, no mostrar el botón
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setVisible(false);
      localStorage.setItem("pwa-installed", "true");
    }
  }, []);

  if (!visible || !isGithub || localStorage.getItem("pwa-installed") === "true") {
    return null;
  }

  return (
    <button
      onClick={installApp}
      className="install-button-glass"
    >
      Instalar App
    </button>
  );
}