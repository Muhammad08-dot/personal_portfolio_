import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff41"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function MainOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.x = mouse.x * 0.5;
      meshRef.current.position.y = mouse.y * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#00ff41"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.52, 2]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

function RingOrbit() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.5, 0.02, 8, 100]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </mesh>
  );
}

function RingOrbit2() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -state.clock.elapsedTime * 0.15;
      ref.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.2, 0.015, 8, 120]} />
      <meshBasicMaterial color="#bd93f9" transparent opacity={0.3} />
    </mesh>
  );
}

function FloatingCube({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const speed = useMemo(() => Math.random() * 0.5 + 0.2, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01 * speed;
      ref.current.rotation.y += 0.015 * speed;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="#bd93f9" transparent opacity={0.6} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export default function HeroScene() {
  const cubePositions: [number, number, number][] = [
    [-4, 2, -2], [4, -1, -3], [-3, -2, -1], [3, 3, -2],
    [-5, 0, -4], [5, 1, -3], [2, -3, -2], [-2, 3, -3],
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00ff41" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#bd93f9" />

      <ParticleField />
      <MainOrb />
      <RingOrbit />
      <RingOrbit2 />

      {cubePositions.map((pos, i) => (
        <FloatingCube key={i} position={pos} />
      ))}
    </Canvas>
  );
}
