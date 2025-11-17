"use client";

import { useEffect, useRef } from "react";
import { useDevicePerformance, throttle } from "@/hooks/useDevicePerformance";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const MAX_PARTICLES = 100;

export default function CursorTrail() {
  const { level, isMobile } = useDevicePerformance();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    // Disable on mobile or low-end devices
    if (isMobile || level === 'low') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse with throttling
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Limit particle count
      if (particlesRef.current.length >= MAX_PARTICLES) {
        return;
      }

      // Create fewer particles on medium devices
      const particleCount = level === 'medium' ? 1 : 2;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 3 + 1,
        });
      }
    };

    // Throttle mousemove to reduce overhead
    const throttledMouseMove = throttle(handleMouseMove, 16); // ~60fps
    window.addEventListener("mousemove", throttledMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;

        if (particle.life <= 0) return false;

        const opacity = particle.life;
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, `rgba(50, 250, 199, ${opacity})`);
        gradient.addColorStop(1, `rgba(31, 217, 177, ${opacity * 0.3})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", throttledMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [level, isMobile]);

  // Disable on mobile or low-end devices
  if (isMobile || level === 'low') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-5"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
