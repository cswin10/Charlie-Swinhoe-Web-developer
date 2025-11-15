"use client";

import Link from "next/link";
import { Linkedin, Twitter, Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

// TikTok SVG Icon Component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const socialLinks = [
  { icon: TikTokIcon, href: "https://tiktok.com/@charlie.swinhoe", label: "TikTok" },
  { icon: Instagram, href: "https://instagram.com/charlieswinhoe", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/charlie-swinhoe-72b27834b/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/charlieswinhoe", label: "X/Twitter" },
  { icon: Mail, href: "mailto:crcswinhoe@gmail.com", label: "Email" },
];

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-6xl mx-auto">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Charlie</span>
              <span className="text-cyan"> Swinhoe</span>
            </h3>
            <p className="text-white/60 text-sm">
              Founder & Builder. Creating products that matter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2">
              <Link
                href="/projects"
                className="text-white/60 hover:text-cyan transition-colors text-sm"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-white/60 hover:text-cyan transition-colors text-sm"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-white/60 hover:text-cyan transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white/60 hover:text-cyan transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Connect
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/60 hover:text-cyan transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Charlie Swinhoe. All rights reserved.
            </p>

            <div className="flex items-center space-x-2 text-xs text-white/40">
              <span>Built with</span>
              {techStack.map((tech, index) => (
                <span key={tech}>
                  <span className="text-cyan">{tech}</span>
                  {index < techStack.length - 1 && <span className="mx-1">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
