import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PhilosophyGalleryProps {
  scrollProgress: number;
}

export function PhilosophyGallery({ scrollProgress }: PhilosophyGalleryProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 80; // Optimized lightweight count
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 5 + 0.5;
      pos[i * 3 + 2] = -32 - Math.random() * 28;
    }
    return pos;
  }, [particleCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
    }
  });

  const monolithTriggers = [0.44, 0.49, 0.54, 0.59];

  const monoliths = [
    { z: -36, x: -4.5, height: 6.2, glow: '#92ff5f' },
    { z: -43, x: 4.5, height: 6.5, glow: '#93C5FD' },
    { z: -50, x: -4.5, height: 6.0, glow: '#92ff5f' },
    { z: -57, x: 4.5, height: 6.4, glow: '#C084FC' },
  ];

  return (
    <group>
      {/* Floor Runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -46]}>
        <planeGeometry args={[6.5, 34]} />
        <meshStandardMaterial
          color="#161822"
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Center Pathway Glow Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -46]}>
        <planeGeometry args={[0.08, 34]} />
        <meshBasicMaterial color="#92ff5f" />
      </mesh>

      {/* 1 Single Strategic Gallery Downlight (Zero Lag) */}
      <pointLight
        position={[0, 7.5, -46]}
        color="#fff1db"
        intensity={3.5}
        distance={28}
        decay={1.8}
      />

      {/* Monolith Sculptures (Optimized with Emissive Slits) */}
      {monoliths.map((m, idx) => {
        const trigger = monolithTriggers[idx];
        const factor = THREE.MathUtils.clamp((scrollProgress - trigger) / 0.04, 0.1, 1.0);
        const isIgnited = factor > 0.3;

        return (
          <group key={idx} position={[m.x, m.height / 2, m.z]}>
            <mesh>
              <boxGeometry args={[1.4, m.height, 1.4]} />
              <meshStandardMaterial
                color={isIgnited ? '#1e212b' : '#111216'}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Vertical Glowing Slit (Emissive = Fast!) */}
            <mesh position={[m.x > 0 ? -0.71 : 0.71, 0, 0]}>
              <boxGeometry args={[0.04, m.height * 0.85, 0.1]} />
              <meshBasicMaterial color={isIgnited ? m.glow : '#22252c'} />
            </mesh>
          </group>
        );
      })}

      {/* Floating Light Speck Dust */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#92ff5f"
          transparent
          opacity={0.6}
        />
      </points>

      {/* Ceiling Slab */}
      <mesh position={[0, 8.5, -46]}>
        <boxGeometry args={[16, 0.4, 34]} />
        <meshStandardMaterial color="#14161f" roughness={0.5} />
      </mesh>
    </group>
  );
}
