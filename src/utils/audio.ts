// Audio & Sound FX Controller for DRAVA
// Supports background music playback and procedural Web Audio SFX (hover, typing, clicks)

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Off by default until clicked
  private isInitialized: boolean = false;
  private bgBuffer: AudioBuffer | null = null;
  private bgSourceNode: AudioBufferSourceNode | null = null;
  private bgGainNode: GainNode | null = null;
  private typingAudioCooldown: number = 0;
  private isPlayingMusic: boolean = false;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.bgGainNode = this.ctx.createGain();
        this.bgGainNode.gain.setValueAtTime(0.18, this.ctx.currentTime); // Strong, clear background music level
        this.bgGainNode.connect(this.ctx.destination);
      }

      // Fetch as a generic binary data buffer (.dat)
      // This completely bypasses browser download extensions (such as IDM) from detecting media files or showing floating download popups
      fetch('/soundscape.dat')
        .then((res) => res.arrayBuffer())
        .then((buf) => {
          if (this.ctx) {
            this.ctx.decodeAudioData(buf, (decoded) => {
              this.bgBuffer = decoded;
              if (!this.isMuted) {
                this.startMusic();
              }
            });
          }
        })
        .catch(() => {});

      this.isInitialized = true;
    } catch {
      // Audio not permitted until user gesture
    }
  }

  private startMusic() {
    if (!this.ctx || !this.bgBuffer || !this.bgGainNode || this.isPlayingMusic || this.isMuted) return;

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const source = this.ctx.createBufferSource();
      source.buffer = this.bgBuffer;
      source.loop = true;
      source.connect(this.bgGainNode);
      source.start(0);

      this.bgSourceNode = source;
      this.isPlayingMusic = true;
    } catch {
      // AudioContext state handles resumption on user activity
    }
  }

  private stopMusic() {
    if (this.bgSourceNode) {
      try {
        this.bgSourceNode.stop();
        this.bgSourceNode.disconnect();
      } catch {}
      this.bgSourceNode = null;
    }
    this.isPlayingMusic = false;
  }

  /**
   * Unlock AudioContext for interactive sound effects without auto-starting music
   */
  public unlockAudio() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startMusic();
      this.playChime(580, 'sine', 0.12, 0.05);
    } else {
      this.stopMusic();
    }

    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playChime(freq = 440, type: OscillatorType = 'sine', duration = 0.3, volume = 0.05) {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, this.ctx.currentTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  }

  /**
   * Hover SFX for general UI buttons
   */
  public playHover() {
    this.playChime(880, 'sine', 0.08, 0.015);
  }

  /**
   * Dedicated, silky futuristic SFX when hovering any of the 9 Applications
   */
  public playAppHover(_accentColor?: string) {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(3.0, now);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(1040, now + 0.16);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(780, now);
      osc2.frequency.exponentialRampToValueAtTime(1560, now + 0.16);

      gain.gain.setValueAtTime(0.032, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.18);
      osc2.stop(now + 0.18);
    } catch {
      // Ignore
    }
  }

  /**
   * Very smooth, clean subtle typing tick SFX
   * Throttled to keep it fluid and pleasant without harsh clicks
   */
  public playTypingTick() {
    if (this.isMuted) return;
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return;

    const now = performance.now();
    if (now - this.typingAudioCooldown < 28) return;
    this.typingAudioCooldown = now;

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Crisp, punchy tactile keystroke click
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400 + Math.random() * 400, t);
      filter.Q.setValueAtTime(1.8, t);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600 + (Math.random() - 0.5) * 300, t);

      // Boosted typing volume for full acoustic punch
      gain.gain.setValueAtTime(0.40, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.055);
    } catch {
      // Ignore
    }
  }

  public playClick() {
    this.playChime(1200, 'triangle', 0.12, 0.03);
  }

  public playPortalEnter() {
    this.playChime(330, 'sine', 0.8, 0.06);
    setTimeout(() => this.playChime(495, 'sine', 0.8, 0.04), 120);
    setTimeout(() => this.playChime(660, 'sine', 1.0, 0.03), 240);
  }
}

export const sound = new SoundController();

