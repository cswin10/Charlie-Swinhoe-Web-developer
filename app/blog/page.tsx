"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import blogPosts from "@/data/blog-posts.json";

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags))
  );

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts;

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              The <span className="text-cyan">Blog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 max-w-2xl mx-auto"
            >
              Thoughts on building products, growing businesses, and lessons learned along the way.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Tag Filter */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTag === null
                  ? "bg-cyan text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              All Posts
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-cyan text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Blog Posts Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {sortedPosts.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-20">
              <p className="text-2xl text-white/40">
                No posts found with this tag.
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
