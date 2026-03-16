"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

// Combine motion props with our custom props
type CombinedProps = ButtonProps & HTMLMotionProps<"button">;

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  glow = true,
  children,
  ...props
}: CombinedProps) => {
  const variants = {
    primary: "bg-cyber-green text-black hover:bg-opacity-80 border-transparent",
    secondary: "bg-cyber-blue text-black hover:bg-opacity-80 border-transparent",
    danger: "bg-cyber-red text-white hover:bg-opacity-80 border-transparent",
    outline: "bg-transparent text-cyber-green border-cyber-green hover:bg-cyber-green hover:text-black",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm font-medium",
    md: "px-6 py-2.5 text-base font-bold uppercase tracking-wider",
    lg: "px-10 py-4 text-xl font-black uppercase tracking-widest",
  };

  const glowStyles = {
    primary: "shadow-neon-green/50 hover:shadow-neon-green",
    secondary: "shadow-neon-blue/50 hover:shadow-neon-blue",
    danger: "shadow-neon-red/50 hover:shadow-neon-red",
    outline: "shadow-neon-green/20 hover:shadow-neon-green/50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative rounded-md border-2 transition-all duration-300",
        variants[variant],
        sizes[size],
        glow && glowStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
