import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // Si querés mantener un log, lo pasamos a warn (no aparece como error)
  useEffect(() => {
    console.warn(`Route not found: ${location.pathname}`);
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-lg opacity-80">
        La ruta <strong>{location.pathname}</strong> no existe en esta aplicación.
      </p>
    </div>
  );
};

export default NotFound;
