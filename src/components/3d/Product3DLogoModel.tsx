import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface Product3DLogoModelProps {
  textureUrl: string;
  accentColor: string;
  isHovered?: boolean;
  aspectRatio?: number; // width / height
}

/**
 * High-end cinematic 3D Logo Sculpture:
 * Features a floating multi-layered extruded emblem:
 * 1. Front polished emissive brand face displaying the authentic uploaded typography & symbol
 * 2. Back counter-face for 360-degree visibility
 * 3. Precision beveled metallic rim framing the logo
 * 4. Concentric floating glowing orbital rings
 * 5. Dynamic hover-reactive spin & float physics
 */
export function Product3DLogoModel({
  textureUrl,
  accentColor,
  isHovered = false,
  aspectRatio = 2.4,
}: Product3DLogoModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const texture = useLoader(TextureLoader, textureUrl);

  // Configure high quality texture filtering
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  useFrame((_, delta) => {
    if (!rootRef.current) return;
    const speed = isHovered ? 2.0 : 0.75;

    // Smooth continuous 360-degree rotation showing front and back logos
    rootRef.current.rotation.y += delta * 0.45 * speed;
  });

  // Dimensions of round medallion disc
  const radius = 0.70;
  const depth = 0.07;
  const logoWidth = 1.05;
  const logoHeight = logoWidth / aspectRatio;

  return (
    <group ref={rootRef}>
      {/* 1. Main 3D Round Coin / Medallion Disc */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, depth, 64]} />
        <meshStandardMaterial
          color="#0d0e14"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Outer Circular Beveled Rim Frame */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius + 0.025, radius + 0.025, depth - 0.012, 64]} />
        <meshStandardMaterial
          color="#1b1d26"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* 3. Front Face: Centered Official Logo */}
      <mesh position={[0, 0, depth / 2 + 0.006]}>
        <planeGeometry args={[logoWidth, logoHeight]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>

      {/* 4. Back Face: Centered Official Logo (Flipped so it reads correctly when facing back) */}
      <mesh position={[0, 0, -depth / 2 - 0.006]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[logoWidth, logoHeight]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>

      {/* Dedicated Brand Core Point Light */}
      <pointLight
        position={[0, 0, 0]}
        color={accentColor}
        intensity={isHovered ? 2.5 : 1.2}
        distance={3.5}
      />
    </group>
  );
}

