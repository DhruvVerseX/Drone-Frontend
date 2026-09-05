# Mavic 3 Pro — Beyond the Frame

A frontend showcase with a procedural, rigged 3D drone, virtual RC Pro controller, lens explorer, and official DJI specifications. Built with Next.js, React Three Fiber, drei, Framer Motion, GSAP, and Tailwind.

## Run

```sh
bun install
bun dev
```

Open http://localhost:3000. Use **Take control** to enter the flight lab. Drag both sticks (including simultaneous touch), or use **W/S** for altitude, **A/D** for yaw, and **arrow keys** for pitch/roll. The camera tilt slider adjusts the gimbal. Orbit/Follow changes the scene camera; Pause and Reset are on the remote.

## Check and build

```sh
bun test
bun lint
bun run build
bun start
```

The standalone physics check verifies hovering, directional movement, coasting, scene boundaries, finite inputs, and consistent integration across frame rates. Motion uses bounded simulated physics, not real aircraft control. Offscreen scenes stop rendering; fonts and photography are local. Reduced-motion preferences disable decorative motion, and WebGL-unavailable browsers receive a product-photo fallback.

For a lightweight rendering measurement, open `/?profile=1`, start a flight, and inspect `MAVIC_FRAME_PROFILE` in the browser console after 180 active frames. It reports average frame duration and frames exceeding 25 ms. This measures the current browser/device; it is not a substitute for a real mobile-device profile.

Product specs were verified on **2026-09-05** against [DJI specifications](https://www.dji.com/mavic-3-pro/specs) and [DJI's product announcement](https://www.dji.com/newsroom/news/dji-reinvents-aerial-storytelling-with-worlds-first-three-optical-camera-drone). Figures and original photography URLs are recorded in `data/showcase-specs.ts`. Flight time and transmission figures retain their test-condition notes on the page.

Independent design concept. DJI/Hasselblad trademarks and DJI photography belong to their respective owners. The 3D geometry is an original stylized interpretation, not an exact CAD model or a downloaded proprietary asset. Real mobile-device performance and multi-touch should be checked on target devices before public launch.
