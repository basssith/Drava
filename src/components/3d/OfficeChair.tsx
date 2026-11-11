interface OfficeChairProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Modern Ergonomic Office Chair:
 * - 5-star castor base with chrome center cylinder
 * - Cushioned seat
 * - High mesh backrest with lumbar support and headrest
 * - Ergonomic contoured armrests
 * Seen tucked in behind the reception desk facing forward towards the entrance.
 */
export function OfficeChair({ position = [0, 0, 0], rotation = [0, 0, 0] }: OfficeChairProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* 1. Castor Star Base (5 legs) */}
      <group position={[0, 0.06, 0]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 2 * Math.PI) / 5;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              {/* Star leg */}
              <mesh position={[0.22, 0, 0]}>
                <boxGeometry args={[0.38, 0.03, 0.04]} />
                <meshStandardMaterial color="#1a1c24" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Wheel caster */}
              <mesh position={[0.38, -0.02, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
                <meshStandardMaterial color="#0c0d12" roughness={0.4} />
              </mesh>
            </group>
          );
        })}
        {/* Base center cap */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#1a1c24" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 2. Pneumatic Chrome Gas Lift Cylinder */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.48, 16]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* 3. Under-seat Mechanism */}
      <mesh position={[0, 0.54, 0]}>
        <boxGeometry args={[0.24, 0.05, 0.24]} />
        <meshStandardMaterial color="#121318" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 4. Ergonomic Contoured Seat Cushion */}
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[0.54, 0.09, 0.52]} />
        <meshStandardMaterial color="#1a1c26" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Front waterfall edge curve of seat */}
      <mesh position={[0, 0.60, 0.24]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.54, 16]} />
        <meshStandardMaterial color="#1a1c26" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* 5. Ergonomic High Backrest (visible reaching well above the desk) */}
      <group position={[0, 1.08, -0.22]}>
        {/* Spine support spine */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[0.08, 0.78, 0.03]} />
          <meshStandardMaterial color="#0e0f14" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Main curved backrest cushion */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.48, 0.72, 0.05]} />
          <meshStandardMaterial color="#161822" roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Lumbar support accent */}
        <mesh position={[0, -0.16, 0.02]}>
          <boxGeometry args={[0.42, 0.12, 0.03]} />
          <meshStandardMaterial color="#92ff5f" emissive="#92ff5f" emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Headrest */}
        <mesh position={[0, 0.44, 0.02]}>
          <boxGeometry args={[0.32, 0.15, 0.06]} />
          <meshStandardMaterial color="#1a1c26" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* 6. Ergonomic Left & Right Armrests */}
      {[-0.29, 0.29].map((x, i) => (
        <group key={i} position={[x, 0.78, 0]}>
          {/* Armrest upright bracket */}
          <mesh position={[0, -0.08, -0.04]}>
            <boxGeometry args={[0.03, 0.22, 0.04]} />
            <meshStandardMaterial color="#0c0d12" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Armrest pad */}
          <mesh position={[0, 0.04, 0.02]}>
            <boxGeometry args={[0.07, 0.035, 0.28]} />
            <meshStandardMaterial color="#222533" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

