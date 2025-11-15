"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import blogPosts from "@/data/blog-posts.json";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = blogPosts.find((p) => p.slug === params.slug);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-cyan hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        style={{ scaleX: scrollProgress / 100 }}
        className="fixed top-0 left-0 right-0 h-1 bg-cyan origin-left z-50"
      />

      <article className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto max-w-4xl px-6">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-cyan transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          {/* Hero Image */}
          <ScrollReveal>
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal delay={0.2}>
            <div className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-cyan/10 text-cyan px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-cyan/20 flex items-center justify-center text-cyan font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Share Button */}
          <ScrollReveal delay={0.3}>
            <div className="flex justify-end mb-8">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.4}>
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-lg leading-relaxed space-y-6">
                <p className="text-xl text-white/80 font-medium">
                  {post.excerpt}
                </p>

                <div className="h-px bg-white/10 my-8" />

                <p className="text-white/70">
                  {post.content}
                </p>

                {/* Placeholder for more content */}
                <p className="text-white/70">
                  This is where your full blog post content would go. You can write in markdown format
                  and it will be rendered beautifully with proper typography, code highlighting, and more.
                </p>

                <p className="text-white/70">
                  The content system is set up to be easily editable through the JSON files in the
                  /data directory. Simply update the content field with your actual blog post text.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Divider */}
          <div className="h-px bg-white/10 my-16" />

          {/* Author Bio */}
          <ScrollReveal>
            <div className="flex items-start gap-6 p-8 rounded-xl glass">
              <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center text-cyan font-bold text-2xl flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-white/60 mb-4">
                  Founder & Builder shipping products that matter. Sharing lessons learned from building
                  multiple profitable businesses.
                </p>
                <Link href="/about" className="text-cyan hover:underline">
                  More about me →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
