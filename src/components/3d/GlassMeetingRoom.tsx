import { OfficeChair } from './OfficeChair';

interface GlassMeetingRoomProps {
  position?: [number, number, number];
}

/**
 * Modern Executive Glass Conference / Meeting Suite:
 * - Transparent glass walls with sleek architectural mullions / frames
 * - Long frosted executive conference table with integrated connectivity stripe
 * - 6 Executive office chairs (3 on each side) tucked around the table
 * - Overhead architectural pendant light fixture casting warm illumination
 * - Wall-mounted executive display screen
 */
export function GlassMeetingRoom({ position = [-12, 0, 0] }: GlassMeetingRoomProps) {
  return (
    <group position={position}>
      {/* 1. ROOM FLOOR (Warm Charcoal Carpet Tile) */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11, 22]} />
        <meshStandardMaterial color="#1a1c24" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[11, 0.4, 22]} />
        <meshStandardMaterial color="#121318" roughness={0.5} />
      </mesh>

      {/* 2. REAR & SIDE SOLID ARCHITECTURAL WALLS */}
      {/* Outer Far Left Wall */}
      <mesh position={[-5.5, 3.8, 0]}>
        <boxGeometry args={[0.3, 7.6, 22]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.6} />
      </mesh>
      {/* Back Wall (North) */}
      <mesh position={[0, 3.8, -11]}>
        <boxGeometry args={[11, 7.6, 0.3]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.6} />
      </mesh>
      {/* Front Wall (South) */}
      <mesh position={[0, 3.8, 11]}>
        <boxGeometry args={[11, 7.6, 0.3]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.6} />
      </mesh>

      {/* 3. TRANSPARENT GLASS CURTAIN WALL FACING THE ATRIUM */}
      {/* Glass Pane facing the atrium walkway at x = +5.5 (which aligns with Atrium x = -6.5) */}
      <group position={[5.4, 3.8, 0]}>
        {/* Large Transparent Glass Surface */}
        <mesh>
          <planeGeometry args={[0.02, 7.4]} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[21.6, 7.4]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.22}
            roughness={0.05}
            metalness={0.1}
            transmission={0.88}
            ior={1.5}
            thickness={0.8}
            reflectivity={0.9}
          />
        </mesh>

        {/* Minimal Black Architectural Mullions / Window Frames */}
        {/* Top & Bottom Horizontal Rails */}
        <mesh position={[0, 3.65, 0]}>
          <boxGeometry args={[0.12, 0.12, 22]} />
          <meshStandardMaterial color="#1e2029" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -3.65, 0]}>
          <boxGeometry args={[0.12, 0.12, 22]} />
          <meshStandardMaterial color="#1e2029" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Vertical Glass Divider Mullions */}
        {[-9, -4.5, 0, 4.5, 9].map((z, idx) => (
          <mesh key={idx} position={[0, 0, z]}>
            <boxGeometry args={[0.12, 7.4, 0.08]} />
            <meshStandardMaterial color="#1e2029" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Subtle Green Glass Accent Trim Line */}
        <mesh position={[0, -1.8, 0]}>
          <boxGeometry args={[0.06, 0.02, 21.8]} />
          <meshBasicMaterial color="#92ff5f" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* 4. EXECUTIVE CONFERENCE TABLE */}
      <group position={[0, 0, 0]}>
        {/* Table Top (Modern Sleek Slate Grey with Green Edge Accent) */}
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[3.2, 0.1, 9.6]} />
          <meshStandardMaterial color="#1e212b" roughness={0.2} metalness={0.7} />
        </mesh>
        {/* Center Recessed Connectivity & Lighting Channel */}
        <mesh position={[0, 1.51, 0]}>
          <boxGeometry args={[0.35, 0.02, 8.2]} />
          <meshBasicMaterial color="#92ff5f" />
        </mesh>
        {/* Twin Solid Pedestal Legs */}
        <mesh position={[0, 0.72, -3.2]}>
          <boxGeometry args={[1.8, 1.4, 0.5]} />
          <meshStandardMaterial color="#121318" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.72, 3.2]}>
          <boxGeometry args={[1.8, 1.4, 0.5]} />
          <meshStandardMaterial color="#121318" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 5. 6 EXECUTIVE OFFICE CHAIRS ARRANGED AROUND THE TABLE */}
      {/* 3 Chairs on the Atrium Glass Side (facing into the meeting table) */}
      {[-2.8, 0, 2.8].map((z, i) => (
        <OfficeChair
          key={`side-a-${i}`}
          position={[2.4, 0, z]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}
      {/* 3 Chairs on the Wall Side (facing out towards the atrium glass) */}
      {[-2.8, 0, 2.8].map((z, i) => (
        <OfficeChair
          key={`side-b-${i}`}
          position={[-2.4, 0, z]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}

      {/* 6. OVERHEAD ARCHITECTURAL LINEAR PENDANT LIGHT */}
      <group position={[0, 5.2, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.15, 8.6]} />
          <meshStandardMaterial color="#121318" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.3, 0.04, 8.4]} />
          <meshBasicMaterial color="#fffbeb" />
        </mesh>
        {/* Suspension Wires */}
        {[-3.6, 3.6].map((z, i) => (
          <mesh key={i} position={[0, 1.1, z]}>
            <cylinderGeometry args={[0.01, 0.01, 2.2, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* 7. WARM INTERIOR CONFERENCE LIGHTING */}
      {/* Lights up the table and chairs so they are clearly visible through the glass */}
      <pointLight
        position={[0, 4.2, 0]}
        color="#fff1db"
        intensity={6.5}
        distance={22}
        decay={1.8}
      />
      <pointLight
        position={[0, 3.5, -4]}
        color="#fff7ed"
        intensity={4.5}
        distance={18}
        decay={1.8}
      />
      <pointLight
        position={[0, 3.5, 4]}
        color="#fff7ed"
        intensity={4.5}
        distance={18}
        decay={1.8}
      />

      {/* 8. WALL-MOUNTED PRESENTATION DISPLAY ON NORTH WALL */}
      <group position={[0, 3.6, -10.7]}>
        <mesh>
          <boxGeometry args={[5.2, 2.9, 0.12]} />
          <meshStandardMaterial color="#0c0d12" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[4.9, 2.6]} />
          <meshBasicMaterial color="#0e1726" />
        </mesh>
        {/* Screen ambient UI Glow Line */}
        <mesh position={[0, -1.2, 0.08]}>
          <planeGeometry args={[4.6, 0.04]} />
          <meshBasicMaterial color="#92ff5f" />
        </mesh>
      </group>
    </group>
  );
}

