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
    summary: "Terrain intelligence with centimeter-grade mapping and live volumetric sweeps.",
    metrics: [
      { label: "Terrain Depth", value: "14.2 km2" },
      { label: "Point Cloud", value: "4.8B pts" },
      { label: "Signal Lock", value: "99.2%" }
    ],
    panels: ["Contour relay", "Altitude mesh", "Thermal overlay"]
  },
  {
    id: "secure",
    label: "Secure",
    code: "SC-09",
    accent: "var(--green)",
    icon: Shield,
    summary: "Low-light perimeter scanning with predictive route interception and silent tracking.",
    metrics: [
      { label: "Perimeter Span", value: "28 km" },
      { label: "Threat Index", value: "02 / low" },
      { label: "Target Lock", value: "4 nodes" }
    ],
    panels: ["Night vision grid", "Patrol arcs", "Anomaly flags"]
  },
  {
    id: "capture",
    label: "Capture",
    code: "CP-17",
    accent: "var(--amber)",
    icon: Aperture,
    summary: "Cinematic pathing tuned for stabilized pursuit, arc turns, and lens-aware framing.",
    metrics: [
      { label: "Stabilization", value: "0.2 deg" },
      { label: "Frame Sync", value: "240 fps" },
      { label: "Path Smooth", value: "98.7%" }
    ],
    panels: ["Arc camera map", "Lens telemetry", "Motion smoothing"]
  },
  {
    id: "deliver",
    label: "Deliver",
    code: "DL-04",
    accent: "var(--cyan)",
    icon: Truck,
    summary: "Urban route orchestration with air-lane balancing and predictive battery reserve.",
    metrics: [
      { label: "Node Queue", value: "182" },
      { label: "Arrival Bias", value: "+2.1 min" },
      { label: "Reserve", value: "31%" }
    ],
    panels: ["Node lattice", "Drop corridor", "Reserve model"]
  },
  {
    id: "analyze",
    label: "Analyze",
    code: "AN-88",
    accent: "var(--green)",
    icon: Binary,
    summary: "Edge AI inference for terrain, anomalies, route integrity, and mission confidence.",
    metrics: [
      { label: "Inference Rate", value: "1.9T ops" },
      { label: "Anomaly Class", value: "11 clusters" },
      { label: "Confidence", value: "97.4%" }
    ],
    panels: ["Pattern engine", "Route optimizer", "Edge summary"]
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
    blurb: "Variable-thrust micro-adjustments tuned for dense wind pockets and silent hover correction."
  },
  {
    id: "camera",
    title: "Optical Core",
    blurb: "Dual-spectrum payload that shifts from cinematic tracking to inspection mode without frame jitter."
  },
  {
    id: "sensors",
    title: "Sensor Ring",
    blurb: "LiDAR, thermal, environmental pressure, and terrain depth fused into one navigational envelope."
  },
  {
    id: "stabilization",
    title: "Stabilization",
    blurb: "Inertial compensation pipeline that settles motion before it becomes visible in the image plane."
  },
  {
    id: "ai",
    title: "AI Navigation",
    blurb: "Onboard inference resolves flight path, obstacle intent, and route confidence in milliseconds."
  },
  {
    id: "battery",
    title: "Battery Logic",
    blurb: "Thermal-aware power routing models reserve windows for return, hover, and aggressive ascent."
  }
];

export const useCases = [
  {
    title: "Agriculture",
    code: "AG-06",
    icon: Waves,
    statement: "Field topology rendered as living crop intelligence."
  },
  {
    title: "Security",
    code: "NT-19",
    icon: Crosshair,
    statement: "Night grids pulse only where behavior deviates."
  },
  {
    title: "Cinema",
    code: "CM-22",
    icon: Orbit,
    statement: "Camera paths glide with machine precision and human rhythm."
  },
  {
    title: "Logistics",
    code: "LG-08",
    icon: ScanLine,
    statement: "Delivery nodes resolve into a breathable aerial network."
  },
  {
    title: "Recon",
    code: "RC-14",
    icon: Fuel,
    statement: "Long-range scans remain stable under hostile wind and low visibility."
  }
];
