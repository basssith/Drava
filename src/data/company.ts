import type { JourneyStage } from '../types';

export const PHILOSOPHY_STATEMENTS = [
  {
    number: '01',
    statement: 'WE THINK DIFFERENT.',
    subtext: 'Rejecting conventional paradigms to envision digital structures that elevate human potential.',
    detail: 'We approach each technological challenge not through the lens of incremental improvement, but by questioning the foundational architecture itself.'
  },
  {
    number: '02',
    statement: 'WE DESIGN INTELLIGENTLY.',
    subtext: 'Merging spatial aesthetics, biological elegance, and computational rigor into flawless interfaces.',
    detail: 'Design at DRAVA is never cosmetic. It is the precise manifestation of complex mathematical logic made intuitive and breathtaking to human senses.'
  },
  {
    number: '03',
    statement: 'WE BUILD MEANINGFULLY.',
    subtext: 'Architecting resilient, mission-critical infrastructure that endures generational scale.',
    detail: 'From healthcare networks safeguarding lives to distributed systems operating at gigabit speeds, every line of code serves purpose and human flourishing.'
  },
  {
    number: '04',
    statement: 'WE CREATE EXPERIENCES.',
    subtext: 'Transforming cold silicon and abstract data into visceral, unforgettable digital reality.',
    detail: 'We build digital spaces you do not simply browse — spaces you step inside, navigate, and remember.'
  }
];

export const COMPANY_PILLARS = [
  {
    id: 'vision',
    title: 'Our Vision',
    summary: 'A unified digital reality where architectural beauty and computational intelligence merge seamlessly into one living fabric.',
    points: ['Spatial Computing as Primary Interface', 'Autonomous Distributed Mesh Systems', 'Zero-Latency Sensory Computing']
  },
  {
    id: 'mission',
    title: 'Our Mission',
    summary: 'To engineer the next generation of digital infrastructure and immersive applications that empower visionary organizations worldwide.',
    points: ['Sovereign Resilient Architecture', 'Human-Centric High-Fidelity Design', 'Ethical Artificial Intelligence']
  },
  {
    id: 'expertise',
    title: 'Core Expertise',
    summary: 'Bridging the divide between high-performance systems engineering, 3D computer graphics, and strategic product architecture.',
    points: ['Real-time 3D & WebGPU Graphics', 'Distributed Cloud Architecture', 'Computer Vision & Deep Learning', 'Mission-Critical Enterprise ERP']
  }
];

export const COMPANY_STATS = [
  { value: '9', label: 'Proprietary Applications' },
  { value: '180+', label: 'Global Enterprise Deployments' },
  { value: '99.99%', label: 'Infrastructure Reliability' },
  { value: '14', label: 'International Design & Tech Awards' }
];

export const LEADERSHIP = [
  { name: 'Dr. Elena Rostova', role: 'Chief Executive Officer', field: 'Systems Architecture & Quantum Information' },
  { name: 'Marcus Vance', role: 'Head of Spatial Design', field: 'Architectural Computing & Immersive Media' },
  { name: 'Kaelen Thorne', role: 'Chief Technology Officer', field: 'Distributed Neural Systems & Cryptography' },
  { name: 'Aria Chen', role: 'VP of Product Experience', field: 'Human-Computer Interaction & Ergonomics' }
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'hq-exterior',
    index: 0,
    label: 'EXTERIOR HEADQUARTERS',
    title: 'THE DRAVA HEADQUARTERS',
    subtitle: 'Step inside our world',
    zRange: [0, 0.16],
    cameraPos: [0, 8, 48],
    cameraTarget: [0, 4, 0]
  },
  {
    id: 'entrance-portal',
    index: 1,
    label: 'GLASS ENTRANCE PORTAL',
    title: 'THE THRESHOLD',
    subtitle: 'Approaching the gateway',
    zRange: [0.16, 0.28],
    cameraPos: [0, 2.8, 14],
    cameraTarget: [0, 2.5, 0]
  },
  {
    id: 'interior-atrium',
    index: 2,
    label: 'INTERIOR ATRIUM & RECEPTION',
    title: 'INSIDE DRAVA',
    subtitle: 'Architectural core & intelligent systems',
    zRange: [0.28, 0.42],
    cameraPos: [0, 2.4, -12],
    cameraTarget: [0, 2.2, -28]
  },
  {
    id: 'east-wing-transit',
    index: 3,
    label: 'EAST INNOVATION CONCOURSE',
    title: 'TURNING TO INNOVATION WING',
    subtitle: 'Transitioning into the application gallery',
    zRange: [0.42, 0.58],
    cameraPos: [14, 2.4, -22],
    cameraTarget: [28, 2.2, -35]
  },
  {
    id: 'applications-rotunda',
    index: 4,
    label: 'CENTRAL SHOWROOM GALLERY',
    title: 'THE NINE APPLICATION WORLDS',
    subtitle: 'Discover our complete ecosystem',
    zRange: [0.58, 0.82],
    cameraPos: [28, 2.4, -60],
    cameraTarget: [28, 2.2, -85]
  },
  {
    id: 'exit-portal-observatory',
    index: 5,
    label: 'EXIT PORTAL & OBSERVATORY',
    title: 'EXIT PORTAL & HORIZONS',
    subtitle: 'Doors opening to the future',
    zRange: [0.82, 1.0],
    cameraPos: [28, 2.4, -105],
    cameraTarget: [28, 2.5, -160]
  }
];
