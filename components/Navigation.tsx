"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { throttle } from "@/hooks/useDevicePerformance";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Throttle scroll handler to reduce re-renders
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const handleNavItemClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles: Particle[] = [];

    // Create particle burst effect
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo with subtle animation */}
          <Link href="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold tracking-tight"
            >
              <span className="text-white">Charlie</span>
              <span className="text-cyan relative">
                {" "}Swinhoe
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-cyan"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu with Interactive Effects */}
          <div className="hidden md:flex items-center relative">
            <div className="flex items-center space-x-1 relative">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <MagneticNavItem
                    key={item.path}
                    item={item}
                    isActive={isActive}
                    onHover={setHoveredItem}
                    onClick={handleNavItemClick}
                  />
                );
              })}

              {/* Liquid blob background that follows active/hovered item */}
              <LiquidBlob
                items={navItems}
                activeItem={pathname}
                hoveredItem={hoveredItem}
              />
            </div>

            {/* Particle effects */}
            <AnimatePresence>
              {particles.map((particle, index) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 rounded-full bg-cyan pointer-events-none"
                  initial={{
                    x: particle.x,
                    y: particle.y,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: particle.x + (Math.random() - 0.5) * 100,
                    y: particle.y + (Math.random() - 0.5) * 100,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.02 }}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-cyan transition-colors relative"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full space-y-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors relative group ${
                        isActive ? "text-cyan" : "text-white"
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-pill"
                          className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Magnetic Nav Item with hover effects
function MagneticNavItem({
  item,
  isActive,
  onHover,
  onClick
}: {
  item: typeof navItems[0];
  isActive: boolean;
  onHover: (name: string | null) => void;
  onClick: (e: React.MouseEvent) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic effect - pull towards cursor
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    onHover(null);
  };

  return (
    <Link
      ref={ref}
      href={item.path}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative px-4 py-2 group"
    >
      <motion.span
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className={`relative z-10 text-sm font-medium tracking-wide transition-colors inline-block ${
          isActive ? "text-cyan" : "text-white group-hover:text-cyan"
        }`}
      >
        {item.name}

        {/* Animated underline */}
        {isActive && (
          <motion.div
            layoutId="active-underline"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-cyan/0 group-hover:bg-cyan/10 -z-10"
          initial={false}
          transition={{ duration: 0.2 }}
        />
      </motion.span>
    </Link>
  );
}

// Liquid blob that morphs between nav items
function LiquidBlob({
  items,
  activeItem,
  hoveredItem
}: {
  items: typeof navItems;
  activeItem: string;
  hoveredItem: string | null;
}) {
  const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    // Find the target item (hovered or active)
    const targetName = hoveredItem || items.find(item =>
      activeItem === item.path ||
      (item.path !== "/" && activeItem.startsWith(item.path))
    )?.name;

    if (!targetName) return;

    const index = items.findIndex(item => item.name === targetName);
    if (index === -1) return;

    // Calculate blob position (approximate)
    const itemWidth = 100; // approximate width
    const left = index * itemWidth;

    setBlobStyle({ left, width: itemWidth });
  }, [activeItem, hoveredItem, items]);

  return (
    <motion.div
      className="absolute top-0 h-full bg-gradient-to-r from-cyan/20 via-cyan/30 to-cyan/20 rounded-full blur-xl pointer-events-none -z-10"
      animate={blobStyle}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
      style={{
        filter: "blur(20px)",
      }}
    />
  );
}
