"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  speed: number;
  type: 'sphere' | 'box' | 'torus' | 'octahedron';
  scale: number;
  rotationSpeed: number;
}

function FloatingShape({ position, speed, type, scale, rotationSpeed }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speed;

    // More dynamic floating motion
    meshRef.current.position.y = (initialPosition[1] as number) + Math.sin(time) * 1.2;
    meshRef.current.position.x = (initialPosition[0] as number) + Math.cos(time * 0.7) * 0.8;
    meshRef.current.position.z = (initialPosition[2] as number) + Math.sin(time * 0.5) * 0.5;

    // Dynamic rotation
    meshRef.current.rotation.x = time * rotationSpeed;
    meshRef.current.rotation.y = time * rotationSpeed * 0.7;
    meshRef.current.rotation.z = time * rotationSpeed * 0.5;
  });

  const material = (
    <meshStandardMaterial
      color="#32FAC7"
      emissive="#32FAC7"
      emissiveIntensity={0.6}
      transparent
      opacity={0.7}
      wireframe
      metalness={0.8}
      roughness={0.2}
    />
  );

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 'sphere' && <Sphere args={[0.3, 16, 16]}>{material}</Sphere>}
      {type === 'box' && <Box args={[0.4, 0.4, 0.4]}>{material}</Box>}
      {type === 'torus' && <Torus args={[0.3, 0.1, 16, 32]}>{material}</Torus>}
      {type === 'octahedron' && <Octahedron args={[0.35]}>{material}</Octahedron>}
    </mesh>
  );
}

function PulsingCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(time * 2) * 0.3;
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <Octahedron args={[0.8, 0]}>
        <meshStandardMaterial
          color="#32FAC7"
          emissive="#32FAC7"
          emissiveIntensity={1.4}
          transparent
          opacity={0.4}
          wireframe
        />
      </Octahedron>
    </mesh>
  );
}

function ParticleNetwork() {
  const shapes = useMemo(() => {
    const temp = [];
    const types: Array<'sphere' | 'box' | 'torus' | 'octahedron'> = ['box', 'octahedron'];

    // Reduced to 25 shapes for cleaner look
    for (let i = 0; i < 25; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 7 - 2,
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.4,
        type: types[Math.floor(Math.random() * types.length)],
        scale: 1.2 + Math.random() * 1.5,
        rotationSpeed: 0.15 + Math.random() * 0.3,
      });
    }
    return temp;
  }, []);

  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.001;
    }
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.05;
    }
  });

  // Create connection lines between nearby shapes
  const lineGeometry = useMemo(() => {
    const positions = [];
    const maxDistance = 2.5;

    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        const [x1, y1, z1] = shapes[i].position;
        const [x2, y2, z2] = shapes[j].position;
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
  }, [shapes]);

  // Add background particles
  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <group>
      {/* Main floating shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          speed={shape.speed}
          type={shape.type}
          scale={shape.scale}
          rotationSpeed={shape.rotationSpeed}
        />
      ))}

      {/* Pulsing core */}
      <PulsingCore />

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#32FAC7"
          transparent
          opacity={0.2}
          linewidth={1}
        />
      </lineSegments>

      {/* Background particles */}
      <points ref={pointsRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.03}
          color="#32FAC7"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function FloatingShapes() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#32FAC7" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#0066FF" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#FF00FF" />
        <spotLight
          position={[0, 0, 10]}
          angle={0.6}
          penumbra={1}
          intensity={0.5}
          color="#32FAC7"
        />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
