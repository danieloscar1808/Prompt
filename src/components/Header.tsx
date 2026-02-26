export const Header = () => {
  return (
    <header className="py-4 sm:py-6 px-3 sm:px-4 text-center relative">

      {/* Selector de tema eliminado */}

      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
        <h1 className="text-4xl text-destructive-foreground font-semibold text-center sm:text-xl font-serif">
          Prompt Generator
        </h1>
      </div>

      <p className="text-xs max-w-xs mx-auto text-destructive-foreground sm:text-lg font-serif">
        Prompts para IA usando tu voz
      </p>
    </header>
  );
};