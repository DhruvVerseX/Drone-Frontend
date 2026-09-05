"use client";

import { useEffect, useMemo, type RefObject } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type ModelProps = {
  rotors: RefObject<(THREE.Group | null)[]>;
  arms: RefObject<(THREE.Group | null)[]>;
  gimbal: RefObject<THREE.Group | null>;
  cameraIndex: number;
};

function labelTexture(text: string, color = "#dfdfdb", fontSize = 52) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d")!;
  context.fillStyle = color;
  context.font = `600 ${fontSize}px Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, 256, 66);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function shellGeometry() {
  const outline = new THREE.Shape();
  outline.moveTo(-0.38, -1.02);
  outline.bezierCurveTo(-0.57, -0.95, -0.61, -0.48, -0.64, 0.24);
  outline.bezierCurveTo(-0.69, 0.61, -0.61, 0.82, -0.36, 0.89);
  outline.quadraticCurveTo(0, 0.99, 0.36, 0.89);
  outline.bezierCurveTo(0.61, 0.82, 0.69, 0.61, 0.64, 0.24);
  outline.bezierCurveTo(0.61, -0.48, 0.57, -0.95, 0.38, -1.02);
  outline.quadraticCurveTo(0, -1.1, -0.38, -1.02);
  const geometry = new THREE.ExtrudeGeometry(outline, {
    depth: 0.28, bevelEnabled: true, bevelSegments: 5, steps: 1,
    bevelSize: 0.09, bevelThickness: 0.085, curveSegments: 16,
  });
  geometry.rotateX(Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function bladeGeometry() {
  const blade = new THREE.Shape();
  blade.moveTo(0.07, -0.055);
  blade.bezierCurveTo(0.29, -0.11, 0.67, -0.19, 1.05, -0.115);
  blade.quadraticCurveTo(1.17, -0.087, 1.16, -0.052);
  blade.bezierCurveTo(1.02, 0.048, 0.46, 0.073, 0.07, 0.055);
  blade.closePath();
  const geometry = new THREE.ExtrudeGeometry(blade, {
    depth: 0.016, bevelEnabled: true, bevelSegments: 1,
    bevelSize: 0.008, bevelThickness: 0.004, curveSegments: 12,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

/** An authored, lightweight interpretation with individually rigged arms, rotors and gimbal. */
export default function DroneModel({ rotors, arms, gimbal, cameraIndex }: ModelProps) {
  const assets = useMemo(() => ({
    hull: shellGeometry(),
    blade: bladeGeometry(),
    logo: labelTexture("dji", "#d9dcd8", 106),
    name: labelTexture("MAVIC 3 PRO", "#d9dcd8", 44),
    hasselblad: labelTexture("HASSELBLAD", "#d9dcd8", 39),
    shell: new THREE.MeshPhysicalMaterial({ color: "#818782", roughness: 0.48, metalness: 0.38, clearcoat: 0.22 }),
    top: new THREE.MeshPhysicalMaterial({ color: "#989e98", roughness: 0.46, metalness: 0.28, clearcoat: 0.18 }),
    graphite: new THREE.MeshStandardMaterial({ color: "#323833", roughness: 0.56, metalness: 0.35 }),
    rubber: new THREE.MeshStandardMaterial({ color: "#181c19", roughness: 0.75 }),
    metal: new THREE.MeshStandardMaterial({ color: "#818983", roughness: 0.3, metalness: 0.86 }),
    bladeMaterial: new THREE.MeshPhysicalMaterial({ color: "#292d28", roughness: 0.34, metalness: 0.28, clearcoat: 0.2 }),
    glass: new THREE.MeshPhysicalMaterial({ color: "#0b171c", roughness: 0.08, metalness: 0.48, clearcoat: 1, clearcoatRoughness: 0.04 }),
  }), []);

  useEffect(() => () => Object.values(assets).forEach((asset) => asset.dispose()), [assets]);

  const lens = (x: number, y: number, radius: number, index: number) => (
    <group position={[x, y, 0.198]} key={index}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={assets.graphite}>
        <cylinderGeometry args={[radius + 0.023, radius + 0.033, 0.078, 40]} />
      </mesh>
      <mesh position={[0, 0, 0.045]} material={assets.metal}>
        <torusGeometry args={[radius, 0.009, 8, 48]} />
      </mesh>
      <mesh position={[0, 0, 0.052]} material={assets.rubber}>
        <circleGeometry args={[radius - 0.01, 40]} />
      </mesh>
      <mesh position={[0, 0, 0.055]} material={assets.glass}>
        <circleGeometry args={[radius * 0.76, 40]} />
      </mesh>
      <mesh position={[0, 0, 0.057]}>
        <ringGeometry args={[radius * 0.46, radius * 0.49, 40]} />
        <meshBasicMaterial color="#568a89" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-radius * 0.2, radius * 0.25, 0.06]} scale={[1, 0.45, 1]}>
        <circleGeometry args={[radius * 0.31, 24]} />
        <meshBasicMaterial color="#bbd0d2" transparent opacity={0.2} />
      </mesh>
      {cameraIndex === index && <mesh position={[0, 0, 0.061]}>
        <ringGeometry args={[radius + 0.025, radius + 0.032, 48]} />
        <meshBasicMaterial color="#df652f" transparent opacity={0.8} />
      </mesh>}
    </group>
  );

  return <group>
    <mesh geometry={assets.hull} material={assets.shell} position={[0, 0.26, 0]} castShadow />
    <mesh geometry={assets.hull} material={assets.graphite} position={[0, -0.012, -0.02]} scale={[0.91, 0.43, 0.96]} />
    <mesh geometry={assets.hull} material={assets.top} position={[0, 0.284, -0.05]} scale={[0.86, 0.27, 0.89]} />
    <RoundedBox args={[0.83, 0.19, 1.22]} radius={0.1} smoothness={4} position={[0, 0.31, -0.21]} material={assets.top} castShadow />
    <RoundedBox args={[0.68, 0.018, 0.99]} radius={0.006} position={[0, 0.411, -0.23]} material={assets.shell} />
    <mesh position={[0, 0.425, 0.044]} rotation={[-Math.PI / 2, 0, Math.PI]}>
      <planeGeometry args={[0.34, 0.085]} />
      <meshBasicMaterial map={assets.logo} transparent depthWrite={false} />
    </mesh>
    <mesh position={[0, 0.43, -0.67]}>
      <cylinderGeometry args={[0.059, 0.059, 0.01, 24]} />
      <meshStandardMaterial color="#5b645d" roughness={0.45} metalness={0.3} />
    </mesh>
    {[-0.066, -0.022, 0.022, 0.066].map((x) => <mesh key={x} position={[x, 0.426, -0.5]}>
      <boxGeometry args={[0.024, 0.006, 0.009]} />
      <meshBasicMaterial color="#adca9f" />
    </mesh>)}

    {/* Recessed front vision sensors, cheek panels and radiator vents. */}
    {[-1, 1].map((side) => <group key={side}>
      <RoundedBox args={[0.23, 0.15, 0.085]} radius={0.06} smoothness={4} position={[side * 0.46, 0.16, 0.837]} rotation={[0, side * 0.22, side * 0.15]} material={assets.graphite} />
      <mesh position={[side * 0.46, 0.163, 0.885]} rotation={[0, side * 0.22, 0]} material={assets.glass}>
        <circleGeometry args={[0.054, 28]} />
      </mesh>
      <mesh position={[side * 0.59, 0.02, -0.57]} rotation={[0, side * Math.PI / 2, 0]} material={assets.glass}>
        <circleGeometry args={[0.072, 28]} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => <mesh key={i} position={[side * (0.617 - i * 0.005), 0.11, 0.24 - i * 0.069]} rotation={[0, 0, side * -0.17]} material={assets.graphite}>
        <boxGeometry args={[0.017, 0.097, 0.016]} />
      </mesh>)}
      <RoundedBox args={[0.092, 0.08, 0.27]} radius={0.029} position={[side * 0.54, -0.24, -0.76]} material={assets.rubber} />
    </group>)}

    {[-1, 1].flatMap((side) => [true, false].map((front) => {
      const index = (side === -1 ? 0 : 2) + (front ? 0 : 1);
      const start = new THREE.Vector3(side * 0.53, front ? 0.02 : -0.12, front ? 0.56 : -0.64);
      const end = new THREE.Vector3(side * (front ? 1.69 : 1.59), front ? 0.07 : -0.015, front ? 1.18 : -1.29);
      const delta = end.clone().sub(start);
      const midpoint = delta.clone().multiplyScalar(0.5);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.clone().normalize());
      return <group key={index} position={start} ref={(node) => { arms.current[index] = node; }}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={assets.graphite}>
          <cylinderGeometry args={[0.14, 0.14, 0.19, 24]} />
        </mesh>
        <group position={midpoint} quaternion={quaternion}>
          <RoundedBox args={[front ? 0.22 : 0.175, delta.length(), 0.155]} radius={0.045} smoothness={3} material={assets.shell} castShadow />
          <RoundedBox args={[front ? 0.16 : 0.11, delta.length() * 0.79, 0.016]} radius={0.007} position={[0, 0, 0.079]} material={assets.top} />
        </group>
        {front && <mesh position={midpoint.clone().add(new THREE.Vector3(0, 0.098, 0))} rotation={[-Math.PI / 2, 0, side * -0.49]}>
          <planeGeometry args={[0.51, 0.11]} />
          <meshBasicMaterial map={assets.name} transparent depthWrite={false} />
        </mesh>}
        <group position={delta}>
          <mesh material={assets.shell} castShadow><cylinderGeometry args={[0.19, 0.16, 0.24, 40]} /></mesh>
          <mesh position={[0, 0.108, 0]} material={assets.graphite}><cylinderGeometry args={[0.162, 0.162, 0.049, 40]} /></mesh>
          <mesh position={[0, 0.139, 0]} material={assets.metal}><cylinderGeometry args={[0.115, 0.115, 0.025, 32]} /></mesh>
          {Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 0.168, 0.015, Math.sin(i * Math.PI / 4) * 0.168]} rotation={[0, -i * Math.PI / 4, 0]} material={assets.graphite}>
            <boxGeometry args={[0.008, 0.065, 0.045]} />
          </mesh>)}
          <group position={[0, 0.162, 0]} rotation={[0, index * 1.3 + 0.35, 0]} ref={(node) => { rotors.current[index] = node; }}>
            <mesh geometry={assets.blade} material={assets.bladeMaterial} castShadow />
            <mesh geometry={assets.blade} material={assets.bladeMaterial} rotation={[0, Math.PI, 0]} castShadow />
            <mesh material={assets.graphite}><cylinderGeometry args={[0.088, 0.1, 0.041, 24]} /></mesh>
            <mesh position={[0, 0.025, 0]} material={assets.metal}><cylinderGeometry args={[0.019, 0.019, 0.005, 12]} /></mesh>
            {[-1, 1].map((tip) => <mesh key={tip} position={[tip * 1.077, 0.022, tip * 0.043]} rotation={[0, 0.21, 0]}>
              <boxGeometry args={[0.032, 0.007, 0.096]} />
              <meshStandardMaterial color="#d46b36" roughness={0.65} />
            </mesh>)}
          </group>
          {front && <group position={[0, -0.28, 0.033]} rotation={[-0.2, 0, side * 0.14]}>
            <RoundedBox args={[0.116, 0.44, 0.13]} radius={0.035} material={assets.shell} castShadow />
            <RoundedBox args={[0.128, 0.055, 0.164]} radius={0.018} position={[0, -0.213, 0]} material={assets.rubber} />
            <mesh position={[0, -0.048, 0.069]}>
              <boxGeometry args={[0.056, 0.069, 0.007]} />
              <meshStandardMaterial color="#bd5b3e" emissive="#bc3c22" emissiveIntensity={1.5} />
            </mesh>
          </group>}
        </group>
      </group>;
    }))}

    {/* Three-axis gimbal: the module hangs below the nose, independent of the airframe. */}
    <group position={[0, -0.245, 0.83]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={assets.graphite}><cylinderGeometry args={[0.18, 0.18, 0.24, 32]} /></mesh>
      {[-1, 1].map((side) => <RoundedBox key={side} args={[0.09, 0.38, 0.16]} radius={0.04} position={[side * 0.37, -0.19, 0]} material={assets.metal} />)}
      <group position={[0, -0.265, 0.106]} ref={gimbal}>
        <RoundedBox args={[0.69, 0.61, 0.35]} radius={0.135} smoothness={5} material={assets.graphite} castShadow />
        <RoundedBox args={[0.645, 0.57, 0.028]} radius={0.11} smoothness={5} position={[0, 0, 0.184]} material={assets.rubber} />
        {lens(-0.166, 0.139, 0.105, 2)}
        {lens(0.155, 0.132, 0.118, 1)}
        {lens(-0.015, -0.108, 0.139, 0)}
        <mesh position={[0.004, -0.257, 0.205]}>
          <planeGeometry args={[0.29, 0.051]} />
          <meshBasicMaterial map={assets.hasselblad} transparent depthWrite={false} />
        </mesh>
        {[-1, 1].map((side) => <mesh key={side} position={[side * 0.369, 0, -0.005]} rotation={[0, 0, Math.PI / 2]} material={assets.graphite}><cylinderGeometry args={[0.115, 0.115, 0.082, 24]} /></mesh>)}
      </group>
    </group>
  </group>;
}
