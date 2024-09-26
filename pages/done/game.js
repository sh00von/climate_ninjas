import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Rocket, Cloud, Droplet, Wind, AlertTriangle, Sun, Star, Clock } from 'lucide-react'

// Constants for gameplay
const GAME_DURATION = 90 // seconds
const SPAWN_INTERVAL = 800 // milliseconds (slower for children)
const MOVE_INTERVAL = 20 // milliseconds

// Greenhouse gases (friendly, positive points)
const gases = [
  { name: 'CO2', color: 'bg-blue-500', points: 10, icon: <Cloud className="w-8 h-8" /> },
  { name: 'CH4', color: 'bg-green-500', points: 20, icon: <Droplet className="w-8 h-8" /> },
  { name: 'N2O', color: 'bg-purple-500', points: 30, icon: <Wind className="w-8 h-8" /> },
]

// Non-GHG (pollutants, negative points)
const pollutants = [
  { name: 'Smoke', color: 'bg-gray-700', penalty: 10, icon: <AlertTriangle className="w-8 h-8" /> },
  { name: 'Radiation', color: 'bg-yellow-500', penalty: 20, icon: <Sun className="w-8 h-8" /> },
]

const backgrounds = 'bg-gradient-to-b from-blue-300 to-green-300'

const GameEntity = {
  id: Number,
  type: 'gas' | 'pollutant',
  data: gases[0] || pollutants[0],
  x: Number,
  y: Number,
}

export default function GreenhouseCleanerGame() {
  const [gameState, setGameState] = useState('idle')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [entities, setEntities] = useState([])
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 80 })
  const gameAreaRef = useRef(null)

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setEntities([])
  }

  const endGame = () => {
    setGameState('ended')
  }

  const spawnEntity = useCallback(() => {
    const entityType = Math.random() < 0.8 ? 'gas' : 'pollutant' // 80% chance to spawn GHG, 20% for pollutant
    const entityData =
      entityType === 'gas'
        ? gases[Math.floor(Math.random() * gases.length)]
        : pollutants[Math.floor(Math.random() * pollutants.length)]

    const newEntity = {
      id: Date.now(),
      type: entityType,
      data: entityData,
      x: Math.random() * 90 + 5, // Random x position
      y: 0, // Start from top
    }

    setEntities((prev) => [...prev, newEntity])
  }, [])

  const moveEntities = useCallback(() => {
    setEntities((prev) =>
      prev.map((entity) => ({
        ...entity,
        y: entity.y + (entity.type === 'gas' ? entity.data.speed || 1 : 1) * 0.5,
      })).filter((entity) => entity.y < 100)
    )
  }, [])

  const collectEntity = useCallback(
    (entity) => {
      if (entity.type === 'gas') {
        setScore((prev) => prev + entity.data.points)
      } else if (entity.type === 'pollutant') {
        setScore((prev) => Math.max(0, prev - entity.data.penalty))
      }

      setEntities((prev) => prev.filter((e) => e.id !== entity.id))
    },
    []
  )

  useEffect(() => {
    if (gameState !== 'playing') return

    const spawnInterval = setInterval(spawnEntity, SPAWN_INTERVAL)
    const moveInterval = setInterval(moveEntities, MOVE_INTERVAL)
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
      if (timeLeft <= 0) endGame()
    }, 1000)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(moveInterval)
      clearInterval(timerInterval)
    }
  }, [gameState, spawnEntity, moveEntities, timeLeft])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gameAreaRef.current) return
      const rect = gameAreaRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setPlayerPosition({ x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    entities.forEach((entity) => {
      const dx = playerPosition.x - entity.x
      const dy = playerPosition.y - entity.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 5) {
        collectEntity(entity)
      }
    })
  }, [entities, playerPosition, collectEntity])

  return (
    <div className={`min-h-screen p-8 relative overflow-hidden transition-colors ${backgrounds}`}>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Greenhouse Gas Cleaner Game</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center">
              <Star className="w-5 h-5 mr-2" />
              <span>{score} Points</span>
            </div>
            <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </header>

        {/* Game Area */}
        <main className="bg-indigo-900 rounded-3xl p-8 shadow-lg relative overflow-hidden">
          <div ref={gameAreaRef} className="w-full h-96 relative">
            {/* Entities (GHGs and Pollutants) */}
            {entities.map((entity) => (
              <div
                key={entity.id}
                className={`absolute w-10 h-10 rounded-full ${entity.data.color} flex items-center justify-center text-white font-bold transition-all duration-300`}
                style={{ left: `${entity.x}%`, top: `${entity.y}%` }}
              >
                {entity.data.icon}
              </div>
            ))}

            {/* Player (Rocket) */}
            <div
              className="absolute w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <Rocket className="w-10 h-10 text-indigo-800" />
            </div>
          </div>

          {/* Game State UI (Start, End) */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <button
                onClick={startGame}
                className="bg-green-500 text-white px-8 py-4 rounded-full text-2xl font-bold hover:bg-green-600 transition-colors"
              >
                Start Game
              </button>
            </div>
          )}

          {gameState === 'ended' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <h2 className="text-5xl font-bold text-white mb-4">Game Over!</h2>
              <p className="text-3xl text-yellow-300 mb-8">Your Score: {score}</p>
              <button
                onClick={startGame}
                className="bg-green-500 text-white px-8 py-4 rounded-full text-2xl font-bold hover:bg-green-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </main>

        {/* Footer (How to Play) */}
        <footer className="mt-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">How to Play</h2>
          <p className="mb-2">Move your rocket to collect greenhouse gases. Avoid pollutants!</p>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {gases.map((gas) => (
              <div key={gas.name} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full ${gas.color} flex items-center justify-center text-white`}>
                  {gas.icon}
                </div>
                <p className="text-lg font-bold">{gas.name}</p>
              </div>
            ))}
            {pollutants.map((pollutant) => (
              <div key={pollutant.name} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full ${pollutant.color} flex items-center justify-center text-white`}>
                  {pollutant.icon}
                </div>
                <p className="text-lg font-bold">{pollutant.name}</p>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
