import { useRef } from 'react';
import { DravaLogo3D } from './DravaLogo3D';
import { OfficeChair } from './OfficeChair';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteriorAtriumProps {
  scrollProgress: number;
}

export function InteriorAtrium({ scrollProgress }: InteriorAtriumProps) {
  const holoRingRef = useRef<THREE.Group>(null);

  // Progressive activation factors
  const computeBayFactor = (start: number, end: number) => {
    if (scrollProgress < start) return 0.05;
    return THREE.MathUtils.clamp((scrollProgress - start) / (end - start), 0.05, 1.0);
  };

  const bayFactors = [
    computeBayFactor(0.16, 0.22),
    computeBayFactor(0.21, 0.27),
    computeBayFactor(0.26, 0.32),
    computeBayFactor(0.31, 0.37),
    computeBayFactor(0.36, 0.42),
  ];

  const interiorWarmth = THREE.MathUtils.clamp((scrollProgress - 0.15) / 0.15, 0.05, 1.0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (holoRingRef.current) {
      holoRingRef.current.rotation.y = t * 0.4;
      holoRingRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
  });

  const bayZPositions = [12, 6, 0, -6, -12];

  return (
    <group position={[0, 0, -10]}>
      {/* ============================================================== */}
      {/* 1. ATRIUM FLOOR & ARCHITECTURAL SURFACES                       */}
      {/* ============================================================== */}
      {/* Polished Warm-Reflecting Terrazzo Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[26, 44]} />
        <meshStandardMaterial
          color="#14151b"
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Grid Floor Inlay */}
      <gridHelper
        args={[24, 24, '#383028', '#1a1822']}
        position={[0, 0.01, 0]}
      />

      {/* Center Pathway Runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[5.0, 42]} />
        <meshStandardMaterial
          color="#1e1c24"
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>

      {/* High Ceiling */}
      <mesh position={[0, 8.5, 0]}>
        <boxGeometry args={[26, 0.5, 42]} />
        <meshStandardMaterial color="#181920" roughness={0.5} />
      </mesh>

      {/* Primary Warm Architectural Lights */}
      <ambientLight color="#fff1e0" intensity={0.4 + interiorWarmth * 0.9} />
      <directionalLight
        position={[0, 10, 0]}
        color="#ffeedb"
        intensity={0.6 + interiorWarmth * 1.5}
      />
      <pointLight
        position={[0, 6.5, 0]}
        color="#fff1db"
        intensity={interiorWarmth * 4.5}
        distance={28}
        decay={1.8}
      />

      {/* ============================================================== */}
      {/* 2. PROGRESSIVE CEILING BAFFLES                                 */}
      {/* ============================================================== */}
      {bayZPositions.map((z, i) => {
        const factor = bayFactors[i];
        const isLit = factor > 0.15;

        return (
          <group key={i} position={[0, 7.8, z]}>
            <mesh>
              <boxGeometry args={[18, 0.12, 0.4]} />
              <meshStandardMaterial color="#262832" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.08, 0]}>
              <boxGeometry args={[17.6, 0.04, 0.2]} />
              <meshBasicMaterial color={isLit ? '#fff7ed' : '#2a2824'} />
            </mesh>
            <mesh position={[0, -7.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[4.8, 0.08]} />
              <meshBasicMaterial
                color={isLit ? '#92ff5f' : '#22252a'}
                transparent
                opacity={factor}
              />
            </mesh>
          </group>
        );
      })}

      {/* ============================================================== */}
      {/* 3. ARCHITECTURAL COLUMNS                                       */}
      {/* ============================================================== */}
      {[-7.5, 7.5].map((x, i) => (
        <group key={i}>
          {[-14, -7, 0, 7, 14].map((z, j) => {
            const nearestBayIndex = Math.min(Math.max(Math.floor((14 - z) / 7), 0), 4);
            const factor = bayFactors[nearestBayIndex];

            return (
              <group key={j} position={[x, 4.2, z]}>
                <mesh>
                  <boxGeometry args={[0.7, 8.4, 0.7]} />
                  <meshStandardMaterial
                    color="#21232c"
                    roughness={0.3}
                    metalness={0.6}
                  />
                </mesh>
                <mesh position={[i === 0 ? 0.36 : -0.36, 0, 0]}>
                  <boxGeometry args={[0.02, 7.8, 0.08]} />
                  <meshBasicMaterial
                    color={factor > 0.2 ? '#92ff5f' : '#1a1f1c'}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}

      {/* ============================================================== */}
      {/* 4. MONOLITHIC RECEPTION DESK & 3 OFFICE CHAIRS                 */}
      {/* ============================================================== */}
      <group position={[4.2, 0.75, 4]}>
        <mesh>
          <boxGeometry args={[3.8, 1.5, 1.3]} />
          <meshStandardMaterial
            color="#181a20"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.78, 0.1]}>
          <boxGeometry args={[4.0, 0.06, 1.4]} />
          <meshStandardMaterial color="#92ff5f" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* 3 Ergonomic Office Chairs on this side of the desk facing inward */}
        {[-1.15, 0, 1.15].map((x, i) => (
          <OfficeChair
            key={i}
            position={[x, -0.75, 1.15]}
            rotation={[0, Math.PI, 0]}
          />
        ))}
      </group>

      {/* ============================================================== */}
      {/* 5. FLOATING 3D DRAVA LOGO IN FRONT OF GLASS MEETING ROOM       */}
      {/* ============================================================== */}
      <DravaLogo3D position={[0, 4.0, -4]} scale={0.022} />

      {/* ============================================================== */}
      {/* 6. EXECUTIVE GLASS MEETING ROOM DIRECTLY BEHIND 3D LOGO        */}
      {/* Visible straight ahead right through the floor-to-ceiling glass! */}
      {/* Positioned at North end: z = -14 to -24, width 18, height 7    */}
      {/* ============================================================== */}
      <group position={[0, 0, -14]}>
        {/* Conference Room Carpet Floor */}
        <mesh position={[0, 0.02, -5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[18, 10]} />
          <meshStandardMaterial color="#1a1c25" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* --- FRONT TRANSPARENT GLASS WALL (z = 0) --- */}
        {/* Looking straight through this glass into the meeting room */}
        <mesh position={[0, 3.8, 0]}>
          <planeGeometry args={[18, 7.6]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.2}
            roughness={0.05}
            metalness={0.1}
            transmission={0.90}
            ior={1.5}
            thickness={0.6}
            reflectivity={0.95}
          />
        </mesh>

        {/* Glass Mullions & Sleek Dark Frames */}
        {/* Top Header Frame */}
        <mesh position={[0, 7.55, 0]}>
          <boxGeometry args={[18.2, 0.15, 0.12]} />
          <meshStandardMaterial color="#1e2029" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Bottom Sill Frame */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[18.2, 0.12, 0.12]} />
          <meshStandardMaterial color="#1e2029" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Vertical Glass Mullions */}
        {[-7, -3.5, 0, 3.5, 7].map((x, idx) => (
          <mesh key={idx} position={[x, 3.8, 0]}>
            <boxGeometry args={[0.08, 7.4, 0.12]} />
            <meshStandardMaterial color="#1e2029" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Subtle Horizontal Brand Accent Line */}
        <mesh position={[0, 1.2, 0.05]}>
          <boxGeometry args={[18, 0.02, 0.04]} />
          <meshBasicMaterial color="#92ff5f" transparent opacity={0.65} />
        </mesh>

        {/* --- INTERIOR MEETING SETUP INSIDE THE GLASS ROOM --- */}
        {/* Long Conference Table (parallel to camera view along Z) */}
        <group position={[0, 0, -5]}>
          {/* Table Top */}
          <mesh position={[0, 1.45, 0]}>
            <boxGeometry args={[2.8, 0.1, 7.2]} />
            <meshStandardMaterial color="#1e212b" roughness={0.25} metalness={0.7} />
          </mesh>
          {/* Green Illuminated Inlay Stripe */}
          <mesh position={[0, 1.51, 0]}>
            <boxGeometry args={[0.3, 0.02, 6.2]} />
            <meshBasicMaterial color="#92ff5f" />
          </mesh>
          {/* Table Twin Pedestal Bases */}
          <mesh position={[0, 0.72, -2.4]}>
            <boxGeometry args={[1.5, 1.4, 0.4]} />
            <meshStandardMaterial color="#121318" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.72, 2.4]}>
            <boxGeometry args={[1.5, 1.4, 0.4]} />
            <meshStandardMaterial color="#121318" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* 6 Office Chairs (3 Left, 3 Right, facing into table) */}
          {[-2.2, 0, 2.2].map((zOffset, i) => (
            <OfficeChair
              key={`conf-left-${i}`}
              position={[-2.1, 0, zOffset]}
              rotation={[0, Math.PI / 2, 0]}
            />
          ))}
          {[-2.2, 0, 2.2].map((zOffset, i) => (
            <OfficeChair
              key={`conf-right-${i}`}
              position={[2.1, 0, zOffset]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          ))}

          {/* 1 Head Chair at end of table */}
          <OfficeChair
            position={[0, 0, -4.2]}
            rotation={[0, 0, 0]}
          />

          {/* Overhead Modern Linear Pendant Light inside meeting room */}
          <group position={[0, 4.8, 0]}>
            <mesh>
              <boxGeometry args={[0.35, 0.12, 6.4]} />
              <meshStandardMaterial color="#121318" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.07, 0]}>
              <boxGeometry args={[0.25, 0.04, 6.2]} />
              <meshBasicMaterial color="#fffbeb" />
            </mesh>
          </group>

          {/* Dedicated Bright Warm Downlight illuminating the meeting table & chairs */}
          <pointLight
            position={[0, 3.8, 0]}
            color="#fff3e0"
            intensity={8.0}
            distance={24}
            decay={1.6}
          />
          <pointLight
            position={[0, 3.2, -3]}
            color="#fff3e0"
            intensity={5.5}
            distance={18}
            decay={1.6}
          />
        </group>

        {/* Back Wall Presentation Screen (at z = -10 inside the room) */}
        <group position={[0, 3.8, -9.8]}>
          <mesh>
            <boxGeometry args={[6.2, 3.2, 0.12]} />
            <meshStandardMaterial color="#0c0d12" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[5.8, 2.9]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, -1.35, 0.09]}>
            <planeGeometry args={[5.5, 0.04]} />
            <meshBasicMaterial color="#92ff5f" />
          </mesh>
        </group>

        {/* Back Wall & Side Enclosure of the Meeting Room */}
        <mesh position={[0, 3.8, -10]}>
          <boxGeometry args={[18, 7.6, 0.4]} />
          <meshStandardMaterial color="#0b0d12" roughness={0.5} />
        </mesh>
        <mesh position={[-9, 3.8, -5]}>
          <boxGeometry args={[0.4, 7.6, 10]} />
          <meshStandardMaterial color="#0b0d12" roughness={0.5} />
        </mesh>
        <mesh position={[9, 3.8, -5]}>
          <boxGeometry args={[0.4, 7.6, 10]} />
          <meshStandardMaterial color="#0b0d12" roughness={0.5} />
        </mesh>
      </group>

      {/* Left Wall Solid Section */}
      <mesh position={[-12.5, 4.2, 0]}>
        <boxGeometry args={[0.5, 8.4, 44]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.5} />
      </mesh>

      {/* Right Wall Corridor with cutout opening leading into Right Wing */}
      <mesh position={[12.5, 4.2, 8]}>
        <boxGeometry args={[0.5, 8.4, 28]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.5} />
      </mesh>
      <mesh position={[12.5, 6.8, -12]}>
        <boxGeometry args={[0.5, 3.2, 12]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.5} />
      </mesh>
    </group>
  );
}
