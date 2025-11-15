"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Rocket, TrendingUp, Users, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FloatingShapes from "@/components/3D/FloatingShapes";
import profileData from "@/data/profile.json";

const proofLogos = [
  { name: "Company 1", url: "https://via.placeholder.com/150x60/00E5CC/FFFFFF?text=Logo+1" },
  { name: "Company 2", url: "https://via.placeholder.com/150x60/00E5CC/FFFFFF?text=Logo+2" },
  { name: "Company 3", url: "https://via.placeholder.com/150x60/00E5CC/FFFFFF?text=Logo+3" },
  { name: "Company 4", url: "https://via.placeholder.com/150x60/00E5CC/FFFFFF?text=Logo+4" },
  { name: "Company 5", url: "https://via.placeholder.com/150x60/00E5CC/FFFFFF?text=Logo+5" },
  { name: "Company 6", url: "https://via.placeholder.com/150x60/00E5CC/FFFFFF?text=Logo+6" },
];

const skills = [
  { icon: Rocket, title: "Product Strategy", desc: "0 to 1 product development" },
  { icon: Code, title: "Full-Stack Dev", desc: "Modern web technologies" },
  { icon: TrendingUp, title: "Growth", desc: "Scaling products profitably" },
  { icon: Zap, title: "Speed", desc: "Ship fast, iterate faster" },
  { icon: Users, title: "User-Centric", desc: "Solve real problems" },
];

export default function Home() {
  return (
    <>
      <FloatingShapes />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center space-y-8"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="flex justify-center"
            >
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan shadow-lg shadow-cyan/50 animate-glow">
                <Image
                  src="/Charlie Swinhoe.png"
                  alt={profileData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-6xl md:text-8xl font-bold tracking-tight"
            >
              <span className="text-white">{profileData.name.split(" ")[0]}</span>{" "}
              <span className="text-cyan">{profileData.name.split(" ")[1]}</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light"
            >
              {profileData.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/projects">
                <Button variant="primary" className="group">
                  View My Builds
                  <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link href="#" target="_blank">
                <Button variant="outline">
                  Product of the Week
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-black to-black/50">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
              What I <span className="text-cyan">Do</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            {profileData.whatIDo.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-6 rounded-lg glass hover:border-cyan transition-all"
                >
                  <div className="w-2 h-2 bg-cyan rounded-full" />
                  <p className="text-xl md:text-2xl font-medium">{item}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
              Core <span className="text-cyan">Expertise</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-8 rounded-xl glass hover:border-cyan transition-all group"
                >
                  <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan/30 transition-colors">
                    <skill.icon className="text-cyan" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                  <p className="text-white/60">{skill.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of Work Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-black/50 to-black">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-8">
              Proof of <span className="text-cyan">Work</span>
            </h2>
            <p className="text-xl text-white/60 text-center mb-16 max-w-2xl mx-auto">
              Trusted by founders, builders, and companies worldwide
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {proofLogos.map((logo, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center justify-center p-6 rounded-lg glass hover:border-cyan transition-all opacity-60 hover:opacity-100"
                >
                  <Image
                    src={logo.url}
                    alt={logo.name}
                    width={150}
                    height={60}
                    className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl glass">
              <h2 className="text-4xl md:text-6xl font-bold">
                Ready to <span className="text-cyan">Build Together?</span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Whether you have a project in mind or just want to connect, I'd love to hear from you.
              </p>
              <Link href="/contact">
                <Button variant="primary" className="text-lg">
                  Let's Talk
                  <ArrowRight className="inline ml-2" size={24} />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
