"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Rocket, Book, Lock, ChevronDown, ChevronUp, Check, AlertCircle } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ToastProvider, Toast, ToastClose } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const studyMaterials = [
  {
    level: 1,
    title: "Greenhouse Gases Basics",
    lessons: [
      { id: 1, title: "What are Greenhouse Gases?", points: 10, duration: "5 min" },
      { id: 2, title: "The Greenhouse Effect", points: 15, duration: "7 min" },
      { id: 3, title: "Types of Greenhouse Gases", points: 20, duration: "10 min" },
    ]
  },
  {
    level: 2,
    title: "Climate Change Fundamentals",
    lessons: [
      { id: 4, title: "Understanding Climate Change", points: 20, duration: "12 min" },
      { id: 5, title: "Causes of Climate Change", points: 25, duration: "15 min" },
      { id: 6, title: "Effects of Climate Change", points: 30, duration: "18 min" },
    ]
  },
  {
    level: 3,
    title: "Environmental Protection",
    lessons: [
      { id: 7, title: "Reducing Carbon Footprint", points: 30, duration: "20 min" },
      { id: 8, title: "Renewable Energy Sources", points: 35, duration: "22 min" },
      { id: 9, title: "Sustainable Living Practices", points: 40, duration: "25 min" },
    ]
  }
]

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
)

export default function StudyMaterialsPage() {
  const [expandedLevels, setExpandedLevels] = useState([1])
  const [points, setPoints] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [completedLessons, setCompletedLessons] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const toggleLevel = (level) => {
    setExpandedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    )
  }

  const startLesson = (lessonId, lessonPoints) => {
    if (completedLessons.includes(lessonId)) {
      setToastMessage("You've already completed this lesson!")
      setShowToast(true)
      return
    }

    setPoints(prev => prev + lessonPoints)
    setCompletedLessons(prev => [...prev, lessonId])

    const currentLevelLessons = studyMaterials.find(m => m.level === currentLevel)?.lessons || []
    const completedLessonsInLevel = currentLevelLessons.filter(lesson => completedLessons.includes(lesson.id))

    if (completedLessonsInLevel.length + 1 === currentLevelLessons.length) {
      setCurrentLevel(prev => Math.min(prev + 1, studyMaterials.length))
      setToastMessage(`Congratulations! You've unlocked Level ${currentLevel + 1}!`)
      setShowToast(true)
    } else {
      setToastMessage(`Great job! You've earned ${lessonPoints} points!`)
      setShowToast(true)
    }
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const calculateLevelProgress = (level) => {
    const levelLessons = studyMaterials.find(m => m.level === level)?.lessons || []
    const completedLessonsCount = levelLessons.filter(lesson => completedLessons.includes(lesson.id)).length
    return (completedLessonsCount / levelLessons.length) * 100
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-4 md:p-8 relative overflow-hidden">
        <StarryBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mb-4 md:mb-0" 
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Space Academy
            </motion.h1>
            <div className="flex items-center space-x-4">
              <motion.div 
                className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform hover:scale-105 transition-transform"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Star className="w-5 h-5 mr-2" />
                {points} Points
              </motion.div>
              <motion.div 
                className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform hover:scale-105 transition-transform"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Level {currentLevel}
              </motion.div>
            </div>
          </header>

          <motion.main 
            className="bg-white rounded-3xl p-6 md:p-8 shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-indigo-800">Study Materials</h2>
            {studyMaterials.map((material) => (
              <Card key={material.level} className="mb-6">
                <CardContent className="p-0">
                  <Button
                    onClick={() => toggleLevel(material.level)}
                    className={`w-full flex justify-between items-center p-4 rounded-t-lg text-left text-xl font-bold transition-colors ${
                      material.level <= currentLevel ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-500'
                    }`}
                    disabled={material.level > currentLevel}
                  >
                    <span>Level {material.level}: {material.title}</span>
                    {material.level <= currentLevel ? (
                      expandedLevels.includes(material.level) ? <ChevronUp /> : <ChevronDown />
                    ) : (
                      <Lock />
                    )}
                  </Button>
                  <AnimatePresence>
                    {expandedLevels.includes(material.level) && material.level <= currentLevel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4 p-4"
                      >
                        <Progress value={calculateLevelProgress(material.level)} className="w-full h-2 mb-4" />
                        {material.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                            <div className="flex items-center">
                              <Book className="w-5 h-5 mr-3 text-indigo-600" />
                              <span className="text-lg text-indigo-800">{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant="secondary">{lesson.duration}</Badge>
                              <span className="text-indigo-600 font-semibold">{lesson.points} pts</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      onClick={() => startLesson(lesson.id, lesson.points)}
                                      className={`px-4 py-2 rounded-full font-bold text-white transition-colors ${
                                        completedLessons.includes(lesson.id)
                                          ? 'bg-green-500 hover:bg-green-600'
                                          : 'bg-indigo-500 hover:bg-indigo-600'
                                      }`}
                                    >
                                      {completedLessons.includes(lesson.id) ? (
                                        <Check className="w-5 h-5" />
                                      ) : (
                                        'Start'
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {completedLessons.includes(lesson.id) ? 'Lesson completed' : 'Begin lesson'}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </motion.main>
        </div>

        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 z-50"
            >
              <Toast>
                <div className="flex items-center">
                  {toastMessage.includes("Congratulations") ? (
                    <AlertCircle className="w-5 h-5 mr-2 text-green-500" />
                  ) : (
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  )}
                  {toastMessage}
                </div>
                <ToastClose />
              </Toast>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  )
}
