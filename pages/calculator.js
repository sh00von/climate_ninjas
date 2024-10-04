'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Train, Plane, Zap, Flame, Leaf, Utensils, ShoppingBag, Recycle, Droplet } from 'lucide-react'
import Link from 'next/link'
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

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
              <Label htmlFor="renewable" className="text-sm font-medium">
                Do you use renewable energy sources?
              </Label>
            </div>
            <Switch
              id="renewable"
              checked={formData.energy.renewable}
              onCheckedChange={(checked) => updateFormData('energy', 'renewable', checked)}
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
        <RadioGroup 
          value={formData.food} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, food: value }))}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegan" id="vegan" />
            <Label htmlFor="vegan">Vegan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian">Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed" id="mixed" />
            <Label htmlFor="mixed">Mixed Diet</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high-meat" id="high-meat" />
            <Label htmlFor="high-meat">High Protein Diet</Label>
          </div>
        </RadioGroup>
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
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-emerald-700 text-white p-6">
              <CardTitle className="text-2xl font-semibold flex items-center space-x-2">
                {steps[currentStep].icon}
                <span>{steps[currentStep].title}</span>
              </CardTitle>
              <CardDescription className="text-emerald-100">
                {steps[currentStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <Progress value={(currentStep + 1) / steps.length * 100} className="h-2 bg-emerald-100" />
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {currentStep === steps.length - 1 ? "Calculate" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
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
                  <Card key={key} className="bg-emerald-50">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-semibold text-emerald-700 capitalize mb-2">{key}</h3>
                      <p className="text-2xl font-bold text-emerald-600">{value}</p>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
            <p className="text-lg text-emerald-700 mb-8 text-center">
              Your carbon footprint is equivalent to planting {Math.round(parseFloat(results.total) * 16.5)} trees each year to offset your emissions.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setResults(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Recalculate
              </Button>
              <Link href="/eco-tips">
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Discover Eco-Friendly Tips
                </Button>
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
      <Label htmlFor={label} className="text-sm font-medium text-gray-700">{label}</Label>
    </div>
    <Slider
      id={label}
      min={0}
      max={4}
      step={1}
      value={[value]}
      onValueChange={(newValue) => onChange(newValue[0])}
      className="py-4"
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