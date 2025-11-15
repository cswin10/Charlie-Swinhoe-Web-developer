"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, type }: { position: [number, number, number]; type: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.3;
  });

  const color = "#00E5CC";

  return (
    <mesh ref={meshRef} position={position}>
      {type === "sphere" && <Sphere args={[0.5, 32, 32]} />}
      {type === "box" && <Box args={[0.8, 0.8, 0.8]} />}
      {type === "torus" && <Torus args={[0.5, 0.2, 16, 100]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function FloatingShapes() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <FloatingShape position={[-2, 0, 0]} type="sphere" />
        <FloatingShape position={[2, 1, -1]} type="box" />
        <FloatingShape position={[0, -1, -2]} type="torus" />
        <FloatingShape position={[-1, 2, -1]} type="sphere" />
        <FloatingShape position={[1.5, -0.5, 0]} type="box" />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
