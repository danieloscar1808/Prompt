import { useState } from "react";
import { Mic, MicOff, Square } from "lucide-react";
import { cn } from "@/lib/utils";
interface VoiceRecordButtonProps {
  isRecording: boolean;
  isSupported: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}
export const VoiceRecordButton = ({
  isRecording,
  isSupported,
  onToggle,
  size = "md"
}: VoiceRecordButtonProps) => {
  const [ripples, setRipples] = useState<{
    id: number;
    x: number;
    y: number;
  }[]>([]);
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };
  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const id = Date.now();
    setRipples(prev => [...prev, {
      id,
      x,
      y
    }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
    onToggle();
  };
  if (!isSupported) {
    return <button disabled className={cn(sizeClasses[size], "rounded-full bg-muted flex items-center justify-center cursor-not-allowed opacity-50")} title="Grabación de voz no soportada en este navegador">
        <MicOff size={iconSizes[size]} className="text-muted-foreground" />
      </button>;
  }
  return <div className="relative">
      {/* Pulse rings when recording */}
      {isRecording && <>
          <div className={cn(sizeClasses[size], "absolute inset-0 rounded-full bg-recording/30 animate-pulse-ring")} />
          <div className={cn(sizeClasses[size], "absolute inset-0 rounded-full bg-recording/20 animate-pulse-ring")} style={{
        animationDelay: "0.5s"
      }} />
        </>}

      <button onClick={handleClick} className={cn("relative overflow-hidden transition-all duration-300 border-solid flex-col text-success-foreground text-lg font-semibold border-2 opacity-80 flex items-center justify-center gap-0 font-serif rounded-full shadow-lg border-muted-foreground bg-lime-300 hover:bg-lime-200", sizeClasses[size], isRecording ? "bg-recording text-primary-foreground shadow-button animate-pulse-dot" : "bg-primary text-primary-foreground shadow-button hover:scale-105 active:scale-95")}>
        {/* Ripple effects */}
        {ripples.map(ripple => <span key={ripple.id} className="absolute rounded-full bg-white/40 animate-ripple pointer-events-none" style={{
        left: ripple.x,
        top: ripple.y,
        width: "10px",
        height: "10px"
      }} />)}
        {isRecording ? <Square size={iconSizes[size]} className="fill-current" /> : <Mic size={iconSizes[size]} />}
      </button>
    </div>;
};