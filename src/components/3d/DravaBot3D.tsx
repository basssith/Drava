import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DravaBotProps {
  position?: [number, number, number];
}

export function DravaBot3D({ position = [0, 3.5, -45] }: DravaBotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Floating hover bobbing
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.15;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 1.2) * 0.08;
      headRef.current.rotation.y = Math.cos(t * 1.0) * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.5;
    }
    if (eyeRef.current) {
      const mat = eyeRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.7 + Math.sin(t * 4) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Upper Torso / Chassis */}
      <group ref={headRef}>
        {/* Sleek Aerodynamic Head Capsule */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.42, 0.5, 16, 32]} />
          <meshStandardMaterial
            color="#0d0e12"
            metalness={0.92}
            roughness={0.12}
          />
        </mesh>

        {/* Visor / Eye Display Strip */}
        <mesh position={[0, 0.12, 0.38]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.14, 0.12]} />
          <meshPhysicalMaterial
            color="#050608"
            roughness={0.05}
            metalness={0.1}
            transmission={0.4}
            transparent
          />
        </mesh>

        {/* Glowing AI Optical Visor */}
        <mesh ref={eyeRef} position={[0, 0.12, 0.44]}>
          <planeGeometry args={[0.38, 0.06]} />
          <meshBasicMaterial color="#92ff5f" transparent opacity={0.9} />
        </mesh>

        {/* Side Sensor Pods */}
        {[-0.45, 0.45].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.14, 0.1, 16]} />
            <meshStandardMaterial color="#1a1c24" metalness={0.95} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Floating Magnetic Propulsion Ring */}
      <mesh ref={ringRef} position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.03, 16, 48]} />
        <meshBasicMaterial color="#92ff5f" />
      </mesh>

      {/* Thrust Halo Beam */}
      <pointLight position={[0, -0.8, 0]} color="#92ff5f" intensity={2.0} distance={5} />
    </group>
  );
}

