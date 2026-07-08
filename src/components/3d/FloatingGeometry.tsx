import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

type Shape = 'torus' | 'octahedron' | 'torusKnot' | 'dodecahedron';

function Geometry({ shape = 'torus', color = '#00ff41' }: { shape?: Shape; color?: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  const geometry = () => {
    switch (shape) {
      case 'octahedron': return <octahedronGeometry args={[1.2, 0]} />;
      case 'torusKnot': return <torusKnotGeometry args={[0.8, 0.25, 100, 12]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[1.1, 0]} />;
      default: return <torusGeometry args={[1, 0.4, 16, 100]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={ref}>
        {geometry()}
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh>
        {geometry()}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
      </mesh>
    </Float>
  );
}

interface Props {
  shape?: Shape;
  color?: string;
  height?: string;
}

export default function FloatingGeometry({ shape = 'torus', color = '#00ff41', height = '300px' }: Props) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color={color} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
        <Geometry shape={shape} color={color} />
      </Canvas>
    </div>
  );
}
