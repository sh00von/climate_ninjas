import { useState } from 'react'
import { Rocket, Star, Book, Award, HelpCircle, Lock, Unlock } from 'lucide-react'

// Types for Resource
interface Resource {
  id: number
  name: string
  cost: number
}

const StarryBackground: React.FC = () => (
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

// Props for Planet component
interface PlanetProps {
  color: string
  size: string
  orbitDuration: number
}

const Planet: React.FC<PlanetProps> = ({ color, size, orbitDuration }) => (
  <div
    className={`absolute rounded-full ${color}`}
    style={{
      width: size,
      height: size,
      animation: `orbit ${orbitDuration}s linear infinite`,
    }}
  />
)

const Component: React.FC = () => {
  const [coins, setCoins] = useState<number>(100)
  const [level, setLevel] = useState<number>(1)
  const [unlockedResources, setUnlockedResources] = useState<number[]>([])

  const resources: Resource[] = [
    { id: 1, name: "Space Explorer's Handbook", cost: 50 },
    { id: 2, name: "Virtual Greenhouse Tour", cost: 75 },
    { id: 3, name: "Eco-Hero Sticker Pack", cost: 30 },
  ]

  const unlockResource = (resource: Resource) => {
    if (coins >= resource.cost && !unlockedResources.includes(resource.id)) {
      setCoins(coins - resource.cost)
      setUnlockedResources([...unlockedResources, resource.id])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="relative w-96 h-96">
          <Planet color="bg-yellow-300" size="100px" orbitDuration={20} />
          <Planet color="bg-blue-300" size="60px" orbitDuration={30} />
          <Planet color="bg-red-300" size="40px" orbitDuration={40} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            GreenSpace Explorer
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform rotate-3 hover:rotate-0 transition-transform">
              <Star className="w-5 h-5 mr-2" />
              {coins} Coins
            </div>
            <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform -rotate-3 hover:rotate-0 transition-transform">
              <Rocket className="w-5 h-5 mr-2" />
              Level {level}
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800 flex items-center">
              <Book className="w-6 h-6 mr-2" />
              Study Materials
            </h2>
            <div className="space-y-4">
              {['What are Greenhouse Gases?', 'The Carbon Cycle', 'Climate Change Effects'].map((topic, index) => (
                <div key={index} className="bg-blue-100 p-4 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors border-2 border-blue-300">
                  <h3 className="font-semibold text-indigo-800">{topic}</h3>
                  <p className="text-sm text-indigo-600">Click to learn more!</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800 flex items-center">
              <Award className="w-6 h-6 mr-2" />
              Quizzes
            </h2>
            <div className="space-y-4">
              {['Greenhouse Gas Basics', 'Earth\'s Atmosphere', 'Reducing Carbon Footprint'].map((quiz, index) => (
                <div key={index} className="bg-green-100 p-4 rounded-lg cursor-pointer hover:bg-green-200 transition-colors border-2 border-green-300">
                  <h3 className="font-semibold text-green-800">{quiz}</h3>
                  <p className="text-sm text-green-600">Test your knowledge and earn coins!</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-lg col-span-full transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800 flex items-center">
              <Unlock className="w-6 h-6 mr-2" />
              Unlockable Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300">
                  <h3 className="font-semibold text-purple-800">{resource.name}</h3>
                  <p className="text-sm text-purple-600 mb-2">Cost: {resource.cost} coins</p>
                  <button
                    onClick={() => unlockResource(resource)}
                    disabled={unlockedResources.includes(resource.id) || coins < resource.cost}
                    className={`px-4 py-2 rounded-full font-bold text-white ${
                      unlockedResources.includes(resource.id)
                        ? 'bg-green-500'
                        : coins < resource.cost
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                  >
                    {unlockedResources.includes(resource.id) ? (
                      <span className="flex items-center">
                        <Unlock className="w-4 h-4 mr-1" /> Unlocked!
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Lock className="w-4 h-4 mr-1" /> Unlock
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-8 text-center">
          <button className="bg-yellow-400 text-indigo-800 px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center mx-auto transform hover:scale-110 transition-transform">
            <HelpCircle className="w-6 h-6 mr-2" />
            Need Help?
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Component
