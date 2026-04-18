"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";

export function DroneCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    ensureGsapPlugins();

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x05080d, 7, 18);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 1.4, 8.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xd7efff, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x8ce8ff, 2.2);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x80ffb4, 20, 14, 2);
    rimLight.position.set(-4, 1.5, -2);
    scene.add(rimLight);

    const drone = new THREE.Group();
    scene.add(drone);

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a212b,
      metalness: 0.95,
      roughness: 0.34,
      clearcoat: 0.6,
      emissive: 0x050b12
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x90ecff,
      emissive: 0x4ad8ff,
      emissiveIntensity: 0.55,
      metalness: 0.72,
      roughness: 0.26
    });

    const body = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.65, 1.3), bodyMaterial);
    body.castShadow = true;
    drone.add(body);

    const topShell = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.32, 0.8), bodyMaterial);
    topShell.position.set(0, 0.38, 0);
    drone.add(topShell);

    const cameraPod = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), accentMaterial);
    cameraPod.position.set(0, -0.3, 0.82);
    drone.add(cameraPod);

    const armGeometry = new THREE.CapsuleGeometry(0.08, 1.45, 6, 12);
    const motorGeometry = new THREE.CylinderGeometry(0.22, 0.26, 0.22, 24);
    const propGeometry = new THREE.BoxGeometry(1.05, 0.03, 0.14);

    const propellers: THREE.Mesh[] = [];
    const motorPositions = [
      [-1.8, 0.08, -1.05],
      [1.8, 0.08, -1.05],
      [-1.8, 0.08, 1.05],
      [1.8, 0.08, 1.05]
    ] as const;

    motorPositions.forEach(([x, y, z], index) => {
      const arm = new THREE.Mesh(armGeometry, bodyMaterial);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = index < 2 ? 0.34 : -0.34;
      arm.position.set(x * 0.42, 0.05, z * 0.42);
      drone.add(arm);

      const motor = new THREE.Mesh(motorGeometry, bodyMaterial);
      motor.position.set(x, y, z);
      drone.add(motor);

      const propeller = new THREE.Mesh(propGeometry, accentMaterial);
      propeller.position.set(x, y + 0.14, z);
      propellers.push(propeller);
      drone.add(propeller);
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6fe6ff,
      transparent: true,
      opacity: 0.26
    });

    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    [2.5, 3.35, 4.3].forEach((radius, index) => {
      const points = new THREE.EllipseCurve(0, 0, radius, radius * 0.6, 0, Math.PI * 2, false, 0)
        .getPoints(120)
        .map((point) => new THREE.Vector3(point.x, -1.65 + index * 0.22, point.y));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const ring = new THREE.LineLoop(geometry, lineMaterial);
      ring.rotation.x = Math.PI / 2.6;
      ringGroup.add(ring);
    });

    const pulse = new THREE.Mesh(
      new THREE.RingGeometry(0.78, 0.84, 64),
      new THREE.MeshBasicMaterial({
        color: 0x80ffb4,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      })
    );
    pulse.rotation.x = -Math.PI / 2;
    pulse.position.y = -1.35;
    scene.add(pulse);

    drone.rotation.set(-0.22, 0.82, 0.12);
    drone.position.set(0, 0.35, 0);

    const resize = () => {
      if (!mount) {
        return;
      }

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    gsap.fromTo(
      drone.scale,
      { x: 0.82, y: 0.82, z: 0.82 },
      { x: 1, y: 1, z: 1, duration: 1.25, ease: "power3.out" }
    );
    gsap.fromTo(drone.rotation, { y: 1.55, x: -0.36 }, { y: 0.82, x: -0.22, duration: 1.4, ease: "power3.out" });

    if (!reduced) {
      gsap.to(drone.position, {
        y: 0.56,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(pulse.scale, {
        x: 2.8,
        y: 2.8,
        z: 1,
        duration: 2.4,
        repeat: -1,
        ease: "power2.out"
      });

      gsap.to(pulse.material, {
        opacity: 0,
        duration: 2.4,
        repeat: -1,
        ease: "power2.out"
      });

      gsap.to(drone.rotation, {
        y: 1.18,
        scrollTrigger: {
          trigger: mount,
          start: "top 80%",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    let raf = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      propellers.forEach((propeller) => {
        propeller.rotation.y = elapsed * 18;
      });
      ringGroup.rotation.z = elapsed * 0.12;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
        if (object instanceof THREE.LineLoop) {
          object.geometry.dispose();
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={mountRef} className="h-full w-full" data-cursor="active" />;
}
