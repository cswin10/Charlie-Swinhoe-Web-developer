"use client";

import { motion } from "framer-motion";
import { Cookie, Shield, Database, Eye, Clock } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      name: "Essential Cookies",
      purpose: "Required for the website to function properly",
      examples: "Session management, security",
      duration: "Session / 1 year",
      required: true
    },
    {
      icon: Eye,
      name: "Analytics Cookies",
      purpose: "Help us understand how visitors interact with the website",
      examples: "Google Analytics, page views, user behavior",
      duration: "2 years",
      required: false
    },
    {
      icon: Database,
      name: "Preference Cookies",
      purpose: "Remember your settings and preferences",
      examples: "Cookie consent, theme preferences",
      duration: "1 year",
      required: false
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center">
                <Cookie className="text-cyan" size={32} />
              </div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-bold"
              >
                Cookie <span className="text-cyan">Policy</span>
              </motion.h1>
            </div>
            <p className="text-xl text-white/60">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </ScrollReveal>

        {/* Introduction */}
        <ScrollReveal>
          <div className="mb-12 p-6 rounded-xl glass border border-cyan/20">
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p className="text-white/80 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit a website.
              They help the website remember information about your visit, making it easier to visit
              the site again and making the site more useful to you.
            </p>
          </div>
        </ScrollReveal>

        {/* Cookie Types */}
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8">
            Types of <span className="text-cyan">Cookies We Use</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-6 mb-12">
          {cookieTypes.map((cookie, index) => {
            const Icon = cookie.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="p-6 rounded-xl glass border border-white/10 hover:border-cyan/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-cyan" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{cookie.name}</h3>
                        {cookie.required && (
                          <span className="px-2 py-1 bg-cyan/20 border border-cyan/30 rounded text-xs text-cyan font-semibold">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 mb-3">{cookie.purpose}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-white/50">Examples: </span>
                          <span className="text-white/80">{cookie.examples}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-cyan" size={14} />
                          <span className="text-white/50">Duration: </span>
                          <span className="text-white/80">{cookie.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* How to Manage Cookies */}
        <ScrollReveal>
          <div className="mb-12 p-6 rounded-xl glass border border-cyan/20">
            <h2 className="text-2xl font-bold mb-4">How to Manage Cookies</h2>
            <div className="space-y-3 text-white/80 leading-relaxed">
              <p>
                You can control and/or delete cookies as you wish. You can delete all cookies
                that are already on your computer and you can set most browsers to prevent them
                from being placed.
              </p>
              <p>
                However, if you do this, you may have to manually adjust some preferences every
                time you visit a site and some services and functionalities may not work.
              </p>
              <p>
                Most web browsers allow you to manage cookies through their settings preferences.
                To find out more information about cookies, including information about how to see
                what cookies have been set and how to manage and delete them, visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline"
                >
                  www.allaboutcookies.org
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Third Party Services */}
        <ScrollReveal>
          <div className="mb-12 p-6 rounded-xl glass border border-cyan/20">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <div className="space-y-3 text-white/80 leading-relaxed">
              <p>
                We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong className="text-cyan">Google Analytics</strong> - For website traffic analysis</li>
                <li><strong className="text-cyan">Netlify</strong> - For hosting and deployment</li>
                <li><strong className="text-cyan">Netlify Forms</strong> - For contact form submissions</li>
              </ul>
              <p className="mt-4">
                These services have their own privacy policies and cookie policies. We recommend
                reviewing them to understand how they use your data.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal>
          <div className="p-6 rounded-xl glass border border-cyan/20">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-white/80 leading-relaxed">
              If you have any questions about our use of cookies, please contact us at{" "}
              <a
                href="mailto:crcswinhoe@gmail.com"
                className="text-cyan hover:underline"
              >
                crcswinhoe@gmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
