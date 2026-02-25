import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center relative">

      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,20,255,0.55),_transparent_70%)] blur-3xl opacity-40" />

      <div className="glass p-10 rounded-2xl max-w-md w-full relative animate-fade-in">

        {/* 404 animado */}
        <h1 className="text-6xl font-bold text-purple-300 drop-shadow-[0_0_16px_rgba(160,60,255,0.7)] animate-float">
          404
        </h1>

        <p className="mt-4 text-purple-200 text-lg">
          La página que buscas no existe.
        </p>

        <p className="text-purple-300 mt-2 opacity-70">
          Puede que el enlace esté roto o haya sido movido.
        </p>

        {/* Botón regresar */}
        <Link
          to="/"
          className="
            mt-6 inline-block px-6 py-3 rounded-xl font-semibold
            text-white transition-all

            bg-white/15 backdrop-blur-xl 
            border border-purple-400/40

            hover:bg-purple-500/30
            hover:border-purple-400/80
            hover:shadow-[0_0_18px_rgba(180,60,255,0.6)]
            active:scale-95
          "
        >
          Volver al inicio
        </Link>
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}