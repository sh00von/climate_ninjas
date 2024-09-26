import { Info, ExternalLink } from 'lucide-react';
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Glove from "../../components/Glove";
import { OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";


  // Define the image URL (can come from props, API, or CMS)
  const textureUrl = "/sea.webp";
const StarryBackground = () => (
  <div className="fixed inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-indigo-900">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

export default function NASASeaLevelPage() {
  const controlsRef = useRef();

// Custom loading overlay
const Loader = () => (
  <Html center>
    <div style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
      Loading...
    </div>
  </Html>
);
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-4 md:p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            NASA Sea Level Data
          </h1>
          <div className="relative group">
            <button className="bg-white/10 border border-white/20 hover:bg-white/20 p-2 rounded-full">
              <Info className="h-4 w-4 text-white" />
            </button>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white text-gray-700 text-xs rounded-lg py-1 px-2 shadow-lg">
              Explore real-time sea level data from NASA
            </div>
          </div>
        </header>

        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-indigo-800">Global Sea Level Rise</h2>
            <p className="text-gray-500">
              Interactive visualization by NASA's Global Climate Change: Vital Signs of the Planet
            </p>
          </div>
          <div className="p-4 " >
            <div className="aspect-video rounded-lg overflow-hidden shadow-inner" style={{  background: "#1e1e1e" }}>
               {/* 3D Scene */}
               <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>  {/* Camera closer to the globe */}
               <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* 3D Glove Component with dynamic texture URL */}
        <React.Suspense fallback={<Loader />}>
          <Glove textureUrl={textureUrl} />
        </React.Suspense>

        {/* Orbit Controls - Allow Zooming */}<OrbitControls
  ref={controlsRef}
  enableZoom={true}
  maxPolarAngle={Math.PI / 2}  // Restrict vertical rotation to avoid flipping
  minDistance={0.5}            // Minimum distance to bring the camera closer
  maxDistance={5}              // Adjust max distance as needed
/>

      </Canvas>
            </div>
            <div className="mt-4 text-sm text-indigo-700">
              <p>
                This interactive tool shows how sea levels are changing over time. You can explore
                different time periods and see how sea levels have risen globally.
              </p>
              <p className="mt-2 font-semibold">Key points:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Sea levels are rising due to global warming</li>
                <li>Melting ice sheets and glaciers contribute to sea level rise</li>
                <li>Coastal areas are at risk from rising seas</li>
              </ul>
              <div className="mt-4 flex justify-end">
                <a
                  href="https://climate.nasa.gov/vital-signs/sea-level/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Learn more on NASA's website
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
