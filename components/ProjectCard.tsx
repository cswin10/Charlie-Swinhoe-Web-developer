"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

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
}

export default function ProjectCard({ project }: { project: Project }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
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
      </div>
    </motion.div>
  );
}
