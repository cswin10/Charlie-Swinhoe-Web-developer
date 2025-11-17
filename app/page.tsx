"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import FloatingShapes from "@/components/3D/FloatingShapes";
import CursorTrail from "@/components/3D/CursorTrail";
import CommandPalette from "@/components/CommandPalette";
import ScrollReveal from "@/components/ui/ScrollReveal";
import projectsData from "@/data/projects.json";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <>
      <FloatingShapes />
      <CursorTrail />
      <CommandPalette />

      {/* Minimal Hero */}
      <motion.section
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          willChange: 'opacity, transform'
        }}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight">
              Charlie Swinhoe
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative inline-block"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-cyan">
                I build things.
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="h-[2px] bg-gradient-to-r from-cyan to-transparent mt-2"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Link
                href="#work"
                className="inline-flex items-center gap-2 text-cyan hover:gap-4 transition-all text-lg"
              >
                <span>↓</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Work - The Main Focus */}
      <section id="work" className="py-16 sm:py-24 md:py-32 px-6 bg-black/50">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4">
                Featured <span className="text-cyan">Work</span>
              </h2>
              <p className="text-xl text-white/50">
                Projects that made an impact
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.2}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="group"
                >
                  <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                    {/* Project Image */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-cyan/20 to-blue-500/20 border border-cyan/30"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      {/* Floating metrics */}
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-wrap gap-2 sm:gap-4">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <motion.div
                            key={key}
                            whileHover={{ y: -4 }}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-black/80 backdrop-blur-sm border border-cyan/30 rounded-lg"
                          >
                            <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">
                              {key}
                            </div>
                            <div className="text-sm sm:text-lg font-bold text-cyan">
                              {value}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Project Info */}
                    <div className="space-y-6">
                      <div>
                        <div className="text-cyan text-sm font-mono mb-2">
                          {project.category}
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 group-hover:text-cyan transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xl text-white/70 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-cyan/50 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 pt-4">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-cyan text-black font-semibold rounded-lg hover:bg-cyan/90 transition-all inline-flex items-center gap-2"
                          >
                            View Live <ExternalLink size={18} />
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-white/5 border border-white/20 rounded-lg hover:border-cyan transition-all inline-flex items-center gap-2"
                          >
                            <Github size={18} /> Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* View All Projects */}
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-24 text-center"
            >
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-cyan text-cyan rounded-lg font-semibold hover:bg-cyan hover:text-black transition-all inline-flex items-center gap-3 text-lg"
                >
                  View All Projects
                  <ArrowRight size={24} />
                </motion.button>
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Skills - Very Brief */}
      <section className="py-12 sm:py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-white/40 text-lg mb-8">
                Product · Design · Code · Growth
              </p>
              <Link
                href="/about"
                className="text-cyan hover:underline inline-flex items-center gap-2"
              >
                Learn more about my journey <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
