"use client";

import { motion } from "framer-motion";
import { Mail, Twitter, Linkedin, Instagram } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  const journey = [
    {
      year: "2025",
      title: "AI & Entrepreneurship",
      description:
        "Launched Dizzy Otter in February, an AI consultancy that started making revenue immediately. Built GoSYNQ with Fin Walker in April—zero-fee ticketing for event promoters. Since October, I've shipped a new product every single week.",
    },
    {
      year: "2024",
      title: "Web Development",
      description:
        "Made the switch from sales to building. Created my first real web projects and discovered I could build faster with AI than traditional coding. Started learning everything I could about full-stack development.",
    },
    {
      year: "2023",
      title: "Sales & Python",
      description:
        "Moved from bartending and trading into sales. Taught myself Python to automate my trading strategies. Realized I was more interested in building the tools than using them.",
    },
    {
      year: "2018-Present",
      title: "Digital Nomad",
      description:
        "Been traveling on and off since 2018. 40 countries. Lived and worked in Australia and New Zealand. Built tech from dozens of countries. Currently based wherever I am that week.",
    },
  ];

  const socialLinks = [
    {
      name: "TikTok",
      username: "@charlieswinhoe",
      url: "https://tiktok.com/@charlieswinhoe",
      icon: "🎵",
    },
    {
      name: "Instagram",
      username: "@charlieswinhoe",
      url: "https://instagram.com/charlieswinhoe",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      username: "/in/charlieswinhoe",
      url: "https://linkedin.com/in/charlieswinhoe",
      icon: Linkedin,
    },
    {
      name: "X/Twitter",
      username: "@charlieswinhoe",
      url: "https://twitter.com/charlieswinhoe",
      icon: Twitter,
    },
    {
      name: "Email",
      username: "crcswinhoe@gmail.com",
      url: "mailto:crcswinhoe@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero */}
      <section className="px-6 mb-32">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-8"
            >
              About <span className="text-cyan">Me</span>
            </motion.h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Who I Am */}
      <section className="px-6 mb-32">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-8">
              Who <span className="text-cyan">I Am</span>
            </h2>
            <div className="space-y-6 text-xl text-white/80 leading-relaxed">
              <p>I'm Charlie Swinhoe. I build things and solve problems.</p>
              <p>
                I started in 2023 trying to automate my trading strategies. Learned Python,
                built forex and crypto bots, and realized I liked building systems more than
                trading them. That led me down a path from sales to web development to AI,
                and now I run multiple businesses while shipping new products every week.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Journey - Timeline */}
      <section className="px-6 mb-32 relative">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-16">
              The <span className="text-cyan">Journey</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-cyan/50 to-transparent transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-16">
              {journey.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col md:gap-8`}
                  >
                    {/* Year Badge */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-20 h-20 rounded-full bg-cyan flex items-center justify-center font-bold text-black text-sm z-10 shadow-lg shadow-cyan/50">
                      {item.year}
                    </div>

                    {/* Content */}
                    <div
                      className={`w-full md:w-5/12 ${
                        index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                      } pl-24 md:pl-0 pt-4 md:pt-0`}
                    >
                      <div className="p-6 rounded-xl glass border border-white/10 hover:border-cyan transition-all">
                        <h3 className="text-2xl font-bold mb-3 text-cyan">
                          {item.title}
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I Believe */}
      <section className="px-6 mb-32 bg-gradient-to-b from-black/50 to-black py-20">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-12">
              What I <span className="text-cyan">Believe</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6 text-xl text-white/80 leading-relaxed">
              <p>
                I want to make tech more accessible and solve real problems. Most people
                waste time on things that should be automated. My goal is to build systems
                that make people's lives easier so they can focus on what they're actually
                good at.
              </p>
              <p className="text-2xl font-semibold text-cyan">
                Ship fast. Ship weekly. Keep building.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What I'm Most Proud Of */}
      <section className="px-6 mb-32">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-12">
              What I'm Most <span className="text-cyan">Proud Of</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl glass border border-cyan/30 hover:border-cyan transition-all"
            >
              <h3 className="text-3xl font-bold mb-4 text-cyan">
                The AI Operator Roadmap
              </h3>
              <p className="text-xl text-white/80 leading-relaxed">
                A complete collection of everything I know about AI, packaged into a free
                15-module course. It's my way of making AI accessible to anyone who wants to
                learn.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Beyond Work */}
      <section className="px-6 mb-32">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-12">
              Beyond <span className="text-cyan">Work</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              I train. I learn. I travel. I've started documenting the journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Connect */}
      <section className="px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-12">
              <span className="text-cyan">Connect</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((link, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 rounded-xl glass border border-white/10 hover:border-cyan transition-all group"
                >
                  <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center text-cyan group-hover:bg-cyan/30 transition-colors">
                    {typeof link.icon === "string" ? (
                      <span className="text-2xl">{link.icon}</span>
                    ) : (
                      <link.icon size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-cyan transition-colors">
                      {link.name}
                    </div>
                    <div className="text-sm text-white/60">{link.username}</div>
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
