import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-cyber-green text-sm uppercase tracking-widest font-bold">
            {label}
          </label>
        )}
        <input
          className={cn(
            "w-full bg-black/50 border-2 border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/30",
            "focus:outline-none focus:border-cyber-green focus:shadow-neon-green transition-all duration-300",
            error && "border-cyber-red focus:border-cyber-red focus:shadow-neon-red",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-cyber-red text-xs italic uppercase">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
