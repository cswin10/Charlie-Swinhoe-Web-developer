"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  image: string;
  featured: boolean;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="group relative h-full rounded-xl overflow-hidden glass border border-white/10 hover:border-cyan transition-all"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 right-4 bg-cyan text-black px-3 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold group-hover:text-cyan transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-white/60 line-clamp-3">{post.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-cyan/10 text-cyan px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
