import { useState } from 'react';
import { Star, Rocket, Book, CheckCircle, Lock, ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  points: number;
}

interface StudyMaterial {
  level: number;
  title: string;
  lessons: Lesson[];
}

const studyMaterials: StudyMaterial[] = [
  {
    level: 1,
    title: "Greenhouse Gases Basics",
    lessons: [
      { id: 1, title: "What are Greenhouse Gases?", points: 10 },
      { id: 2, title: "The Greenhouse Effect", points: 15 },
      { id: 3, title: "Types of Greenhouse Gases", points: 20 },
    ]
  },
  {
    level: 2,
    title: "Climate Change Fundamentals",
    lessons: [
      { id: 4, title: "Understanding Climate Change", points: 20 },
      { id: 5, title: "Causes of Climate Change", points: 25 },
      { id: 6, title: "Effects of Climate Change", points: 30 },
    ]
  },
  {
    level: 3,
    title: "Environmental Protection",
    lessons: [
      { id: 7, title: "Reducing Carbon Footprint", points: 30 },
      { id: 8, title: "Renewable Energy Sources", points: 35 },
      { id: 9, title: "Sustainable Living Practices", points: 40 },
    ]
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

const StudyMaterialsPage: React.FC = () => {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([1]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  const toggleLevel = (level: number) => {
    setExpandedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const completeLesson = (lessonId: number, lessonPoints: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      setPoints(prev => prev + lessonPoints);

      // Check if all lessons in the current level are completed
      const currentLevelLessons = studyMaterials.find(m => m.level === currentLevel)?.lessons || [];
      const completedLessonsInLevel = currentLevelLessons.filter(lesson => completedLessons.includes(lesson.id));

      if (completedLessonsInLevel.length + 1 === currentLevelLessons.length) {
        setCurrentLevel(prev => Math.min(prev + 1, studyMaterials.length));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Space Academy
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform rotate-3 hover:rotate-0 transition-transform">
              <Star className="w-5 h-5 mr-2" />
              {points} Points
            </div>
            <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform -rotate-3 hover:rotate-0 transition-transform">
              <Rocket className="w-5 h-5 mr-2" />
              Level {currentLevel}
            </div>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Study Materials</h2>
          {studyMaterials.map((material) => (
            <div key={material.level} className="mb-6">
              <button
                onClick={() => toggleLevel(material.level)}
                className={`w-full flex justify-between items-center p-4 rounded-lg text-left text-xl font-bold transition-colors ${
                  material.level <= currentLevel ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span>Level {material.level}: {material.title}</span>
                {material.level <= currentLevel ? (
                  expandedLevels.includes(material.level) ? <ChevronUp /> : <ChevronDown />
                ) : (
                  <Lock />
                )}
              </button>
              {expandedLevels.includes(material.level) && material.level <= currentLevel && (
                <div className="mt-4 space-y-4 pl-6">
                  {material.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-center">
                        <Book className="w-5 h-5 mr-3 text-indigo-600" />
                        <span className="text-lg text-indigo-800">{lesson.title}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-indigo-600 font-semibold">{lesson.points} pts</span>
                        <button
                          onClick={() => completeLesson(lesson.id, lesson.points)}
                          disabled={completedLessons.includes(lesson.id)}
                          className={`px-4 py-2 rounded-full font-bold text-white transition-colors ${
                            completedLessons.includes(lesson.id)
                              ? 'bg-green-500 cursor-not-allowed'
                              : 'bg-indigo-500 hover:bg-indigo-600'
                          }`}
                        >
                          {completedLessons.includes(lesson.id) ? (
                            <span className="flex items-center">
                              <CheckCircle className="w-5 h-5 mr-1" /> Completed
                            </span>
                          ) : (
                            'Start Lesson'
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
