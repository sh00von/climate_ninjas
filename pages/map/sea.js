import { Info, ExternalLink, X } from 'lucide-react';
import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Glove from "../../components/Glove";
import { OrbitControls, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming Button component from your UI library
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming Card components from your UI library

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

const Loader = () => (
  <Html center>
    <div style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
      Loading...
    </div>
  </Html>
);

// InfoCard component
const InfoCard = ({ position, onDismiss }) => (
  <Card className={`overflow-hidden transition-shadow duration-300 bg-white shadow-xl max-w-sm w-full`}>
    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 relative">
      <CardTitle className="flex items-center text-lg font-bold">
        Sea Level Insights
      </CardTitle>
      {position === 'center' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:bg-white/20"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </CardHeader>
    <CardContent className="p-4">
      <p className="text-gray-700 mb-3">
        Want to learn more about how sea level rise impacts our planet? Dive into NASA's resources!
      </p>
      <Button asChild variant="default" className="w-full">
        <a
          href="https://climate.nasa.gov/vital-signs/sea-level/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center"
        >
          Learn More
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </CardContent>
  </Card>
);

export default function NASASeaLevelPage() {
  const controlsRef = useRef();
  const [showInfo, setShowInfo] = useState(false);
  const [infoDismissed, setInfoDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 5000); // Show InfoCard after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setInfoDismissed(true);
  };

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
          <div className="p-4 ">
            <div className="aspect-video rounded-lg overflow-hidden shadow-inner" style={{ background: "#1e1e1e" }}>
              {/* 3D Scene */}
              <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>  {/* Camera closer to the globe */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* 3D Glove Component with dynamic texture URL */}
                <React.Suspense fallback={<Loader />}>
                  <Glove textureUrl={textureUrl} />
                </React.Suspense>

                {/* Orbit Controls - Allow Zooming */}
                <OrbitControls
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

      {/* Info Card Pop-Up */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={infoDismissed ? { opacity: 0, y: 50, scale: 0.3 } : { opacity: 0, scale: 0.3 }}
            animate={infoDismissed ? { opacity: 1, y: 0, scale: 1, x: '0%' } : { opacity: 1, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`fixed z-50 ${infoDismissed ? 'bottom-4 right-4' : 'top-1/2 left-1/2 -translate-y-1/2'}`}
          >
            <InfoCard position={infoDismissed ? 'bottom-right' : 'center'} onDismiss={handleDismiss} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
