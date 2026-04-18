import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  Binary,
  Crosshair,
  Fuel,
  Orbit,
  Radar,
  ScanLine,
  Shield,
  Truck,
  Waves
} from "lucide-react";

export type MissionMode = {
  id: string;
  label: string;
  code: string;
  accent: string;
  icon: LucideIcon;
  summary: string;
  metrics: { label: string; value: string }[];
  panels: string[];
};

export const missionModes: MissionMode[] = [
  {
    id: "survey",
    label: "Survey",
    code: "SV-01",
    accent: "var(--cyan)",
    icon: Radar,
    summary: "Map terrain live.",
    metrics: [
      { label: "Terrain Depth", value: "14.2 km2" },
      { label: "Point Cloud", value: "4.8B pts" },
      { label: "Signal Lock", value: "99.2%" }
    ],
    panels: ["Contours", "Altitude", "Thermal"]
  },
  {
    id: "secure",
    label: "Secure",
    code: "SC-09",
    accent: "var(--green)",
    icon: Shield,
    summary: "Watch the perimeter.",
    metrics: [
      { label: "Perimeter Span", value: "28 km" },
      { label: "Threat Index", value: "02 / low" },
      { label: "Target Lock", value: "4 nodes" }
    ],
    panels: ["Night", "Patrol", "Flags"]
  },
  {
    id: "capture",
    label: "Capture",
    code: "CP-17",
    accent: "var(--amber)",
    icon: Aperture,
    summary: "Track with smooth motion.",
    metrics: [
      { label: "Stabilization", value: "0.2 deg" },
      { label: "Frame Sync", value: "240 fps" },
      { label: "Path Smooth", value: "98.7%" }
    ],
    panels: ["Arc", "Lens", "Smooth"]
  },
  {
    id: "deliver",
    label: "Deliver",
    code: "DL-04",
    accent: "var(--cyan)",
    icon: Truck,
    summary: "Move payload fast.",
    metrics: [
      { label: "Node Queue", value: "182" },
      { label: "Arrival Bias", value: "+2.1 min" },
      { label: "Reserve", value: "31%" }
    ],
    panels: ["Nodes", "Drop", "Reserve"]
  },
  {
    id: "analyze",
    label: "Analyze",
    code: "AN-88",
    accent: "var(--green)",
    icon: Binary,
    summary: "Read patterns fast.",
    metrics: [
      { label: "Inference Rate", value: "1.9T ops" },
      { label: "Anomaly Class", value: "11 clusters" },
      { label: "Confidence", value: "97.4%" }
    ],
    panels: ["Pattern", "Route", "Edge"]
  }
];

export const telemetryStats = [
  { label: "Wind Resistance", value: "31 kn", delta: "+4.2%" },
  { label: "Battery Efficiency", value: "92%", delta: "+1.7%" },
  { label: "Terrain Mapping", value: "2.3 cm", delta: "error radius" },
  { label: "Camera Stabilization", value: "0.2 deg", delta: "-18% drift" },
  { label: "Target Lock", value: "99.1%", delta: "+0.8%" },
  { label: "Route Optimization", value: "14 sec", delta: "recompute" }
];

export const systemNodes = [
  {
    id: "propulsion",
    title: "Propulsion",
    blurb: "Stable thrust."
  },
  {
    id: "camera",
    title: "Optical Core",
    blurb: "Sharp visual lock."
  },
  {
    id: "sensors",
    title: "Sensor Ring",
    blurb: "Depth and heat."
  },
  {
    id: "stabilization",
    title: "Stabilization",
    blurb: "Calm image plane."
  },
  {
    id: "ai",
    title: "AI Navigation",
    blurb: "Fast route logic."
  },
  {
    id: "battery",
    title: "Battery Logic",
    blurb: "Smart reserve."
  }
];

export const useCases = [
  {
    title: "Agriculture",
    code: "AG-06",
    icon: Waves,
    statement: "Field scan."
  },
  {
    title: "Security",
    code: "NT-19",
    icon: Crosshair,
    statement: "Night watch."
  },
  {
    title: "Cinema",
    code: "CM-22",
    icon: Orbit,
    statement: "Smooth chase."
  },
  {
    title: "Logistics",
    code: "LG-08",
    icon: ScanLine,
    statement: "Fast drops."
  },
  {
    title: "Recon",
    code: "RC-14",
    icon: Fuel,
    statement: "Long range."
  }
];
