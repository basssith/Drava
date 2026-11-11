import { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestDemoModal({ isOpen, onClose }: RequestDemoModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState('Centralized AI Platform (Full Suite)');
  const [preferredDate, setPreferredDate] = useState('2026-11-18');
  const [preferredTime, setPreferredTime] = useState('14:00 SGT (UTC+8)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleClose = () => {
    sound.playClick();
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#080808]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0f1015] border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-[#F5F5F2] flex flex-col">
        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#92ff5f] via-[#93C5FD] to-[#92ff5f]" />

        {/* Modal Header */}
        <div className="px-6 md:px-8 py-5 border-b border-white/5 flex items-center justify-between bg-[#12141a]/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#92ff5f]/10 border border-[#92ff5f]/30 flex items-center justify-center text-[#92ff5f]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white">
                Request a Personalized Demo
              </h2>
              <p className="text-xs text-[#A5A5A5] mt-0.5">
                Experience DRAVA's AI-driven spatial & enterprise platform live.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A5A5A5] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="py-10 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#92ff5f]/15 border border-[#92ff5f]/30 flex items-center justify-center text-[#92ff5f] mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                DEMO RESERVATION CONFIRMED
              </h3>
              <p className="text-sm text-[#A5A5A5] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. A calendar invitation with executive credentials for <strong className="text-[#92ff5f]">{preferredDate} at {preferredTime}</strong> has been sent to <strong className="text-white">{email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="zeggo-button zeggo-button-primary px-8 py-2.5 text-xs font-bold"
                >
                  RETURN TO EXPERIENCE
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#A5A5A5] block mb-1.5">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jordan Reed"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0c10] border border-white/10 focus:border-[#92ff5f] text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#A5A5A5] block mb-1.5">
                    WORK EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan.reed@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0c10] border border-white/10 focus:border-[#92ff5f] text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#A5A5A5] block mb-1.5">
                    ORGANIZATION / COMPANY
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Hyperion Systems Corp"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0c10] border border-white/10 focus:border-[#92ff5f] text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#A5A5A5] block mb-1.5">
                    PRIMARY SOLUTION INTEREST
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0c10] border border-white/10 focus:border-[#92ff5f] text-white text-sm outline-none transition-colors"
                  >
                    <option>Centralized AI Platform (Full Suite)</option>
                    <option>DRAVA-BOT Autonomous Diagnostics</option>
                    <option>Digital Twin Virtual Facilities</option>
                    <option>NEX Distributed Microservice Mesh</option>
                    <option>GRID Collaborative Spatial Canvas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#A5A5A5] flex items-center gap-1.5 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#92ff5f]" />
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0c10] border border-white/10 focus:border-[#92ff5f] text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#A5A5A5] flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#92ff5f]" />
                    PREFERRED TIME WINDOW
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0b0c10] border border-white/10 focus:border-[#92ff5f] text-white text-sm outline-none transition-colors"
                  >
                    <option>10:00 SGT (UTC+8) / 02:00 UTC</option>
                    <option>14:00 SGT (UTC+8) / 06:00 UTC</option>
                    <option>17:00 SGT (UTC+8) / 09:00 UTC</option>
                    <option>21:00 SGT (UTC+8) / 13:00 UTC</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#71717a]">
                  <ShieldCheck className="w-4 h-4 text-[#92ff5f]" />
                  <span>CONFIDENTIAL 1-ON-1 ARCHITECT SESSION</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="zeggo-button zeggo-button-primary py-2.5 px-6 text-xs font-bold flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>CONFIRMING...</span>
                  ) : (
                    <>
                      <span>CONFIRM DEMO SESSION</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
