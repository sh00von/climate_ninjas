import { useState } from 'react';
import { ChevronRight, ChevronLeft, Star, Rocket, CheckCircle, Book, Award } from 'lucide-react';

interface LessonContent {
  title: string;
  content: string;
}

const lessonContent: LessonContent[] = [
  {
    title: "Introduction to Greenhouse Gases",
    content: "Greenhouse gases are gases in Earth's atmosphere that can absorb and emit radiation within the thermal infrared range. They trap heat in the atmosphere, making the Earth warmer. The main greenhouse gases are water vapor, carbon dioxide, methane, nitrous oxide, and ozone."
  },
  {
    title: "How Greenhouse Gases Work",
    content: "Greenhouse gases act like a blanket around Earth. When sunlight reaches Earth's surface, it can either be reflected back into space or absorbed by Earth. Once absorbed, the planet releases some of the energy back into the atmosphere as heat. Greenhouse gases absorb this heat, keeping the planet warm enough to sustain life."
  },
  {
    title: "Types of Greenhouse Gases",
    content: "The primary greenhouse gases in Earth's atmosphere are:\n\n1. Carbon Dioxide (CO2): Released through human activities like burning fossil fuels.\n2. Methane (CH4): Produced by decomposition of organic matter.\n3. Nitrous Oxide (N2O): Emitted during agricultural and industrial activities.\n4. Water Vapor: The most abundant greenhouse gas, but not directly controlled by human activities.\n5. Ozone (O3): Both a natural and a man-made greenhouse gas."
  },
  {
    title: "Impact of Greenhouse Gases",
    content: "While greenhouse gases are crucial for life on Earth, too much can lead to global warming and climate change. This can result in:\n\n- Rising sea levels\n- More frequent extreme weather events\n- Changes in plant and animal habitats\n- Agricultural disruptions"
  },
  {
    title: "Reducing Greenhouse Gas Emissions",
    content: "We can help reduce greenhouse gas emissions by:\n\n1. Using renewable energy sources\n2. Improving energy efficiency\n3. Reducing, reusing, and recycling\n4. Planting trees and protecting forests\n5. Using public transportation or carpooling"
  }
];

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
);

const LessonPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const progress = ((currentSection + 1) / lessonContent.length) * 100;

  const handleNext = () => {
    if (currentSection < lessonContent.length - 1) {
      setCurrentSection(currentSection + 1);
      if (!completedSections.includes(currentSection)) {
        setCompletedSections([...completedSections, currentSection]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    // Here you would typically handle the completion of the lesson,
    // such as updating the user's progress, awarding points, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Greenhouse Gases 101
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform rotate-3 hover:rotate-0 transition-transform">
              <Star className="w-5 h-5 mr-2" />
              50 Points
            </div>
            <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform -rotate-3 hover:rotate-0 transition-transform">
              <Rocket className="w-5 h-5 mr-2" />
              Level 1
            </div>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {lessonContent.map((_, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentSection
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentSection ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Book className="w-6 h-6" />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 relative">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out absolute top-0 left-0"
                style={{ width: `${progress}%` }}
              />
              <div
                className="h-6 w-6 bg-yellow-400 rounded-full border-4 border-indigo-600 absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out"
                style={{ left: `calc(${progress}% - 12px)` }}
              />
            </div>
            <p className="text-center text-indigo-800 font-semibold">
              Section {currentSection + 1} of {lessonContent.length}
            </p>
          </div>

          <div className="bg-indigo-100 rounded-2xl p-6 mb-8 shadow-inner">
            <h2 className="text-3xl font-bold mb-4 text-indigo-800 flex items-center">
              <Award className="w-8 h-8 mr-2 text-yellow-500" />
              {lessonContent[currentSection].title}
            </h2>
            <div className="text-lg text-indigo-700 whitespace-pre-line">
              {lessonContent[currentSection].content}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="flex items-center px-6 py-3 rounded-full bg-indigo-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-indigo-600 transform hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 mr-2" /> Previous
            </button>
            {currentSection === lessonContent.length - 1 ? (
              <button
                onClick={handleComplete}
                className="flex items-center px-8 py-4 rounded-full bg-green-500 text-white font-bold text-xl transition-colors hover:bg-green-600 transform hover:scale-105"
              >
                Complete Lesson <CheckCircle className="w-6 h-6 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 rounded-full bg-green-500 text-white font-bold transition-colors hover:bg-green-600 transform hover:scale-105"
              >
                Next <ChevronRight className="w-6 h-6 ml-2" />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonPage;
