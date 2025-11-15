"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Lightbulb, Rocket, Target } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import aboutData from "@/data/about.json";

const interestIcons: { [key: string]: any } = {
  "Reading (business, philosophy, sci-fi)": Lightbulb,
  "Fitness & Health": Heart,
  "Travel & Adventure": Rocket,
  "Mentoring aspiring founders": Target,
  "Writing & Content Creation": Lightbulb,
};

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <motion.h1
              style={{ y }}
              className="text-5xl md:text-7xl font-bold mb-8 text-center"
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
            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-8">
                Who <span className="text-cyan">I Am</span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                {aboutData.whoIAm}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Journey - Timeline */}
      <section className="px-6 mb-32 relative">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-16 text-center">
              The <span className="text-cyan">Journey</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-cyan/50 to-transparent transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-16">
              {aboutData.journey.map((item, index) => (
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
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full bg-cyan flex items-center justify-center font-bold text-black text-lg z-10 shadow-lg shadow-cyan/50">
                      {item.year}
                    </div>

                    {/* Content */}
                    <div
                      className={`w-full md:w-5/12 ${
                        index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                      } pl-20 md:pl-0 pt-4 md:pt-0`}
                    >
                      <div className="p-6 rounded-xl glass border border-white/10 hover:border-cyan transition-all">
                        <h3 className="text-2xl font-bold mb-3 text-cyan">
                          {item.title}
                        </h3>
                        <p className="text-white/70">{item.description}</p>
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
            <h2 className="text-4xl font-bold mb-12 text-center">
              What I <span className="text-cyan">Believe</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.beliefs.map((belief, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-4 p-6 rounded-xl glass border border-white/10 hover:border-cyan transition-all"
                >
                  <div className="w-2 h-2 bg-cyan rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg text-white/90">{belief}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Work */}
      <section className="px-6 mb-32">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-8 text-center">
              Beyond <span className="text-cyan">Work</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/80 leading-relaxed mb-12 text-center">
              {aboutData.beyondWork.description}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.beyondWork.interests.map((interest, index) => {
              const Icon = interestIcons[interest] || Lightbulb;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-6 rounded-xl glass border border-white/10 hover:border-cyan transition-all text-center"
                  >
                    <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon className="text-cyan" size={24} />
                    </div>
                    <p className="text-white/90">{interest}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center p-12 rounded-2xl glass border border-white/10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Let's <span className="text-cyan">Connect</span>
              </h2>
              <p className="text-xl text-white/60 mb-8">
                Always happy to chat about building, products, or just life in general.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-cyan text-black rounded-lg font-semibold hover:bg-cyan/90 transition-all"
              >
                Get in Touch
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
