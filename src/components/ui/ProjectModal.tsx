import { X, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { ProjectItem } from '../../types';
import { sound } from '../../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#080808]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0e0f14] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#F5F5F2]">
        {/* Accent Bar */}
        <div className="h-1.5 w-full" style={{ backgroundColor: project.color }} />

        {/* Modal Header */}
        <div className="px-6 md:px-8 py-5 border-b border-white/5 flex items-center justify-between bg-[#12141a]/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A5A5A5] mb-1">
              <span className="text-[#92ff5f]">PROJECT {project.number}</span>
              <span>//</span>
              <span>{project.client}</span>
              <span>//</span>
              <span>{project.year}</span>
            </div>
            <h2 className="text-2xl font-heading font-semibold text-white">
              {project.title}
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A5A5A5] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Key Impact Metric Callout */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-white/[0.04] to-transparent border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#A5A5A5] uppercase tracking-wider block">
                PRIMARY VERIFIED IMPACT
              </span>
              <p className="text-sm text-[#D1D5DB] mt-1">
                {project.impactLabel} achieved across enterprise deployment
              </p>
            </div>
            <div
              className="text-4xl font-heading font-bold"
              style={{ color: project.color }}
            >
              {project.impactMetric}
            </div>
          </div>

          {/* Narrative */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#92ff5f] mb-2">
              CASE ARCHITECTURE & EXECUTION
            </h3>
            <p className="text-base text-[#D1D5DB] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#71717a] mb-3">
              SYSTEM DELIVERABLES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-3 text-sm text-[#E2E4E8]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#92ff5f] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#71717a] mb-2">
              CORE TECHNOLOGIES DEPLOYED
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-[#161822] border border-white/10 text-[#A5A5A5]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 md:px-8 py-4 border-t border-white/5 bg-[#12141a]/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717a]">
            <ShieldCheck className="w-4 h-4 text-[#92ff5f]" />
            <span>CONFIDENTIAL CLIENT ARCHIVE // DECLASSIFIED</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2 rounded-full bg-[#92ff5f] text-[#080808] hover:bg-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
