export type FlightInput = {
  throttle: number;
  yaw: number;
  pitch: number;
  roll: number;
  gimbal: number;
};

export type FlightTelemetry = {
  altitude: number;
  speed: number;
  heading: number;
  distance: number;
};

type Vector = { x: number; y: number; z: number };

export type FlightState = {
  position: Vector;
  velocity: Vector;
  heading: number;
  pitch: number;
  roll: number;
};

export const createFlightState = (): FlightState => ({
  position: { x: 0, y: 1.6, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  heading: 0,
  pitch: 0,
  roll: 0,
});

const axis = (value: number) => Number.isFinite(value) ? Math.max(-1, Math.min(1, value)) : 0;

export function stepFlight(state: FlightState, input: FlightInput, dt: number): FlightState {
  if (!Number.isFinite(dt) || dt <= 0) return state;

  // ponytail: a bounded studio flight model; real aerodynamics belong in a flight simulator.
  const steps = Math.ceil(Math.min(dt, 0.1) * 120);
  const delta = Math.min(dt, 0.1) / steps;
  const throttle = axis(input.throttle);
  const yaw = axis(input.yaw);
  const pitch = axis(input.pitch);
  const roll = axis(input.roll);
  const diagonal = Math.max(1, Math.hypot(pitch, roll));
  const decay = Math.exp(-4 * delta);
  const bounds = { x: [-3, 3], y: [0.35, 3.8], z: [-2.5, 2.5] };

  for (let step = 0; step < steps; step++) {
    const midHeading = state.heading - yaw * 0.65 * delta;
    state.heading = ((state.heading - yaw * 1.3 * delta) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const target = {
      x: (roll * Math.cos(midHeading) - pitch * Math.sin(midHeading)) * 1.8 / diagonal,
      y: throttle * 1.4,
      z: (-pitch * Math.cos(midHeading) - roll * Math.sin(midHeading)) * 1.8 / diagonal,
    };

    for (const key of ["x", "y", "z"] as const) {
      const velocity = state.velocity[key];
      state.position[key] += target[key] * delta + (velocity - target[key]) * (1 - decay) / 4;
      state.velocity[key] = target[key] + (velocity - target[key]) * decay;
      const [min, max] = bounds[key];
      if (state.position[key] < min || state.position[key] > max) {
        state.position[key] = Math.max(min, Math.min(max, state.position[key]));
        state.velocity[key] = 0;
      }
    }

    state.pitch += (-pitch * 0.16 - state.pitch) * (1 - decay);
    state.roll += (-roll * 0.19 - state.roll) * (1 - decay);
  }
  return state;
}
