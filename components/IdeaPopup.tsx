"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send } from "lucide-react";

export default function IdeaPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", idea: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = sessionStorage.getItem("hasSeenIdeaPopup");

    if (!hasSeenPopup) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenIdeaPopup", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const formDataToSend = new URLSearchParams();
      formDataToSend.append("form-name", "idea-popup");
      formDataToSend.append("email", formData.email);
      formDataToSend.append("idea", formData.idea);

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataToSend.toString(),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setStatus("idle");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("idle");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg px-4"
            style={{
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative bg-black border-2 border-cyan rounded-2xl p-8 shadow-2xl shadow-cyan/20">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-cyan" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan mb-2">Amazing! 🚀</h3>
                  <p className="text-white/80">
                    I'll be in touch soon to discuss your idea.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Icon */}
                  <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="text-cyan" size={32} />
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-center mb-3">
                    Got a <span className="text-cyan">Wild Idea</span>?
                  </h2>

                  {/* Subtitle */}
                  <p className="text-center text-white/70 mb-8">
                    In your wildest dreams, what does your tech-based idea look like?
                    Tell me about it—I might just build it with you.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="popup-email" className="block text-sm font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="popup-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan focus:outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Idea */}
                    <div>
                      <label htmlFor="popup-idea" className="block text-sm font-medium mb-2">
                        Your Idea
                      </label>
                      <textarea
                        id="popup-idea"
                        name="idea"
                        value={formData.idea}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan focus:outline-none transition-colors resize-none"
                        placeholder="Describe your wildest tech idea..."
                      />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-cyan text-black font-semibold rounded-lg hover:bg-cyan/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ⚡
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Share Your Idea
                          <Send size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Dismissal hint */}
                  <p className="text-center text-white/40 text-xs mt-4">
                    Not now? Click anywhere outside to close.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
