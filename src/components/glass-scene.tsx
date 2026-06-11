"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { SphereGeometry, Vector3, type Group, type Mesh } from "three";

export type GlassShape = "capsule" | "gem" | "knot" | "blob";

/* organic crystal — smooth (indexed) sphere displaced by low-frequency noise */
function BlobGeometry() {
  const geo = useMemo(() => {
    const g = new SphereGeometry(1.35, 160, 160);
    const pos = g.attributes.position;
    const v = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = v.clone().normalize();
      const d =
        0.3 * Math.sin(n.x * 1.7 + n.y * 2.0) +
        0.2 * Math.sin(n.y * 2.6 + n.z * 1.5) +
        0.13 * Math.sin(n.z * 3.1 + n.x * 2.2) +
        0.08 * Math.cos(n.x * 4.3 + n.z * 3.6);
      v.addScaledVector(n, d);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return <primitive object={geo} attach="geometry" />;
}

function Geometry({ shape }: { shape: GlassShape }) {
  switch (shape) {
    case "gem":
      return <icosahedronGeometry args={[1.45, 0]} />;
    case "knot":
      return <torusKnotGeometry args={[0.78, 0.3, 220, 36]} />;
    case "blob":
      return <BlobGeometry />;
    case "capsule":
    default:
      return <capsuleGeometry args={[0.78, 1.35, 32, 64]} />;
  }
}

function GlassMesh({ shape, spin }: { shape: GlassShape; spin: number }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const inner = useRef<Group>(null);
  const isCapsule = shape === "capsule";

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * spin;
      if (!isCapsule) mesh.current.rotation.x += delta * spin * 0.35;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.4;
    }
    if (group.current) {
      // subtle mouse parallax
      const tx = state.pointer.y * 0.2;
      const ty = state.pointer.x * 0.3;
      group.current.rotation.x += (tx - group.current.rotation.x) * Math.min(1, delta * 2.5);
      group.current.rotation.y += (ty - group.current.rotation.y) * Math.min(1, delta * 2.5);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={1.2}>
        {/* specimen suspended inside the capsule (refracted through the glass) */}
        {isCapsule && (
          <group ref={inner} scale={0.5}>
            <mesh>
              <torusKnotGeometry args={[0.62, 0.2, 180, 28]} />
              <meshStandardMaterial
                color="#1d4ed8"
                emissive="#3b82f6"
                emissiveIntensity={1.2}
                roughness={0.25}
                metalness={0.5}
              />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[1.05, 1]} />
              <meshBasicMaterial
                color="#7dd3fc"
                wireframe
                transparent
                opacity={0.3}
              />
            </mesh>
          </group>
        )}

        <mesh ref={mesh}>
          <Geometry shape={shape} />
          <MeshTransmissionMaterial
            samples={10}
            resolution={1024}
            thickness={0.9}
            ior={1.45}
            chromaticAberration={0.5}
            anisotropicBlur={0.12}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            roughness={0}
            transmission={1}
            attenuationDistance={2.5}
            attenuationColor="#ffffff"
            color="#ffffff"
          />
        </mesh>
      </Float>
    </group>
  );
}

type GlassSceneProps = {
  shape?: GlassShape;
  spin?: number;
  className?: string;
};

export function GlassScene({
  shape = "capsule",
  spin = 0.25,
  className,
}: GlassSceneProps) {
  return (
    <div className={className ?? "h-full w-full"}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <GlassMesh shape={shape} spin={spin} />
          {/* bright spectral studio — drives iridescent dispersion (no external HDR) */}
          <Environment resolution={320}>
            {/* bright key + fill so the glass reads luminous on black */}
            <Lightformer
              form="rect"
              intensity={9}
              position={[0, 5, 4]}
              scale={[12, 8, 1]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={5}
              position={[0, 0, 6]}
              scale={[10, 10, 1]}
              color="#ffffff"
            />
            {/* spectral rim lights — refracted into rainbow edges */}
            <Lightformer
              form="circle"
              intensity={7}
              position={[-5, 2, 3]}
              scale={3.5}
              color="#ff5e2c"
            />
            <Lightformer
              form="circle"
              intensity={7}
              position={[5, -1, 3]}
              scale={3.5}
              color="#2563eb"
            />
            <Lightformer
              form="circle"
              intensity={6}
              position={[3, 3, -2]}
              scale={3}
              color="#a855f7"
            />
            <Lightformer
              form="circle"
              intensity={6}
              position={[-3, -3, 2]}
              scale={3}
              color="#22d3ee"
            />
            <Lightformer
              form="circle"
              intensity={5}
              position={[0, -4, 2]}
              scale={3}
              color="#ec4899"
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
