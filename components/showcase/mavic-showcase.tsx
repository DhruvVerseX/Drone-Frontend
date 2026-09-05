"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronDown, Compass, Crosshair, Focus, Menu, MoveUpRight, Play, RotateCcw, ScanLine, X } from "lucide-react";
import { cameras, specs } from "@/data/showcase-specs";
import type { FlightInput, FlightTelemetry } from "./flight-physics";
import FlightRemote from "./flight-remote";

const DroneScene = dynamic(() => import("./drone-scene"), { ssr: false, loading: () => <SceneLoader /> });

function SceneLoader() {
  return <div className="scene-loader" role="status"><span className="loader-mark">M<span>3</span></span><span className="eyebrow">PREPARING YOUR PERSPECTIVE</span><i /></div>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function StudioCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const move = (event: PointerEvent) => {
      if (!cursor.current) return;
      cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.current.dataset.active = String(!!(event.target as Element).closest("a, button, input, canvas, [data-cursor]"));
      cursor.current.style.opacity = "1";
    };
    const leave = () => { if (cursor.current) cursor.current.style.opacity = "0"; };
    document.documentElement.classList.add("studio-cursor-enabled");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("studio-cursor-enabled");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div ref={cursor} className="studio-cursor" aria-hidden="true"><i /><span /></div>;
}

const chapters = [{ id: "overview", name: "Overview" }, { id: "flight-lab", name: "Flight lab" }, { id: "camera", name: "Camera system" }, { id: "specifications", name: "Tech specs" }];

const modes = [
  { name: "ActiveTrack 5.0", short: "FOLLOW THE MOMENT", description: "Keep your subject at the heart of the story. ActiveTrack 5.0 follows from multiple directions, so you can focus on the scene unfolding around you.", icon: Focus },
  { name: "Waypoint Flight", short: "MAKE YOUR OWN PATH", description: "Plan a precise route, set your camera angles, and repeat the same flight. Turn a place you know into a perspective you have never seen.", icon: MoveUpRight },
  { name: "MasterShots", short: "ONE TAP. A NEW STORY.", description: "Select your subject and let Mavic 3 Pro perform a sequence of cinematic moves. A collection of carefully composed shots, ready for your next edit.", icon: ScanLine },
  { name: "Advanced RTH", short: "A SMARTER WAY HOME", description: "Advanced Return to Home plans an efficient route back to the home point. Omnidirectional sensing helps the aircraft understand its surroundings along the way.", icon: Compass },
];

export default function MavicShowcase() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState("overview");
  const [lens, setLens] = useState(0);
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [cameraMode, setCameraMode] = useState<"orbit" | "follow">("orbit");
  const [telemetry, setTelemetry] = useState<FlightTelemetry>({ altitude: 1.6, speed: 0, heading: 0, distance: 0 });
  const input = useRef<FlightInput>({ throttle: 0, yaw: 0, pitch: 0, roll: 0, gimbal: -12 });
  const flightRef = useRef<HTMLElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const flightVisible = useInView(arenaRef, { amount: 0.1 });
  const flightLoaded = useInView(flightRef, { once: true, margin: "300px" });
  const cameraLoaded = useInView(cameraRef, { once: true, margin: "300px" });
  const closingLoaded = useInView(closingRef, { once: true, margin: "300px" });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveChapter(entry.target.id);
    }, { rootMargin: "-20% 0px -55% 0px" });
    chapters.forEach(chapter => { const element = document.getElementById(chapter.id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  const resetFlight = () => {
    input.current = { throttle: 0, yaw: 0, pitch: 0, roll: 0, gimbal: -12 };
    setResetKey(key => key + 1);
    setTelemetry({ altitude: 1.6, speed: 0, heading: 0, distance: 0 });
  };
  const enterFlight = () => { setPaused(false); setMenuOpen(false); };

  return (
    <main className="mavic-site">
      <StudioCursor />
      <a className="skip-link" href="#flight-lab">Skip to flight lab</a>
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <a href="#overview" className="brand" aria-label="DJI Mavic 3 Pro home"><span className="dji-wordmark">dji</span><span className="brand-divider" /><span>MAVIC 3 PRO</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`} className={activeChapter === chapter.id ? "is-active" : ""}>{chapter.name}</a>)}</nav>
        <a className="header-cta" href="#flight-lab" onClick={enterFlight}>Take control <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <AnimatePresence>{menuOpen && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`} onClick={() => setMenuOpen(false)}>{chapter.name}<ArrowUpRight size={18} /></a>)}</motion.nav>}</AnimatePresence>
      </header>

      <section id="overview" className="hero section-shell">
        <div className="hero-topline eyebrow"><span><i className="status-dot" /> THE ART OF A NEW PERSPECTIVE</span><span>DJI MAVIC 3 PRO <b> / </b> 01—06</span></div>
        <div className="hero-main">
          <div className="hero-type">
            <motion.p className="eyebrow hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>A WORLD BEYOND THE ORDINARY.</motion.p>
            <h1><motion.span initial={{ y: reduced ? 0 : "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>BEYOND</motion.span><motion.span className="orange-text" initial={{ y: reduced ? 0 : "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}>THE FRAME.</motion.span></h1>
            <motion.div initial={{ opacity: 0, y: reduced ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
              <p className="hero-description">Three cameras. One extraordinary vision.<br />Meet the DJI Mavic 3 Pro.</p>
              <a className="text-link hero-link" href="#flight-lab" onClick={enterFlight}><span className="circle-button"><ArrowUpRight size={23} strokeWidth={1.5} /></span>YOUR FLIGHT STARTS HERE</a>
            </motion.div>
          </div>
          <div className="hero-product">
            <div className="orbital-graphic" aria-hidden="true"><i /><i /><i /><span>3</span></div>
            <div className="hero-scene"><DroneScene view="showcase" /></div>
            <div className="product-annotation"><span className="annotation-line" /><span className="eyebrow">HASSELBLAD<br /><b>4/3 CMOS CAMERA</b></span></div>
            <div className="model-tag eyebrow"><span className="status-dot" /> MAVIC 3 PRO <span>958 g</span></div>
          </div>
          <div className="hero-side-label eyebrow">ENGINEERED FOR ANOTHER LEVEL.</div>
        </div>
        <div className="hero-bottom"><a href="#flight-lab" className="scroll-cue eyebrow"><span><ArrowDown size={17} /></span>SCROLL TO DISCOVER</a><span className="drag-hint eyebrow"><RotateCcw size={13} /> DRAG TO EXPLORE IN 3D</span><span className="eyebrow hero-edition">THE MAVIC COLLECTION — VOL. 03</span></div>
      </section>

      <div className="spec-ribbon section-shell">
        <div><span className="spec-ribbon-number">4/3<span> CMOS</span></span><span className="eyebrow">HASSELBLAD CAMERA</span></div>
        <div><span className="spec-ribbon-number">43<span> MIN</span></span><span className="eyebrow">MAX. FLIGHT TIME¹</span></div>
        <div><span className="spec-ribbon-number">15<span> KM</span></span><span className="eyebrow">O3+ TRANSMISSION²</span></div>
        <div><span className="spec-ribbon-number">360<span>°</span></span><span className="eyebrow">OMNIDIRECTIONAL SENSING</span></div>
        <a href="#specifications" className="spec-ribbon-link"><ArrowUpRight size={25} /><span className="eyebrow">ALL THE DETAILS</span></a>
      </div>

      <section id="flight-lab" ref={flightRef} className="flight-section section-shell section-space">
        <Reveal className="section-heading"><div><p className="eyebrow chapter-label"><span>01 /</span> THE FLIGHT LAB</p><h2>YOUR INSTINCT.<br /><span className="soft-text">ITS NEXT MOVE.</span></h2></div><div className="section-intro"><span className="mini-cross">+</span><p>Some things are better experienced.<br />Take the controls. Find your own angle.<br />The sky is yours to explore.</p><span className="eyebrow">INTERACTIVE 3D FLIGHT EXPERIENCE</span></div></Reveal>
        <div className="flight-arena" ref={arenaRef}>
          <div className="arena-topline"><span className="eyebrow"><i className={`status-dot ${paused ? "idle" : ""}`} /> {paused ? "READY WHEN YOU ARE" : "FLIGHT SYSTEM ACTIVE"}</span><div className="segmented-control" aria-label="Flight camera view"><button aria-pressed={cameraMode === "orbit"} onClick={() => setCameraMode("orbit")}><RotateCcw size={13} /> Orbit</button><button aria-pressed={cameraMode === "follow"} onClick={() => setCameraMode("follow")}><Crosshair size={13} /> Follow</button></div></div>
          <div className="arena-grid" aria-hidden="true" />
          <span className="arena-watermark" aria-hidden="true">FLIGHT LAB</span>
          <div className="arena-scene">{flightLoaded ? <DroneScene view="flight" input={input} onTelemetry={setTelemetry} resetKey={resetKey} cameraMode={cameraMode} paused={paused || !flightVisible} /> : <SceneLoader />}</div>
          <div className="arena-instruments"><div><span className="eyebrow">ALTITUDE</span><strong>{telemetry.altitude.toFixed(1)}<small> m</small></strong></div><div><span className="eyebrow">VELOCITY</span><strong>{telemetry.speed.toFixed(1)}<small> m/s</small></strong></div></div>
          <div className="arena-heading eyebrow"><Compass size={17} /><span>{Math.round(telemetry.heading).toString().padStart(3, "0")}°<small> HEADING</small></span></div>
          {paused && <button className="start-flight" onClick={() => setPaused(false)}><Play size={16} fill="currentColor" /> START FLIGHT</button>}
          <div className="arena-bottomline eyebrow"><span>VIRTUAL ENVIRONMENT <b> / </b> MANUAL CONTROL</span><span>01 <i /> 03</span></div>
        </div>
        <div className="remote-area"><div className="remote-caption"><span className="eyebrow">MEET YOUR CO-PILOT</span><h3>A little movement.<br />A whole new world.</h3><p>Drag the sticks or use your keyboard.<br />Release to ease into a hover.</p><span className="eyebrow">RC PRO–INSPIRED CONTROLLER</span></div><FlightRemote input={input} telemetry={telemetry} onReset={resetFlight} paused={paused} onTogglePause={() => setPaused(!paused)} active={flightVisible} /></div>
        <p className="simulation-note">An interactive visualization of the Mavic 3 Pro. Flight motion and telemetry are simulated.</p>
      </section>

      <section id="camera" ref={cameraRef} className="camera-section section-shell section-space">
        <Reveal className="section-heading"><div><p className="eyebrow chapter-label"><span>02 /</span> THE CAMERA SYSTEM</p><h2>ONE DRONE.<br /><span className="orange-text">THREE WAYS TO SEE.</span></h2></div><p className="section-intro">From the whole horizon to the smallest detail.<br />A triple-camera system that makes room<br />for every version of your vision.</p></Reveal>
        <div className="camera-layout">
          <div className="camera-visual"><span className="camera-index" aria-hidden="true">0{lens + 1}</span><div className="camera-scene">{cameraLoaded ? <DroneScene view="camera" cameraIndex={lens} /> : <SceneLoader />}</div><span className="camera-visual-label eyebrow"><span className="status-dot" /> TRIPLE-CAMERA GIMBAL <span>3 AXIS</span></span></div>
          <div className="camera-details"><div className="lens-tabs" role="tablist" aria-label="Explore camera lenses">{cameras.map((camera, index) => <button key={camera.focalLength} role="tab" id={`lens-tab-${index}`} aria-selected={lens === index} aria-controls="lens-panel" tabIndex={lens === index ? 0 : -1} onClick={() => setLens(index)} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); const next = (index + (event.key === "ArrowRight" ? 1 : 2)) % 3; setLens(next); document.getElementById(`lens-tab-${next}`)?.focus(); } }}><span>0{index + 1}</span>{camera.focalLength}<small>mm</small></button>)}</div>
            <AnimatePresence mode="wait"><motion.div key={lens} id="lens-panel" role="tabpanel" aria-labelledby={`lens-tab-${lens}`} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.2 }}><p className="eyebrow lens-type">{lens === 0 ? "THE BIG PICTURE" : lens === 1 ? "A CLOSER CONNECTION" : "THE UNSEEN DETAIL"}</p><h3>{cameras[lens].name}</h3><p className="lens-description">{cameras[lens].description}</p><div className="lens-specs"><div><strong>{cameras[lens].sensor}</strong><span className="eyebrow">SENSOR</span></div><div><strong>{cameras[lens].resolution}</strong><span className="eyebrow">EFFECTIVE PIXELS</span></div><div><strong>{cameras[lens].aperture}</strong><span className="eyebrow">APERTURE</span></div></div><div className="lens-note"><span className="little-aperture"><Focus size={20} /></span><p>{lens === 0 ? "Hasselblad Natural Colour Solution. A world as rich as you remember it." : lens === 1 ? "Bring your subject forward with striking compression and beautiful depth." : "Go beyond the obvious. Isolate a subject and discover the story within the scene."}</p></div></motion.div></AnimatePresence>
          </div>
        </div>
      </section>

      <section id="performance" className="performance-section">
        <div className="performance-image" role="img" aria-label="A dramatic aerial landscape showing the freedom of flight" />
        <div className="performance-content section-shell"><Reveal><p className="eyebrow chapter-label"><span>03 /</span> BUILT TO GO BEYOND</p><h2>LESS LIMITS.<br />MORE <span>HORIZON.</span></h2><p>Stay with the light a little longer.<br />Let the next idea take you a little further.</p></Reveal><div className="performance-stats"><div><span className="eyebrow">TIME TO CREATE</span><strong>43<small>min</small></strong><p>Maximum flight time¹</p></div><div><span className="eyebrow">KEEP YOUR CONNECTION</span><strong>15<small>km</small></strong><p>DJI O3+ transmission²</p></div><div><span className="eyebrow">CONFIDENCE IN EVERY DIRECTION</span><strong>APAS<small>5.0</small></strong><p>Omnidirectional obstacle sensing</p></div></div><div className="performance-footnote eyebrow">¹ CONTROLLED TEST CONDITIONS. ² FCC, UNOBSTRUCTED AND INTERFERENCE-FREE. ACTUAL RESULTS VARY.</div></div>
      </section>

      <section className="intelligence-section section-shell section-space">
        <Reveal className="section-heading"><div><p className="eyebrow chapter-label"><span>04 /</span> INTELLIGENT BY DESIGN</p><h2>LESS TO THINK ABOUT.<br /><span className="soft-text">MORE TO FEEL.</span></h2></div><p className="section-intro">You bring the imagination.<br />Mavic brings the intelligence to follow it.</p></Reveal>
        <div className="modes-layout"><div className="mode-list">{modes.map((item, index) => <button key={item.name} className={mode === index ? "mode-row is-active" : "mode-row"} aria-expanded={mode === index} aria-controls={`mode-description-${index}`} onClick={() => setMode(index)}><span className="eyebrow">0{index + 1}</span><div><h3>{item.name}</h3>{mode === index && <motion.p id={`mode-description-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{item.description}</motion.p>}</div><ArrowUpRight size={21} /></button>)}</div><div className={`mode-visual mode-${mode}`}><div className="mode-map-grid" /><div className="map-rings" /><svg viewBox="0 0 500 400" className="flight-path" fill="none" aria-label={`${modes[mode].name} flight path illustration`}><path className="path-line" d={mode === 0 ? "M80 280 C130 100 350 60 390 180 S270 340 180 245 S230 80 350 130" : mode === 1 ? "M80 300 L150 110 L310 160 L400 70 L420 310 L260 270 Z" : mode === 2 ? "M110 250 C110 40 400 40 400 235 C400 370 110 370 110 200 S355 80 355 200" : "M400 100 C300 100 355 280 230 220 S90 180 110 300"} /><circle cx={mode === 3 ? "110" : "250"} cy={mode === 3 ? "300" : "200"} r="29" className="path-target" /><path d={mode === 3 ? "M98 302 L110 290 L122 302 M101 300 V310 H119 V300" : "M240 194 L246 200 L240 206 M260 194 L254 200 L260 206"} stroke="currentColor" strokeWidth="1.5" /></svg><div className="mode-map-top eyebrow"><span>INTELLIGENT FLIGHT</span><span>0{mode + 1}</span></div><AnimatePresence mode="wait"><motion.div key={mode} className="mode-map-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className="eyebrow">{modes[mode].short}</span><span>Designed around your vision.<ArrowUpRight size={20} /></span></motion.div></AnimatePresence><span className="mode-demo-label eyebrow">ILLUSTRATIVE FLIGHT PATH</span></div></div>
      </section>

      <section id="specifications" className="specifications-section section-shell section-space">
        <Reveal className="section-heading"><div><p className="eyebrow chapter-label"><span>05 /</span> THE FINER DETAILS</p><h2>EXTRAORDINARY.<br /><span className="soft-text">DOWN TO THE SPEC.</span></h2></div><a className="text-link specs-source" href="https://www.dji.com/mavic-3-pro/specs" target="_blank" rel="noreferrer">OFFICIAL DJI SPECIFICATIONS <ArrowUpRight size={18} /></a></Reveal>
        <div className="specifications-list">{specs.map((group, index) => <details key={group.heading} open={index === 0}><summary><span className="eyebrow">0{index + 1}</span><h3>{group.heading}</h3><ChevronDown size={20} /></summary><div className="spec-table">{group.rows.map(row => <div key={row.label} className="spec-table-row"><span>{row.label}</span><strong>{row.value}</strong></div>)}</div></details>)}</div>
        <div className="source-notes"><p>¹ DJI measures up to 43 minutes in controlled, windless conditions at a constant 32.4 km/h, until forced landing. Flight time varies with conditions, use, and firmware.</p><p>² Up to 15 km under FCC standards; 8 km under CE/SRRC/MIC. Measured without obstacles or interference, for one-way communication without a return flight. Transmission range is not a safe operating distance.</p><p>Product specifications sourced from <a href="https://www.dji.com/mavic-3-pro/specs" target="_blank" rel="noreferrer">DJI</a>. Sensing performance depends on lighting and surroundings. This is an independent design concept, not an official DJI website.</p></div>
      </section>

      <section ref={closingRef} className="closing-section section-shell"><p className="eyebrow chapter-label"><span>06 /</span> YOUR NEXT CHAPTER</p><Reveal><h2>THE WORLD IS BIGGER<br />THAN YOUR <span>FRAME.</span></h2></Reveal><div className="closing-scene">{closingLoaded && <DroneScene view="landing" />}</div><div className="closing-actions"><a className="pill-button" href="#flight-lab" onClick={enterFlight}>Take another flight <ArrowUpRight size={18} /></a><a className="text-link" href="https://www.dji.com/mavic-3-pro" target="_blank" rel="noreferrer">EXPLORE MAVIC 3 PRO AT DJI <ArrowUpRight size={16} /></a></div></section>
      <footer className="site-footer section-shell"><a href="#overview" className="brand"><span className="dji-wordmark">dji</span><span className="brand-divider" /><span>MAVIC 3 PRO</span></a><p>An independent exploration of flight.</p><a href="#overview" className="eyebrow">BACK TO THE TOP <ArrowUpRight size={15} /></a><span className="footer-disclaimer">DJI and Hasselblad are trademarks of their respective owners. Original 3D interpretation; not a dimensionally exact product model.</span></footer>
    </main>
  );
}
