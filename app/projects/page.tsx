"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MouseFollower from "@/components/3D/MouseFollower";
import projectsData from "@/data/projects.json";

const categories = ["All", "Business Anchors", "SaaS", "Templates", "Passion Projects"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === selectedCategory);

  return (
    <>
      <MouseFollower />

      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                My <span className="text-cyan">Projects</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/60 max-w-2xl mx-auto"
              >
                A collection of products I've built, from SaaS platforms to passion projects.
                Each one taught me something new.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Category Filter */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-cyan text-black"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <ScrollReveal>
              <div className="text-center py-20">
                <p className="text-2xl text-white/40">
                  No projects found in this category yet.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </>
  );
}
