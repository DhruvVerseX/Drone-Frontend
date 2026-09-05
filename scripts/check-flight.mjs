import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../components/showcase/flight-physics.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } });
const { createFlightState, stepFlight } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const neutral = { throttle: 0, yaw: 0, pitch: 0, roll: 0, gimbal: -12 };
const simulate = (seconds, fps, input, state = createFlightState()) => {
  for (let i = 0; i < seconds * fps; i++) stepFlight(state, input, 1 / fps);
  return state;
};
const hover = simulate(1, 60, neutral);
assert.equal(hover.position.y, 1.6);
const moving = simulate(1, 60, { ...neutral, pitch: 1 });
assert.ok(moving.position.z < -1 && moving.velocity.z < -1, "forward input must accelerate the drone");
const driftStart = moving.position.z;
simulate(1, 60, neutral, moving);
assert.ok(moving.position.z < driftStart && Math.abs(moving.velocity.z) < 0.05, "release must coast, then damp to hover");
for (const direction of [-1, 1]) {
  const bounded = simulate(20, 60, { ...neutral, throttle: direction, pitch: direction, roll: direction });
  assert.ok(Math.abs(bounded.position.x) <= 3 && Math.abs(bounded.position.z) <= 2.5);
  assert.ok(bounded.position.y >= 0.35 && bounded.position.y <= 3.8);
}
const input = { ...neutral, pitch: 0.4, roll: 0.3, throttle: 0.2, yaw: 0.35 };
const at30 = simulate(2, 30, input);
const at144 = simulate(2, 144, input);
for (const key of ["x", "y", "z"]) assert.ok(Math.abs(at30.position[key] - at144.position[key]) < 0.002, "motion must be independent of frame rate");
const invalid = createFlightState();
for (const dt of [NaN, Infinity, -1, 0, 1 / 60]) stepFlight(invalid, { throttle: NaN, yaw: Infinity, pitch: -Infinity, roll: NaN, gimbal: NaN }, dt);
assert.ok(Object.values(invalid.position).every(Number.isFinite));
assert.deepEqual(invalid, createFlightState());
console.log("Flight checks passed: hover, movement, momentum, bounds, finite input, frame-rate independence.");
