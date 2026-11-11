import { JOURNEY_STAGES } from '../../data/company';

interface SceneHUDProps {
  scrollProgress: number;
  uiHidden: boolean;
  onToggleUI: () => void;
  onJumpToStage: (progress: number) => void;
}

export function SceneHUD({
  scrollProgress,
  onJumpToStage,
}: SceneHUDProps) {
  return (
    <>
      {/* Zeggo-Style Bottom-Right Minimalist Scroll Indicator without button */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2 text-[11px] font-mono text-[#A5A5A5] pointer-events-none">
        <span className="tracking-widest">SCROLL</span>
        <div className="scroll-indicator-bar" />
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
