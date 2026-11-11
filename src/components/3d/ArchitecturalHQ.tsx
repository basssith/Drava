import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMotionIntensity } from './MotionContext';

export function ArchitecturalHQ() {
  const beaconRef = useRef<THREE.PointLight>(null);
  const runwayMatsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  const underbellyMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const motionIntensityRef = useMotionIntensity();

  // Dim off color (#141d16 or low emissive dark) vs bright vibrant green (#92ff5f)
  const offColor = useRef(new THREE.Color('#101813'));
  const onColor = useRef(new THREE.Color('#92ff5f'));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beaconRef.current) {
      beaconRef.current.intensity = Math.sin(t * 3.5) > 0.3 ? 2.5 : 0.2;
    }

    // Dynamic green lights active only during camera movement
    const motion = motionIntensityRef.current;
    const currentColor = offColor.current.clone().lerp(onColor.current, motion);

    runwayMatsRef.current.forEach((mat) => {
      if (mat) {
        mat.color.copy(currentColor);
      }
    });

    if (underbellyMatRef.current) {
      underbellyMatRef.current.color.copy(currentColor);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 1. GROUND PLAZA & REFLECTIVE PAVING                           */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 30]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#0c0d10"
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Grid line overlay */}
      <gridHelper
        args={[80, 40, '#262930', '#16181e']}
        position={[0, 0.01, 35]}
      />

      {/* Main Approach Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 30]}>
        <planeGeometry args={[7, 45]} />
        <meshStandardMaterial
          color="#16181d"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Runway Light Strips */}
      {[-3.6, 3.6].map((x, i) => (
        <group key={i}>
          {Array.from({ length: 14 }).map((_, idx) => (
            <mesh key={idx} position={[x, 0.06, 12 + idx * 2.8]}>
              <boxGeometry args={[0.08, 0.04, 0.6]} />
              <meshBasicMaterial
                ref={(el) => {
                  if (el) runwayMatsRef.current[i * 14 + idx] = el;
                }}
                color="#101813"
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* 1 Single Approach Path Fill Light */}
      <pointLight
        position={[0, 5.0, 30]}
        color="#fff4e6"
        intensity={3.5}
        distance={35}
        decay={1.8}
      />

      {/* Flanking Water Reflection Pools */}
      {[-11, 11].map((x, i) => (
        <group key={i} position={[x, 0.02, 28]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[6.5, 32]} />
            <meshStandardMaterial
              color="#05070a"
              roughness={0.08}
              metalness={0.9}
            />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[6.7, 0.1, 32.2]} />
            <meshStandardMaterial color="#22252b" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Minimal Columnar Trees (Original clean architectural low-poly cones) */}
      {[-8, 8].map((x, i) => (
        <group key={i}>
          {[16, 24, 32, 40].map((z, j) => (
            <group key={j} position={[x, 0, z]}>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.5, 0.6, 0.6, 8]} />
                <meshStandardMaterial color="#1a1c22" roughness={0.7} />
              </mesh>
              <mesh position={[0, 2.2, 0]}>
                <cylinderGeometry args={[0.06, 0.1, 3.4, 6]} />
                <meshStandardMaterial color="#2b2d35" roughness={0.8} />
              </mesh>
              <mesh position={[0, 3.8, 0]}>
                <coneGeometry args={[0.7, 3.0, 6]} />
                <meshStandardMaterial
                  color="#15261d"
                  roughness={0.6}
                  metalness={0.1}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* ============================================================== */}
      {/* 2. MAIN HEADQUARTERS ARCHITECTURAL SUPERSTRUCTURE             */}
      {/* ============================================================== */}
      {/* Left Wing (Leaves center entrance open) */}
      <mesh position={[-14.5, 3, 0]}>
        <boxGeometry args={[13, 6, 26]} />
        <meshStandardMaterial color="#14151b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Right Wing */}
      <mesh position={[14.5, 3, 0]}>
        <boxGeometry args={[13, 6, 26]} />
        <meshStandardMaterial color="#14151b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Lintel Beam above entrance */}
      <mesh position={[0, 5.4, 0]}>
        <boxGeometry args={[16, 1.2, 26]} />
        <meshStandardMaterial color="#121318" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Upper Cantilevered Architectural Wing */}
      <mesh position={[-6, 11, 4]}>
        <boxGeometry args={[28, 8, 28]} />
        <meshStandardMaterial color="#0f1013" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Right Tower Block */}
      <mesh position={[12, 14, -2]}>
        <boxGeometry args={[14, 18, 22]} />
        <meshStandardMaterial color="#18191f" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Fast Glass Curtain Facade (Standard transparent material, no FBO transmission pass) */}
      <mesh position={[-4, 11, 18.05]}>
        <planeGeometry args={[24, 7.8]} />
        <meshStandardMaterial
          color="#0d1b2a"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Floor Slabs visible through glass */}
      {[8.5, 11, 13.5].map((y, idx) => (
        <mesh key={idx} position={[-4, y, 16]}>
          <boxGeometry args={[23.5, 0.25, 14]} />
          <meshBasicMaterial color="#fed7aa" />
        </mesh>
      ))}

      {/* Structural Louvers */}
      {Array.from({ length: 8 }).map((_, idx) => (
        <mesh key={idx} position={[-15 + idx * 3.5, 11, 18.2]}>
          <boxGeometry args={[0.08, 7.6, 0.4]} />
          <meshStandardMaterial color="#323640" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Underbelly Recessed Light Strip */}
      <mesh position={[-6, 6.9, 8]}>
        <boxGeometry args={[26, 0.1, 0.4]} />
        <meshBasicMaterial ref={underbellyMatRef} color="#101813" />
      </mesh>

      {/* Floating Upper Sky-Bridge */}
      <mesh position={[3, 17, -2]}>
        <boxGeometry args={[8, 3.5, 5]} />
        <meshStandardMaterial color="#101115" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rooftop Spire */}
      <mesh position={[16, 25, -2]}>
        <cylinderGeometry args={[0.08, 0.35, 8, 8]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.2} />
      </mesh>
      <pointLight ref={beaconRef} position={[16, 29.2, -2]} color="#ef4444" intensity={2.0} distance={30} />
    </group>
  );
}
