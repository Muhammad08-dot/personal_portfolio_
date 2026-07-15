import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STREAM_COUNT = 60;
const STREAM_LENGTH = 25;

function DataColumn({ index: _index }: { index: number }) {
  const ref = useRef<THREE.Group>(null!);

  const config = useMemo(() => {
    const x = (Math.random() - 0.5) * 18;
    const z = (Math.random() - 0.5) * 6 - 3;
    const speed = 1.5 + Math.random() * 3;
    const startY = Math.random() * 12;
    const color = Math.random() < 0.7 ? '#00ff41' : Math.random() < 0.5 ? '#00d4ff' : '#bd93f9';
    const chars = Array.from({ length: STREAM_LENGTH }, () =>
      Math.random() < 0.5
        ? String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
        : Math.random().toFixed(0)
    );
    return { x, z, speed, startY, color, chars };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.y -= delta * config.speed;
      if (ref.current.position.y < -14) {
        ref.current.position.y = 10;
      }
    }
    // Animate character swap occasionally
    ref.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      if (mesh.material && Math.random() < 0.01) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0.05 + (1 - i / STREAM_LENGTH) * 0.85;
      }
    });
  });

  return (
    <group ref={ref} position={[config.x, config.startY, config.z]}>
      {Array.from({ length: STREAM_LENGTH }, (_, i) => {
        const brightness = 1 - i / STREAM_LENGTH;
        const opacity = Math.max(0.03, brightness * 0.9);
        // First character is brightest (head)
        const isHead = i === 0;
        return (
          <mesh key={i} position={[0, -i * 0.32, 0]}>
            <planeGeometry args={[0.22, 0.28]} />
            <meshBasicMaterial
              color={isHead ? '#ffffff' : config.color}
              transparent
              opacity={isHead ? 1 : opacity}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function GridFloor() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const size = 12;
    const step = 1.5;
    for (let x = -size; x <= size; x += step) {
      points.push(x, -6, -8, x, -6, 4);
    }
    for (let z = -8; z <= 4; z += step) {
      points.push(-size, -6, z, size, -6, z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  const ref = useRef<THREE.LineSegments>(null!);
  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.LineBasicMaterial).opacity =
        0.08 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00ff41" transparent opacity={0.1} />
    </lineSegments>
  );
}

function HorizonGlow() {
  return (
    <mesh position={[0, -4, -6]}>
      <planeGeometry args={[30, 2]} />
      <meshBasicMaterial color="#00ff41" transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export default function DataStream({ height = '260px' }: { height?: string }) {
  if (isMobile) {
    // On mobile: use a CSS-only animated gradient fallback instead of WebGL
    return (
      <div style={{
        height, width: '100%', overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,65,0.04) 50%, transparent 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--accent-primary)', opacity: 0.3 }}>
          // data stream
        </p>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#0a0a0a', 8, 22]} />

        {Array.from({ length: STREAM_COUNT }, (_, i) => (
          <DataColumn key={i} index={i} />
        ))}

        <GridFloor />
        <HorizonGlow />
      </Canvas>
    </div>
  );
}
