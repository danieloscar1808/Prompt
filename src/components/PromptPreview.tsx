import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromptPreviewProps {
  prompt: string;
  isEmpty: boolean;
}

export const PromptPreview = ({ prompt, isEmpty }: PromptPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className={cn(
      "rounded-lg p-3 sm:p-4 shadow-card animate-fade-in backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-lg",
      isEmpty ? "bg-card/10" : "bg-card/40"
    )}>
      <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <Sparkles size={18} className="text-primary flex-shrink-0 sm:w-5 sm:h-5" />
          <h2 className="font-display font-semibold text-foreground text-sm sm:text-base truncate">
            Prompt Generado
          </h2>
        </div>
        <Button
          onClick={handleCopy}
          disabled={isEmpty}
          variant="outline"
          size="sm"
          className={cn(
            "gap-1.5 sm:gap-2 transition-all text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9 flex-shrink-0",
            copied && "bg-success text-success-foreground border-success"
          )}
        >
          {copied ? (
            <>
              <Check size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">¡Copiado!</span>
              <span className="xs:hidden">✓</span>
            </>
          ) : (
            <>
              <Copy size={14} className="sm:w-4 sm:h-4" />
              Copiar
            </>
          )}
        </Button>
      </div>

      <div
        className={cn(
          "bg-background rounded-md p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] border border-border",
          isEmpty && "flex items-center justify-center"
        )}
      >
        {isEmpty ? (
          <p className="text-muted-foreground text-center text-xs sm:text-sm px-2">
            Completa al menos un campo para ver el prompt generado
          </p>
        ) : (
          <pre className="whitespace-pre-wrap text-xs sm:text-sm text-foreground font-sans leading-relaxed">
            {prompt}
          </pre>
        )}
      </div>
    </div>
  );
};
