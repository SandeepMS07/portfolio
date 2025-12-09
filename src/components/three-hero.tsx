'use client';

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  PresentationControls,
  Environment,
  AsciiRenderer,
} from "@react-three/drei";
import { Suspense } from "react";

/**
 * Simple procedural 3D scene using drei/fiber.
 * Replace `CustomModel` with a GLTF loader to use your own uploaded asset.
 */
function CustomModel() {
  return (
    <Float speed={1.1} rotationIntensity={0.9} floatIntensity={1.2}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.22, 220, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          metalness={0.55}
          roughness={0.18}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.4, -0.7, 0.5]}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.35}
          metalness={0.3}
          roughness={0.3}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0.6, 0.5, -0.6]}>
        <sphereGeometry args={[0.4, 64, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#06b6d4"
          emissiveIntensity={0.25}
          metalness={0.25}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

export function ThreeHero() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-slate-900/80">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [3, 2, 4.5], fov: 45 }}
        className="absolute inset-0"
      >
        <color attach="background" args={["#0b1220"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.3} castShadow />
        <Suspense fallback={null}>
          <PresentationControls
            global
            polar={[-0.45, 0.45]}
            azimuth={[-1, 1]}
            snap
          >
            <CustomModel />
          </PresentationControls>
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.35}
            scale={10}
            blur={2.6}
            far={4}
          />
          <Environment preset="city" />
          <AsciiRenderer invert />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-cyan-500/10" />
    </div>
  );
}
