import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "green" | "blue" | "red";
  title?: string;
}

export const CyberCard = ({ children, className, variant = "green", title }: CyberCardProps) => {
  const borderColors = {
    green: "glow-border-green",
    blue: "glow-border-blue",
    red: "glow-border-red",
  };

  const textColors = {
    green: "text-cyber-green",
    blue: "text-cyber-blue",
    red: "text-cyber-red",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-black/40 backdrop-blur-xl rounded-lg p-6 transition-all duration-300",
        borderColors[variant],
        className
      )}
    >
      {title && (
        <h3 className={cn("text-lg font-black uppercase tracking-widest mb-4 italic", textColors[variant])}>
          {title}
        </h3>
      )}
      {children}
    </motion.div>
  );
};
