"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import { ArrowUp, Pause, Play, RotateCcw, Signal } from "lucide-react";
import type { FlightInput, FlightTelemetry } from "./flight-physics";
import "./flight-remote.css";

type Props = {
  input: RefObject<FlightInput>;
  telemetry: FlightTelemetry;
  onReset: () => void;
  paused: boolean;
  onTogglePause: () => void;
  active: boolean;
};

type StickName = "left" | "right";
type Stick = { x: number; y: number; pointer: number | null };
const neutral = (): Record<StickName, Stick> => ({
  left: { x: 0, y: 0, pointer: null },
  right: { x: 0, y: 0, pointer: null },
});
const flightKeys = new Set(["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

export default function FlightRemote({ input, telemetry, onReset, paused, onTogglePause, active }: Props) {
  const [sticks, setSticks] = useState(neutral);
  const [gimbal, setGimbal] = useState(input.current.gimbal);
  const remote = useRef<HTMLDivElement>(null);
  const pointers = useRef(neutral());
  const keys = useRef(new Set<string>());
  const enabled = active && !paused;

  const publish = useCallback(() => {
    const down = (key: string) => Number(keys.current.has(key));
    const keyboard = {
      left: { x: down("d") - down("a"), y: down("s") - down("w") },
      right: { x: down("ArrowRight") - down("ArrowLeft"), y: down("ArrowDown") - down("ArrowUp") },
    };
    const next = neutral();
    for (const name of ["left", "right"] as const) {
      const source = pointers.current[name].pointer === null ? keyboard[name] : pointers.current[name];
      const length = Math.max(1, Math.hypot(source.x, source.y));
      next[name] = { x: source.x / length, y: source.y / length, pointer: pointers.current[name].pointer };
    }
    input.current.throttle = -next.left.y;
    input.current.yaw = next.left.x;
    input.current.pitch = -next.right.y;
    input.current.roll = next.right.x;
    setSticks(next);
  }, [input]);

  const clear = useCallback(() => {
    keys.current.clear();
    pointers.current = neutral();
    publish();
  }, [publish]);

  useEffect(() => {
    if (!enabled) clear();
    const canUseKeyboard = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return true;
      if (target.closest("input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=tablist]")) return false;
      const control = target.closest("button, a, summary, [role]");
      const section = remote.current?.closest("section");
      return !control || !!section?.contains(control) || control.getAttribute("href") === `#${section?.id}`;
    };
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (!flightKeys.has(key)) return;
      if (event.type === "keyup") {
        keys.current.delete(key);
        publish();
        return;
      }
      if (!enabled || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || !canUseKeyboard(event.target)) return;
      event.preventDefault();
      keys.current.add(key);
      publish();
    };
    const onVisibility = () => { if (document.hidden) clear(); };
    const onFocus = (event: FocusEvent) => {
      if (!canUseKeyboard(event.target)) clear();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("focusin", onFocus);
      clear();
    };
  }, [enabled, clear, publish]);

  function moveStick(name: StickName, event: PointerEvent<HTMLButtonElement>) {
    if (!enabled || pointers.current[name].pointer !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const travel = rect.width * 0.3;
    const x = (event.clientX - rect.left - rect.width / 2) / travel;
    const y = (event.clientY - rect.top - rect.height / 2) / travel;
    const length = Math.max(1, Math.hypot(x, y));
    pointers.current[name] = { x: x / length, y: y / length, pointer: event.pointerId };
    publish();
  }

  function releaseStick(name: StickName, pointerId: number) {
    if (pointers.current[name].pointer !== pointerId) return;
    pointers.current[name] = { x: 0, y: 0, pointer: null };
    publish();
  }

  function renderStick(name: StickName, label: string, keyLabel: string) {
    const stick = sticks[name];
    return (
      <div className={`rc-stick-group rc-stick-group--${name}`}>
        <span className="rc-stick-axis">{name === "left" ? "ALTITUDE / YAW" : "PITCH / ROLL"}</span>
        <button
          type="button"
          className={`rc-stick ${stick.x || stick.y ? "is-moving" : ""}`}
          aria-label={`${label}. Drag to fly, or use ${keyLabel}.`}
          aria-describedby="remote-instructions"
          disabled={!enabled}
          onPointerDown={(event) => {
            if (!enabled || event.button !== 0 || pointers.current[name].pointer !== null) return;
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            pointers.current[name].pointer = event.pointerId;
            moveStick(name, event);
          }}
          onPointerMove={(event) => moveStick(name, event)}
          onPointerUp={(event) => {
            releaseStick(name, event.pointerId);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={(event) => releaseStick(name, event.pointerId)}
          onLostPointerCapture={(event) => releaseStick(name, event.pointerId)}
        >
          <span className="rc-stick-cross" aria-hidden="true" />
          <span className="rc-stick-knob" style={{ transform: `translate(${stick.x * 65}%, ${stick.y * 65}%)` }} aria-hidden="true"><span /></span>
        </button>
        <span className="rc-stick-keys">{name === "left" ? <><kbd>W</kbd><span><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span></> : <><kbd>↑</kbd><span><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd></span></>}</span>
      </div>
    );
  }

  return (
    <div ref={remote} className={`flight-remote ${paused ? "is-paused" : ""}`}>
      <div className="rc-device">
        <div className="rc-antenna rc-antenna--left" aria-hidden="true" />
        <div className="rc-antenna rc-antenna--right" aria-hidden="true" />
        <div className="rc-topline"><span className="rc-brand">dji<span>RC PRO</span></span><span className="rc-connection"><i />{paused ? "STANDBY" : active ? "CONNECTED" : "READY"}</span></div>
        <div className="rc-stick-row">
          {renderStick("left", "Altitude and yaw joystick", "W, A, S, D")}
          <div className="rc-center-mark" aria-hidden="true"><span /><span /><span /><span /><i /></div>
          {renderStick("right", "Pitch and roll joystick", "the arrow keys")}
        </div>
        <div className="rc-screen">
          <div className="rc-screen-top"><span><Signal size={12} strokeWidth={2.2} /> VIRTUAL FLIGHT</span><span>{paused ? "PAUSED" : telemetry.speed > 0.08 ? "IN MOTION" : "HOVERING"}<i /></span></div>
          <div className="rc-readouts">
            <div><span>ALTITUDE</span><strong>{telemetry.altitude.toFixed(1)}<small>m</small></strong></div>
            <div><span>VELOCITY</span><strong>{telemetry.speed.toFixed(1)}<small>m/s</small></strong></div>
            <div className="rc-bearing"><ArrowUp size={23} strokeWidth={1.5} style={{ transform: `rotate(${telemetry.heading}deg)` }} /><strong>{(Math.round(telemetry.heading) % 360).toString().padStart(3, "0")}<small>°</small></strong></div>
          </div>
          <div className="rc-screen-bottom"><span>HOME {telemetry.distance.toFixed(1)} m</span><span>MODE 2 <b>●</b> SIMULATION</span></div>
        </div>
        <div className="rc-actions">
          <button type="button" onClick={() => { clear(); onTogglePause(); }} aria-label={paused ? "Resume flight" : "Pause flight"} aria-pressed={paused}>
            {paused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}<span>{paused ? "RESUME" : "PAUSE"}</span>
          </button>
          <span className="rc-speaker" aria-hidden="true" />
          <button type="button" onClick={() => { clear(); input.current.gimbal = -12; setGimbal(-12); onReset(); }} aria-label="Reset drone position and controls"><RotateCcw size={14} /><span>RESET</span></button>
        </div>
      </div>
      <div className="rc-gimbal">
        <label htmlFor="gimbal-control"><span>03</span> CAMERA TILT</label>
        <input id="gimbal-control" type="range" min="-90" max="0" step="1" value={gimbal} disabled={!enabled} aria-label="Camera gimbal tilt" aria-valuetext={`${gimbal} degrees`} onChange={(event) => { const value = Number(event.target.value); setGimbal(value); input.current.gimbal = value; }} />
        <output htmlFor="gimbal-control">{gimbal}°</output>
      </div>
      <p className="rc-instructions" id="remote-instructions">Drag both sticks to take control. <span>WASD + arrow keys work too.</span></p>
    </div>
  );
}
