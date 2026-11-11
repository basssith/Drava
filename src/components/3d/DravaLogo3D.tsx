import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DravaLogo3DProps {
  position?: [number, number, number];
  scale?: number;
}

/**
 * DravaLogo3D:
 * Exact 3D recreation matching the user's reference logo (media_1794316888735_8075fd40 and media_1794316893033_c60afdde):
 * 1. Top-Left Rounded Square
 * 2. Top-Right Rounded Square
 * 3. Dynamic Curved Arc / Hook sweeping downwards and curving to the left, positioned below the top-right block.
 * 4. Dual orbital rings orbiting around the brand mark.
 */
export function DravaLogo3D({ position = [0, 3.8, -4], scale = 0.024 }: DravaLogo3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  // Build the 2D Shapes using Three.js Shape API
  const { squareShape, hookShape } = useMemo(() => {
    // 1. Rounded rectangle for top two blocks
    const createRoundedRect = (width: number, height: number, radius: number) => {
      const shape = new THREE.Shape();
      const x = -width / 2;
      const y = -height / 2;
      shape.moveTo(x + radius, y);
      shape.lineTo(x + width - radius, y);
      shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius);
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height);
      shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);
      return shape;
    };

    // Both top blocks are rounded squares (width 22, height 22, radius 3.5)
    const square = createRoundedRect(22, 22, 3.5);

    // 2. Exact hook / arc shape matching media_1794316888735_8075fd40:
    // It starts below the right square (top width ~ 22), drops down, and curves smoothly left.
    const hook = new THREE.Shape();
    // Top horizontal edge right under the right square
    hook.moveTo(22, 0);
    // Outer curved right edge sweeping down
    hook.bezierCurveTo(23, -18, 14, -36, -5, -48);
    // Bottom curved base
    hook.bezierCurveTo(-14, -53, -24, -50, -28, -42);
    hook.bezierCurveTo(-30, -37, -26, -33, -19, -31);
    // Inner contour sweeping back up into the origin
    hook.bezierCurveTo(-2, -26, 3, -12, 1, 0);
    hook.closePath();

    return { squareShape: square, hookShape: hook };
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 6,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 1.2,
      bevelThickness: 1.2,
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating bob & smooth continuous yaw rotation
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.12;
      groupRef.current.rotation.y = t * 0.45;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* 3D LOGO SHAPE:
          Center offset so the whole 3-element composition rotates around its collective geometric centroid
      */}
      <group position={[-2, 12, 0]}>
        {/* 1. Left Rounded Square */}
        <mesh position={[-20, 17, 0]}>
          <extrudeGeometry args={[squareShape, extrudeSettings]} />
          <meshStandardMaterial
            color="#92ff5f"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* 2. Top-Right Rounded Square (with clear horizontal gap from left square) */}
        <mesh position={[10, 17, 0]}>
          <extrudeGeometry args={[squareShape, extrudeSettings]} />
          <meshStandardMaterial
            color="#92ff5f"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* 3. The Signature Curved Arc/Hook */}
        <mesh position={[9, 1, 0]}>
          <extrudeGeometry args={[hookShape, extrudeSettings]} />
          <meshStandardMaterial
            color="#92ff5f"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Atmospheric Orbital Rings matching user 3D mockup */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3.2, 0.2, 0]}>
        <torusGeometry args={[65, 0.7, 12, 64]} />
        <meshBasicMaterial color="#92ff5f" transparent opacity={0.65} />
      </mesh>

      <mesh ref={ringRef2} rotation={[-Math.PI / 3.8, Math.PI / 4, 0]}>
        <torusGeometry args={[78, 0.5, 12, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
