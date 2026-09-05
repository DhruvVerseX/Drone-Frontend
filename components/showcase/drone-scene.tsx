"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import DroneModel from "./drone-model";
import { createFlightState, stepFlight, type FlightInput, type FlightTelemetry } from "./flight-physics";

export type DroneSceneProps = {
  input?: RefObject<FlightInput>;
  onTelemetry?: (telemetry: FlightTelemetry) => void;
  resetKey?: number;
  view?: "showcase" | "flight" | "camera" | "performance" | "landing";
  cameraMode?: "orbit" | "follow";
  cameraIndex?: number;
  paused?: boolean;
  className?: string;
};

const IDLE_INPUT: FlightInput = { throttle: 0, yaw: 0, pitch: 0, roll: 0, gimbal: 0 };
const FOLDED_ARM_ANGLES = [-1.88, 2, 1.88, -2]; // Front left, rear left, front right, rear right.
let webglAvailable: boolean | undefined;

function supportsWebGL() {
  if (webglAvailable !== undefined) return webglAvailable;
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    webglAvailable = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglAvailable = false;
  }
  return webglAvailable;
}

function SceneFallback() {
  return <div style={{ height: "100%", minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 12, color: "#72766e" }}>
    <img src="/images/mavic-product.png" alt="DJI Mavic 3 Pro folded for travel, viewed from above" width={640} height={640} style={{ width: "80%", height: "75%", objectFit: "contain" }} />
    <span style={{ fontSize: 10, letterSpacing: "0.1em" }}>DJI MAVIC 3 PRO</span>
    <span style={{ fontSize: 11 }}>3D is unavailable on this device. Product preview shown.</span>
  </div>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children; }
}

function SoftShadow({ position }: { position: RefObject<THREE.Group | null> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d")!;
    const gradient = context.createRadialGradient(64, 64, 5, 64, 64, 64);
    gradient.addColorStop(0, "rgba(33,39,26,0.24)");
    gradient.addColorStop(0.4, "rgba(33,39,26,0.14)");
    gradient.addColorStop(1, "rgba(33,39,26,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(() => {
    if (!mesh.current || !position.current) return;
    mesh.current.position.x = position.current.position.x;
    mesh.current.position.z = position.current.position.z;
    const spread = 1 + Math.max(0, position.current.position.y) * 0.1;
    mesh.current.scale.set(5.4 * spread, 3.4 * spread, 1);
  });
  return <mesh ref={mesh} position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[5.4, 3.4, 1]}>
    <planeGeometry args={[1, 1]} />
    <meshBasicMaterial map={texture} transparent depthWrite={false} />
  </mesh>;
}

function SceneContent({
  input, onTelemetry, resetKey, view = "showcase", cameraMode = "orbit", cameraIndex = -1,
  paused, reduced, scroll,
}: DroneSceneProps & { reduced: boolean; scroll: RefObject<{ progress: number }> }) {
  const body = useRef<THREE.Group>(null);
  const rotors = useRef<(THREE.Group | null)[]>([]);
  const arms = useRef<(THREE.Group | null)[]>([]);
  const gimbal = useRef<THREE.Group>(null);
  const orbit = useRef<OrbitControlsImpl>(null);
  const flight = useRef(createFlightState());
  const flightClock = useRef(0);
  const elapsed = useRef(0);
  const frameSample = useRef({ count: 0, total: 0, slow: 0 });
  const profile = useMemo(() => new URLSearchParams(window.location.search).has("profile"), []);
  const { camera, size, invalidate } = useThree();
  const focus = useRef(new THREE.Vector3());
  const cameraTarget = useRef(new THREE.Vector3(4.9, 3.3, 7.4));
  const interacting = useRef(false);
  const transition = useRef(1);
  const scratch = useMemo(() => ({ target: new THREE.Vector3(), offset: new THREE.Vector3(), axis: new THREE.Vector3(0, 1, 0) }), []);

  useEffect(() => {
    flight.current = createFlightState();
    elapsed.current = 0;
    interacting.current = false;
    transition.current = 1;
    invalidate();
  }, [resetKey, invalidate]);

  useEffect(() => {
    const fit = Math.max(1, 1.18 / (size.width / size.height));
    if (view === "camera") {
      cameraTarget.current.set((cameraIndex === 2 ? -1.2 : cameraIndex === 1 ? 1.55 : 1.1) * fit, 0.52 * fit, 3.0 * fit);
      focus.current.set(0, -0.26, 0.79);
    } else if (view === "flight") {
      cameraTarget.current.set(5.7 * fit, 4.7 * fit, 8.4 * fit);
      focus.current.set(0, 0.1, 0);
    } else {
      cameraTarget.current.set(4.9 * fit, 3.3 * fit, 7.4 * fit);
      focus.current.set(0, -0.02, 0);
    }
    transition.current = 1;
    interacting.current = false;
    invalidate();
  }, [view, size.width, size.height, cameraIndex, invalidate]);

  useFrame((_, delta) => {
    if (!body.current) return;
    const dt = Math.min(delta, 0.1);
    const controls = input?.current ?? IDLE_INPUT;
    const running = !paused;
    if (profile && running && delta > 0 && delta < 0.5 && frameSample.current.count < 180) {
      const sample = frameSample.current;
      sample.count++;
      sample.total += delta;
      if (delta > 0.025) sample.slow++;
      if (sample.count === 180) console.info("MAVIC_FRAME_PROFILE", JSON.stringify({ view, frames: 180, fps: Math.round(180 / sample.total), averageMs: +(sample.total * 1000 / 180).toFixed(2), framesOver25ms: sample.slow }));
    }
    if (running) elapsed.current += dt;
    const time = elapsed.current;
    const damping = 1 - Math.exp(-dt * 5);

    if (view === "flight") {
      const state = running ? stepFlight(flight.current, controls, dt) : flight.current;
      body.current.position.set(state.position.x, state.position.y - 1.4, state.position.z);
      body.current.rotation.set(state.pitch, state.heading, state.roll, "YXZ");
      body.current.scale.setScalar(0.76);
      if (cameraMode === "follow" && running) {
        scratch.target.set(state.position.x, state.position.y - 1.2, state.position.z);
        scratch.offset.set(3.6, 2.75, 5.4).multiplyScalar(Math.max(1, 1.18 / (size.width / size.height))).applyAxisAngle(scratch.axis, state.heading).add(scratch.target);
        camera.position.lerp(scratch.offset, 1 - Math.exp(-dt * 2.4));
        camera.lookAt(scratch.target);
        if (orbit.current) orbit.current.target.copy(scratch.target);
      }
      flightClock.current += dt;
      if (flightClock.current > 0.1) {
        flightClock.current = 0;
        onTelemetry?.({
          altitude: state.position.y,
          speed: Math.hypot(state.velocity.x, state.velocity.y, state.velocity.z),
          heading: ((-state.heading * 180 / Math.PI) % 360 + 360) % 360,
          distance: Math.hypot(state.position.x, state.position.z),
        });
      }
    } else {
      const progress = scroll.current.progress;
      const landing = view === "landing" ? progress : 0;
      const hover = reduced || paused ? 0 : Math.sin(time * 0.72) * 0.055;
      body.current.position.y = THREE.MathUtils.lerp(body.current.position.y, (view === "camera" ? 0 : 0.13) + hover - landing * 0.58, damping);
      body.current.rotation.set(
        view === "performance" ? 0.17 : -0.025,
        (view === "camera" ? -0.07 : -0.2) + (reduced ? 0 : Math.sin(time * 0.15) * 0.08 + progress * 0.28),
        view === "performance" ? -0.12 : -0.025,
      );
      body.current.scale.setScalar(1);
      if (view === "landing") arms.current.forEach((arm, i) => {
        if (arm) arm.rotation.y = Math.max(0, landing * 2 - 1) * FOLDED_ARM_ANGLES[i];
      });
    }

    if (running && !reduced) {
      const landingSlowdown = view === "landing" ? 1 - scroll.current.progress : 1;
      const rotorSpeed = (view === "flight" ? 47 + controls.throttle * 12 : 2.7) * landingSlowdown;
      rotors.current.forEach((rotor, index) => {
        if (rotor) rotor.rotation.y += dt * rotorSpeed * (index % 2 ? -1 : 1);
      });
    }
    if (gimbal.current) {
      const target = view === "flight" ? -controls.gimbal * Math.PI / 180 : 0.015;
      gimbal.current.rotation.x = THREE.MathUtils.lerp(gimbal.current.rotation.x, target, damping);
    }

    if (cameraMode !== "follow" || view !== "flight") {
      const cameraPush = view === "camera" && !reduced;
      if ((transition.current > 0.002 || cameraPush) && !interacting.current) {
        scratch.offset.copy(cameraTarget.current);
        if (cameraPush) scratch.offset.sub(focus.current).multiplyScalar(1 + (1 - scroll.current.progress) * 0.22).add(focus.current);
        camera.position.lerp(scratch.offset, damping);
        if (orbit.current) orbit.current.target.lerp(focus.current, damping);
        camera.lookAt(orbit.current?.target ?? focus.current);
        transition.current *= 1 - damping;
        if (reduced) invalidate();
      }
    }
  });

  return <>
    <ambientLight intensity={0.65} />
    <hemisphereLight args={["#fffaf2", "#646d59", 1.65]} />
    <directionalLight position={[-3, 7, 5]} intensity={3.5} color="#fff8ee" />
    <directionalLight position={[5, 2, -4]} intensity={2.4} color="#e6ecef" />
    <directionalLight position={[-5, 1, -1]} intensity={0.85} color="#fff6e4" />
    <Environment resolution={64} frames={1}>
      <Lightformer form="rect" intensity={3} color="#fff9ef" scale={[10, 6, 1]} position={[-4, 5, 2]} rotation={[0, Math.PI / 3, 0]} />
      <Lightformer form="rect" intensity={2.2} color="#eaf1f7" scale={[6, 8, 1]} position={[5, 2, -3]} rotation={[0, -Math.PI / 2, 0]} />
      <Lightformer form="rect" intensity={1.2} color="#ffffff" scale={[9, 3, 1]} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />
    </Environment>
    <group ref={body} position={[0, 0.13, 0]}>
      <group rotation={[0, view === "flight" ? Math.PI : 0, 0]}>
        <DroneModel rotors={rotors} arms={arms} gimbal={gimbal} cameraIndex={view === "camera" ? cameraIndex : -1} />
      </group>
    </group>
    {view !== "camera" && <SoftShadow position={body} />}
    <OrbitControls ref={orbit} makeDefault enablePan={false} enableZoom={false} enableDamping dampingFactor={0.075}
      enabled={cameraMode !== "follow" || view !== "flight"} minPolarAngle={0.18} maxPolarAngle={Math.PI * 0.66}
      rotateSpeed={0.58} onStart={() => { interacting.current = true; transition.current = 0; }} />
  </>;
}

export default function DroneScene(props: DroneSceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const scroll = useRef({ progress: 0 });
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(media.matches);
    const updateVisibility = () => setActive(!document.hidden && document.hasFocus());
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("focus", updateVisibility);
    window.addEventListener("blur", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
    if (host.current) observer.observe(host.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      window.removeEventListener("focus", updateVisibility);
      window.removeEventListener("blur", updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduced || props.view === "flight" || !host.current) return;
    ensureGsapPlugins();
    const animation = gsap.to(scroll.current, {
      progress: 1, ease: "none",
      scrollTrigger: { trigger: host.current, start: "top 75%", end: "bottom 20%", scrub: 1.1 },
    });
    return () => { animation.scrollTrigger?.kill(); animation.kill(); };
  }, [reduced, props.view]);

  return <div ref={host} className={props.className} data-cursor="orbit" style={{ width: "100%", height: "100%", position: "relative" }}>
    <SceneBoundary>
      {webgl === false ? <SceneFallback /> : <>
      {!ready && <div aria-live="polite" style={{ position: "absolute", inset: 0, display: "grid", placeContent: "center", fontSize: 10, letterSpacing: "0.2em", color: "#85877e" }}>PREPARING YOUR PERSPECTIVE</div>}
      {webgl && <Canvas role="img"
        aria-label={props.view === "flight" ? "Interactive DJI Mavic 3 Pro flight simulation" : "Interactive three-dimensional DJI Mavic 3 Pro. Drag to orbit."}
        frameloop={active && visible && (!reduced || props.view === "flight") && !props.paused ? "always" : "demand"}
        dpr={[1, 1.5]} camera={{ position: [4.9, 3.3, 7.4], fov: 33, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); setReady(true); }}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 700ms ease", touchAction: props.view === "flight" ? "pan-y" : "none" }}
      >
        <Suspense fallback={null}><SceneContent {...props} reduced={reduced} scroll={scroll} /></Suspense>
      </Canvas>}
      </>}
    </SceneBoundary>
  </div>;
}
