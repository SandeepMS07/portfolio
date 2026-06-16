"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMarker } from "@/components/ui/3d-globe";

// Three.js is heavy (~600KB). Keep it out of the initial bundle and only
// load it on the client — never during SSR.
const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((m) => m.Globe3D),
  {
    ssr: false,
    loading: () => <GlobePlaceholder />,
  },
);

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 12.9716,
    lng: 77.5946,
    src: "/profile.jpeg",
    label: "Sandeep · Bengaluru",
  },
];

function GlobePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        aria-hidden
        className="h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,138,69,0.35),rgba(10,11,15,0)_70%)] blur-xl sm:h-64 sm:w-64"
      />
    </div>
  );
}

export default function Globe3DDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {inView ? (
        <Globe3D
          markers={sampleMarkers}
          className="h-full"
          config={{
            cameraDistanceFactor: 3.1,
            textureUrl:
              "https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg",
            emissiveColor: "#ff8a45",
            emissiveIntensity: 2.4,
            bumpScale: 2,
            autoRotateSpeed: 0.3,
            ambientIntensity: 1.4,
            pointLightIntensity: 2.8,
            showAtmosphere: false,
          }}
        />
      ) : (
        <GlobePlaceholder />
      )}
    </div>
  );
}
