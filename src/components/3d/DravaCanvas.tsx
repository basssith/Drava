import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { ArchitecturalHQ } from './ArchitecturalHQ';
import { EntrancePortal } from './EntrancePortal';
import { InteriorAtrium } from './InteriorAtrium';
import { RightWingTransitionAndExit } from './RightWingTransitionAndExit';
import { ShowroomRotunda } from './ShowroomRotunda';
import { SkylineObservationDeck } from './SkylineObservationDeck';
import { CameraController } from './CameraController';
import { MotionProvider } from './MotionContext';

interface DravaCanvasProps {
  scrollProgress: number;
  onSelectApp: (appId: string) => void;
  activeAppId?: string | null;
  eventSource?: React.RefObject<HTMLElement | null>;
}

export function DravaCanvas({ scrollProgress, onSelectApp, activeAppId, eventSource }: DravaCanvasProps) {
  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden bg-[#080808]">
      <Canvas
        eventSource={eventSource as any}
        eventPrefix="client"
        camera={{ position: [0, 9.5, 52], fov: 45, near: 0.1, far: 450 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        {/* Photorealistic PBR Environment Reflections (City Preset for metallic reflections & glass highlights) */}
        <Environment preset="city" environmentIntensity={0.65} />

        {/* Atmospheric Fog */}
        <color attach="background" args={['#080808']} />
        <fog attach="fog" args={['#080808', 25, 260]} />

        {/* Global Cinematic Architectural Lights */}
        <ambientLight intensity={0.4} color="#cbd5e1" />
        <directionalLight
          position={[25, 45, 35]}
          intensity={1.4}
          color="#f1f5f9"
        />
        <directionalLight
          position={[-30, 25, -50]}
          intensity={0.7}
          color="#38bdf8"
        />

        {/* Ground Contact Shadows & Soft Ambient Occlusion underneath plinths & architecture */}
        <ContactShadows
          position={[24, 0.02, -55]}
          opacity={0.75}
          scale={50}
          blur={1.8}
          far={12}
          color="#000000"
        />
        <ContactShadows
          position={[0, 0.02, 10]}
          opacity={0.8}
          scale={60}
          blur={2.0}
          far={16}
          color="#000000"
        />

        {/* Motion Provider tracks real-time camera travel velocity */}
        <MotionProvider>
          {/* Camera Controller synchronized with scroll progress */}
          <CameraController
            scrollProgress={scrollProgress}
            activeAppId={activeAppId}
          />

          {/* The Continuous Architectural World Journey */}
          <ArchitecturalHQ />
          <EntrancePortal scrollProgress={scrollProgress} />
          <InteriorAtrium scrollProgress={scrollProgress} />
          <RightWingTransitionAndExit scrollProgress={scrollProgress} />
          <ShowroomRotunda
            scrollProgress={scrollProgress}
            onSelectApp={onSelectApp}
            activeAppId={activeAppId}
          />
          <SkylineObservationDeck />
        </MotionProvider>
      </Canvas>
    </div>
  );
}
