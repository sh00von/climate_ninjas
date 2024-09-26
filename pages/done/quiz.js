import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Rocket, Check, X } from 'lucide-react';

const quizQuestions = [
  {
    question: "What is the main greenhouse gas responsible for climate change?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correctAnswer: 1,
  },
  {
    question: "Which of these is NOT a greenhouse gas?",
    options: ["Methane", "Water vapor", "Nitrogen", "Ozone"],
    correctAnswer: 2,
  },
  {
    question: "What is the greenhouse effect?",
    options: [
      "Plants growing in a greenhouse",
      "The Earth getting hotter",
      "Gases trapping heat in the atmosphere",
      "The ozone layer disappearing",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which human activity contributes most to greenhouse gas emissions?",
    options: ["Burning fossil fuels", "Playing video games", "Riding bicycles", "Growing vegetables"],
    correctAnswer: 0,
  },
  {
    question: "What can you do to help reduce greenhouse gas emissions?",
    options: [
      "Use more electricity",
      "Cut down trees",
      "Recycle and use less plastic",
      "Leave lights on all the time",
    ],
    correctAnswer: 2,
  },
];

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
);

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [coins, setCoins] = useState(0);
  const [answerStatus, setAnswerStatus] = useState([]);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true); // New state for timer

  const totalQuestions = quizQuestions.length;

  useEffect(() => {
    if (timer > 0 && timerActive && !quizCompleted) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      handleTimeUp();
    }
  }, [timer, timerActive, quizCompleted]);

  const handleTimeUp = () => {
    setTimerActive(false); // Pause the timer
    setShowAnswer(true);
    const correctIndex = quizQuestions[currentQuestion].correctAnswer;
    const newAnswerStatus = [...answerStatus];
    newAnswerStatus[currentQuestion] = "incorrect"; // Mark as incorrect

    setAnswerStatus(newAnswerStatus);
    setSelectedAnswer(correctIndex); // Show the correct answer
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    setTimerActive(false); // Pause the timer

    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setCoins(coins + 10);
    }

    const newAnswerStatus = [...answerStatus];
    newAnswerStatus[currentQuestion] = isCorrect ? "correct" : "incorrect";
    setAnswerStatus(newAnswerStatus);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimer(30); // Reset timer for the next question
    setTimerActive(true); // Start the timer

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswerStatus([]);
    setTimer(30); // Reset timer
    setTimerActive(true); // Start timer
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

        <main className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center">
          {!quizCompleted ? (
            <div className="w-full">
          {/* Timer Display */}
<div className="flex justify-center items-center mb-6">
  <div className="flex flex-col items-center">
    <span className="text-3xl font-bold text-gray-900"> {/* Darker text color */}
      {timer}s
    </span>
    <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
      <div
        className="h-full rounded-full"
        style={{
          width: `${(timer / 30) * 100}%`,
          background: `linear-gradient(to right, #4f46e5, #9333ea)`, // Gradient from indigo to purple
          transition: 'width 0.5s',
        }}
      />
    </div>
    <span className="text-sm text-gray-800 mt-1"> {/* Darker label color */}
      Time Remaining
    </span>
  </div>
</div>


              {/* Centered Progress bar with icons */}
              <div className="flex justify-center items-center mb-6">
                {quizQuestions.map((_, index) => (
                  <div key={index} className={`flex items-center justify-center w-10 h-10 mx-2 rounded-full ${index <= currentQuestion ? 'bg-gray-200' : 'bg-gray-100'}`}>
                    {index < answerStatus.length && (
                      answerStatus[index] === "correct" ? (
                        <Check className="text-green-500" />
                      ) : (
                        <X className="text-red-500" />
                      )
                    )}
                  </div>
                ))}
              </div>

              {/* Centered Question */}
              <div className="text-center mb-6">
                <p className="text-xl font-bold text-indigo-800">
                  Question {currentQuestion + 1} of {totalQuestions}
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-indigo-800 text-center">
                {quizQuestions[currentQuestion].question}
              </h2>
              
              {/* Answer options */}
              <div className="space-y-4 flex flex-col items-center">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                  const isSelected = index === selectedAnswer;

                  let buttonClass = 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
                  let icon = null;

                  if (showAnswer) {
                    if (isCorrect) {
                      buttonClass = 'bg-green-300 text-white';
                      icon = <Check className="ml-2 text-white" />;
                    } else if (isSelected) {
                      buttonClass = 'bg-red-300 text-white';
                      icon = <X className="ml-2 text-white" />;
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showAnswer}
                      className={`w-full flex justify-between items-center p-4 rounded-lg text-lg font-medium transition-colors ${buttonClass}`}
                    >
                      {option} {icon}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between items-center w-full">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0 || showAnswer}
                  className="flex items-center px-4 py-2 rounded-full bg-indigo-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={!showAnswer}
                  className="flex items-center px-4 py-2 rounded-full bg-green-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-indigo-800">Quiz Completed!</h2>
              <p className="text-xl mb-4 text-indigo-700">Your score: {score} out of {totalQuestions}</p>
              <p className="text-lg mb-6 text-green-600">You earned {coins} coins!</p>
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
