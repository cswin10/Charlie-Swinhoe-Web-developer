"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, Eye, X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");

    if (!cookiesAccepted) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Trigger glitch effect on appear
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 600);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setGlitchActive(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            ...(glitchActive && {
              x: [0, -3, 3, -2, 2, 0],
            })
          }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100] ${glitchActive ? 'animate-glitch' : ''}`}
        >
          <div className="relative glass border-2 border-cyan rounded-2xl p-6 shadow-2xl shadow-cyan/20 bg-black/90">
            {/* Close button */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
              aria-label="Decline cookies"
            >
              <X size={20} />
            </button>

            {/* Glitch border effect */}
            {glitchActive && (
              <div className="absolute inset-0 border-2 border-cyan rounded-2xl opacity-50 animate-pulse" />
            )}

            {/* Icon */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-cyan/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Cookie className="text-cyan" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Cookie <span className="text-cyan">Protocol</span>
                </h3>
                <p className="text-sm text-white/70">
                  We use cookies to enhance your experience and analyze site traffic. Essential for optimal performance.
                </p>
              </div>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan/10 rounded-full border border-cyan/20">
                <Shield className="text-cyan" size={14} />
                <span className="text-xs text-cyan">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan/10 rounded-full border border-cyan/20">
                <Eye className="text-cyan" size={14} />
                <span className="text-xs text-cyan">Analytics Only</span>
              </div>
            </div>

            {/* Legal links */}
            <div className="text-xs text-white/50 mb-4">
              Read our{" "}
              <Link href="/cookies" className="text-cyan hover:underline">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-cyan hover:underline">
                Terms of Use
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 bg-cyan text-black font-semibold rounded-lg hover:bg-cyan/90 transition-all"
              >
                Accept
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDecline}
                className="px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all text-sm text-white/80"
              >
                Decline
              </motion.button>
            </div>

            {/* Scan line animation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
              animate={{
                left: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
