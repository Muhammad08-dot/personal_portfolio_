import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
  name: string;
  level: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitInclination: number;
  orbitPhase: number;
  size: number;
}

const SKILLS: SkillNode[] = [
  { name: 'CrewAI',     level: 90, color: '#ff5555', orbitRadius: 2.2, orbitSpeed: 0.5,  orbitInclination: 0.3,  orbitPhase: 0,    size: 0.18 },
  { name: 'LangChain',  level: 85, color: '#ff79c6', orbitRadius: 2.6, orbitSpeed: 0.38, orbitInclination: -0.5, orbitPhase: 1.2,  size: 0.16 },
  { name: 'n8n',        level: 85, color: '#ffb86c', orbitRadius: 1.8, orbitSpeed: 0.65, orbitInclination: 0.6,  orbitPhase: 2.4,  size: 0.15 },
  { name: 'React',      level: 90, color: '#00d4ff', orbitRadius: 3.0, orbitSpeed: 0.28, orbitInclination: -0.2, orbitPhase: 0.6,  size: 0.17 },
  { name: 'TypeScript', level: 85, color: '#00aaff', orbitRadius: 3.4, orbitSpeed: 0.22, orbitInclination: 0.4,  orbitPhase: 3.1,  size: 0.15 },
  { name: 'Python',     level: 88, color: '#f1fa8c', orbitRadius: 2.0, orbitSpeed: 0.55, orbitInclination: -0.7, orbitPhase: 4.7,  size: 0.16 },
  { name: 'FastAPI',    level: 80, color: '#50fa7b', orbitRadius: 2.8, orbitSpeed: 0.32, orbitInclination: 0.8,  orbitPhase: 1.8,  size: 0.13 },
  { name: 'OpenCV',     level: 80, color: '#bd93f9', orbitRadius: 3.6, orbitSpeed: 0.18, orbitInclination: -0.4, orbitPhase: 5.1,  size: 0.14 },
  { name: 'Firebase',   level: 85, color: '#ffb86c', orbitRadius: 1.5, orbitSpeed: 0.75, orbitInclination: 0.9,  orbitPhase: 2.0,  size: 0.12 },
  { name: 'Node.js',    level: 85, color: '#00ff41', orbitRadius: 4.0, orbitSpeed: 0.15, orbitInclination: 0.2,  orbitPhase: 0.3,  size: 0.14 },
];

function CoreStar() {
  const ref = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.2}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      {/* Core */}
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.42, 4]} />
        <meshStandardMaterial
          color="#00ff41"
          emissive="#00ff41"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Wireframe */}
      <mesh>
        <icosahedronGeometry args={[0.44, 2]} />
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, inclination }: { radius: number; inclination: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <group rotation={[inclination, 0, inclination * 0.5]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#00ff4110" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

function SkillBall({ skill }: { skill: SkillNode }) {
  const ref = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = t * skill.orbitSpeed + skill.orbitPhase;

    if (ref.current) {
      ref.current.position.x = Math.cos(angle) * skill.orbitRadius;
      ref.current.position.z = Math.sin(angle) * skill.orbitRadius;
      ref.current.position.y = Math.sin(angle * 0.7 + skill.orbitPhase) * skill.orbitRadius * Math.sin(skill.orbitInclination);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.007;
    }
    if (pulseRef.current) {
      const pulse = 1 + Math.sin(t * 3 + skill.orbitPhase) * 0.12;
      pulseRef.current.scale.setScalar(pulse);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2 - Math.sin(t * 3 + skill.orbitPhase) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Pulse aura */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[skill.size * 1.8, 12, 12]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.15} />
      </mesh>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[skill.size, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      {/* Label */}
      <Text
        position={[0, skill.size + 0.14, 0]}
        fontSize={0.13}
        color={skill.color}
        anchorX="center"
        anchorY="bottom"
      >
        {skill.name}
      </Text>
    </group>
  );
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00ff41" size={0.025} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export default function SkillsGalaxy({ height = '500px' }: { height?: string }) {
  if (isMobile) {
    return (
      <div style={{ height, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-primary)', opacity: 0.5 }}>// 3D galaxy — view on desktop</p>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }}>
      <Canvas
        camera={{ position: [0, 2.5, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00ff41" distance={8} />
        <pointLight position={[5, 3, 5]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#bd93f9" />

        <CoreStar />

        {SKILLS.map((skill) => (
          <OrbitRing key={`ring-${skill.name}`} radius={skill.orbitRadius} inclination={skill.orbitInclination} />
        ))}

        {SKILLS.map((skill) => (
          <SkillBall key={skill.name} skill={skill} />
        ))}

        <AmbientParticles />
      </Canvas>
    </div>
  );
}
