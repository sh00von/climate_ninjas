"use client"

import React, { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Info, ExternalLink, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Glove from "../../components/Glove"

const textureUrl = "/ozone.webp"

const StarryBackground = () => (
  <div className="fixed inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          initial={{ opacity: Math.random() }}
          animate={{
            opacity: [Math.random(), Math.random()],
            scale: [1, Math.random() * 1.5 + 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }}
        />
      ))}
    </div>
  </div>
)

const Loader = () => (
  <Html center>
    <div className="text-white text-2xl font-bold">Loading Earth Data...</div>
  </Html>
)

const InfoCard = ({ position, onDismiss }) => (
  <Card className={`overflow-hidden transition-shadow duration-300 shadow-xl max-w-sm w-full`}>
  
    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 relative">
      <CardTitle className="flex items-center text-lg font-bold">
        <AlertCircle className="mr-2 h-5 w-5" />
        Ozone Layer Insights
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
    <CardContent className="p-4 bg-white">
      <p className="text-gray-700 mb-3">
        Ready to become an ozone layer expert? Dive into our interactive lesson!
      </p>
      <Button asChild variant="default" className="w-full">
        <a
          href="/lesson/1"
          className="inline-flex items-center justify-center"
        >
          Start Your Journey
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </CardContent>
  </Card>
)

export default function OzoneLayerPage() {
  const controlsRef = useRef()
  const [showInfo, setShowInfo] = useState(false)
  const [infoDismissed, setInfoDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setInfoDismissed(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-4 md:p-8 relative overflow-hidden">
      <StarryBackground />
      <div style={{ zIndex: 1000 }} className="fixed bottom-8 left-0 w-full">
    <div className="w-full max-w-2xl mx-auto px-4 py-2">
        <div className="relative w-full h-10 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-md shadow-md">
            {/* Intensity Labels */}
            <div className="absolute top-full left-0 transform translate-y-1 text-xs font-medium text-gray-700">Low</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-1 text-xs font-medium text-gray-700">Medium</div>
            <div className="absolute top-full right-0 transform translate-y-1 text-xs font-medium text-gray-700">High</div>
        </div>
    </div>
</div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            NASA Ozone Layer Explorer
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white/10 border border-white/20 hover:bg-white/20">
                  <Info className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore real-time ozone layer data from NASA</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-indigo-800">Global Ozone Layer Monitoring</CardTitle>
            <p className="text-gray-500">
              Interactive visualization by NASA's Global Climate Change: Vital Signs of the Planet
            </p>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg overflow-hidden shadow-inner bg-gray-900">
              <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <React.Suspense fallback={<Loader />}>
                  <Glove textureUrl={textureUrl}  rotationSpeed={0.005}/>
                </React.Suspense>
                <OrbitControls
                  ref={controlsRef}
                  enableZoom={true}
                  maxPolarAngle={Math.PI / 2}
                  minDistance={0.5}
                  maxDistance={5}
                />
              </Canvas>
            </div>
            <div className="mt-6 text-sm text-indigo-700">
              <p className="mb-2">
                This interactive tool visualizes changes in the ozone layer over time. Explore global ozone level fluctuations and their impact on our planet.
              </p>
              <h3 className="font-bold text-lg mb-2">Key Insights:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>The ozone layer is Earth's shield against harmful ultraviolet (UV) radiation</li>
                <li>Human activities and natural processes influence ozone levels</li>
                <li>Monitoring ozone helps us understand climate change impacts</li>
              </ul>
              <div className="mt-4 flex justify-end">
                <Button variant="link" asChild>
                  <a
                    href="/lesson/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Dive deeper on NASA's website
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
  )
}