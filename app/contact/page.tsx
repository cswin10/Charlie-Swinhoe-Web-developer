"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle, AlertCircle, Instagram } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const socialLinks = [
  {
    icon: "🎵",
    href: "https://tiktok.com/@charlie.swinhoe",
    label: "TikTok",
    username: "@charlie.swinhoe",
    color: "hover:text-pink-400"
  },
  {
    icon: Instagram,
    href: "https://instagram.com/charlieswinhoe",
    label: "Instagram",
    username: "@charlieswinhoe",
    color: "hover:text-pink-500"
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/charlie-swinhoe-72b27834b/",
    label: "LinkedIn",
    username: "/in/charlie-swinhoe-72b27834b",
    color: "hover:text-blue-400"
  },
  {
    icon: Twitter,
    href: "https://twitter.com/charlieswinhoe",
    label: "X/Twitter",
    username: "@charlieswinhoe",
    color: "hover:text-sky-400"
  },
  {
    icon: Mail,
    href: "mailto:crcswinhoe@gmail.com",
    label: "Email",
    username: "crcswinhoe@gmail.com",
    color: "hover:text-cyan"
  },
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

    try {
      const formDataToSend = new URLSearchParams();
      formDataToSend.append("form-name", "contact");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataToSend.toString(),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus("idle");
        }, 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => {
          setFormStatus("idle");
        }, 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
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

              {/* Error Message */}
              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500 text-red-500 flex items-center gap-2"
                >
                  <AlertCircle size={20} />
                  <span>Failed to send message. Please try again or email me directly.</span>
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
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Connect on <span className="text-cyan">Social</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 rounded-xl glass border border-white/10 hover:border-cyan transition-all group"
                >
                  <div className={`w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center text-cyan group-hover:bg-cyan/30 transition-colors ${social.color}`}>
                    {typeof social.icon === "string" ? (
                      <span className="text-2xl">{social.icon}</span>
                    ) : (
                      <social.icon size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-cyan transition-colors">
                      {social.label}
                    </div>
                    <div className="text-sm text-white/60">{social.username}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
