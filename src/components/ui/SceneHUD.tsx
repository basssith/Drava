import { Eye, EyeOff } from 'lucide-react';
import { JOURNEY_STAGES } from '../../data/company';
import { sound } from '../../utils/audio';

interface SceneHUDProps {
  scrollProgress: number;
  uiHidden: boolean;
  onToggleUI: () => void;
  onJumpToStage: (progress: number) => void;
}

export function SceneHUD({
  scrollProgress,
  uiHidden,
  onToggleUI,
  onJumpToStage,
}: SceneHUDProps) {
  return (
    <>
      {/* Bottom-Right Minimalist Cinematic View Button & Scroll Indicator */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-4">
        {/* Clean borderless Cinematic View Toggle Button */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleUI();
          }}
          className="group flex items-center gap-2 py-1.5 transition-all cursor-pointer pointer-events-auto bg-transparent border-none shadow-none"
          title={uiHidden ? 'Exit Cinematic View' : 'Enter Cinematic View'}
        >
          {uiHidden ? (
            <EyeOff className="w-3.5 h-3.5 text-[#92ff5f]" />
          ) : (
            <Eye className="w-3.5 h-3.5 text-[#8e8e93] group-hover:text-[#92ff5f] transition-colors" />
          )}
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8e8e93] group-hover:text-[#92ff5f] transition-colors">
            {uiHidden ? 'EXIT VIEW' : 'CINEMATIC VIEW'}
          </span>
        </button>

        {/* Scroll Bar Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#8e8e93] pointer-events-none">
          <span className="tracking-widest">SCROLL</span>
          <div className="scroll-indicator-bar" />
        </div>
      </div>

      {/* Right Stepper Dots along Journey */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3 glass-panel p-2 rounded-full border border-white/5">
        {JOURNEY_STAGES.map((s) => {
          const isActive =
            scrollProgress >= s.zRange[0] && scrollProgress <= s.zRange[1];
          const midpoint = (s.zRange[0] + s.zRange[1]) / 2;
          return (
            <button
              key={s.id}
              onClick={() => onJumpToStage(midpoint)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
              title={`${s.title} (${s.label})`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#92ff5f] scale-125 shadow-[0_0_8px_#92ff5f]'
                    : 'bg-white/20 hover:bg-white/60'
                }`}
              />
              <div className="absolute right-7 px-2.5 py-1 rounded bg-[#12131a] border border-white/10 text-[10px] font-mono whitespace-nowrap text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {s.title}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
