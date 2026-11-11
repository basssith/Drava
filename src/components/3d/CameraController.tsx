import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PLINTH_COORDINATES: Record<string, { x: number; z: number; rotY: number }> = {
  nex: { x: 20.6, z: -35, rotY: 0.32 },
  grid: { x: 27.4, z: -40, rotY: -0.32 },
  orca: { x: 20.4, z: -45, rotY: 0.32 },
  mosaic: { x: 27.6, z: -50, rotY: -0.32 },
  lab: { x: 20.6, z: -55, rotY: 0.32 },
  world: { x: 27.4, z: -60, rotY: -0.32 },
  core: { x: 20.4, z: -65, rotY: 0.32 },
  care: { x: 27.6, z: -70, rotY: -0.32 },
  serve: { x: 24.0, z: -78, rotY: 0.0 },
};

interface CameraControllerProps {
  scrollProgress: number; // 0.0 to 1.0
  activeAppId?: string | null;
}

export function CameraController({ scrollProgress, activeAppId }: CameraControllerProps) {
  const { camera } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef(new THREE.Vector3(0, 9.5, 52));
  const currentTarget = useRef(new THREE.Vector3(0, 5, 0));
  const targetPos = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const tPos = targetPos.current;
    const lTarget = lookTarget.current;

    if (p < 0.16) {
      // Zone 1: Wide cinematic exterior HQ -> approaching path
      const t = p / 0.16;
      tPos.set(
        0,
        THREE.MathUtils.lerp(8.0, 3.6, t),
        THREE.MathUtils.lerp(52, 26, t)
      );
      lTarget.set(0, THREE.MathUtils.lerp(3.8, 2.5, t), 12);
    } else if (p < 0.28) {
      // Zone 2: Approach entrance portal -> doors smoothly slide open -> reveal interior
      const t = (p - 0.16) / 0.12;
      tPos.set(
        0,
        THREE.MathUtils.lerp(3.6, 2.4, t),
        THREE.MathUtils.lerp(26, 10, t)
      );
      lTarget.set(0, 2.4, THREE.MathUtils.lerp(12, -8, t));
    } else if (p < 0.38) {
      // Zone 3: Enter glass doors -> Reception & Interior Atrium
      // Move straight forward inside atrium, then turn attention right into the East Concourse
      const t = (p - 0.28) / 0.10;
      tPos.set(
        0,
        2.4,
        THREE.MathUtils.lerp(10, -18, t)
      );
      // Turning camera view towards the right archway opening
      lTarget.set(THREE.MathUtils.lerp(0, 14, t), 2.2, -18);
    } else if (p < 0.48) {
      // Zone 4A: TURN RIGHT & MOVE STRAIGHT DOWN THE RIGHT CORRIDOR
      // Camera travels straight east along X-axis (from x: 0 to x: 24, z = -18)
      const t = (p - 0.38) / 0.10;
      const camX = THREE.MathUtils.lerp(0, 24, t);

      tPos.set(
        camX,
        2.4,
        -18
      );

      // Camera looks straight forward east along the right corridor
      lTarget.set(
        THREE.MathUtils.lerp(14, 32, t),
        2.2,
        -18
      );
    } else if (p < 0.56) {
      // Zone 4B: TAKE A LEFT TURN AT x = 24 & LOOK STRAIGHT AT THE APPLICATION ENTRANCE DOOR!
      // Camera turns left (from facing East +X to facing North -Z at z: -28)
      // As the camera approaches near the door, the door automatically parts open!
      const t = (p - 0.48) / 0.08;
      
      tPos.set(
        24,
        2.35,
        THREE.MathUtils.lerp(-18, -28, t)
      );

      // Camera looks straight ahead north into the door and gallery beyond
      lTarget.set(
        24,
        2.1,
        THREE.MathUtils.lerp(-18, -50, t)
      );
    } else if (p < 0.82) {
      // Zone 5: PASS THROUGH THE OPEN DOOR INTO THE 9 APPLICATIONS SHOWROOM!
      // Camera moves down the center corridor between plinths (x: 24, z: -28 -> -82)
      // Camera height 2.25 and look target 1.9 allows perfect eye-level view of plinths and 3D artifacts!
      const t = (p - 0.56) / 0.26;
      tPos.set(
        24,
        2.25,
        THREE.MathUtils.lerp(-28, -82, t)
      );
      // Looking forward through the corridor of plinths
      lTarget.set(
        24,
        1.85,
        THREE.MathUtils.lerp(-45, -100, t)
      );
    } else if (p < 0.92) {
      // Zone 6: Approach Exit Portal Door at ending (z: -82 -> -94)
      const t = (p - 0.82) / 0.10;
      tPos.set(
        24,
        2.4,
        THREE.MathUtils.lerp(-82, -94, t)
      );
      lTarget.set(24, 2.3, -120);
    } else {
      // Zone 7: Glide through exit door onto open skyline observation deck & reveal footer
      const t = (p - 0.92) / 0.08;
      tPos.set(
        24,
        THREE.MathUtils.lerp(2.4, 2.6, t),
        THREE.MathUtils.lerp(-94, -108, t)
      );
      lTarget.set(24, 2.5, -160);
    }

    if (activeAppId && PLINTH_COORDINATES[activeAppId]) {
      // Comfortably framed view of that application's 3D rotating shape
      const pl = PLINTH_COORDINATES[activeAppId];
      // Target center of floating artifact on top of plinth is at y = 2.3
      const shapeY = 2.3;
      
      // Kept comfortably back at ~3.4m distance with slight camera elevation (y = 2.45)
      // and offset slightly towards the aisle so the 3D model sits elegantly in the left/center
      // while the minimal rectangular detail card sits neatly on the right without overlapping
      const forwardDist = 3.35;
      const aisleOffset = pl.x > 24 ? -0.45 : 0.45;
      const camX = pl.x + Math.sin(pl.rotY) * forwardDist + aisleOffset;
      const camZ = pl.z + Math.cos(pl.rotY) * forwardDist;

      tPos.set(camX, 2.45, camZ);
      lTarget.set(pl.x, shapeY, pl.z);
    }

    // Subtle natural mouse parallax
    const parallaxX = mousePos.current.x * (activeAppId ? 0.08 : 0.35);
    const parallaxY = mousePos.current.y * (activeAppId ? 0.05 : 0.2);
    tPos.x += parallaxX;
    tPos.y += parallaxY;
    lTarget.x += parallaxX * 0.25;

    // Smooth lerp to target camera position & lookAt
    const dampSpeed = delta * (activeAppId ? 4.2 : 5.0);
    currentPos.current.lerp(tPos, dampSpeed);
    currentTarget.current.lerp(lTarget, dampSpeed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
