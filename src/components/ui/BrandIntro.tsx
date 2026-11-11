import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/audio';

interface BrandIntroProps {
  onComplete: () => void;
}

/**
 * Ultra-smooth, elegant landing page opening:
 * - Fluid, luxurious cubic-bezier curves [0.22, 1, 0.36, 1].
 * - The iconic drava logo mark floats gently in with soft blur-to-focus and scale.
 * - The typography smoothly glides in with pristine tracking and opacity.
 * - Gentle, seamless cross-dissolve curtain wipe revealing the 3D pavilion.
 */
export function BrandIntro({ onComplete }: BrandIntroProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    sound.unlockAudio();

    // Subtle audio chime
    const soundTimer = setTimeout(() => {
      sound.unlockAudio();
      sound.playPortalEnter();
    }, 120);

    // Smooth total display window (1.8s) before gentle dissolved reveal into the 3D scene
    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onComplete, 750);
    }, 1750);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(onComplete, 350);
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={() => {
          sound.unlockAudio();
          handleSkip();
        }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: isFadingOut ? 0 : 1,
          scale: isFadingOut ? 1.02 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer select-none overflow-hidden"
      >
        {/* Brand Composition on pure flat black with zero shadows or glows */}
        <motion.div
          animate={{
            scale: isFadingOut ? 0.98 : 1,
            opacity: isFadingOut ? 0 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex items-center justify-center"
        >
          {/* drava Mark - Silky smooth entrance with zero shadows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center shrink-0"
          >
            <img
              src="/drava-icon-master.png"
              alt="drava logo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-none shadow-none"
            />
          </motion.div>

          {/* drava Typography: Smooth graceful slide & fade reveal with zero shadows */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.18,
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center ml-2 sm:ml-3 shrink-0"
          >
            <img
              src="/drava-text-master.png"
              alt="drava"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-none shadow-none"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
