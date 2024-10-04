'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Train, Plane, Zap, Flame, Leaf, Utensils, ShoppingBag, Recycle, Droplet } from 'lucide-react'
import Link from 'next/link'

const frequencyOptions = ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often']

export default function CarbonFootprintCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState(null)
  const [formData, setFormData] = useState({
    transportation: {
      car: 2,
      publicTransit: 2,
      flight: 2
    },
    energy: {
      electricity: 2,
      gas: 2,
      renewable: false
    },
    food: 'mixed',
    shopping: 2,
    recycling: 2,
    water: 2
  })

  const updateFormData = (category, subcategory, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: value
      }
    }))
  }

  const calculateFootprint = () => {
    const { transportation, energy, food, shopping, recycling, water } = formData

    const transportationEmissions = 
      (transportation.car * 0.5) + 
      (transportation.publicTransit * 0.3) + 
      (transportation.flight * 1.5)
    
    const energyEmissions = 
      (energy.electricity * 0.8) + 
      (energy.gas * 0.6)
    
    const foodEmissions = 
      food === 'vegan' ? 1.5 :
      food === 'vegetarian' ? 1.7 :
      food === 'mixed' ? 2.5 :
      food === 'high-meat' ? 3.3 : 2.5

    const shoppingEmissions = shopping * 0.4
    const recyclingReduction = recycling * 0.2
    const waterEmissions = water * 0.1

    let total = transportationEmissions + energyEmissions + foodEmissions + shoppingEmissions + waterEmissions - recyclingReduction

    if (energy.renewable) {
      total *= 0.8 // 20% reduction for using renewable energy
    }

    setResults({
      total: total.toFixed(2),
      transportation: transportationEmissions.toFixed(2),
      energy: energyEmissions.toFixed(2),
      food: foodEmissions.toFixed(2),
      shopping: shoppingEmissions.toFixed(2),
      recycling: recyclingReduction.toFixed(2),
      water: waterEmissions.toFixed(2)
    })
  }

  const steps = [
    {
      title: "Transportation",
      description: "Evaluate your travel habits",
      icon: <Car className="w-6 h-6" />,
      content: (
        <>
          <FrequencySlider
            label="Personal Vehicle Usage"
            icon={<Car className="w-4 h-4" />}
            value={formData.transportation.car}
            onChange={(value) => updateFormData('transportation', 'car', value)}
          />
          <FrequencySlider
            label="Public Transit Usage"
            icon={<Train className="w-4 h-4" />}
            value={formData.transportation.publicTransit}
            onChange={(value) => updateFormData('transportation', 'publicTransit', value)}
          />
          <FrequencySlider
            label="Air Travel Frequency"
            icon={<Plane className="w-4 h-4" />}
            value={formData.transportation.flight}
            onChange={(value) => updateFormData('transportation', 'flight', value)}
          />
        </>
      )
    },
    {
      title: "Energy Consumption",
      description: "Assess your energy usage",
      icon: <Zap className="w-6 h-6" />,
      content: (
        <>
          <FrequencySlider
            label="Electricity Usage"
            icon={<Zap className="w-4 h-4" />}
            value={formData.energy.electricity}
            onChange={(value) => updateFormData('energy', 'electricity', value)}
          />
          <FrequencySlider
            label="Natural Gas Consumption"
            icon={<Flame className="w-4 h-4" />}
            value={formData.energy.gas}
            onChange={(value) => updateFormData('energy', 'gas', value)}
          />
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-green-500" />
              <label htmlFor="renewable" className="text-sm font-medium">
                Do you use renewable energy sources?
              </label>
            </div>
            <input
              type="checkbox"
              id="renewable"
              checked={formData.energy.renewable}
              onChange={(e) => updateFormData('energy', 'renewable', e.target.checked)}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
          </div>
        </>
      )
    },
    {
      title: "Dietary Habits",
      description: "Analyze your food choices",
      icon: <Utensils className="w-6 h-6" />,
      content: (
        <div className="space-y-3">
          {['vegan', 'vegetarian', 'mixed', 'high-meat'].map((diet) => (
            <div key={diet} className="flex items-center space-x-2">
              <input
                type="radio"
                id={diet}
                name="diet"
                value={diet}
                checked={formData.food === diet}
                onChange={(e) => setFormData(prev => ({ ...prev, food: e.target.value }))}
                className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              />
              <label htmlFor={diet} className="text-sm font-medium capitalize">{diet.replace('-', ' ')}</label>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Consumer Behavior",
      description: "Evaluate your shopping habits",
      icon: <ShoppingBag className="w-6 h-6" />,
      content: (
        <FrequencySlider
          label="New Product Purchases"
          icon={<ShoppingBag className="w-4 h-4" />}
          value={formData.shopping}
          onChange={(value) => setFormData(prev => ({ ...prev, shopping: value }))}
        />
      )
    },
    {
      title: "Waste Management",
      description: "Assess your recycling habits",
      icon: <Recycle className="w-6 h-6" />,
      content: (
        <FrequencySlider
          label="Recycling Frequency"
          icon={<Recycle className="w-4 h-4" />}
          value={formData.recycling}
          onChange={(value) => setFormData(prev => ({ ...prev, recycling: value }))}
        />
      )
    },
    {
      title: "Water Usage",
      description: "Evaluate your water consumption",
      icon: <Droplet className="w-6 h-6" />,
      content: (
        <FrequencySlider
          label="Water Consumption"
          icon={<Droplet className="w-4 h-4" />}
          value={formData.water}
          onChange={(value) => setFormData(prev => ({ ...prev, water: value }))}
        />
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateFootprint()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-4 text-center text-emerald-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Carbon Footprint Calculator
        </motion.h1>

        <motion.p
          className="text-lg mb-12 text-center text-emerald-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover your environmental impact and learn how to reduce your carbon footprint with our interactive calculator.
        </motion.p>

        {!results ? (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-emerald-700 text-white p-6">
              <h2 className="text-2xl font-semibold flex items-center space-x-2">
                {steps[currentStep].icon}
                <span>{steps[currentStep].title}</span>
              </h2>
              <p className="text-emerald-100">
                {steps[currentStep].description}
              </p>
            </div>
            <div className="p-6">
              <div className="mb-6 bg-emerald-200 rounded-full h-2.5">
                <div 
                  className="bg-emerald-600 h-2.5 rounded-full" 
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep].content}
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  {currentStep === steps.length - 1 ? "Calculate" : "Next"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-emerald-800 text-center">Your Carbon Footprint</h2>
            <p className="text-5xl font-bold text-emerald-600 mb-8 text-center">{results.total} tons CO2e/year</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(results).map(([key, value]) => (
                key !== 'total' && (
                  <div key={key} className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-emerald-700 capitalize mb-2">{key}</h3>
                    <p className="text-2xl font-bold text-emerald-600">{value}</p>
                  </div>
                )
              ))}
            </div>
            <p className="text-lg text-emerald-700 mb-8 text-center">
              Your carbon footprint is equivalent to planting {Math.round(parseFloat(results.total) * 16.5)} trees each year to offset your emissions.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setResults(null)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Recalculate
              </button>
              <Link href="/eco-tips">
                <button
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Discover Eco-Friendly Tips
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

const FrequencySlider = ({ label, icon, value, onChange }) => (
  <div className="space-y-4 mb-6">
    <div className="flex items-center space-x-2">
      {icon}
      <label htmlFor={label} className="text-sm font-medium text-gray-700">{label}</label>
    </div>
    <input
      type="range"
      id={label}
      min={0}
      max={4}
      step={1}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
    />
    <div className="flex justify-between text-xs text-gray-500">
      {frequencyOptions.map((option, index) => (
        <span key={option} className={index === value ? 'text-emerald-600 font-semibold' : ''}>
          {option}
        </span>
      ))}
    </div>
  </div>
)