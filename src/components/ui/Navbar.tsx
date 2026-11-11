import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface NavbarProps {
  onNavigate: (progressTarget: number) => void;
  scrollProgress: number;
}

export function Navbar({ onNavigate, scrollProgress }: NavbarProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsAudioActive(!sound.getMuted());
  }, []);

  const handleToggleAudio = () => {
    const active = sound.toggleMute();
    setIsAudioActive(active);
  };

  // Removed Philosophy and Work; removed badge: '9' from Applications
  const navItems = [
    { label: 'Explore', target: 0.05, desc: 'Headquarters Exterior' },
    { label: 'Interior', target: 0.32, desc: 'Atrium & World' },
    { label: 'About', target: 0.44, desc: 'About Us' },
    { label: 'Applications', target: 0.65, desc: 'Showroom' },
    { label: 'Contact', target: 0.96, desc: 'Initiate Project' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-10 py-3.5 transition-all duration-300">
        <div className="w-full flex items-center justify-between gap-6 relative">
          {/* Logo and Name at starting Left Edge */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate(0);
            }}
            className="flex items-center gap-3 group cursor-pointer text-left py-1 shrink-0 z-10"
          >
            <img
              src="/drava-logo.png"
              alt="drava"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Nav Items Strictly Centered in the Viewport */}
          <nav className="hidden lg:flex items-center gap-7 px-4 py-2 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.target);
                }}
                className="text-xs font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-1.5 text-white hover:text-[#92ff5f] transition-colors duration-200"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3 shrink-0 z-10">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-white/15 hover:border-[#92ff5f]/50 text-white transition-all duration-200 cursor-pointer text-xs font-mono bg-[#0e1017]/60"
              title={isAudioActive ? 'Mute Atmospheric Audio' : 'Unmute Atmospheric Audio'}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#92ff5f]" />
                  <span className="hidden sm:inline text-[10px] tracking-wider text-[#92ff5f]">AUDIO</span>
                  <div className="flex items-end gap-0.5 h-2.5">
                    <span className="w-0.5 bg-[#92ff5f] animate-pulse h-2" />
                    <span className="w-0.5 bg-[#92ff5f] animate-pulse h-3" style={{ animationDelay: '0.2s' }} />
                    <span className="w-0.5 bg-[#92ff5f] animate-pulse h-1.5" style={{ animationDelay: '0.4s' }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/70" />
                  <span className="hidden sm:inline text-[10px] tracking-wider text-white">SOUND</span>
                </>
              )}
            </button>

            {/* Explore Applications Pill Button in Navbar */}
            <button
              onClick={() => {
                sound.playClick();
                onNavigate(0.68);
              }}
              className="clean-btn px-5 py-2 rounded-full bg-white text-[#080808] font-bold text-xs tracking-wider uppercase hidden sm:inline-flex items-center gap-1.5 cursor-pointer border border-transparent"
            >
              <span>EXPLORE APPLICATIONS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full glass-panel border border-white/10 text-[#F5F5F2]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress line at header bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#92ff5f]/30 via-[#92ff5f] to-[#92ff5f]/30 transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/95 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden animate-fadeIn">
          <div className="text-xs uppercase tracking-[0.3em] text-[#92ff5f] font-mono mb-6">
            drava digital experience
          </div>
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.target);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-left py-2.5 border-b border-white/10 group cursor-pointer"
              >
                <div>
                  <span className="text-xl font-heading text-[#F5F5F2] group-hover:text-[#92ff5f] transition-colors">
                    {item.label}
                  </span>
                  <div className="text-xs text-[#71717a] font-mono mt-0.5">{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
