import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Product3DLogoModel } from './Product3DLogoModel';
import { ProductArtifact3D } from './ProductArtifact3D';
import type { ApplicationItem } from '../../types';

interface AppSpecializedChamberProps {
  app: ApplicationItem;
}

/**
 * AppSpecializedChamber:
 * A dedicated, futuristic spatial computing chamber located at x = 70, y = 0, z = -35.
 * When an application is clicked, the camera travels through a spatial hyperspace transition
 * right into this chamber where the application's hero 3D model floats at center,
 * illuminated by volumetric neon rings, hologram matrix panels, and floor reflections.
 */
export function AppSpecializedChamber({ app }: AppSpecializedChamberProps) {
  const chamberRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.position.y = 2.4 + Math.sin(t * 1.5) * 0.08;
    }
  });

  const isCustomLogo = ['nex', 'grid', 'mosaic', 'core'].includes(app.id);

  return (
    <group position={[70, 0, -35]} ref={chamberRef}>
      {/* 1. Chamber High-Gloss Reflective Hexagonal Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[14, 14, 0.2, 32]} />
        <meshStandardMaterial
          color="#07080c"
          roughness={0.06}
          metalness={0.94}
        />
      </mesh>

      {/* 2. Concentric Neon Floor Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
        <ringGeometry args={[3.2, 3.32, 64]} />
        <meshBasicMaterial color={app.accentColor} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
        <ringGeometry args={[7.0, 7.12, 64]} />
        <meshBasicMaterial color={app.accentColor} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
        <ringGeometry args={[11.5, 11.6, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      {/* 3. Central Pedestal Column */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.6, 2.2, 1.2, 48]} />
        <meshStandardMaterial
          color="#0b0d14"
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
      <mesh position={[0, 1.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.62, 48]} />
        <meshBasicMaterial color={app.accentColor} />
      </mesh>

      {/* 4. Hero 3D Logo / Shape floating at Center Stage */}
      <group ref={coreRef} position={[0, 2.4, 0]}>
        {isCustomLogo ? (
          <Product3DLogoModel
            textureUrl={`/logo_${app.id}.png`}
            accentColor={app.accentColor}
            isHovered={true}
            aspectRatio={app.id === 'mosaic' ? 3.5 : 2.5}
          />
        ) : (
          <ProductArtifact3D
            id={app.id}
            accentColor={app.accentColor}
            isHovered={true}
          />
        )}
      </group>

      {/* 5. Overhead Kinetic Halo Oculus */}
      <mesh ref={ringRef} position={[0, 8.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.5, 0.08, 16, 64]} />
        <meshBasicMaterial color={app.accentColor} />
      </mesh>

      {/* 6. Chamber Back Wall Arc with Sleek Vertical Pylons */}
      {[-4, -2, 0, 2, 4].map((idx) => {
        const angle = (idx * Math.PI) / 10;
        const radius = 12.5;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius;
        return (
          <group key={idx} position={[x, 4.5, z]} rotation={[0, -angle, 0]}>
            <mesh>
              <boxGeometry args={[1.2, 9.0, 0.3]} />
              <meshStandardMaterial color="#0e1017" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0.16]}>
              <boxGeometry args={[0.08, 8.4, 0.05]} />
              <meshBasicMaterial color={app.accentColor} />
            </mesh>
          </group>
        );
      })}

      {/* 7. Dedicated Chamber Lighting */}
      <pointLight
        position={[0, 3.8, 0]}
        color={app.accentColor}
        intensity={6.0}
        distance={18}
        decay={1.8}
      />
      <pointLight
        position={[0, 7.5, 3.5]}
        color="#ffffff"
        intensity={4.5}
        distance={25}
        decay={1.5}
      />
    </group>
  );
}

