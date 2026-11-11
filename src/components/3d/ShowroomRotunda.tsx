import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { APPLICATIONS } from '../../data/applications';
import { ProductArtifact3D } from './ProductArtifact3D';
import { useMotionIntensity } from './MotionContext';
import { sound } from '../../utils/audio';

interface ShowroomRotundaProps {
  scrollProgress: number;
  onSelectApp: (appId: string) => void;
  activeAppId?: string | null;
}

export function ShowroomRotunda({ scrollProgress, onSelectApp, activeAppId }: ShowroomRotundaProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const oculusRingRef = useRef<THREE.Mesh>(null);
  const centerRunnerMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const motionIntensityRef = useMotionIntensity();
  const offColor = useRef(new THREE.Color('#101813'));
  const onColor = useRef(new THREE.Color('#92ff5f'));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (oculusRingRef.current) {
      oculusRingRef.current.rotation.z = t * 0.05;
    }

    const motion = motionIntensityRef.current;
    if (centerRunnerMatRef.current) {
      centerRunnerMatRef.current.color.copy(offColor.current).lerp(onColor.current, motion);
    }
  });

  // 9 Plinths arranged in the East Innovation Wing (x = 24, y = 0, along z from -35 to -80)
  // Left side plinths face slightly towards right (+X / +Z), right side face slightly left (-X / +Z)
  const plinthLayout = [
    { id: 'nex', x: 20.6, z: -35, rotY: 0.32, num: '01', trigger: 0.61 },
    { id: 'grid', x: 27.4, z: -40, rotY: -0.32, num: '02', trigger: 0.63 },
    { id: 'orca', x: 20.4, z: -45, rotY: 0.32, num: '03', trigger: 0.66 },
    { id: 'mosaic', x: 27.6, z: -50, rotY: -0.32, num: '04', trigger: 0.68 },
    { id: 'lab', x: 20.6, z: -55, rotY: 0.32, num: '05', trigger: 0.71 },
    { id: 'world', x: 27.4, z: -60, rotY: -0.32, num: '06', trigger: 0.73 },
    { id: 'core', x: 20.4, z: -65, rotY: 0.32, num: '07', trigger: 0.76 },
    { id: 'care', x: 27.6, z: -70, rotY: -0.32, num: '08', trigger: 0.78 },
    { id: 'serve', x: 24.0, z: -78, rotY: 0.0, num: '09', trigger: 0.80 },
  ];

  const rotundaWarmth = THREE.MathUtils.clamp((scrollProgress - 0.48) / 0.12, 0.4, 1.0);

  // Keep visible across the entire transition so there are no sudden pop-ins
  if (scrollProgress < 0.45) {
    return null;
  }

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 1. SHOWROOM WING FLOOR (y = 0 level)                           */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[24, 0, -60]}>
        <planeGeometry args={[22, 70]} />
        <meshStandardMaterial
          color="#161822"
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      <gridHelper
        args={[20, 35, '#383226', '#1a1822']}
        position={[24, 0.01, -60]}
      />

      {/* Center Pathway Runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[24, 0.02, -60]}>
        <planeGeometry args={[0.3, 70]} />
        <meshBasicMaterial ref={centerRunnerMatRef} color="#101813" />
      </mesh>

      {/* Ceiling Dome & Warm Architectural Oculus */}
      <mesh position={[24, 7.5, -60]}>
        <boxGeometry args={[22, 0.5, 70]} />
        <meshStandardMaterial color="#121319" roughness={0.4} />
      </mesh>

      {/* Overhead Skylight Illumination */}
      <directionalLight
        position={[24, 18, -60]}
        color="#f8fafc"
        intensity={2.8 * rotundaWarmth}
      />
      <ambientLight color="#cbd5e1" intensity={0.65} />
      <pointLight
        position={[24, 6.0, -42]}
        color="#fff1db"
        intensity={rotundaWarmth * 6.0}
        distance={35}
        decay={1.6}
      />
      <pointLight
        position={[24, 6.0, -65]}
        color="#fff1db"
        intensity={rotundaWarmth * 6.0}
        distance={35}
        decay={1.6}
      />

      {/* Overhead Halo Ring Oculus */}
      <mesh
        ref={oculusRingRef}
        position={[24, 7.0, -60]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[4.5, 4.75, 48]} />
        <meshBasicMaterial color="#92ff5f" />
      </mesh>

      {/* ============================================================== */}
      {/* 2. THE NINE APPLICATIONS INTERACTIVE PEDESTALS                 */}
      {/* ============================================================== */}
      {plinthLayout.map((plinth) => {
        const app = APPLICATIONS.find((a) => a.id === plinth.id);
        if (!app) return null;

        const isHovered = hoveredApp === plinth.id;
        const isSelected = activeAppId === plinth.id;
        const isLit = scrollProgress >= plinth.trigger - 0.08;

        const handleTrigger = (e: any) => {
          e.stopPropagation?.();
          setHoveredApp(plinth.id);
          onSelectApp(plinth.id);
        };

        return (
          <group
            key={plinth.id}
            position={[plinth.x, 0, plinth.z]}
            rotation={[0, plinth.rotY, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredApp(plinth.id);
              document.body.style.cursor = 'pointer';
              sound.playAppHover(app.accentColor);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredApp(null);
              document.body.style.cursor = 'auto';
            }}
            onClick={handleTrigger}
            onPointerDown={handleTrigger}
          >
            {/* INVISIBLE EXPANDED HIT CYLINDER: Captures all pointer/click/hover events effortlessly */}
            <mesh
              position={[0, 1.8, 0]}
              onClick={handleTrigger}
              onPointerDown={handleTrigger}
            >
              <cylinderGeometry args={[1.5, 1.65, 3.6, 24]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* The 3D Sleek Conical Plinth Pedestal Structure */}
            {/* Sized with a wide base (radius bottom 1.48) to fit all text naturally inside */}
            <mesh
              position={[0, 0.6, 0]}
              onClick={handleTrigger}
              onPointerDown={handleTrigger}
            >
              <cylinderGeometry args={[1.05, 1.48, 1.2, 40]} />
              <meshStandardMaterial
                color="#0a0b10"
                roughness={0.25}
                metalness={0.8}
              />
            </mesh>

            {/* Plinth Top Metal Ring */}
            <mesh position={[0, 1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.85, 1.08, 36]} />
              <meshBasicMaterial
                color={isHovered || isSelected ? '#92ff5f' : app.accentColor}
              />
            </mesh>

            {/* Floor Halo Disc */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[1.7, 32]} />
              <meshBasicMaterial
                color={app.accentColor}
                transparent
                opacity={isLit ? (isHovered || isSelected ? 0.45 : 0.25) : 0.08}
              />
            </mesh>

            {/* Floating 3D Product Artifact on Plinth */}
            <group position={[0, 2.3, 0]}>
              <ProductArtifact3D
                id={plinth.id}
                accentColor={app.accentColor}
                isHovered={isHovered || isSelected}
              />

              {/* Floating VIEW Pill Badge on Hover */}
              {isHovered && (
                <Html
                  position={[0, 1.25, 0]}
                  center
                  distanceFactor={10}
                  zIndexRange={[100, 0]}
                  pointerEvents="none"
                  style={{ pointerEvents: 'none' }}
                >
                  <button
                    onClick={handleTrigger}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#080808] hover:bg-[#92ff5f] text-[11px] font-bold tracking-wider uppercase shadow-[0_4px_20px_rgba(0,0,0,0.6)] animate-fadeIn whitespace-nowrap scale-105 select-none cursor-pointer"
                  >
                    <span>VIEW</span>
                    <span className="text-[#080808] font-mono text-[10px]">↗</span>
                  </button>
                </Html>
              )}
            </group>

            {/* ============================================================ */}
            {/* CLEAN EMBEDDED TYPOGRAPHY DIRECTLY ON THE 3D PLINTH FACE     */}
            {/* With generous breathing room between number, name, and tagline */}
            {/* ============================================================ */}
            <group position={[0, 0.62, 1.40]} rotation={[-0.32, 0, 0]}>
              {/* Number badge */}
              <Text
                position={[0, 0.29, 0.04]}
                fontSize={0.14}
                color={app.accentColor}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.12}
                depthOffset={-4}
                renderOrder={15}
              >
                {plinth.num}
              </Text>

              {/* Application Name (with clear spacing below number) */}
              <Text
                position={[0, 0.08, 0.04]}
                fontSize={0.25}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.08}
                depthOffset={-4}
                renderOrder={15}
              >
                {app.name}
              </Text>

              {/* Subheading Description (spaced cleanly below app name) */}
              <Text
                position={[0, -0.16, 0.08]}
                fontSize={0.094}
                color="#ffffff"
                maxWidth={2.0}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                lineHeight={1.2}
                depthOffset={-6}
                renderOrder={20}
              >
                {app.tagline}
              </Text>
            </group>

            {/* Dedicated Light Illuminating Plinth Text & Model */}
            <pointLight
              position={[0, 1.6, 2.2]}
              color={app.accentColor}
              intensity={isHovered || isSelected ? 1.5 : 0.8}
              distance={6}
              decay={2}
            />

            {(isHovered || isSelected) && (
              <pointLight
                position={[0, 3.4, 0]}
                color={app.accentColor}
                intensity={2.5}
                distance={8}
                decay={2}
              />
            )}
          </group>
        );
      })}

      {/* Enclosing Architectural Walls for the Showroom */}
      {[13, 35].map((x, i) => (
        <group key={i} position={[x, 3.75, -60]}>
          <mesh>
            <boxGeometry args={[0.5, 7.5, 70]} />
            <meshStandardMaterial color="#0b0d12" roughness={0.5} />
          </mesh>
          <mesh position={[i === 0 ? 0.28 : -0.28, -3.5, 0]}>
            <boxGeometry args={[0.04, 0.04, 68]} />
            <meshBasicMaterial color="#92ff5f" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
