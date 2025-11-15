"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  trigger?: "hover" | "always" | "scroll";
}

export default function GlitchText({
  text,
  className = "",
  trigger = "hover"
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(trigger === "always");

  useEffect(() => {
    if (trigger === "always") {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [trigger]);

  const glitchVariants = {
    normal: {
      x: 0,
      filter: "none",
    },
    glitch: {
      x: [0, -2, 2, -2, 0],
      filter: [
        "none",
        "hue-rotate(90deg)",
        "hue-rotate(-90deg)",
        "hue-rotate(90deg)",
        "none",
      ],
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => trigger === "hover" && setIsGlitching(true)}
      onMouseLeave={() => trigger === "hover" && setIsGlitching(false)}
      animate={isGlitching ? "glitch" : "normal"}
      variants={glitchVariants}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-cyan opacity-70"
            animate={{
              x: [-2, 2, -2],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 0.15,
              repeat: 2,
            }}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            {text}
          </motion.span>

          <motion.span
            className="absolute inset-0 text-pink-500 opacity-70"
            animate={{
              x: [2, -2, 2],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 0.15,
              repeat: 2,
            }}
            style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.span>
  );
}
