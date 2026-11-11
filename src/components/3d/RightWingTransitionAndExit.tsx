import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/audio';
import { useMotionIntensity } from './MotionContext';

interface TransitionPortalProps {
  scrollProgress: number;
}

export function RightWingTransitionAndExit({ scrollProgress }: TransitionPortalProps) {
  const runnerMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const motionIntensityRef = useMotionIntensity();
  const offColor = useRef(new THREE.Color('#101813'));
  const onColor = useRef(new THREE.Color('#92ff5f'));

  useFrame(() => {
    const motion = motionIntensityRef.current;
    if (runnerMatRef.current) {
      runnerMatRef.current.color.copy(offColor.current).lerp(onColor.current, motion);
    }
  });

  // 1. Entrance Door to Applications Wing (at x = 24, z = -30, facing North/looking straight ahead into -Z)
  const appDoorLeftRef = useRef<THREE.Group>(null);
  const appDoorRightRef = useRef<THREE.Group>(null);
  const hasTriggeredAppChime = useRef(false);

  // 2. Final Exit Door to Observation Deck (at x = 24, z = -95)
  const exitDoorLeftRef = useRef<THREE.Group>(null);
  const exitDoorRightRef = useRef<THREE.Group>(null);

  // Door opens as camera turns left and approaches the door (scroll ~ 0.52 to 0.60)
  const appDoorOpenFactor = THREE.MathUtils.clamp((scrollProgress - 0.52) / 0.08, 0, 1);
  const appSlideDist = appDoorOpenFactor * 2.2;

  if (appDoorOpenFactor > 0.1 && !hasTriggeredAppChime.current) {
    sound.playPortalEnter();
    hasTriggeredAppChime.current = true;
  } else if (appDoorOpenFactor <= 0.05) {
    hasTriggeredAppChime.current = false;
  }

  // Sliding doors part horizontally (along X-axis) as camera looks straight North (-Z)
  if (appDoorLeftRef.current) {
    appDoorLeftRef.current.position.x = -1.1 - appSlideDist;
  }
  if (appDoorRightRef.current) {
    appDoorRightRef.current.position.x = 1.1 + appSlideDist;
  }

  // Exit door at end of showroom
  const exitDoorOpenFactor = THREE.MathUtils.clamp((scrollProgress - 0.88) / 0.08, 0, 1);
  const exitSlideDist = exitDoorOpenFactor * 2.2;

  if (exitDoorLeftRef.current) {
    exitDoorLeftRef.current.position.x = -1.1 - exitSlideDist;
  }
  if (exitDoorRightRef.current) {
    exitDoorRightRef.current.position.x = 1.1 + exitSlideDist;
  }

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. EXTENDED RIGHT-HAND CORRIDOR (CAMERA MOVES STRAIGHT EAST)   */}
      {/* Spans from x = 10 all the way to x = 28, z = -18               */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[19, 0, -18]}>
        <planeGeometry args={[22, 10]} />
        <meshStandardMaterial
          color="#161822"
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      <gridHelper
        args={[20, 8, '#383226', '#1a1822']}
        position={[19, 0.01, -18]}
      />

      {/* Corridor Runner Glow Line leading straight to the right end */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[19, 0.02, -18]}>
        <planeGeometry args={[20, 0.15]} />
        <meshBasicMaterial ref={runnerMatRef} color="#101813" />
      </mesh>

      {/* Overhead Luminous Archway Portals along the straight right corridor */}
      {[12, 16, 20, 24].map((x, idx) => (
        <group key={idx} position={[x, 3.8, -18]}>
          <mesh>
            <boxGeometry args={[0.3, 0.25, 9.0]} />
            <meshStandardMaterial color="#1a1c26" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[0.15, 0.04, 8.5]} />
            <meshBasicMaterial color="#fff7ed" />
          </mesh>
        </group>
      ))}

      {/* Ceiling of the Right Corridor */}
      <mesh position={[19, 5.0, -18]}>
        <boxGeometry args={[22, 0.4, 10]} />
        <meshStandardMaterial color="#14151b" roughness={0.5} />
      </mesh>

      {/* Dedicated Warm Downlights along the right corridor */}
      <pointLight
        position={[14, 4.2, -18]}
        color="#fff1db"
        intensity={4.5}
        distance={18}
        decay={1.8}
      />
      <pointLight
        position={[22, 4.2, -18]}
        color="#fff1db"
        intensity={4.5}
        distance={18}
        decay={1.8}
      />

      {/* North Wall of Right Corridor (Solid with an open portal cutout at x = 24 for the left turn) */}
      <mesh position={[16, 2.5, -23]}>
        <boxGeometry args={[14, 5.0, 0.4]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.5} />
      </mesh>
      {/* South Wall */}
      <mesh position={[19, 2.5, -13]}>
        <boxGeometry args={[22, 5.0, 0.4]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.5} />
      </mesh>
      {/* East End Wall of Right Corridor with White drava Brand Text */}
      <mesh position={[30, 2.5, -18]}>
        <boxGeometry args={[0.4, 5.0, 10]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.5} />
      </mesh>
      {/* Upper Architectural Light Bar directly above drava */}
      <mesh position={[29.7, 3.4, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[4.8, 0.04, 0.04]} />
        <meshBasicMaterial color="#92ff5f" />
      </mesh>
      {/* Centered Large Bold White drava Typography */}
      <Text
        position={[29.65, 2.3, -18]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={1.45}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        drava
      </Text>

      {/* ============================================================== */}
      {/* 2. THE APPLICATION ENTRANCE DOOR (AFTER TAKING LEFT AT x = 24)  */}
      {/* Camera looks straight forward North (-Z) at this door!         */}
      {/* When camera approaches near it, it slides open!                */}
      {/* ============================================================== */}
      <group position={[24, 0, -28]}>
        {/* Overhead Canopy with Warm Downlight */}
        <mesh position={[0, 4.4, 1.2]}>
          <boxGeometry args={[8.5, 0.35, 3.2]} />
          <meshStandardMaterial color="#1a1c24" metalness={0.8} roughness={0.2} />
        </mesh>
        <pointLight
          position={[0, 3.8, 1.0]}
          color="#fff1db"
          intensity={4.5 + appDoorOpenFactor * 2.5}
          distance={18}
          decay={1.8}
        />

        {/* Portal Surround Columns */}
        <mesh position={[-3.2, 2.0, 0]}>
          <boxGeometry args={[1.8, 4.2, 0.8]} />
          <meshStandardMaterial color="#141620" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[3.2, 2.0, 0]}>
          <boxGeometry args={[1.8, 4.2, 0.8]} />
          <meshStandardMaterial color="#141620" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[4.8, 0.5, 0.7]} />
          <meshStandardMaterial color="#121318" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Lit Header Sign: APPLICATIONS WING (Facing South towards arriving camera) */}
        <mesh position={[0, 4.1, 0.42]}>
          <planeGeometry args={[3.4, 0.24]} />
          <meshBasicMaterial color="#92ff5f" />
        </mesh>

        {/* Left Sliding Door */}
        <group ref={appDoorLeftRef} position={[-1.1, 1.9, 0]}>
          <mesh>
            <boxGeometry args={[2.2, 3.8, 0.08]} />
            <meshStandardMaterial
              color="#1a1c26"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.85}
            />
          </mesh>
          <mesh position={[0.9, 0, 0.06]}>
            <boxGeometry args={[0.04, 2.4, 0.04]} />
            <meshStandardMaterial color="#92ff5f" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Right Sliding Door */}
        <group ref={appDoorRightRef} position={[1.1, 1.9, 0]}>
          <mesh>
            <boxGeometry args={[2.2, 3.8, 0.08]} />
            <meshStandardMaterial
              color="#1a1c26"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.85}
            />
          </mesh>
          <mesh position={[-0.9, 0, 0.06]}>
            <boxGeometry args={[0.04, 2.4, 0.04]} />
            <meshStandardMaterial color="#92ff5f" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 3. GRAND EXIT PORTAL DOOR AT ENDING (x = 24, y = 0, z = -95)   */}
      {/* ============================================================== */}
      <group position={[24, 0, -95]}>
        {/* Overhead Canopy */}
        <mesh position={[0, 4.4, 1.5]}>
          <boxGeometry args={[8.5, 0.35, 4]} />
          <meshStandardMaterial color="#1a1c24" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Portal Surround Columns */}
        <mesh position={[-3.2, 2.0, 0]}>
          <boxGeometry args={[1.8, 4.2, 0.8]} />
          <meshStandardMaterial color="#141620" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[3.2, 2.0, 0]}>
          <boxGeometry args={[1.8, 4.2, 0.8]} />
          <meshStandardMaterial color="#141620" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[4.8, 0.5, 0.7]} />
          <meshStandardMaterial color="#121318" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Lit Exit Sign */}
        <mesh position={[0, 4.1, 0.4]}>
          <planeGeometry args={[2.0, 0.25]} />
          <meshBasicMaterial color="#1a1c24" />
        </mesh>

        {/* Left Sliding Exit Door */}
        <group ref={exitDoorLeftRef} position={[-1.1, 1.9, 0]}>
          <mesh>
            <boxGeometry args={[2.2, 3.8, 0.08]} />
            <meshStandardMaterial
              color="#1a1c26"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[0.9, 0, 0.06]}>
            <boxGeometry args={[0.04, 2.4, 0.04]} />
            <meshStandardMaterial color="#22252e" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>

        {/* Right Sliding Exit Door */}
        <group ref={exitDoorRightRef} position={[1.1, 1.9, 0]}>
          <mesh>
            <boxGeometry args={[2.2, 3.8, 0.08]} />
            <meshStandardMaterial
              color="#1a1c26"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[-0.9, 0, 0.06]}>
            <boxGeometry args={[0.04, 2.4, 0.04]} />
            <meshStandardMaterial color="#22252e" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
