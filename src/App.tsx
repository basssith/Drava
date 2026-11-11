import { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { DravaCanvas } from './components/3d/DravaCanvas';
import { Navbar } from './components/ui/Navbar';
import { SceneOverlays } from './components/ui/SceneOverlays';
import { SceneHUD } from './components/ui/SceneHUD';
import { BrandIntro } from './components/ui/BrandIntro';
import { ProductModal } from './components/ui/ProductModal';
import { ProjectModal } from './components/ui/ProjectModal';
import { APPLICATIONS } from './data/applications';
import type { ApplicationItem, ProjectItem } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeApp, setActiveApp] = useState<ApplicationItem | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [uiHidden, setUiHidden] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll & Audio unlock listeners
  useEffect(() => {
    // Attempt playback immediately on component mount
    sound.unlockAudio();

    const handleFirstInteraction = () => {
      sound.unlockAudio();
    };

    window.addEventListener('mousemove', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('wheel', handleFirstInteraction, { passive: true });

    let animationFrameId: number;
    try {
      const lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      lenisRef.current = lenis;

      let ticking = false;
      let lastProgress = -1;

      lenis.on('scroll', () => {
        sound.unlockAudio();
        if (!ticking) {
          requestAnimationFrame(() => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
              const p = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
              if (Math.abs(p - lastProgress) > 0.002) {
                lastProgress = p;
                setScrollProgress(p);
              }
            }
            ticking = false;
          });
          ticking = true;
        }
      });

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      };
      animationFrameId = requestAnimationFrame(raf);
    } catch {
      let ticking = false;
      let lastProgress = -1;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
              const p = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
              if (Math.abs(p - lastProgress) > 0.002) {
                lastProgress = p;
                setScrollProgress(p);
              }
            }
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Disable / Enable scrolling when an application shape is active
  useEffect(() => {
    if (activeApp) {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      document.body.style.overflow = '';
    }
  }, [activeApp]);

  // Programmatic scroll navigation
  const handleScrollTo = useCallback((targetProgress: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = targetProgress * totalScroll;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, { duration: 1.6 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleSelectAppById = useCallback((appId: string) => {
    const found = APPLICATIONS.find((a) => a.id === appId);
    if (found) {
      sound.playClick();
      setActiveApp(found);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#080808] text-[#F5F5F2] selection:bg-[#92ff5f] selection:text-[#080808]">
      {/* 1. Fullscreen Brand Reveal Intro */}
      {!hasRevealed && (
        <BrandIntro
          onComplete={() => {
            setHasRevealed(true);
          }}
        />
      )}

      {/* 2. 3D Architectural Canvas (Fixed Background) */}
      <DravaCanvas
        scrollProgress={scrollProgress}
        onSelectApp={handleSelectAppById}
        activeAppId={activeApp?.id}
        eventSource={containerRef}
      />

      {/* 3. Navigation Bar */}
      <div className={`transition-opacity duration-500 ${uiHidden || activeApp ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar
          onNavigate={handleScrollTo}
          scrollProgress={scrollProgress}
        />
      </div>

      {/* 4. Telemetry HUD & Stage Indicators */}
      <div className={`transition-opacity duration-500 ${activeApp ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <SceneHUD
          scrollProgress={scrollProgress}
          uiHidden={uiHidden}
          onToggleUI={() => setUiHidden((prev) => !prev)}
          onJumpToStage={handleScrollTo}
        />
      </div>

      {/* 5. Scroll Track & Overlay Content */}
      <div className={`relative transition-opacity duration-500 ${uiHidden || activeApp ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <SceneOverlays
          scrollProgress={scrollProgress}
          onSelectApp={(app) => {
            sound.playClick();
            setActiveApp(app);
          }}
          onSelectProject={(proj) => {
            sound.playClick();
            setActiveProject(proj);
          }}
          onScrollTo={handleScrollTo}
        />
      </div>

      {/* 6. Product Detail Modal */}
      {activeApp && (
        <ProductModal
          app={activeApp}
          onClose={() => setActiveApp(null)}
          onSelectApp={handleSelectAppById}
          allApps={APPLICATIONS}
        />
      )}

      {/* 7. Project Case Study Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}
