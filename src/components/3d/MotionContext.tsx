import React, { createContext, useContext, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MotionContextType {
  motionIntensityRef: React.MutableRefObject<number>;
}

const MotionContext = createContext<MotionContextType | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // motionIntensity: 0.0 when camera is stationary / stopped, 1.0 when camera is actively moving
  const motionIntensityRef = useRef(0.0);
  const lastCamPos = useRef<THREE.Vector3 | null>(null);

  useFrame(({ camera }, delta) => {
    if (!lastCamPos.current) {
      lastCamPos.current = camera.position.clone();
      return;
    }

    // Distance camera moved since the last frame
    const distMoved = camera.position.distanceTo(lastCamPos.current);
    lastCamPos.current.copy(camera.position);

    // Speed in units/sec
    const speed = delta > 0 ? distMoved / delta : 0;

    // Moving threshold: if moving faster than 0.15 units/sec, target is 1.0, otherwise smoothly decay to 0.0
    const target = speed > 0.12 ? 1.0 : 0.0;

    // Fast turn on (smooth responsive attack), smooth decay when stopped
    const lerpRate = target > motionIntensityRef.current ? 14.0 : 5.0;
    motionIntensityRef.current = THREE.MathUtils.lerp(
      motionIntensityRef.current,
      target,
      Math.min(1.0, delta * lerpRate)
    );
  });

  return (
    <MotionContext.Provider value={{ motionIntensityRef }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionIntensity() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    // Return a dummy ref if used outside provider
    return { current: 0 };
  }
  return ctx.motionIntensityRef;
}

