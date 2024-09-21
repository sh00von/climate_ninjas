import { useState } from 'react';
import { Rocket, Star, Book, Award, HelpCircle, Lock, Unlock } from 'lucide-react';
import HelpModal from '../components/HelpModal';
const StarryBackground = () => (
  <>
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-indigo-900">
        {/* Stars */}
        {[...Array(300)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const animationDuration = Math.random() * 8 + 4;
          const driftAnimation = Math.random() < 0.5 ? 'driftLarge' : 'driftSmall';

          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `twinkle ${Math.random() * 3 + 2}s linear infinite, ${driftAnimation} ${animationDuration}s ease-in-out infinite`,
              }}
            />
          );
        })}
        {/* Larger stars */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 5 + 5;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-300"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `twinkle ${Math.random() * 3 + 1}s linear infinite`,
              }}
            />
          );
        })}
      </div>
    </div>
  </>
);

const Planet = ({ color, size, orbitDuration }) => (
  <div className="absolute" style={{ animation: `orbit ${orbitDuration}s linear infinite` }}>
    <div
      className={`rounded-full ${color}`}
      style={{
        width: size,
        height: size,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center the planet
      }}
    />
  </div>
);


const Home = () => {
  const [coins, setCoins] = useState(100);
  const [level, setLevel] = useState(1);
  const [unlockedResources, setUnlockedResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resourceToUnlock, setResourceToUnlock] = useState(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // New state for help modal

  const resources = [
    { id: 1, name: "Space Explorer's Handbook", cost: 50 },
    { id: 2, name: "Virtual Greenhouse Tour", cost: 75 },
    { id: 3, name: "Eco-Hero Sticker Pack", cost: 30 },
  ];

  const unlockResource = (resource) => {
    if (coins >= resource.cost && !unlockedResources.includes(resource.id)) {
      setResourceToUnlock(resource);
      setIsModalOpen(true);
    }
  };
  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  const confirmUnlock = () => {
    if (resourceToUnlock) {
      setCoins(coins - resourceToUnlock.cost);
      setUnlockedResources([...unlockedResources, resourceToUnlock.id]);
      setResourceToUnlock(null);
      setIsModalOpen(false);
    }
  };

  const cancelUnlock = () => {
    setIsModalOpen(false);
  };

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
        <header className="mb-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mb-4 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              GreenSpace Explorer
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
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

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl p-8 shadow-2xl max-w-sm w-full m-4 relative z-10 border-4 border-yellow-300">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white opacity-20"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                      animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                    }}
                  />
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-4 text-yellow-300 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Unlock Treasure?
              </h2>
              <p className="text-white text-center mb-6">
                Do you want to unlock <strong className="text-yellow-300">{resourceToUnlock?.name}</strong> for <span className="text-yellow-300">{resourceToUnlock?.cost} coins</span>?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmUnlock}
                  className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg transform hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Yes, please!
                </button>
                <button
                  onClick={cancelUnlock}
                  className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg transform hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  No, thanks
                </button>
              </div>
            </div>
          </div>
        )}
      {/* Help Modal */}
      <HelpModal isOpen={isHelpModalOpen} onClose={toggleHelpModal} />


        <footer className="mt-8 text-center">
        <button
          onClick={toggleHelpModal} // Updated to handle click
          className="bg-yellow-400 text-indigo-800 px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center mx-auto transform hover:scale-110 transition-transform"
        >      <HelpCircle className="w-6 h-6 mr-2" />
            Need Help?
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Home;
