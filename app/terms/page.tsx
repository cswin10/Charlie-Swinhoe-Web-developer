"use client";

import { motion } from "framer-motion";
import { FileText, AlertTriangle, Shield, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: `By accessing and using this website (charlieswinhoe.com), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this site.`
    },
    {
      icon: Shield,
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Charlie Swinhoe's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to decompile or reverse engineer any software contained on the website
• Remove any copyright or other proprietary notations from the materials
• Transfer the materials to another person or "mirror" the materials on any other server

This license shall automatically terminate if you violate any of these restrictions and may be terminated by Charlie Swinhoe at any time.`
    },
    {
      icon: AlertTriangle,
      title: "3. Disclaimer",
      content: `The materials on Charlie Swinhoe's website are provided on an 'as is' basis. Charlie Swinhoe makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Further, Charlie Swinhoe does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`
    },
    {
      icon: CheckCircle,
      title: "4. Limitations",
      content: `In no event shall Charlie Swinhoe or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Charlie Swinhoe's website, even if Charlie Swinhoe or an authorized representative has been notified orally or in writing of the possibility of such damage.

Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.`
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
                <FileText className="text-cyan" size={32} />
              </div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-bold"
              >
                Terms of <span className="text-cyan">Use</span>
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
            <p className="text-white/80 leading-relaxed">
              Welcome to charlieswinhoe.com. These terms and conditions outline the rules and regulations
              for the use of Charlie Swinhoe's Website. By accessing this website, we assume you accept
              these terms and conditions. Do not continue to use charlieswinhoe.com if you do not agree
              to all of the terms and conditions stated on this page.
            </p>
          </div>
        </ScrollReveal>

        {/* Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
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
                      <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                      <p className="text-white/70 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Additional Sections */}
        <ScrollReveal>
          <div className="space-y-6 mb-12">
            {/* Accuracy of Materials */}
            <div className="p-6 rounded-xl glass border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3">5. Accuracy of Materials</h2>
              <p className="text-white/70 leading-relaxed">
                The materials appearing on Charlie Swinhoe's website could include technical,
                typographical, or photographic errors. Charlie Swinhoe does not warrant that
                any of the materials on its website are accurate, complete, or current.
                Charlie Swinhoe may make changes to the materials contained on its website
                at any time without notice. However, Charlie Swinhoe does not make any
                commitment to update the materials.
              </p>
            </div>

            {/* Links */}
            <div className="p-6 rounded-xl glass border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3">6. Links</h2>
              <p className="text-white/70 leading-relaxed">
                Charlie Swinhoe has not reviewed all of the sites linked to its website and
                is not responsible for the contents of any such linked site. The inclusion
                of any link does not imply endorsement by Charlie Swinhoe of the site. Use
                of any such linked website is at the user's own risk.
              </p>
            </div>

            {/* Modifications */}
            <div className="p-6 rounded-xl glass border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3">7. Modifications</h2>
              <p className="text-white/70 leading-relaxed">
                Charlie Swinhoe may revise these terms of service for its website at any
                time without notice. By using this website, you are agreeing to be bound
                by the then current version of these terms of service.
              </p>
            </div>

            {/* Governing Law */}
            <div className="p-6 rounded-xl glass border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3">8. Governing Law</h2>
              <p className="text-white/70 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with
                the laws of the United Kingdom and you irrevocably submit to the exclusive
                jurisdiction of the courts in that location.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="p-6 rounded-xl glass border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3">9. Intellectual Property</h2>
              <p className="text-white/70 leading-relaxed">
                Unless otherwise stated, Charlie Swinhoe and/or its licensors own the
                intellectual property rights for all material on this website. All
                intellectual property rights are reserved. You may access this from
                charlieswinhoe.com for your own personal use subjected to restrictions
                set in these terms and conditions.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal>
          <div className="p-6 rounded-xl glass border border-cyan/20">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have any questions about these Terms of Use, please contact us:
            </p>
            <div className="space-y-2 text-white/70">
              <p>
                <strong className="text-cyan">Email:</strong>{" "}
                <a href="mailto:crcswinhoe@gmail.com" className="hover:text-cyan transition-colors">
                  crcswinhoe@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-cyan">Website:</strong>{" "}
                <a href="https://charlieswinhoe.com" className="hover:text-cyan transition-colors">
                  charlieswinhoe.com
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
