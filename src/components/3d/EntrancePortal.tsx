import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sound } from '../../utils/audio';
import { useMotionIntensity } from './MotionContext';

interface EntrancePortalProps {
  scrollProgress: number; // 0 to 1
}

export function EntrancePortal({ scrollProgress }: EntrancePortalProps) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const canopyLightRef = useRef<THREE.PointLight>(null);
  const thresholdMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const handleLeftMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const handleRightMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const motionIntensityRef = useMotionIntensity();
  const offColor = useRef(new THREE.Color('#101813'));
  const onColor = useRef(new THREE.Color('#92ff5f'));
  const hasTriggeredChime = useRef(false);

  useFrame(() => {
    let openFactor = 0;
    if (scrollProgress >= 0.13 && scrollProgress <= 0.28) {
      openFactor = THREE.MathUtils.clamp((scrollProgress - 0.13) / 0.13, 0, 1);
      if (openFactor > 0.1 && !hasTriggeredChime.current) {
        sound.playPortalEnter();
        hasTriggeredChime.current = true;
      }
    } else if (scrollProgress > 0.28) {
      openFactor = 1;
    } else {
      hasTriggeredChime.current = false;
    }

    const slideDistance = openFactor * 2.4;

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = -1.25 - slideDistance;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = 1.25 + slideDistance;
    }

    if (canopyLightRef.current) {
      canopyLightRef.current.intensity = 4.0 + openFactor * 2.5;
    }

    // Motion-triggered green lights
    const motion = motionIntensityRef.current;
    const curColor = offColor.current.clone().lerp(onColor.current, motion);
    if (thresholdMatRef.current) thresholdMatRef.current.color.copy(curColor);
    if (handleLeftMatRef.current) handleLeftMatRef.current.color.copy(curColor);
    if (handleRightMatRef.current) handleRightMatRef.current.color.copy(curColor);
  });

  return (
    <group position={[0, 0, 12]}>
      {/* ============================================================== */}
      {/* 1. ENTRANCE CANOPY & EFFICIENT WARM LIGHTING                   */}
      {/* ============================================================== */}
      <mesh position={[0, 4.8, 2.5]}>
        <boxGeometry args={[11, 0.45, 6]} />
        <meshStandardMaterial color="#1a1c24" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Recessed Warm Linear LED Strips */}
      {[-1.5, 0, 1.5].map((zOffset, idx) => (
        <mesh key={idx} position={[0, 4.55, 2.5 + zOffset]}>
          <boxGeometry args={[9.5, 0.04, 0.25]} />
          <meshBasicMaterial color="#fff7ed" />
        </mesh>
      ))}

      {/* 1 Single High-Efficiency Canopy Point Light */}
      <pointLight
        ref={canopyLightRef}
        position={[0, 4.2, 2.0]}
        color="#fff1db"
        intensity={4.5}
        distance={20}
        decay={1.8}
      />

      {/* ============================================================== */}
      {/* 2. SURROUNDING ARCHITECTURAL PORTAL FRAME                      */}
      {/* ============================================================== */}
      <mesh position={[-4.0, 2.3, 0]}>
        <boxGeometry args={[2.5, 4.6, 1.2]} />
        <meshStandardMaterial color="#161822" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[4.0, 2.3, 0]}>
        <boxGeometry args={[2.5, 4.6, 1.2]} />
        <meshStandardMaterial color="#161822" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 4.3, 0]}>
        <boxGeometry args={[5.6, 0.6, 1.0]} />
        <meshStandardMaterial color="#14161f" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Sconces with Emissive Diffusers (Zero Light Overhead) */}
      <mesh position={[-2.85, 2.4, 0.65]}>
        <boxGeometry args={[0.08, 1.2, 0.1]} />
        <meshBasicMaterial color="#fff7ed" />
      </mesh>

      <mesh position={[2.85, 2.4, 0.65]}>
        <boxGeometry args={[0.08, 1.2, 0.1]} />
        <meshBasicMaterial color="#fff7ed" />
      </mesh>

      {/* Portal Accent Border */}
      <mesh position={[0, 4.3, 0.52]}>
        <boxGeometry args={[3.6, 0.45, 0.08]} />
        <meshStandardMaterial color="#0b0d12" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 4.3, 0.57]}>
        <planeGeometry args={[3.2, 0.22]} />
        <meshBasicMaterial color="#F5F5F2" />
      </mesh>

      {/* ============================================================== */}
      {/* 3. FAST ARCHITECTURAL DOUBLE CLOSED DOORS                      */}
      {/* ============================================================== */}
      {/* Left Door Panel */}
      <group ref={leftDoorRef} position={[-1.25, 2.1, 0]}>
        <mesh>
          <boxGeometry args={[2.45, 4.0, 0.1]} />
          <meshStandardMaterial
            color="#181a24"
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
        {/* Fast Frosted Glass Insert (Standard material, no FBO transmission pass) */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.1, 3.6]} />
          <meshStandardMaterial
            color="#fff8f0"
            roughness={0.2}
            metalness={0.5}
            transparent
            opacity={0.55}
          />
        </mesh>
        {/* Horizontal Mullions */}
        {[-1.2, -0.4, 0.4, 1.2].map((yOffset, idx) => (
          <mesh key={idx} position={[0, yOffset, 0.03]}>
            <boxGeometry args={[2.1, 0.04, 0.03]} />
            <meshStandardMaterial color="#2c303c" metalness={0.9} />
          </mesh>
        ))}
        {/* Vertical Handle */}
        <group position={[0.95, 0, 0.1]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.025, 1.5, 8]} />
            <meshStandardMaterial color="#e2e4e8" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
            <meshBasicMaterial ref={handleLeftMatRef} color="#101813" />
          </mesh>
        </group>
      </group>

      {/* Right Door Panel */}
      <group ref={rightDoorRef} position={[1.25, 2.1, 0]}>
        <mesh>
          <boxGeometry args={[2.45, 4.0, 0.1]} />
          <meshStandardMaterial
            color="#181a24"
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.1, 3.6]} />
          <meshStandardMaterial
            color="#fff8f0"
            roughness={0.2}
            metalness={0.5}
            transparent
            opacity={0.55}
          />
        </mesh>
        {/* Horizontal Mullions */}
        {[-1.2, -0.4, 0.4, 1.2].map((yOffset, idx) => (
          <mesh key={idx} position={[0, yOffset, 0.03]}>
            <boxGeometry args={[2.1, 0.04, 0.03]} />
            <meshStandardMaterial color="#2c303c" metalness={0.9} />
          </mesh>
        ))}
        {/* Vertical Handle */}
        <group position={[-0.95, 0, 0.1]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.025, 1.5, 8]} />
            <meshStandardMaterial color="#e2e4e8" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
            <meshBasicMaterial ref={handleRightMatRef} color="#101813" />
          </mesh>
        </group>
      </group>

      {/* Paving Step & Threshold Strip */}
      <mesh position={[0, 0.08, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.4, 3.5]} />
        <meshStandardMaterial
          color="#1e2029"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.0, 0.15]} />
        <meshBasicMaterial ref={thresholdMatRef} color="#101813" />
      </mesh>
    </group>
  );
}
