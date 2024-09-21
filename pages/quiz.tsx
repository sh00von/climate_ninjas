import { useState } from 'react';
import { ChevronRight, ChevronLeft, Star, Rocket } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the main greenhouse gas responsible for climate change?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correctAnswer: 1
  },
  {
    question: "Which of these is NOT a greenhouse gas?",
    options: ["Methane", "Water vapor", "Nitrogen", "Ozone"],
    correctAnswer: 2
  },
  {
    question: "What is the greenhouse effect?",
    options: [
      "Plants growing in a greenhouse",
      "The Earth getting hotter",
      "Gases trapping heat in the atmosphere",
      "The ozone layer disappearing"
    ],
    correctAnswer: 2
  },
  {
    question: "Which human activity contributes most to greenhouse gas emissions?",
    options: [
      "Burning fossil fuels",
      "Playing video games",
      "Riding bicycles",
      "Growing vegetables"
    ],
    correctAnswer: 0
  },
  {
    question: "What can you do to help reduce greenhouse gas emissions?",
    options: [
      "Use more electricity",
      "Cut down trees",
      "Recycle and use less plastic",
      "Leave lights on all the time"
    ],
    correctAnswer: 2
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

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [coins, setCoins] = useState<number>(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setCoins(coins + 10);
    }

    setSelectedAnswer(null);
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            GreenSpace Quiz
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform rotate-3 hover:rotate-0 transition-transform">
              <Star className="w-5 h-5 mr-2" />
              {coins} Coins
            </div>
            <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform -rotate-3 hover:rotate-0 transition-transform">
              <Rocket className="w-5 h-5 mr-2" />
              Score: {score}
            </div>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-8 shadow-lg">
          {!quizCompleted ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-indigo-800">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </h2>
              <p className="text-xl mb-6 text-indigo-700">{quizQuestions[currentQuestion].question}</p>
              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg text-lg font-medium transition-colors ${
                      selectedAnswer === index
                        ? 'bg-yellow-300 text-indigo-800'
                        : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center px-4 py-2 rounded-full bg-indigo-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="flex items-center px-4 py-2 rounded-full bg-green-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-indigo-800">Quiz Completed!</h2>
              <p className="text-xl mb-4 text-indigo-700">
                Your score: {score} out of {quizQuestions.length}
              </p>
              <p className="text-lg mb-6 text-green-600">
                You earned {coins} coins!
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-full bg-yellow-400 text-indigo-800 font-bold text-lg hover:bg-yellow-300 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuizPage;
