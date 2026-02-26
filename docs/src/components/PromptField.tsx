import { useState, useEffect } from "react";
import { VoiceRecordButton } from "./VoiceRecordButton";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
interface PromptFieldProps {
  label: string;
  placeholder: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  descriptionAction?: React.ReactNode;
}
export const PromptField = ({
  label,
  placeholder,
  description,
  value,
  onChange,
  icon,
  descriptionAction
}: PromptFieldProps) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();
  const [localValue, setLocalValue] = useState(value);

  // Sync transcript to local value when recording stops
  useEffect(() => {
    if (transcript && !isListening) {
      const newValue = localValue ? `${localValue} ${transcript}`.trim() : transcript;
      setLocalValue(newValue);
      onChange(newValue);
      resetTranscript();
    }
  }, [transcript, isListening]);

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const handleToggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };
  const displayValue = isListening ? `${localValue}${localValue ? " " : ""}${interimTranscript}` : localValue;
  const hasContent = displayValue.trim().length > 0;
  
  return <div className={cn(
    "rounded-lg p-3 sm:p-4 shadow-card transition-all duration-300 animate-fade-in hover:shadow-lg hover:translate-y-[-2px] backdrop-blur-md border border-white/20",
    hasContent ? "bg-card/40" : "bg-card/10",
    isListening && "ring-2 ring-recording/50 scale-[1.01]"
  )}>
      <div className="flex items-start gap-2 sm:gap-4">
        {/* Icon and Label */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <span className="text-primary flex-shrink-0">{icon}</span>
            <label className="font-semibold text-foreground text-sm sm:text-base font-serif">
              {label}
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <p className="text-xs sm:text-sm text-muted-foreground font-serif">{description}</p>
            {descriptionAction}
          </div>

          {/* Textarea */}
          <Textarea value={displayValue} onChange={handleTextChange} placeholder={placeholder} className={cn("min-h-[60px] sm:min-h-[80px] resize-none bg-background border-border focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base focus:shadow-md focus:border-primary/50", isListening && "border-recording")} disabled={isListening} />

          {isListening && <p className="text-xs text-recording mt-1.5 sm:mt-2 animate-pulse">
              🎙️ Escuchando... Habla ahora
            </p>}
        </div>

        {/* Record Button */}
        <div className="flex-shrink-0 pt-5 sm:pt-6">
          <VoiceRecordButton isRecording={isListening} isSupported={isSupported} onToggle={handleToggleRecording} size="md" />
        </div>
      </div>
    </div>;
};