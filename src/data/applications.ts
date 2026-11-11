import type { ApplicationItem } from '../types';

export const APPLICATIONS: ApplicationItem[] = [
  {
    id: 'nex',
    number: '01',
    name: 'NEX',
    tagline: 'A modern digital ecosystem',
    category: 'Ecosystem Architecture & Connectivity',
    description: 'A unified digital backbone orchestrating multi-cloud microservices, distributed API mesh, and real-time enterprise synchronicity with sub-millisecond data fabric transport.',
    accentColor: '#92ff5f',
    iconName: 'Network',
    capabilities: [
      'Self-healing distributed mesh architecture',
      'Zero-trust cryptographic node handshakes',
      'Unified enterprise telemetry & event pipeline',
      'Autonomous microservice autoscaling & routing'
    ],
    metrics: [
      { label: 'Network Uptime', value: '99.999%' },
      { label: 'Event Throughput', value: '1.8M msg/s' },
      { label: 'Avg Node Latency', value: '0.42 ms' }
    ],
    technicalSpecs: {
      engine: 'DRAVA Synapse v4.2',
      throughput: '12.4 GB/s Pipeline',
      deployment: 'Edge Native Multi-Cluster',
      latency: '< 1.2ms Global Round-trip'
    },
    interfaceMockup: {
      headerTitle: 'NEX MESH NODE CONTROL // REGION 01-ALPHA',
      statusBadge: 'ONLINE - 1,482 NODES ACTIVE',
      modules: [
        { name: 'Gateway Alpha', status: 'Optimal', value: '98.4%' },
        { name: 'Synapse Core', status: 'Synchronized', value: '0.38ms' },
        { name: 'Zero-Trust Vault', status: 'Secured', value: '100%' },
        { name: 'Telemetry Stream', status: 'Active', value: '4.2TB/h' }
      ],
      chartData: [40, 65, 50, 80, 95, 75, 88, 92, 85, 99]
    }
  },
  {
    id: 'grid',
    number: '02',
    name: 'GRID',
    tagline: 'A collaborative digital canvas',
    category: 'Spatial Creativity & Ideation',
    description: 'An infinite multi-dimensional collaborative surface empowering global multidisciplinary teams to design, architect, and prototype complex systems in real-time spatial sync.',
    accentColor: '#93C5FD',
    iconName: 'Grid',
    capabilities: [
      'Infinite-zoom infinite-resolution vector canvas',
      'Multi-cursor concurrent WebRTC spatial collaboration',
      'Embedded parametric 3D object manipulation',
      'Smart generative design layout accelerators'
    ],
    metrics: [
      { label: 'Concurrent Users', value: '5,000+' },
      { label: 'Canvas Resolution', value: 'Infinite 64-bit' },
      { label: 'Sync Latency', value: '< 8 ms' }
    ],
    technicalSpecs: {
      engine: 'GRID Spatial Vector Engine',
      throughput: '60 FPS Multi-Layered Render',
      deployment: 'Browser WebGPU + Native',
      latency: 'Instantaneous Delta Sync'
    },
    interfaceMockup: {
      headerTitle: 'GRID SPATIAL CANVAS // PROJECT HYPERION',
      statusBadge: 'LIVE SESSION - 42 COLLABORATORS',
      modules: [
        { name: 'Spatial Viewport', status: '60 FPS', value: '12.8M Objects' },
        { name: 'Presence Sync', status: 'Connected', value: '42 Active' },
        { name: 'Component Tree', status: 'Indexed', value: '3,890 Units' },
        { name: 'History Buffer', status: 'Live', value: 'Zero-Loss' }
      ],
      chartData: [20, 45, 60, 40, 70, 85, 80, 90, 95, 100]
    }
  },
  {
    id: 'orca',
    number: '03',
    name: 'ORCA',
    tagline: 'An intelligent object recognition system',
    category: 'Computer Vision & Spatial Intelligence',
    description: 'Sub-millimeter neural spatial vision pipeline processing multi-spectral sensor feeds, LiDAR cloud inputs, and industrial cameras to classify, segment, and inspect physical objects.',
    accentColor: '#6EE7B7',
    iconName: 'ScanEye',
    capabilities: [
      'Multi-spectral LiDAR and camera fusion',
      'Real-time semantic segmentation at 120 FPS',
      'Micro-defect detection with sub-millimeter precision',
      'Edge TPU local inference with offline continuity'
    ],
    metrics: [
      { label: 'Accuracy Score', value: '99.87%' },
      { label: 'Processing Speed', value: '120 FPS' },
      { label: 'Classes Identified', value: '14,000+' }
    ],
    technicalSpecs: {
      engine: 'ORCA Vision Neural Fabric v6',
      throughput: '2.4 Gigapixels/sec',
      deployment: 'Embedded FPGA & Edge Jetson',
      latency: '2.1ms Inference Pass'
    },
    interfaceMockup: {
      headerTitle: 'ORCA SPATIAL RECOGNITION // SENSOR CAM-04',
      statusBadge: 'TRACKING 18 OBJECTS IN VIEW',
      modules: [
        { name: 'Target Classification', status: 'Match 99.9%', value: 'Aerospace Alloy' },
        { name: 'Surface Variance', status: 'Pass', value: '0.002mm' },
        { name: 'LiDAR Point Cloud', status: 'Calibrated', value: '4.2M pts' },
        { name: 'Anomaly Detector', status: 'Clear', value: '0 Defects' }
      ],
      chartData: [88, 92, 94, 91, 95, 98, 97, 99, 99, 100]
    }
  },
  {
    id: 'mosaic',
    number: '04',
    name: 'MOSAIC',
    tagline: 'A creative data visualization experience',
    category: 'High-Density Information Architecture',
    description: 'Transforming petabyte-scale streaming datasets into breathtaking, interactive multidimensional visual narratives, generative graphs, and executive decision command interfaces.',
    accentColor: '#FBBF24',
    iconName: 'BarChart3',
    capabilities: [
      'Volumetric data rendering in WebGL & WebGPU',
      'Autonomous narrative anomaly pattern discovery',
      'Hierarchical drill-down from macro to transaction',
      'Dynamic interactive shader-based thematic palettes'
    ],
    metrics: [
      { label: 'Points Rendered', value: '25,000,000' },
      { label: 'Frame Consistency', value: '60 FPS' },
      { label: 'Query Response', value: '14 ms' }
    ],
    technicalSpecs: {
      engine: 'MOSAIC Prism GPU Matrix',
      throughput: '100M Datapoints/sec',
      deployment: 'Cloud Native / WebGL Direct',
      latency: '< 15ms Query to Render'
    },
    interfaceMockup: {
      headerTitle: 'MOSAIC DATA SCULPTURE // GLOBAL METRIC MAP',
      statusBadge: 'AGGREGATING 24M DATA POINTS',
      modules: [
        { name: 'Global Flux', status: 'Rendered', value: '+34.2% YoY' },
        { name: 'Clustering Engine', status: 'Converged', value: '16 Centroids' },
        { name: 'Dimensionality', status: 'Active', value: '12-Axis' },
        { name: 'GPU Memory', status: 'Optimal', value: '1.4GB / 8GB' }
      ],
      chartData: [35, 55, 45, 78, 62, 89, 94, 82, 96, 98]
    }
  },
  {
    id: 'lab',
    number: '05',
    name: 'LAB',
    tagline: 'An advanced simulation and experimentation platform',
    category: 'Scientific Computation & Digital Twins',
    description: 'High-fidelity physics simulation and synthetic data laboratory allowing engineers to stress-test autonomous algorithms, aerodynamic profiles, and robotics in high-risk environments.',
    accentColor: '#C084FC',
    iconName: 'FlaskConical',
    capabilities: [
      'Rigid body, soft body, and fluid dynamics simulator',
      'Synthetic scenario generation for model training',
      'Hardware-in-the-loop (HIL) automated bench testing',
      'Distributed Monte Carlo stochastic analysis'
    ],
    metrics: [
      { label: 'Sim Accuracy', value: '99.4%' },
      { label: 'Parallel Runs', value: '10,000' },
      { label: 'Compute Speedup', value: '120x' }
    ],
    technicalSpecs: {
      engine: 'DRAVA Quantum Sim Core',
      throughput: '10^14 FLOPS Orchestrated',
      deployment: 'HPC Bare-Metal Clusters',
      latency: 'Continuous Real-time Step'
    },
    interfaceMockup: {
      headerTitle: 'LAB VIRTUAL TEST ENVIRONMENT // CHAMBER 07',
      statusBadge: 'SIMULATION EPOCH 4,892 / 5,000',
      modules: [
        { name: 'Aero Drag Coeff', status: 'Calculated', value: 'Cd 0.218' },
        { name: 'Thermal Dissipation', status: 'Nominal', value: '42.6°C Peak' },
        { name: 'Stress Variance', status: 'Safety 4.2x', value: 'Pass' },
        { name: 'Convergence Rate', status: 'Stable', value: '0.00018 eps' }
      ],
      chartData: [15, 30, 48, 62, 75, 82, 89, 91, 95, 97]
    }
  },
  {
    id: 'world',
    number: '06',
    name: 'WORLD',
    tagline: 'An immersive digital portfolio experience',
    category: 'Spatial Brand Presence & Metaverse',
    description: 'Architectural-grade virtual worlds and interactive 3D showrooms for brands who demand cinematic storytelling, photorealistic product configurators, and visceral web experiences.',
    accentColor: '#38BDF8',
    iconName: 'Globe',
    capabilities: [
      'Physically-based real-time material shaders',
      'Dynamic spatial audio and directional soundscapes',
      'Cross-platform fidelity from iPhone to VR headsets',
      'No-install, instant streaming WebGL compression'
    ],
    metrics: [
      { label: 'Avg Engagement', value: '4m 38s' },
      { label: 'Asset Compression', value: '85% Reduced' },
      { label: 'Load Time', value: '< 1.4s' }
    ],
    technicalSpecs: {
      engine: 'WORLD Spatial Engine 3.0',
      throughput: 'Adaptive Level-of-Detail',
      deployment: 'Universal Web Standards',
      latency: 'Sub-frame Input Response'
    },
    interfaceMockup: {
      headerTitle: 'WORLD SPATIAL SHOWROOM // PAVILION ATELIER',
      statusBadge: 'STREAMING PHOTOREAL ASSETS',
      modules: [
        { name: 'Lighting Model', status: 'PBR Ray-traced', value: 'Dual Bounce' },
        { name: 'Geometry Density', status: 'LOD 0', value: '840k Polys' },
        { name: 'Spatial Audio', status: 'Ambisonic', value: '4ch Surround' },
        { name: 'Viewer Bandwidth', status: 'Optimized', value: '4.8 MB Total' }
      ],
      chartData: [50, 68, 72, 60, 84, 91, 88, 95, 92, 100]
    }
  },
  {
    id: 'core',
    number: '07',
    name: 'CORE',
    tagline: 'An intelligent task management platform',
    category: 'Enterprise Operations & Autonomous Workflows',
    description: 'An AI-orchestrated execution matrix that continuously balances resource allocation, predicts operational bottlenecks, and automates multi-stage workflows across global enterprises.',
    accentColor: '#F472B6',
    iconName: 'Cpu',
    capabilities: [
      'Predictive sprint velocity and dependency modeling',
      'Automated cross-department task delegation',
      'Executive insight summaries generated by agentic AI',
      'Deep bidirectional integration with 80+ tools'
    ],
    metrics: [
      { label: 'Efficiency Gain', value: '+42%' },
      { label: 'Automated Tasks', value: '1.2M / mo' },
      { label: 'Time Saved', value: '18 hrs/user' }
    ],
    technicalSpecs: {
      engine: 'CORE Decision Matrix v5.1',
      throughput: 'Real-time Event Broker',
      deployment: 'Enterprise Dedicated Sovereign',
      latency: '< 5ms Event Dispatch'
    },
    interfaceMockup: {
      headerTitle: 'CORE WORKFLOW DISPATCH // ENTERPRISE PIPELINE',
      statusBadge: 'SYSTEM HEALTH 100% - AUTONOMOUS',
      modules: [
        { name: 'Tasks Orchestrated', status: 'Running', value: '18,420 Active' },
        { name: 'Bottlenecks Averted', status: 'Resolved', value: '94 Predicted' },
        { name: 'Team Capacity', status: 'Balanced', value: '82% Load' },
        { name: 'Cycle Velocity', status: 'Accelerated', value: '3.4d Average' }
      ],
      chartData: [60, 58, 70, 75, 82, 88, 85, 93, 96, 99]
    }
  },
  {
    id: 'care',
    number: '08',
    name: 'CARE',
    tagline: 'A modern hospital management system',
    category: 'Healthcare Infrastructure & Patient Telemetry',
    description: 'Next-generation clinical operating system connecting ICU telemetry, bed scheduling, robotic surgical suites, and electronic medical records with HIPAA/GDPR clinical grade security.',
    accentColor: '#4ADE80',
    iconName: 'HeartPulse',
    capabilities: [
      'Real-time bedside biometric streaming & early warning',
      'Intelligent OR and ICU asset capacity optimization',
      'End-to-end pharmaceutical chain-of-custody tracking',
      'Zero-downtime medical database failover protection'
    ],
    metrics: [
      { label: 'Response Time', value: '45 sec' },
      { label: 'Bed Utilization', value: '94.2%' },
      { label: 'Data Accuracy', value: '99.999%' }
    ],
    technicalSpecs: {
      engine: 'CARE Clinical Mesh Protocol',
      throughput: '100k Simultaneous Vitals',
      deployment: 'ISO 27001 / HIPAA Certified',
      latency: 'Continuous Zero-Delay Stream'
    },
    interfaceMockup: {
      headerTitle: 'CARE CLINICAL OS // CENTRAL HOSPITAL WING B',
      statusBadge: 'MONITORING 450 PATIENT BEDS',
      modules: [
        { name: 'Critical Alarm Feed', status: 'Clear', value: '0 Urgent' },
        { name: 'Telemetry Streams', status: 'Synchronized', value: '450/450' },
        { name: 'Surgical Suite 03', status: 'In Procedure', value: 'Robotic' },
        { name: 'Pharmacy Dispense', status: 'Verified', value: '100% Barcode' }
      ],
      chartData: [72, 75, 78, 80, 85, 84, 90, 92, 95, 98]
    }
  },
  {
    id: 'serve',
    number: '09',
    name: 'SERVE',
    tagline: 'An integrated food & beverage ERP and POS system',
    category: 'Hospitality Commerce & Supply Orchestration',
    description: 'From high-volume Michelin-starred dining rooms to multi-unit hospitality groups, SERVE synchronizes table turn, automated kitchen display systems, and farm-to-table inventory tracking.',
    accentColor: '#FB923C',
    iconName: 'UtensilsCrossed',
    capabilities: [
      'Sub-second table ordering & dynamic kitchen routing',
      'Predictive food prep waste reduction modeling',
      'Unified multi-venue inventory and procurement ERP',
      'Contactless guest ordering, payments, and loyalty'
    ],
    metrics: [
      { label: 'Order Speed', value: '0.8s Transact' },
      { label: 'Waste Reduction', value: '31% Lower' },
      { label: 'Revenue Lift', value: '+18.5%' }
    ],
    technicalSpecs: {
      engine: 'SERVE Hospitality Matrix',
      throughput: '50,000 Orders/hour Peak',
      deployment: 'Cloud + Offline Edge Gateway',
      latency: '< 200ms Transaction Commit'
    },
    interfaceMockup: {
      headerTitle: 'SERVE ERP MATRIX // METROPOLIS DINING GROUP',
      statusBadge: '14 VENUES ACTIVE - REAL-TIME',
      modules: [
        { name: 'Table Velocity', status: 'Optimal', value: '42 min Turn' },
        { name: 'Kitchen KDS Sync', status: 'Nominal', value: '6.4 min Ticket' },
        { name: 'Inventory Replenish', status: 'Automated', value: '12 Suppliers' },
        { name: 'Daily Gross Volume', status: 'Paced', value: '$184,200' }
      ],
      chartData: [40, 52, 68, 74, 80, 86, 92, 90, 95, 99]
    }
  }
];
