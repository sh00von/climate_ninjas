import { useState } from 'react'
import { Trophy, Star, Rocket } from 'lucide-react'

const leaderboardData = [
  { id: 1, name: "Astro Alex", points: 1250, level: 5, avatar: "/placeholder.svg?height=60&width=60" },
  { id: 2, name: "Cosmic Chris", points: 1150, level: 4, avatar: "/placeholder.svg?height=60&width=60" },
  { id: 3, name: "Stellar Sam", points: 1050, level: 4, avatar: "/placeholder.svg?height=60&width=60" },
  { id: 4, name: "Nebula Nia", points: 950, level: 3, avatar: "/placeholder.svg?height=60&width=60" },
  { id: 5, name: "Galaxy Gabe", points: 900, level: 3, avatar: "/placeholder.svg?height=60&width=60" },
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

const Planet = ({ color, size, orbitDuration }) => (
  <div
    className={`absolute rounded-full ${color}`}
    style={{
      width: size,
      height: size,
      animation: `orbit ${orbitDuration}s linear infinite`,
    }}
  />
)

export default function FunLeaderboard() {
  const [hoveredPlayer, setHoveredPlayer] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="relative w-96 h-96">
          <Planet color="bg-yellow-300" size="80px" orbitDuration="20" />
          <Planet color="bg-blue-300" size="60px" orbitDuration="30" />
          <Planet color="bg-red-300" size="40px" orbitDuration="40" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-center items-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-300 drop-shadow-lg text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Space Explorers Hall of Fame
          </h1>
          <Trophy className="w-16 h-16 text-yellow-300 ml-4 animate-bounce" />
        </header>

        <main className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-opacity-10 bg-yellow-300" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          <ul className="space-y-6 relative z-10">
            {leaderboardData.map((player, index) => (
              <li 
                key={player.id} 
                className={`flex items-center p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  index === 0 ? 'bg-yellow-100' :
                  index === 1 ? 'bg-gray-100' :
                  index === 2 ? 'bg-orange-100' :
                  'bg-indigo-50'
                }`}
                onMouseEnter={() => setHoveredPlayer(player.id)}
                onMouseLeave={() => setHoveredPlayer(null)}
              >
                <div className="flex-shrink-0 mr-4 relative">
                  <img src={player.avatar} alt={player.name} className="w-16 h-16 rounded-full border-4 border-indigo-300" />
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-indigo-800">{player.name}</h2>
                  <div className="flex items-center mt-1">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-bold text-indigo-600 mr-4">{player.points} Points</span>
                    <Rocket className="w-5 h-5 text-green-500 mr-1" />
                    <span className="font-bold text-indigo-600">Level {player.level}</span>
                  </div>
                </div>
                {hoveredPlayer === player.id && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                    Great job, {player.name}!
                  </div>
                )}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
}