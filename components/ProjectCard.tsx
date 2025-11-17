"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Sparkles, Zap, Clock, Target, Lightbulb, Package, Database, Code, Cloud } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string | null;
  featured: boolean;
  metrics?: {
    [key: string]: string | undefined;
  };
  buildTime?: string;
  impact?: string;
  quirks?: string;
  stack?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    deployment?: string[];
  };
}

export default function ProjectCard({ project }: { project: Project }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [inspectMode, setInspectMode] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 3D tilt effect
    const rotateXValue = ((cardY - centerY) / centerY) * -8;
    const rotateYValue = ((cardX - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // Glow position
    setGlowX((cardX / rect.width) * 100);
    setGlowY((cardY / rect.height) * 100);

    // Magnetic effect
    mouseX.set((cardX - centerX) / 20);
    mouseY.set((cardY - centerY) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    mouseX.set(0);
    mouseY.set(0);
    setInspectMode(false);
  };

  const getStackIcon = (category: string) => {
    switch(category) {
      case 'frontend': return Code;
      case 'backend': return Package;
      case 'database': return Database;
      case 'deployment': return Cloud;
      default: return Zap;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
        x,
        y,
      }}
      className="group relative h-full"
    >
      {/* Inspect Mode Toggle Button */}
      <motion.button
        onClick={(e) => {
          e.preventDefault();
          if (!inspectMode) {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 600);
          }
          setInspectMode(!inspectMode);
        }}
        className="absolute top-4 left-4 z-20 p-2 rounded-lg glass bg-black/60 border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Lightbulb className={`w-4 h-4 ${inspectMode ? 'text-cyan-400' : 'text-white/60'}`} />
      </motion.button>

      <div className="relative h-full rounded-xl overflow-hidden glass border border-white/10 hover:border-cyan transition-all hover:shadow-2xl hover:shadow-cyan/20">
        {/* Cursor glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(0, 229, 204, 0.1), transparent 40%)`,
          }}
        />

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
            }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute top-4 right-4 bg-cyan text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            >
              <Sparkles size={12} />
              Featured
            </motion.div>
          )}

          {/* Category */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-white/20"
          >
            {project.category}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold group-hover:text-cyan transition-colors">
            {project.title}
          </h3>

          <p className="text-white/60 line-clamp-2">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-xs bg-cyan/10 text-cyan px-3 py-1 rounded-full border border-cyan/20 hover:bg-cyan/20 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {Object.entries(project.metrics).map(([key, value], index) => (
                value && (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-xs text-white/40 uppercase">{key}</p>
                    <p className="text-sm font-semibold text-cyan">{value}</p>
                  </motion.div>
                )
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={project.liveUrl}
                target="_blank"
                className="flex items-center gap-2 text-sm text-cyan hover:underline"
              >
                <ExternalLink size={16} />
                Live Demo
              </Link>
            </motion.div>
            {project.githubUrl && (
              <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-cyan transition-colors"
                >
                  <Github size={16} />
                  Code
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Inspect Mode Overlay */}
        <AnimatePresence>
          {inspectMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                ...(glitchActive && {
                  x: [0, -5, 5, -3, 3, 0],
                  y: [0, 3, -3, 2, -2, 0],
                })
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: glitchActive ? 0.6 : 0.3 }}
              className={`absolute inset-0 bg-black/95 backdrop-blur-xl z-10 p-6 overflow-y-auto ${glitchActive ? 'animate-glitch' : ''}`}
              onClick={(e) => e.preventDefault()}
              style={{
                ...(glitchActive && {
                  textShadow: '0.05em 0 0 rgba(50, 250, 199, 0.75), -0.025em -0.05em 0 rgba(199, 50, 250, 0.75), 0.025em 0.05em 0 rgba(50, 199, 250, 0.75)',
                })
              }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-cyan-400 mb-1">Inspect Mode</h4>
                    <p className="text-sm text-white/60">Deep dive into {project.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setInspectMode(false);
                    }}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {/* Stack Breakdown */}
                {project.stack && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <h5 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                        Stack Architecture
                      </h5>
                    </div>

                    {Object.entries(project.stack).map(([category, items], index) => {
                      const Icon = getStackIcon(category);
                      return (
                        <motion.div
                          key={category}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-3 h-3 text-cyan-400" />
                            <span className="text-xs text-cyan-400 font-semibold uppercase">
                              {category}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((item, i) => (
                              <motion.span
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                                className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded border border-cyan-500/20"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {/* Build Time */}
                {project.buildTime && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <h5 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                        Build Timeline
                      </h5>
                    </div>
                    <p className="text-sm text-white/80">{project.buildTime}</p>
                  </motion.div>
                )}

                {/* Impact */}
                {project.impact && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-cyan-400" />
                      <h5 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                        Impact & Results
                      </h5>
                    </div>
                    <p className="text-sm text-white/80">{project.impact}</p>
                  </motion.div>
                )}

                {/* Quirks */}
                {project.quirks && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <h5 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                        Interesting Quirks
                      </h5>
                    </div>
                    <p className="text-sm text-white/80 italic">{project.quirks}</p>
                  </motion.div>
                )}

                {/* Tech Stack Pills (fallback if no stack object) */}
                {!project.stack && project.technologies.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h5 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                          className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-500/30"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Scan Animation */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  animate={{
                    top: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Glitch Particles Burst */}
                {glitchActive && (
                  <>
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        initial={{
                          x: '50%',
                          y: '50%',
                          opacity: 1,
                          scale: 1
                        }}
                        animate={{
                          x: `${50 + (Math.cos((i / 12) * Math.PI * 2) * 100)}%`,
                          y: `${50 + (Math.sin((i / 12) * Math.PI * 2) * 100)}%`,
                          opacity: 0,
                          scale: 0
                        }}
                        transition={{
                          duration: 0.6,
                          ease: 'easeOut'
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Matrix-style grid overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(rgba(50, 250, 199, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(50, 250, 199, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
