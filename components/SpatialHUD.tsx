'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  FolderKanban,
  BookOpen,
  User,
  Mail,
  Navigation2,
  Zap,
  Eye
} from 'lucide-react';

interface Section {
  id: string;
  name: string;
  icon: any;
  path: string;
  shortcut: string;
  color: string;
}

const sections: Section[] = [
  { id: 'home', name: 'Home', icon: Home, path: '/', shortcut: '1', color: '#32FAC7' },
  { id: 'projects', name: 'Projects', icon: FolderKanban, path: '/projects', shortcut: '2', color: '#32FAC7' },
  { id: 'blog', name: 'Blog', icon: BookOpen, path: '/blog', shortcut: '3', color: '#32FAC7' },
  { id: 'about', name: 'About', icon: User, path: '/about', shortcut: '4', color: '#32FAC7' },
  { id: 'contact', name: 'Contact', icon: Mail, path: '/contact', shortcut: '5', color: '#32FAC7' },
];

const SpatialHUD = () => {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [contextualAction, setContextualAction] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  // Determine current section based on pathname
  useEffect(() => {
    const currentIndex = sections.findIndex(s => {
      if (pathname === '/') return s.id === 'home';
      return pathname.startsWith(s.path) && s.path !== '/';
    });
    setActiveSection(currentIndex !== -1 ? currentIndex : 0);
  }, [pathname]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Update contextual action based on scroll
      if (progress < 20) {
        setContextualAction('Explore');
      } else if (progress < 50) {
        setContextualAction('Discover');
      } else if (progress < 80) {
        setContextualAction('Learn More');
      } else {
        setContextualAction('Get in Touch');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if no modifier keys are pressed and not in an input
      if (e.metaKey || e.ctrlKey || e.altKey ||
          (e.target instanceof HTMLInputElement) ||
          (e.target instanceof HTMLTextAreaElement)) {
        return;
      }

      const key = e.key;
      const section = sections.find(s => s.shortcut === key);

      if (section) {
        e.preventDefault();
        setKeyPressed(key);
        window.location.href = section.path;

        setTimeout(() => setKeyPressed(null), 500);
      }

      // Toggle HUD visibility with 'h' key
      if (key === 'h') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full glass bg-black/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Eye className="w-5 h-5 text-cyan-400" />
      </motion.button>
    );
  }

  return (
    <>
      {/* Main HUD Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50 flex flex-col gap-3"
      >
        {/* Mini-Map Radar */}
        <motion.div
          className="glass bg-black/60 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Navigation2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Nav System
            </span>
          </div>

          {/* Circuit Board Mini-Map */}
          <div className="relative w-40 h-40 bg-black/40 rounded-xl border border-cyan-500/20 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(#32FAC7 1px, transparent 1px),
                  linear-gradient(90deg, #32FAC7 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            />

            {/* Scanning line */}
            <motion.div
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{
                top: ['0%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Section nodes */}
            <div className="relative w-full h-full p-2">
              {sections.map((section, index) => {
                const angle = (index / sections.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 50;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={section.id}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Link href={section.path}>
                      <motion.div
                        className={`w-3 h-3 rounded-full border-2 cursor-pointer ${
                          activeSection === index
                            ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50'
                            : 'bg-black border-cyan-500/40 hover:border-cyan-400'
                        }`}
                        animate={activeSection === index ? {
                          scale: [1, 1.3, 1],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        whileHover={{ scale: 1.5 }}
                      />
                    </Link>

                    {/* Connection lines to center */}
                    {activeSection === index && (
                      <svg
                        className="absolute top-1/2 left-1/2 pointer-events-none"
                        style={{
                          width: '200px',
                          height: '200px',
                          transform: 'translate(-50%, -50%)',
                          overflow: 'visible'
                        }}
                      >
                        <motion.line
                          x1="100"
                          y1="100"
                          x2={100 + Math.cos(angle) * radius * 2}
                          y2={100 + Math.sin(angle) * radius * 2}
                          stroke="#32FAC7"
                          strokeWidth="1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.4 }}
                          transition={{ duration: 0.5 }}
                        />
                      </svg>
                    )}
                  </motion.div>
                );
              })}

              {/* Center pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </div>

            {/* Scroll progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="76"
                fill="none"
                stroke="#32FAC7"
                strokeWidth="2"
                strokeDasharray={`${(scrollProgress / 100) * 477} 477`}
                opacity="0.3"
              />
            </svg>
          </div>

          {/* Current section label */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">Current Zone</p>
            <p className="text-sm font-semibold text-cyan-400">
              {sections[activeSection]?.name || 'Unknown'}
            </p>
          </div>
        </motion.div>

        {/* Contextual Action Button */}
        <motion.div
          className="glass bg-black/60 border border-cyan-500/30 rounded-xl p-3 backdrop-blur-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Quick Action
            </span>
          </div>

          <motion.button
            className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-sm font-medium text-cyan-400 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (scrollProgress < 80) {
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
              } else {
                window.location.href = '/contact';
              }
            }}
          >
            {contextualAction}
          </motion.button>
        </motion.div>

        {/* Keyboard Shortcuts HUD */}
        <motion.div
          className="glass bg-black/60 border border-cyan-500/30 rounded-xl p-3 backdrop-blur-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Quick Nav
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {sections.slice(0, 5).map((section) => {
              const Icon = section.icon;
              const isPressed = keyPressed === section.shortcut;

              return (
                <Link key={section.id} href={section.path}>
                  <motion.div
                    className={`relative flex flex-col items-center justify-center p-2 rounded-lg border cursor-pointer transition-all ${
                      isPressed
                        ? 'bg-cyan-500/30 border-cyan-400 shadow-lg shadow-cyan-400/50'
                        : 'bg-black/40 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/10'
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isPressed ? {
                      scale: [1, 1.2, 1],
                    } : {}}
                  >
                    <Icon className="w-4 h-4 text-cyan-400 mb-1" />
                    <span className="text-[10px] font-mono text-cyan-400/80">
                      {section.shortcut}
                    </span>

                    {/* Key press ripple effect */}
                    <AnimatePresence>
                      {isPressed && (
                        <motion.div
                          className="absolute inset-0 rounded-lg border-2 border-cyan-400"
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.5 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <p className="text-[10px] text-gray-500 text-center mt-2">
            Press H to hide
          </p>
        </motion.div>
      </motion.div>

      {/* Key press feedback overlay */}
      <AnimatePresence>
        {keyPressed && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-9xl font-bold text-cyan-400/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
            >
              {keyPressed}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpatialHUD;
