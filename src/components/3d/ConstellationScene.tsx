import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Nodes() {
  const ref = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const nodePositions = useMemo(() => {
    const count = 25;
    return Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 4
    ));
  }, []);

  const { linePositions } = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 3.5) {
          pos.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    return { linePositions: new Float32Array(pos) };
  }, [nodePositions]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.2} />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#00ff41' : i % 3 === 1 ? '#00d4ff' : '#bd93f9'} />
        </mesh>
      ))}
    </group>
  );
}

interface Props {
  height?: string;
}

export default function ConstellationScene({ height = '400px' }: Props) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ff41" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00d4ff" />
        <Nodes />
      </Canvas>
    </div>
  );
}
