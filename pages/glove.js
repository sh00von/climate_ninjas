// pages/glove.js
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Glove from "../components/Glove";
import { OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";

const GlovePage = () => {
  const controlsRef = useRef();

  // Custom loading overlay
  const Loader = () => (
    <Html center>
      <div style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
        Loading...
      </div>
    </Html>
  );

  // Define the image URL (can come from props, API, or CMS)
  const textureUrl = "/textures/sea.webp";

  return (
    <div style={{ height: "100vh", background: "#1e1e1e", position: "relative" }}>
      {/* 3D Scene */}
      <Canvas shadows>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* 3D Glove Component with dynamic texture URL */}
        <React.Suspense fallback={<Loader />}>
          <Glove textureUrl={textureUrl} />
        </React.Suspense>

        {/* Orbit Controls - Allow Zooming */}
        <OrbitControls ref={controlsRef} enableZoom={true} maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={10} />
      </Canvas>
    </div>
  );
};

export default GlovePage;
