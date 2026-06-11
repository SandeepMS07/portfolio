"use client";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 12.9716,
    lng: 77.5946,
    src: "/profile.jpeg",
    label: "Sandeep · Bengaluru",
  },
];

export default function Globe3DDemo() {
  return (
    <Globe3D
      markers={sampleMarkers}
      className="h-full"
      config={{
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
      onMarkerClick={(marker) => {
        console.log("Clicked marker:", marker.label);
      }}
      onMarkerHover={(marker) => {
        if (marker) {
          console.log("Hovering:", marker.label);
        }
      }}
    />
  );
}
