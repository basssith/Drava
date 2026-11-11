import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import type { ApplicationItem } from '../../types';
import { sound } from '../../utils/audio';

interface ProductModalProps {
  app: ApplicationItem | null;
  onClose: () => void;
  onSelectApp: (appId: string) => void;
  allApps: ApplicationItem[];
}

/**
 * Clean, minimal, non-congested rectangular card overlay.
 * Floating beside the close-up view of the 3D rotating application logo.
 * Straightforward: Number, Brand Name, Tagline, Category, Core Purpose, Clean Close & Switcher.
 */
export function ProductModal({ app, onClose, onSelectApp, allApps }: ProductModalProps) {
  if (!app) return null;

  const currentIndex = allApps.findIndex((a) => a.id === app.id);
  const prevApp = allApps[(currentIndex - 1 + allApps.length) % allApps.length];
  const nextApp = allApps[(currentIndex + 1) % allApps.length];

  return (
    <div
      onClick={() => {
        sound.playClick();
        onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-end p-6 md:p-14 animate-fadeIn cursor-pointer"
    >
      {/* Clean minimal rectangle card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#0a0b10]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-[#F5F5F2] shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col gap-6 cursor-default"
      >
        {/* Top Header Row: App Index & Close */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded border whitespace-nowrap inline-flex items-center shrink-0 tracking-wider"
              style={{
                borderColor: `${app.accentColor}50`,
                backgroundColor: `${app.accentColor}15`,
                color: app.accentColor,
              }}
            >
              {app.number}
            </span>
            <span className="text-[11px] font-mono tracking-wider text-[#8e8e93] uppercase truncate">
              {app.category}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Application Name & Tagline */}
        <div className="space-y-1.5 border-b border-white/5 pb-5">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            {app.name}
          </h2>
          <p className="text-sm font-medium" style={{ color: app.accentColor }}>
            {app.tagline}
          </p>
        </div>

        {/* Clean, readable description without AI buzzword clutter */}
        <div className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed font-normal">
          {app.description}
        </div>

        {/* Minimal key capabilities */}
        {app.capabilities && app.capabilities.length > 0 && (
          <div className="space-y-2.5 pt-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#71717a]">
              Key Highlights
            </div>
            <ul className="space-y-2">
              {app.capabilities.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#a1a1aa] leading-snug">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: app.accentColor }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom Navigation Switcher */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onSelectApp(prevApp.id);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-medium text-[#A5A5A5] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{prevApp.name}</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onSelectApp(nextApp.id);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-medium text-[#A5A5A5] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{nextApp.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-xs text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
