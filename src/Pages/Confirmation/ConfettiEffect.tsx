
import React from "react";
import { PartyPopper, Gift, Sparkles } from "lucide-react";

interface ConfettiEffectProps {
  show: boolean;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute top-0 left-1/4 animate-[fade-in_0.5s,fall_5s_ease-out] opacity-0 after:opacity-100">
        <PartyPopper className="h-12 w-12 text-primary" />
      </div>
      <div className="absolute top-0 right-1/4 animate-[fade-in_0.5s,fall_4s_ease-out] delay-300 opacity-0 after:opacity-100">
        <Gift className="h-10 w-10 text-secondary" />
      </div>
      <div className="absolute top-0 left-1/2 animate-[fade-in_0.5s,fall_6s_ease-out] delay-700 opacity-0 after:opacity-100">
        <Sparkles className="h-8 w-8 text-amber-500" />
      </div>
    </div>
  );
};
