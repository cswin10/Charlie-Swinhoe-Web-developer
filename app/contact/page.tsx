"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import profileData from "@/data/profile.json";

const socialLinks = [
  { icon: Github, href: profileData.socialLinks.github, label: "GitHub", color: "hover:text-white" },
  { icon: Linkedin, href: profileData.socialLinks.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: Twitter, href: profileData.socialLinks.twitter, label: "Twitter", color: "hover:text-sky-400" },
  { icon: Mail, href: `mailto:${profileData.email}`, label: "Email", color: "hover:text-cyan" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("loading");

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Get in <span className="text-cyan">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 max-w-2xl mx-auto"
            >
              Have a project in mind? Want to collaborate? Or just want to say hi?
              I'd love to hear from you.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-lg bg-white/5 border ${
                    errors.name ? "border-red-500" : "border-white/10"
                  } focus:border-cyan focus:outline-none transition-colors`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-lg bg-white/5 border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } focus:border-cyan focus:outline-none transition-colors`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-6 py-4 rounded-lg bg-white/5 border ${
                    errors.message ? "border-red-500" : "border-white/10"
                  } focus:border-cyan focus:outline-none transition-colors resize-none`}
                  placeholder="Tell me about your project or just say hi..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={formStatus === "loading"}
                className="w-full"
              >
                {formStatus === "loading" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block mr-2"
                    >
                      ⚡
                    </motion.div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="inline ml-2" size={20} />
                  </>
                )}
              </Button>

              {/* Success Message */}
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-cyan/10 border border-cyan text-cyan flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}
            </form>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="my-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/40 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social Links */}
        <ScrollReveal delay={0.5}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8">
              Connect on <span className="text-cyan">Social</span>
            </h2>

            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 ${social.color} transition-all hover:border-cyan`}
                  aria-label={social.label}
                >
                  <social.icon size={28} />
                </motion.a>
              ))}
            </div>

            <p className="mt-8 text-white/60">
              Prefer email?{" "}
              <a href={`mailto:${profileData.email}`} className="text-cyan hover:underline">
                {profileData.email}
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
