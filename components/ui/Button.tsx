"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "px-8 py-4 rounded-lg font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-cyan text-black hover:bg-cyan/90 hover:shadow-lg hover:shadow-cyan/50",
    secondary: "bg-white text-black hover:bg-white/90",
    outline: "border-2 border-cyan text-cyan hover:bg-cyan hover:text-black",
  };

  return (
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <button
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}
