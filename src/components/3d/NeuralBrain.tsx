import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuronProps {
  position: THREE.Vector3;
  color: string;
  size: number;
  pulseOffset: number;
}

const NEURON_COUNT = 40;
const CONNECTION_THRESHOLD = 2.8;

function generateNeurons(): NeuronProps[] {
  return Array.from({ length: NEURON_COUNT }, (_, i) => {
    const r = 1.5 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const colors = ['#00ff41', '#00d4ff', '#bd93f9', '#ff5555', '#ffb86c'];
    return {
      position: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.7,
        r * Math.sin(phi) * Math.sin(theta)
      ),
      color: colors[i % colors.length],
      size: 0.04 + Math.random() * 0.06,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  });
}

const NEURONS = generateNeurons();

function NeuronNode({ position, color, size, pulseOffset }: NeuronProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 2.5 + pulseOffset) * 0.3;
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(t * 2.5 + pulseOffset) * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(t * 2.5 + pulseOffset) * 0.08;
    }
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 3, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 10, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function SignalPulse({ from, to, color, speed, offset }: {
  from: THREE.Vector3; to: THREE.Vector3;
  color: string; speed: number; offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = ((state.clock.elapsedTime * speed + offset) % 1);
    if (meshRef.current) {
      meshRef.current.position.lerpVectors(from, to, t);
      const scale = 0.5 + Math.sin(t * Math.PI) * 0.5;
      meshRef.current.scale.setScalar(scale);
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = scale * 0.9;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

function Connections() {
  const groupRef = useRef<THREE.Group>(null!);

  const { lines, pulses } = useMemo(() => {
    const linePoints: number[] = [];
    const lineColors: number[] = [];
    const pulseData: { from: THREE.Vector3; to: THREE.Vector3; color: string; speed: number; offset: number }[] = [];

    const colorPairs = [
      [new THREE.Color('#00ff41'), new THREE.Color('#00d4ff')],
      [new THREE.Color('#bd93f9'), new THREE.Color('#ff5555')],
      [new THREE.Color('#ffb86c'), new THREE.Color('#00ff41')],
    ];

    for (let i = 0; i < NEURONS.length; i++) {
      for (let j = i + 1; j < NEURONS.length; j++) {
        const dist = NEURONS[i].position.distanceTo(NEURONS[j].position);
        if (dist < CONNECTION_THRESHOLD) {
          const alpha = 1 - dist / CONNECTION_THRESHOLD;
          const pair = colorPairs[i % colorPairs.length];
          const col = pair[0].clone().lerp(pair[1], alpha);

          linePoints.push(
            NEURONS[i].position.x, NEURONS[i].position.y, NEURONS[i].position.z,
            NEURONS[j].position.x, NEURONS[j].position.y, NEURONS[j].position.z
          );
          lineColors.push(col.r, col.g, col.b, col.r, col.g, col.b);

          if (Math.random() < 0.35) {
            pulseData.push({
              from: NEURONS[i].position,
              to: NEURONS[j].position,
              color: NEURONS[i].color,
              speed: 0.3 + Math.random() * 0.5,
              offset: Math.random(),
            });
          }
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    return { lines: geo, pulses: pulseData };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07;
      groupRef.current.rotation.x += delta * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial vertexColors transparent opacity={0.25} />
      </lineSegments>

      {NEURONS.map((n, i) => (
        <NeuronNode key={i} {...n} />
      ))}

      {pulses.map((p, i) => (
        <SignalPulse key={i} {...p} />
      ))}
    </group>
  );
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export default function NeuralBrain({ height = '400px' }: { height?: string }) {
  if (isMobile) {
    return (
      <div style={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-primary)', opacity: 0.5 }}>// neural network — view on desktop</p>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#00ff41" />
        <pointLight position={[-3, -3, 3]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[0, 4, -4]} intensity={0.5} color="#bd93f9" />

        <Connections />
      </Canvas>
    </div>
  );
}
