export const Header = () => {
  return (
    <header className="relative py-8 px-4 text-center animate-fadeIn">
      
      {/* Glow superior */}
      <div className="absolute inset-0 -top-10 left-0 right-0 mx-auto w-60 h-32 bg-blue-500/20 blur-[90px] rounded-full"></div>

      {/* Card glass del header */}
      <div className="glass-header mx-auto max-w-md p-5 rounded-2xl border border-white/20 shadow-xl relative z-10">

        {/* ICONO CENTRAL */}
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(0,150,255,0.6)] flex items-center justify-center">
            <span className="text-2xl text-white drop-shadow-lg">🎤</span>
          </div>
        </div>

        {/* TITULO */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md tracking-wide">
          Prompt AI
        </h1>

        {/* SUBTITULO */}
        <p className="text-white/70 mt-1 text-sm sm:text-base">
          Genera prompts profesionales usando tu voz
        </p>
      </div>

      {/* Estilos Glass + Animaciones */}
      <style>{`
        .glass-header {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 1rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out forwards;
        }
      `}</style>
    </header>
  );
};