import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotionIntensity } from './MotionContext';

export function SkylineObservationDeck() {
  const motionIntensityRef = useMotionIntensity();
  const perimeterMatsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  const railingMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const offColor = useRef(new THREE.Color('#101813'));
  const onColor = useRef(new THREE.Color('#92ff5f'));

  useFrame(() => {
    const motion = motionIntensityRef.current;
    const curColor = offColor.current.clone().lerp(onColor.current, motion);
    perimeterMatsRef.current.forEach((m) => {
      if (m) m.color.copy(curColor);
    });
    if (railingMatRef.current) {
      railingMatRef.current.color.copy(curColor);
    }
  });

  const towers = useMemo(() => {
    const list = [];
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI - Math.PI / 2;
      const dist = 160 + Math.random() * 80;
      const x = 24 + Math.sin(angle) * dist;
      const z = -120 - Math.cos(angle) * (dist * 0.7);
      const height = 40 + Math.random() * 90;
      const width = 6 + Math.random() * 12;
      const depth = 6 + Math.random() * 12;
      const isHero = i % 5 === 0;
      list.push({ x, z, height, width, depth, isHero, id: i });
    }
    return list;
  }, []);

  return (
    <group position={[24, 0, -115]}>
      {/* High-Reflectance Observation Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[32, 38]} />
        <meshStandardMaterial
          color="#08090c"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Recessed Floor Perimeter Uplights */}
      {[-14, 14].map((x, i) => (
        <mesh key={i} position={[x, 0.02, 0]}>
          <boxGeometry args={[0.1, 0.04, 36]} />
          <meshBasicMaterial
            ref={(el) => {
              if (el) perimeterMatsRef.current[i] = el;
            }}
            color="#101813"
          />
        </mesh>
      ))}

      {/* Cantilevered Balustrade Sill */}
      <mesh position={[0, 1.1, -18.2]}>
        <boxGeometry args={[30, 0.2, 0.4]} />
        <meshStandardMaterial color="#1a1c24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Panoramic Glass Wall */}
      <mesh position={[0, 5, -18.4]}>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial
          color="#0b1726"
          transparent
          opacity={0.3}
          roughness={0.05}
          metalness={0.8}
        />
      </mesh>

      {/* Glowing Horizontal Skyline Railing Accent */}
      <mesh position={[0, 1.12, -18.15]}>
        <boxGeometry args={[29.8, 0.04, 0.04]} />
        <meshBasicMaterial ref={railingMatRef} color="#101813" />
      </mesh>

      {/* Distant Futuristic Skyline Towers */}
      {towers.map((tower) => (
        <group key={tower.id} position={[tower.x - 24, tower.height / 2 - 20, tower.z + 115]}>
          <mesh>
            <boxGeometry args={[tower.width, tower.height, tower.depth]} />
            <meshStandardMaterial
              color={tower.isHero ? '#161924' : '#0e1017'}
              metalness={0.8}
              roughness={0.4}
            />
          </mesh>
          {tower.isHero && (
            <mesh position={[0, tower.height / 2 + 1, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 2.5, 6]} />
              <meshBasicMaterial color="#92ff5f" />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
