"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { ShaderMaterial, DoubleSide, Mesh } from "three";

const vertexShader = /* glsl */ `
  attribute float aDisplace;
  uniform float uTime;
  varying float vStrength;

  void main() {
    vec3 p = position + normal * aDisplace * (0.75 + 0.25 * sin(uTime + aDisplace * 6.2831));
    vStrength = 0.5 + 0.5 * sin(uTime * 0.8 + aDisplace * 8.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vStrength;
  void main() {
    vec3 colorA = vec3(0.93, 0.02, 0.52);
    vec3 colorB = vec3(0.4, 0.07, 0.3);
    vec3 color = mix(colorB, colorA, vStrength);
    gl_FragColor = vec4(color, 0.95);
  }
`;

function DisplacedSphere() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  const { positions, displace } = useMemo(() => {
    // deterministic LCG to avoid impure Math.random in render
    let seed = 2463534242;
    const rng = () => {
      seed ^= seed << 13;
      seed ^= seed >> 17;
      seed ^= seed << 5;
      return (seed >>> 0) / 4294967295;
    };
    const detail = 80;
    const radius = 5;
    const sphere = new Float32Array(detail * detail * 3);
    const disp = new Float32Array(detail * detail);
    let i = 0;
    for (let y = 0; y < detail; y++) {
      const v = y / (detail - 1);
      const phi = v * Math.PI;
      for (let x = 0; x < detail; x++) {
        const u = x / (detail - 1);
        const theta = u * Math.PI * 2;
        const sinPhi = Math.sin(phi);
        const nx = Math.cos(theta) * sinPhi;
        const ny = Math.cos(phi);
        const nz = Math.sin(theta) * sinPhi;
        sphere[i * 3] = nx * radius;
        sphere[i * 3 + 1] = ny * radius;
        sphere[i * 3 + 2] = nz * radius;
        disp[i] = 1.5 + rng() * 1.5;
        i++;
      }
    }
    return { positions: sphere, displace: disp };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aDisplace" args={[displace, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        side={DoubleSide}
        transparent
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function ThreeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 18], fov: 45 }} className="h-full w-full">
        <color attach="background" args={["#030712"]} />
        <Suspense fallback={null}>
          <DisplacedSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
