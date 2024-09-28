'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Lightbulb, Utensils, ShoppingBag, Recycle, Droplet, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

const frequencyOptions = ['NEVER', 'RARELY', 'SOMETIMES', 'OFTEN', 'VERY OFTEN']

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
      title: "Space Travel",
      icon: <Rocket className="w-12 h-12" />,
      content: (
        <>
          <FrequencySlider
            label="Cosmic Car Usage"
            value={formData.transportation.car}
            onChange={(value) => updateFormData('transportation', 'car', value)}
          />
          <FrequencySlider
            label="Interplanetary Public Transit"
            value={formData.transportation.publicTransit}
            onChange={(value) => updateFormData('transportation', 'publicTransit', value)}
          />
          <FrequencySlider
            label="Galactic Flight Frequency"
            value={formData.transportation.flight}
            onChange={(value) => updateFormData('transportation', 'flight', value)}
          />
        </>
      )
    },
    {
      title: "Energy Consumption",
      icon: <Lightbulb className="w-12 h-12" />,
      content: (
        <>
          <FrequencySlider
            label="Starship Electricity Usage"
            value={formData.energy.electricity}
            onChange={(value) => updateFormData('energy', 'electricity', value)}
          />
          <FrequencySlider
            label="Cosmic Fuel Consumption"
            value={formData.energy.gas}
            onChange={(value) => updateFormData('energy', 'gas', value)}
          />
          <div className="mt-4">
            <Label htmlFor="renewable" className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="renewable"
                checked={formData.energy.renewable}
                onChange={(e) => updateFormData('energy', 'renewable', e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span>Do you use renewable energy sources?</span>
            </Label>
          </div>
        </>
      )
    },
    {
      title: "Space Cuisine",
      icon: <Utensils className="w-12 h-12" />,
      content: (
        <RadioGroup 
          value={formData.food} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, food: value }))}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegan" id="vegan" />
            <Label htmlFor="vegan">Vegan Astronaut</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian">Vegetarian Space Explorer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed" id="mixed" />
            <Label htmlFor="mixed">Mixed Galactic Diet</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high-meat" id="high-meat" />
            <Label htmlFor="high-meat">High Protein Space Warrior</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Cosmic Shopping",
      icon: <ShoppingBag className="w-12 h-12" />,
      content: (
        <FrequencySlider
          label="Intergalactic Purchases"
          value={formData.shopping}
          onChange={(value) => setFormData(prev => ({ ...prev, shopping: value }))}
        />
      )
    },
    {
      title: "Space Recycling",
      icon: <Recycle className="w-12 h-12" />,
      content: (
        <FrequencySlider
          label="Space Waste Recycling"
          value={formData.recycling}
          onChange={(value) => setFormData(prev => ({ ...prev, recycling: value }))}
        />
      )
    },
    {
      title: "Cosmic Hydration",
      icon: <Droplet className="w-12 h-12" />,
      content: (
        <FrequencySlider
          label="Cosmic Water Consumption"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🚀 Cosmic Carbon Calculator
        </motion.h1>

        <motion.p
          className="text-xl mb-12 text-center text-indigo-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Embark on an intergalactic journey to discover your impact on our planet and learn how to reduce your cosmic carbon footprint!
        </motion.p>

        {!results ? (
          <Card className="bg-gray-800 bg-opacity-50 border-indigo-500 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-indigo-300 mb-2">{steps[currentStep].title}</h2>
                <Progress value={(currentStep + 1) / steps.length * 100} className="h-2 bg-indigo-900" />
              </div>
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  className="text-teal-400"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {steps[currentStep].icon}
                </motion.div>
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
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  {currentStep === steps.length - 1 ? "Calculate" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            className="bg-gray-800 bg-opacity-50 p-8 rounded-3xl text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-teal-300">Your Cosmic Carbon Footprint</h2>
            <p className="text-5xl font-bold text-indigo-300 mb-8">{results.total} tons CO2e/year</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(results).map(([key, value]) => (
                key !== 'total' && (
                  <div key={key} className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-pink-300 capitalize mb-2">{key}</h3>
                    <p className="text-2xl font-bold text-teal-300">{value}</p>
                  </div>
                )
              ))}
            </div>
            <p className="text-lg text-indigo-200 mb-8">
              Your carbon footprint is equivalent to planting {Math.round(parseFloat(results.total) * 16.5)} trees each year to offset your emissions.
            </p>
            <div className="space-x-4">
              <Button
                onClick={() => setResults(null)}
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                Recalculate
              </Button>
              <Link href="/eco-tips">
                <Button
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  Discover Eco-Friendly Space Tips
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

const FrequencySlider = ({ label, value, onChange }) => (
  <div className="space-y-4 mb-6">
    <Label htmlFor={label} className="text-lg font-semibold text-indigo-300">{label}</Label>
    <Slider
      id={label}
      min={0}
      max={4}
      step={1}
      value={[value]}
      onValueChange={(newValue) => onChange(newValue[0])}
      className="py-4"
    />
    <div className="flex justify-between text-xs text-indigo-400">
      {frequencyOptions.map((option, index) => (
        <span key={option} className={index === value ? 'text-teal-300 font-bold' : ''}>
          {option}
        </span>
      ))}
    </div>
  </div>
)