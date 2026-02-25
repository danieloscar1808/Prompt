//import { useTheme } from "next-themes";
//import { Moon, Sun } from "lucide-react";
//import { Button } from "@/components/ui/button";
//export const Header = () => {
  //<const {
   // theme,
   // setTheme
  //} = useTheme();
  //const toggleTheme = () => {
   // setTheme(theme === "dark" ? "light" : "dark");
  //};
  //return <header className="py-4 sm:py-6 px-3 sm:px-4 text-center relative">
     // <Button variant="ghost" size="icon" onClick={toggleTheme} className="absolute right-3 top-4 sm:right-4 sm:top-6 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Cambiar tema">
      //  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      //  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-slate-50 bg-transparent" />
     // </Button>
    //  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
     //   <h1 className="text-4xl text-destructive-foreground font-semibold text-center sm:text-xl font-serif">Prompt Generator</h1>
    //  </div>
    //  <p className="text-xs max-w-xs mx-auto text-destructive-foreground sm:text-lg font-serif">Prompts para IA usando tu voz</p>
   // </header>;
//};

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