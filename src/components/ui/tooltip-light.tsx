import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({ className, ...props }: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      sideOffset={6}
      className={`z-50 rounded-md border bg-white px-3 py-1.5 text-xs shadow-md ${className}`}
      {...props}
    />
  );
}