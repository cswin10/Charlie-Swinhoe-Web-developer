"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

function FollowerSphere({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!sphereRef.current) return;

    const targetX = (mousePosition.current.x / window.innerWidth) * 4 - 2;
    const targetY = -(mousePosition.current.y / window.innerHeight) * 4 + 2;

    sphereRef.current.position.x += (targetX - sphereRef.current.position.x) * 0.05;
    sphereRef.current.position.y += (targetY - sphereRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={sphereRef}>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#32FAC7" wireframe transparent opacity={0.5} />
      </Sphere>
    </mesh>
  );
}

export default function MouseFollower() {
  const { level, isMobile } = useDevicePerformance();
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only add listener if not disabled
    if (isMobile || level === 'low') return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, level]);

  // Disable on mobile or low-end devices
  if (isMobile || level === 'low') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FollowerSphere mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
