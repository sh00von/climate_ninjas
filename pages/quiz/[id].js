import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronRight, ChevronLeft, Check, X } from 'lucide-react';
import quizData from '../../data/quiz'; // Adjust the path based on your folder structure
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
  const router = useRouter();
  const { id } = router.query; // Get the quiz id from the URL
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0); // State for total points
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [coins, setCoins] = useState(null);
  const [answerStatus, setAnswerStatus] = useState([]);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true); // New state for timer
  const quizQuestions = id ? quizData.find(quiz => quiz.id === id)?.questions : []; // Find the quiz based on the id

  // Load coins from localStorage whenever they change
  useEffect(() => {
    const storedCoins = JSON.parse(localStorage.getItem("totalPoints"));
    setCoins(storedCoins);
  }, []); // Run once on mount

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
    const correctIndex = quizQuestions[currentQuestion]?.correctAnswer; // Use optional chaining
    if (correctIndex !== undefined) {
      const newAnswerStatus = [...answerStatus];
      newAnswerStatus[currentQuestion] = "incorrect"; // Mark as incorrect

      setAnswerStatus(newAnswerStatus);
      setSelectedAnswer(correctIndex); // Show the correct answer
    }
  };


  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);

    const isCorrect = answerIndex === quizQuestions[currentQuestion]?.correctAnswer; // Use optional chaining
    if (isCorrect) {
      const newCoins = coins + 20; // Award 20 coins for a correct answer
      setCoins(newCoins);
      localStorage.setItem("totalPoints", JSON.stringify(newCoins)); // Update localStorage
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
    setQuizCompleted(false);
    setAnswerStatus([]);
    setTimer(30); // Reset timer
    setTimerActive(true); // Start timer
    setCoins(0); // Reset coins, if desired
    // Total points are not reset and persist across quizzes
  };

  // Ensure the quiz data is loaded before rendering
  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-400 to-purple-600">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
      <Header coins={coins} /> {/* Pass coins as a prop */}

        <main className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center">
          {!quizCompleted ? (
            <div className="w-full">
              {/* Timer Display */}
              <div className="flex justify-center items-center mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    {timer}s
                  </span>
                  <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(timer / 30) * 100}%`,
                        background: `linear-gradient(to right, #4f46e5, #9333ea)`,
                        transition: 'width 0.5s',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Progress */}
              <div className="flex justify-center items-center mb-6">
                {quizQuestions.map((_, index) => (
                  <div key={index} className="flex items-center justify-center w-10 h-10 mx-2 rounded-full bg-gray-200">
                    {answerStatus[index] === "correct" ? (
                      <Check className="text-green-500" />
                    ) : answerStatus[index] === "incorrect" ? (
                      <X className="text-red-500" />
                    ) : (
                      index + 1
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
                Q{currentQuestion + 1}: {quizQuestions[currentQuestion]?.question}
              </h2>
              <div className="flex flex-col space-y-4">
                {quizQuestions[currentQuestion]?.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === quizQuestions[currentQuestion]?.correctAnswer;

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
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-indigo-800">Quiz Completed!</h2>
              <p className="text-xl mb-4 text-indigo-700">You earned {coins} coins!</p>
              <p className="text-lg mb-6 text-green-600">Total Points: {totalPoints}</p> {/* Display total points */}
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
      <Footer/>
    </div>
  );
};

export default QuizPage;
