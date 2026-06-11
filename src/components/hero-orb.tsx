"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Orb() {
  const group = useRef<Group>(null);
  const wire = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      // gentle constant spin + mouse parallax
      const targetX = state.pointer.y * 0.25;
      const targetY = state.pointer.x * 0.4 + state.clock.elapsedTime * 0.12;
      group.current.rotation.x +=
        (targetX - group.current.rotation.x) * Math.min(1, delta * 2);
      group.current.rotation.y +=
        (targetY - group.current.rotation.y) * Math.min(1, delta * 2);
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.25;
      wire.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
      <group ref={group}>
        {/* core liquid orb */}
        <Icosahedron args={[1.35, 24]}>
          <MeshDistortMaterial
            color="#2b1d5e"
            emissive="#5b2ea6"
            emissiveIntensity={0.35}
            roughness={0.12}
            metalness={0.85}
            distort={0.42}
            speed={1.8}
          />
        </Icosahedron>

        {/* glowing wireframe shell */}
        <Icosahedron ref={wire} args={[1.7, 3]}>
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.12}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

export function HeroOrb() {
  return (
    <div className="relative h-full w-full">
      {/* CSS glow halo behind the canvas */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,44,0.45),rgba(255,209,102,0.18)_45%,transparent_70%)] blur-2xl" />
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 3]} intensity={40} color="#8b5cf6" />
        <pointLight position={[-4, -2, 2]} intensity={35} color="#22d3ee" />
        <pointLight position={[0, -4, -2]} intensity={28} color="#e879f9" />
        <Suspense fallback={null}>
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  );
}
