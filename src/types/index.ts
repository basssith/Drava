export interface ApplicationItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  accentColor: string;
  iconName: string;
  capabilities: string[];
  metrics: { label: string; value: string }[];
  technicalSpecs: {
    engine: string;
    throughput: string;
    deployment: string;
    latency: string;
  };
  interfaceMockup: {
    headerTitle: string;
    statusBadge: string;
    modules: { name: string; status: string; value: string }[];
    chartData: number[];
  };
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  deliverables: string[];
  impactMetric: string;
  impactLabel: string;
  imageBg: string;
  color: string;
  techStack: string[];
}

export interface JourneyStage {
  id: string;
  index: number;
  label: string;
  title: string;
  subtitle: string;
  zRange: [number, number];
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
}

