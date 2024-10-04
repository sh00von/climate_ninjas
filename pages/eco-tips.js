import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Lightbulb, Recycle, ShoppingBag, Droplet, Car } from 'lucide-react'

const ecoTips = [
  {
    category: 'Energy',
    icon: <Lightbulb className="w-6 h-6" />,
    tips: [
      'Switch to LED light bulbs',
      'Use a programmable thermostat',
      'Unplug electronics when not in use',
      'Opt for energy-efficient appliances',
    ],
  },
  {
    category: 'Waste',
    icon: <Recycle className="w-6 h-6" />,
    tips: [
      'Reduce single-use plastics',
      'Compost food scraps',
      'Recycle properly',
      'Use reusable shopping bags',
    ],
  },
  {
    category: 'Water',
    icon: <Droplet className="w-6 h-6" />,
    tips: [
      'Fix leaky faucets',
      'Take shorter showers',
      'Use a rain barrel for gardening',
      'Install low-flow fixtures',
    ],
  },
  {
    category: 'Transportation',
    icon: <Car className="w-6 h-6" />,
    tips: [
      'Use public transportation',
      'Carpool or bike when possible',
      'Maintain your vehicle properly',
      'Consider an electric or hybrid vehicle',
    ],
  },
  {
    category: 'Shopping',
    icon: <ShoppingBag className="w-6 h-6" />,
    tips: [
      'Buy second-hand items',
      'Choose products with minimal packaging',
      'Support local and sustainable businesses',
      'Invest in quality, long-lasting products',
    ],
  },
]

export default function EcoTips() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Eco-Friendly Tips</h1>
          <p className="text-xl text-emerald-600">
            Small changes can make a big difference. Explore these tips to reduce your carbon footprint and live more sustainably.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecoTips.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-emerald-600 text-white p-4 flex items-center space-x-2">
                {category.icon}
                <h2 className="text-xl font-semibold">{category.category}</h2>
              </div>
              <ul className="p-6 space-y-4">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <Leaf className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/calculator">
            <span className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition duration-300 ease-in-out">
              Calculate Your Carbon Footprint
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}