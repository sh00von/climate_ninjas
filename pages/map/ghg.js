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
import Head from "next/head";
import dynamic from "next/dynamic";
// Dynamically import the WorldMap component to avoid SSR issues with D3
const WorldMap = dynamic(() => import("../../components/WorldMap"), {
  ssr: false,
});
const textureUrl = "/greenhouse.webp"

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
    <div className="text-white text-2xl font-bold">Loading Greenhouse Gas Data...</div>
  </Html>
)

const InfoCard = ({ position, onDismiss }) => (
  <Card className={`overflow-hidden transition-shadow duration-300 bg-white shadow-xl max-w-sm w-full`}>
    <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 relative">
      <CardTitle className="flex items-center text-lg font-bold">
        <AlertCircle className="mr-2 h-5 w-5" />
        Greenhouse Gas Emissions Insights
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
        Ready to become a greenhouse gas expert? Dive into our interactive data visualizations from 1971 to 2022!
      </p>
      <Button asChild variant="default" className="w-full">
        <a
          href="/lesson/2"
          className="inline-flex items-center justify-center"
        >
          Start Your Journey
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </CardContent>
  </Card>
)

export default function GreenhouseGasPage() {
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
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Global Greenhouse Gas Emissions (1971-2022)
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white/10 border border-white/20 hover:bg-white/20">
                  <Info className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore real-time greenhouse gas data from NASA and other global sources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-indigo-800">Global Greenhouse Gas Monitoring</CardTitle>
            <p className="text-gray-500">
              Interactive visualization by NASA's Global Climate Change: Vital Signs of the Planet
            </p>
          </CardHeader>
          <CardContent>
            <div className="aspect-video max-w-full rounded-lg overflow-hidden min-h-screen shadow-inner bg-gray-900">
              <WorldMap />
            </div>

            <div className="mt-6 text-sm text-indigo-700">
              <p className="mb-2">
                This interactive tool visualizes greenhouse gas emissions from 1971 to 2022 for all countries. Explore global emission trends and their impact on our planet.
              </p>
              <h3 className="font-bold text-lg mb-2">Key Insights:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Greenhouse gases trap heat in the atmosphere, driving global warming</li>
                <li>Human activities, including fossil fuel burning and deforestation, are major contributors</li>
                <li>Monitoring emissions helps us track progress towards climate goals</li>
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
