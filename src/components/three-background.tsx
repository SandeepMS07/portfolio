'use client';

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";

function BackgroundModel() {
  return (
    <Float speed={0.75} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1.6, 0.3, 180, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.25}
          metalness={0.55}
          roughness={0.18}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.7, -1, 0.6]}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.28}
          metalness={0.35}
          roughness={0.28}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0.9, 0.7, -0.8]}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#06b6d4"
          emissiveIntensity={0.22}
          metalness={0.28}
          roughness={0.24}
        />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-55">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4, 3, 5.5], fov: 45 }}
        className="h-full w-full"
      >
        <color attach="background" args={["#0b1220"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
        <Suspense fallback={null}>
          <PresentationControls
            global
            polar={[-0.35, 0.35]}
            azimuth={[-1, 1]}
            snap
          >
            <BackgroundModel />
          </PresentationControls>
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.22}
            scale={20}
            blur={3.5}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
