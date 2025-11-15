"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-xl overflow-hidden glass border border-white/10 hover:border-cyan transition-all">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 bg-cyan text-black px-3 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}

          {/* Category */}
          <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold group-hover:text-cyan transition-colors">
            {project.title}
          </h3>

          <p className="text-white/60 line-clamp-2">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-cyan/10 text-cyan px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {Object.entries(project.metrics).map(([key, value]) => (
                value && (
                  <div key={key}>
                    <p className="text-xs text-white/40 uppercase">{key}</p>
                    <p className="text-sm font-semibold text-cyan">{value}</p>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-4">
            <Link
              href={project.liveUrl}
              target="_blank"
              className="flex items-center gap-2 text-sm text-cyan hover:underline"
            >
              <ExternalLink size={16} />
              Live Demo
            </Link>
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-cyan transition-colors"
              >
                <Github size={16} />
                Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
