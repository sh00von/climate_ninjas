"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Leaf, Lightbulb, Recycle, Droplet } from 'lucide-react'

const ecoTips = [
  {
    category: 'Energy',
    icon: <Lightbulb className="w-6 h-6" />,
    tips: [
      'Switch to LED light bulbs',
      'Use a programmable thermostat',
      'Unplug electronics when not in use',
    ],
  },
  {
    category: 'Waste',
    icon: <Recycle className="w-6 h-6" />,
    tips: [
      'Reduce single-use plastics',
      'Compost food scraps',
      'Recycle properly',
    ],
  },
  {
    category: 'Water',
    icon: <Droplet className="w-6 h-6" />,
    tips: [
      'Fix leaky faucets',
      'Take shorter showers',
      'Use a rain barrel for gardening',
    ],
  },
]

const transportModes = [
  {
    name: 'Bicycle',
    image: 'https://img.freepik.com/free-vector/illustration-bicycle_53876-44045.jpg?t=st=1728064259~exp=1728067859~hmac=ef1c7eb5de4cb6a997ff47cc078f8bb4e5d80d57a67c982873f367ef82abe5a1&w=740',
    impact: 'Zero direct emissions, promotes health and reduces traffic congestion',
    co2: '0 g/km',
  },
  {
    name: 'Car',
    image: 'https://img.freepik.com/free-vector/hand-drawn-muscle-car-illustration_23-2149432254.jpg?t=st=1728064288~exp=1728067888~hmac=85dab9f19dd675b87c0bcf573e96146786ed2a76d4118e04e8adde73373fc31d&w=996',
    impact: 'High emissions, contributes to air pollution and traffic congestion',
    co2: '~120 g/km',
  },
  {
    name: 'Train',
    image: 'https://img.freepik.com/free-vector/high-speed-train-concept-illustration_114360-17150.jpg?t=st=1728064331~exp=1728067931~hmac=258b9e767ead10ceff2794c4e302d066b60a8c2650aded9d2b10e120870457bb&w=996',
    impact: 'Lower emissions per passenger than cars, reduces road congestion',
    co2: '~40 g/km per passenger',
  },
  {
    name: 'Airplane',
    image: 'https://img.freepik.com/free-vector/colorful-airplane-abstract-style_23-2147514728.jpg?t=st=1728064385~exp=1728067985~hmac=90caae9dee850e4ee95ffe354560462ea4f6509ab45b56d681f549063630d48d&w=740',
    impact: 'Highest emissions per passenger, significant contribution to global CO2 emissions',
    co2: '~250 g/km per passenger',
  },
]

export default function EcoTips() {
  const [hoveredTransport, setHoveredTransport] = useState(null)

  const handleTransportHover = (transportName) => {
    setHoveredTransport(transportName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-emerald-800 mb-4">Eco-Friendly Living</h1>
          <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
            Discover simple ways to reduce your environmental impact and create a sustainable future.
          </p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Daily Eco Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecoTips.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {category.icon}
                    <h3 className="text-xl font-semibold">{category.category}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {category.tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <Leaf className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </motion.li>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Transportation Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {transportModes.map((mode) => (
              <motion.div
                key={mode.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-md group"
                onMouseEnter={() => handleTransportHover(mode.name)}
                onMouseLeave={() => handleTransportHover(null)}
              >
                <Image
                  src={mode.image}
                  alt={mode.name}
                  layout="responsive"
                  width={300}
                  height={200}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{mode.name}</h3>
                  <p className="text-sm">{mode.co2}</p>
                </div>
                {hoveredTransport === mode.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black bg-opacity-80 p-4 flex items-center justify-center"
                  >
                    <p className="text-white text-sm text-center">{mode.impact}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link href="/quiz/6" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition duration-300 ease-in-out text-center"
            >
              Learn More with Quizzes
            </motion.a>
          </Link>
          <Link href="/calculator" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition duration-300 ease-in-out text-center"
            >
              Calculate Your CO2 Footprint
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
