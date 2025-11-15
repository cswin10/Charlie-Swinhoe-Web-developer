"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Zap } from "lucide-react";

interface Command {
  id: string;
  label: string;
  description: string;
  action: () => void;
  icon?: React.ReactNode;
  category: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: Command[] = [
    {
      id: "projects",
      label: "View Projects",
      description: "See all my work and builds",
      action: () => router.push("/projects"),
      icon: <Zap size={18} />,
      category: "Navigation",
    },
    {
      id: "about",
      label: "About Me",
      description: "Learn more about my journey",
      action: () => router.push("/about"),
      icon: <Zap size={18} />,
      category: "Navigation",
    },
    {
      id: "blog",
      label: "Read Blog",
      description: "Thoughts on building and shipping",
      action: () => router.push("/blog"),
      icon: <Zap size={18} />,
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Get in Touch",
      description: "Let's build something together",
      action: () => router.push("/contact"),
      icon: <Zap size={18} />,
      category: "Navigation",
    },
    {
      id: "home",
      label: "Home",
      description: "Back to the beginning",
      action: () => router.push("/"),
      icon: <Zap size={18} />,
      category: "Navigation",
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setSearch("");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  }, []);

  const handleExecute = useCallback(
    (command: Command) => {
      command.action();
      handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpen();
      }

      // Escape to close
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }

      if (!isOpen) return;

      // Arrow navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }

      // Enter to execute
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        handleExecute(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, handleOpen, handleClose, handleExecute]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="fixed bottom-8 right-8 z-40 px-4 py-3 bg-cyan/10 border border-cyan/30 rounded-lg backdrop-blur-sm hover:bg-cyan/20 transition-all group"
      >
        <div className="flex items-center gap-2 text-cyan">
          <Command size={18} />
          <span className="text-sm font-medium">Press ⌘K</span>
        </div>
      </motion.button>

      {/* Command Palette Modal */}
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

            {/* Palette */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full max-w-2xl bg-black/90 border border-cyan/30 rounded-2xl shadow-2xl shadow-cyan/20 overflow-hidden backdrop-blur-xl"
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                  <Search className="text-cyan" size={20} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-lg"
                    autoFocus
                  />
                  <kbd className="px-2 py-1 text-xs bg-white/10 rounded text-white/60">
                    ESC
                  </kbd>
                </div>

                {/* Commands List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {filteredCommands.length === 0 ? (
                    <div className="px-6 py-8 text-center text-white/40">
                      No commands found
                    </div>
                  ) : (
                    <div className="py-2">
                      {filteredCommands.map((command, index) => (
                        <motion.button
                          key={command.id}
                          onClick={() => handleExecute(command)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          whileHover={{ x: 4 }}
                          className={`w-full px-6 py-3 flex items-center gap-4 transition-all ${
                            index === selectedIndex
                              ? "bg-cyan/20 border-l-2 border-cyan"
                              : "hover:bg-white/5"
                          }`}
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-cyan/20 rounded-lg text-cyan">
                            {command.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-white font-medium">
                              {command.label}
                            </div>
                            <div className="text-sm text-white/50">
                              {command.description}
                            </div>
                          </div>
                          {index === selectedIndex && (
                            <ArrowRight className="text-cyan" size={18} />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span>⌘K to open</span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
