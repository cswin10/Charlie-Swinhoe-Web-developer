"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

interface ParticleProps {
  position: [number, number, number];
  speed: number;
}

function Particle({ position, speed }: ParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speed;
    meshRef.current.position.y = (initialPosition[1] as number) + Math.sin(time) * 0.5;
    meshRef.current.position.x = (initialPosition[0] as number) + Math.cos(time * 0.5) * 0.3;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <Sphere args={[0.05, 16, 16]}>
        <meshStandardMaterial
          color="#32FAC7"
          emissive="#32FAC7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </mesh>
  );
}

function ParticleNetwork() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.3,
      });
    }
    return temp;
  }, []);

  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y += 0.0005;
  });

  // Create connection lines between nearby particles
  const lineGeometry = useMemo(() => {
    const positions = [];
    const maxDistance = 2;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const [x1, y1, z1] = particles[i].position;
        const [x2, y2, z2] = particles[j].position;
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );

        if (distance < maxDistance) {
          positions.push(x1, y1, z1);
          positions.push(x2, y2, z2);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [particles]);

  return (
    <group>
      {particles.map((particle, index) => (
        <Particle key={index} position={particle.position} speed={particle.speed} />
      ))}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#32FAC7"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function FloatingShapes() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#32FAC7" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0066FF" />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
