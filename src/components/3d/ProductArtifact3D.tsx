import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Product3DLogoModel } from './Product3DLogoModel';

interface ProductArtifactProps {
  id: string;
  accentColor: string;
  isHovered?: boolean;
}

export function ProductArtifact3D({ id, accentColor, isHovered = false }: ProductArtifactProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speedMultiplier = isHovered ? 2.5 : 1.0;

    groupRef.current.rotation.y += delta * 0.4 * speedMultiplier;

    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.3 * speedMultiplier;
      innerRef.current.rotation.z += delta * 0.2 * speedMultiplier;
    }

    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.5 * speedMultiplier;
      outerRef.current.rotation.x += delta * 0.2 * speedMultiplier;
    }
  });

  const color = new THREE.Color(accentColor);

  switch (id) {
    case 'nex':
      // 01 NEX: 3D Emblem Model displaying official uploaded logo
      return (
        <Product3DLogoModel
          textureUrl="/logo_nex.png"
          accentColor={accentColor}
          isHovered={isHovered}
          aspectRatio={2.5}
        />
      );

    case 'grid':
      // 02 GRID: 3D Emblem Model displaying official uploaded logo
      return (
        <Product3DLogoModel
          textureUrl="/logo_grid.png"
          accentColor={accentColor}
          isHovered={isHovered}
          aspectRatio={2.6}
        />
      );

    case 'orca':
      // 03 ORCA: Intelligent object recognition scanner & sensor torus (Original kept intact)
      return (
        <group ref={groupRef}>
          <mesh ref={innerRef}>
            <sphereGeometry args={[0.38, 32, 32]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive={color}
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.95}
            />
          </mesh>
          <group ref={outerRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.75, 0.04, 16, 48]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
            <mesh>
              <boxGeometry args={[1.1, 1.1, 1.1]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
            </mesh>
          </group>
        </group>
      );

    case 'mosaic':
      // 04 MOSAIC: 3D Emblem Model displaying official uploaded logo
      return (
        <Product3DLogoModel
          textureUrl="/logo_mosaic.png"
          accentColor={accentColor}
          isHovered={isHovered}
          aspectRatio={3.5}
        />
      );

    case 'lab':
      // 05 LAB: Quantum simulation sphere & containment gyroscopes (Original kept intact)
      return (
        <group ref={groupRef}>
          <mesh ref={innerRef}>
            <sphereGeometry args={[0.42, 24, 24]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.0}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <group ref={outerRef}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[0.8, 0.02, 16, 64]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.95, 0.02, 16, 64]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
              <torusGeometry args={[1.1, 0.015, 16, 64]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>
          </group>
        </group>
      );

    case 'world':
      // 06 WORLD: Geodesic digital spatial globe
      return (
        <group ref={groupRef}>
          <mesh ref={innerRef}>
            <sphereGeometry args={[0.6, 18, 18]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial
              color="#090d16"
              emissive={color}
              emissiveIntensity={0.3}
              roughness={0.3}
            />
          </mesh>
          <group ref={outerRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.78, 0.82, 32]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.7} />
            </mesh>
          </group>
        </group>
      );

    case 'core':
      // 07 CORE: 3D Emblem Model displaying official uploaded logo
      return (
        <Product3DLogoModel
          textureUrl="/logo_core.png"
          accentColor={accentColor}
          isHovered={isHovered}
          aspectRatio={2.5}
        />
      );

    case 'care':
      // 08 CARE: Clinical telemetry pulse helix
      return (
        <group ref={groupRef}>
          <mesh ref={innerRef}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.2}
              roughness={0.2}
            />
          </mesh>
          <group ref={outerRef}>
            {[-0.4, -0.2, 0, 0.2, 0.4].map((y, idx) => (
              <mesh key={idx} position={[Math.sin(idx) * 0.5, y, Math.cos(idx) * 0.5]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            ))}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.7, 0.02, 16, 48]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>
          </group>
        </group>
      );

    case 'serve':
      // 09 SERVE: Architectural POS hospitality terminal
      return (
        <group ref={groupRef}>
          <mesh ref={innerRef} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.9, 0.6, 0.08]} />
            <meshStandardMaterial
              color="#111115"
              emissive={color}
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.95}
            />
          </mesh>
          <group ref={outerRef}>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.4, 0.5, 0.12, 32]} />
              <meshStandardMaterial color="#222228" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <torusGeometry args={[0.6, 0.015, 16, 48]} />
              <meshBasicMaterial color={color} transparent opacity={0.8} />
            </mesh>
          </group>
        </group>
      );

    default:
      return null;
  }
}

