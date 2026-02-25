import { Mic, Square } from "lucide-react";
import { useState } from "react";

interface Props {
  onStart: () => void;
  onStop: () => void;
  isRecording: boolean;
}

export default function VoiceButton({ onStart, onStop, isRecording }: Props) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    onStart();
  };

  const handleRelease = () => {
    setPressed(false);
    onStop();
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all 
        ${
          isRecording
            ? "bg-red-500 shadow-[0_0_20px_rgba(255,60,60,0.8)] animate-recordPulse"
            : "bg-white/10 border border-white/30 backdrop-blur-xl shadow-[0_0_15px_rgba(0,140,255,0.6)]"
        }
        hover:scale-105 active:scale-95
        `}
        
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
      >
        {isRecording ? (
          <Square size={36} className="text-white drop-shadow" />
        ) : (
          <Mic size={36} className="text-white drop-shadow" />
        )}

        {/* Anillo Pulse exterior */}
        {!isRecording && (
          <span className="absolute inset-0 rounded-full ring-2 ring-blue-400/80 blur-[2px] animate-pulseSlow"></span>
        )}

        {/* Glow dinámico al presionar */}
        {pressed && (
          <span className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl animate-pressGlow"></span>
        )}
      </button>

      {/* Animaciones */}
      <style>{`
        @keyframes recordPulse {
          0% { transform: scale(1); box-shadow: 0 0 18px rgba(255, 40, 40, 0.8); }
          50% { transform: scale(1.08); box-shadow: 0 0 28px rgba(255, 80, 80, 1); }
          100% { transform: scale(1); box-shadow: 0 0 18px rgba(255, 40, 40, 0.8); }
        }
        .animate-recordPulse {
          animation: recordPulse 1.2s infinite ease-in-out;
        }

        @keyframes pulseSlow {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        .animate-pulseSlow {
          animation: pulseSlow 2.4s infinite ease-in-out;
        }

        @keyframes pressGlow {
          0% { opacity: 0; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.35); }
        }
        .animate-pressGlow {
          animation: pressGlow 0.35s ease-out forwards;
        }
      `}</style>
    </div>
  );
}