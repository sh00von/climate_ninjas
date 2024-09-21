const HelpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    const steps = [
      { step: "Complete Lessons", description: "Learn about greenhouse gases, the carbon cycle, and climate change." },
      { step: "Take Quizzes", description: "Test your knowledge and earn coins!" },
      { step: "Unlock Resources", description: "Use your coins to unlock special resources." },
    ];
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
        <div className="bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl p-10 shadow-2xl max-w-md w-full m-4 relative z-10 border-4 border-yellow-300">
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
          <h2 className="text-3xl font-bold mb-6 text-yellow-300 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            How to Play
          </h2>
          <div className="space-y-6">
            {steps.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-indigo-800">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">{item.step}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg transform transition-transform focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default HelpModal;
  