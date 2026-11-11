import { useState } from 'react';
import {
  ArrowRight,
  Send,
  CheckCircle,
} from 'lucide-react';
import type { ApplicationItem, ProjectItem } from '../../types';
import { sound } from '../../utils/audio';
import { TerminalTypewriter } from './TerminalTypewriter';

interface SceneOverlaysProps {
  scrollProgress: number;
  onSelectApp: (app: ApplicationItem) => void;
  onSelectProject: (project: ProjectItem) => void;
  onScrollTo: (target: number) => void;
}

export function SceneOverlays({
  scrollProgress,
  onScrollTo,
}: SceneOverlaysProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="relative w-full z-10 pointer-events-none">
      {/* ============================================================== */}
      {/* 1. HERO SECTION: BOTTOM LEFT CONTENTS                          */}
      {/* User prompt: "this one should come only one first scroll"      */}
      {/* Visible only while on the initial approach (scrollProgress < 0.16) */}
      {/* ============================================================== */}
      <section className="min-h-screen flex flex-col justify-end px-6 md:px-16 pb-20 pointer-events-none">
        {scrollProgress < 0.16 && (
          <div className="max-w-3xl space-y-5 pointer-events-auto transition-transform duration-300">
            <TerminalTypewriter
              as="h1"
              className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.05]"
              lines={[
                { text: 'WE BUILD' },
                { text: "WHAT'S NEXT.", isAccent: true },
              ]}
              speed={0.03}
              initialDelay={0.1}
            />

            {/* Subheading: PURE WHITE in 2 clean lines */}
            <TerminalTypewriter
              as="p"
              className="text-base sm:text-xl text-white max-w-xl font-normal leading-relaxed"
              lines={[
                {
                  text: 'Technology, creativity and intelligent systems come together',
                },
                {
                  text: 'to shape the next generation of digital experiences.',
                },
              ]}
              speed={0.012}
              initialDelay={0.4}
            />

            {/* Explore Applications button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onScrollTo(0.62);
                }}
                className="clean-btn px-7 py-3.5 rounded-full bg-white text-[#080808] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 cursor-pointer border border-transparent"
              >
                <span>EXPLORE APPLICATIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 2. SCENE 02: INSIDE DRAVA (SINGLE LINE)                        */}
      {/* User prompt: "inside drava in single line"                     */}
      {/* (scroll 0.18 -> 0.38)                                         */}
      {/* ============================================================== */}
      <section className="min-h-screen flex flex-col justify-end px-6 md:px-16 pb-24 pointer-events-none">
        {scrollProgress >= 0.18 && scrollProgress <= 0.38 && (
          <div className="max-w-xl space-y-4 pointer-events-none text-left">
            <TerminalTypewriter
              as="h2"
              className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight whitespace-nowrap pointer-events-none"
              inline
              lines={[
                { text: 'INSIDE ' },
                { text: 'DRAVA.', isAccent: true },
              ]}
              speed={0.032}
              initialDelay={0.08}
            />

            {/* Subheading in PURE WHITE */}
            <TerminalTypewriter
              as="p"
              className="text-lg sm:text-xl text-white font-normal leading-relaxed pointer-events-none"
              lines={[
                { text: 'One vision. Multiple possibilities.' },
                { text: 'A world of intelligent applications.' },
              ]}
              speed={0.015}
              initialDelay={0.32}
            />
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 3. SCENE 03: RIGHT CORRIDOR THRESHOLD - ABOUT US (SINGLE LINE) */}
      {/* User prompt: "about us is in single line"                      */}
      {/* (scroll 0.38 -> 0.54)                                         */}
      {/* ============================================================== */}
      <section className="min-h-screen flex flex-col justify-end px-6 md:px-16 pb-24 pointer-events-none">
        {scrollProgress >= 0.38 && scrollProgress < 0.55 && (
          <div className="max-w-2xl space-y-4 pointer-events-none text-left">
            <TerminalTypewriter
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white tracking-tight leading-tight whitespace-nowrap pointer-events-none"
              inline
              lines={[
                { text: 'ABOUT ' },
                { text: 'US.', isAccent: true },
              ]}
              speed={0.035}
              initialDelay={0.08}
            />
            <TerminalTypewriter
              as="p"
              className="text-base sm:text-lg text-white font-normal max-w-xl leading-relaxed pointer-events-none"
              lines={[
                {
                  text: 'We design and build intelligent systems, spatial platforms, and',
                },
                {
                  text: 'next-generation software architectures for forward-thinking enterprises.',
                },
              ]}
              speed={0.012}
              initialDelay={0.3}
            />
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 4. SCENE 04: "CONNECTING EVERYTHING INTO ONE SPACE"            */}
      {/* User prompt: "the G is down i want the G in above and down only into one space" */}
      {/* Line 1: CONNECTING EVERYTHING (fits fully without breaking)   */}
      {/* Line 2: INTO ONE SPACE.                                        */}
      {/* ============================================================== */}
      <section className="min-h-screen flex flex-col justify-end px-6 md:px-16 pb-24 pointer-events-none">
        {scrollProgress >= 0.55 && scrollProgress < 0.80 && (
          <div className="max-w-4xl space-y-4 pointer-events-none text-left">
            <TerminalTypewriter
              as="h2"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white uppercase leading-[1.12] tracking-tight pointer-events-none"
              lines={[
                { text: 'CONNECTING EVERYTHING' },
                { text: 'INTO ONE SPACE.', isAccent: true },
              ]}
              speed={0.026}
              initialDelay={0.08}
            />
            <TerminalTypewriter
              as="p"
              className="text-base sm:text-xl text-white font-normal max-w-xl leading-relaxed pointer-events-none"
              lines={[
                {
                  text: 'Drava unifies high-velocity workspaces, autonomous intelligence',
                },
                {
                  text: 'and spatial computing — built for teams where work flows effortlessly.',
                },
              ]}
              speed={0.012}
              initialDelay={0.35}
            />
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 5. SCENE 05: "THE FUTURE IS BUILT TOGETHER"                   */}
      {/* Appears EXACTLY AT THE MOMENT the camera passes the 9th app    */}
      {/* (at scrollProgress 0.80 -> 0.90, right as 9th app SERVE passes)*/}
      {/* ============================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 pointer-events-none text-center">
        {scrollProgress >= 0.80 && scrollProgress <= 0.90 && (
          <div className="max-w-4xl mx-auto space-y-6 pointer-events-auto">
            <TerminalTypewriter
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white leading-tight"
              lines={[
                { text: 'THE FUTURE IS' },
                { text: 'BUILT TOGETHER.', isAccent: true },
              ]}
              speed={0.03}
              initialDelay={0.08}
            />

            <TerminalTypewriter
              as="p"
              className="text-base sm:text-xl text-white font-normal max-w-2xl mx-auto leading-relaxed"
              lines={[
                {
                  text: 'From intelligent systems to immersive digital experiences,',
                },
                {
                  text: 'DRAVA transforms ideas into meaningful technology.',
                },
              ]}
              speed={0.012}
              initialDelay={0.35}
            />

            <div className="pt-4 flex justify-center gap-8 text-xs font-mono text-[#A5A5A5] animate-fadeIn">
              <div>
                <span className="text-2xl font-heading font-bold text-white block">9</span>
                <span>APPLICATIONS</span>
              </div>
              <div>
                <span className="text-2xl font-heading font-bold text-white block">180+</span>
                <span>ENTERPRISE NODES</span>
              </div>
              <div>
                <span className="text-2xl font-heading font-bold text-white block">99.99%</span>
                <span>RELIABILITY</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 6. SCENE 06: CONTACT / LAST CONTENT                            */}
      {/* Opens strictly after passing the exit doors (scroll >= 0.91)   */}
      {/* ============================================================== */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-16 pt-28 pb-12 pointer-events-none">
        {scrollProgress >= 0.91 && (
          <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pointer-events-auto">
            {/* LEFT SIDE: Heading & Description */}
            <div className="space-y-6 text-left">
              <TerminalTypewriter
                as="h2"
                className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.05] whitespace-nowrap"
                inline
                lines={[
                  { text: "LET'S " },
                  { text: 'TALK.', isAccent: true },
                ]}
                speed={0.035}
                initialDelay={0.08}
              />
              <TerminalTypewriter
                as="p"
                className="text-base sm:text-xl text-white font-normal leading-relaxed max-w-xl"
                lines={[
                  {
                    text: 'Have an idea, a challenge, or a vision?',
                  },
                  {
                    text: 'Our architecture and engineering teams partner with',
                  },
                  {
                    text: 'visionary organizations worldwide to make it reality.',
                  },
                ]}
                speed={0.012}
                initialDelay={0.28}
              />
            </div>

            {/* RIGHT SIDE: The Contact Box */}
            <div className="w-full max-w-xl lg:ml-auto">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0f1118]/90 border border-white/10 backdrop-blur-xl">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-fadeIn">
                    <CheckCircle className="w-12 h-12 text-[#92ff5f] mx-auto" />
                    <h3 className="text-2xl font-heading font-bold text-white">
                      TRANSMISSION RECEIVED
                    </h3>
                    <p className="text-base text-[#A5A5A5] max-w-sm mx-auto">
                      Our systems engineering team will establish communications within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2 text-white font-medium">
                        Name / Identity
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full bg-[#161822]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#8e8e93] focus:outline-none focus:border-[#92ff5f] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2 text-white font-medium">
                        Direct Contact / Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="elena@enterprise.io"
                        className="w-full bg-[#161822]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#8e8e93] focus:outline-none focus:border-[#92ff5f] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2 text-white font-medium">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full bg-[#161822]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#8e8e93] focus:outline-none focus:border-[#92ff5f] transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="clean-btn w-full py-4 rounded-xl bg-white text-[#080808] font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer border border-transparent"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING...</span>
                      ) : (
                        <>
                          <span>INITIATE TRANSMISSION</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clean Footer: Copyright on Left, Social Links on Right */}
        {scrollProgress >= 0.90 && (
          <div className="w-full max-w-7xl mx-auto pt-16 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black pointer-events-auto relative z-20">
            <div className="tracking-wider text-black font-semibold">
              TM 2026 DRAVA TECHNOLOGIE INC.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-black hover:text-[#92ff5f] font-bold transition-colors uppercase tracking-widest text-[11px]"
              >
                Instagram
              </a>
              <span className="text-black/40">|</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-black hover:text-[#92ff5f] font-bold transition-colors uppercase tracking-widest text-[11px]"
              >
                LinkedIn
              </a>
              <span className="text-black/40">|</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-black hover:text-[#92ff5f] font-bold transition-colors uppercase tracking-widest text-[11px]"
              >
                Twitter
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
