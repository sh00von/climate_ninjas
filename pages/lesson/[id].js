import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Rocket,
  CheckCircle,
  Book,
  Award,
} from "lucide-react";
import { lessons } from "../../data/lesson";
import StarryBackground from "@/components/StarryBackground";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LessonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const lessonId = parseInt(id, 10);

  const lesson = lessons.find((lesson) => lesson.id === lessonId);

  if (!lesson) {
    return (
      <div className="text-center text-red-500 min-h-screen">
        Lesson not found.
      </div>
    );
  }

  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(() => {
    // Load coins from localStorage, default to 0 if not found
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("totalPoints")) || 0;
    }
    return 0; // Fallback for SSR or if window is not defined
  });
  const [currentPoint, setCurrentPoint] = useState(0);
  const [completedPoints, setCompletedPoints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const progress = ((currentPoint + 1) / lesson.points.length) * 100;

  useEffect(() => {
    if (lesson && lesson.points[currentPoint]) {
      document.title = lesson.points[currentPoint].heading; // Set the title to the current point's heading
    }
  }, [currentPoint, lesson]);

  useEffect(() => {
    const completedLessons =
      JSON.parse(localStorage.getItem("completedLessons")) || [];
    setCompletedPoints(completedLessons);
  }, []);

  const handleNext = () => {
    if (currentPoint < lesson.points.length - 1) {
      setCurrentPoint(currentPoint + 1);
      if (!completedPoints.includes(currentPoint)) {
        setCompletedPoints([...completedPoints, currentPoint]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPoint > 0) {
      setCurrentPoint(currentPoint - 1);
    }
  };

  const handleComplete = () => {
    const completedLessons =
      JSON.parse(localStorage.getItem("completedLessons")) || [];

    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem(
        "completedLessons",
        JSON.stringify(completedLessons)
      );
    }

    if (!completedPoints.includes(currentPoint)) {
      setCompletedPoints([...completedPoints, currentPoint]);
    }

    // Show the modal and add 50 points
    const currentCoins = JSON.parse(localStorage.getItem("totalPoints")) || 0;
    localStorage.setItem("totalPoints", currentCoins + 50); // Add 50 points
    setModalVisible(true);
  };

  // Modal component
  const Modal = () => (
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
        <h2
          className="text-3xl font-bold mb-6 text-yellow-300 text-center"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          Congratulations!
        </h2>
        <div className="text-lg text-white text-center">
          You’ve earned{" "}
          <span className="font-bold text-yellow-300">50 points!</span>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          {/* Quiz Now Button */}
          <button
            onClick={() => router.push(`/quiz/${lessonId}`)} // Redirect to quiz page
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg transform transition-transform focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Give Quiz Now
          </button>
          {/* Not Now Button */}
          <button
            onClick={() => router.push("/dashboard")} // Redirect to dashboard
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg transform transition-transform focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <Head>
        <title>
          {lesson.points[currentPoint].heading} - {lesson.title}
        </title>
        <meta
          name="description"
          content={`Learn about ${lesson.points[currentPoint].heading} in ${lesson.title}.`}
        />
      </Head>
      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <Header coins={coins} level={level} />{" "}
        {/* Pass coins and level to Header */}
        <main className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {lesson.points.map((_, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentPoint
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index < currentPoint ? (
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
              Point {currentPoint + 1} of {lesson.points.length}
            </p>
          </div>

          <div className="bg-indigo-100 rounded-2xl p-6 mb-8 shadow-inner">
            <h2 className="text-3xl font-bold mb-4 text-indigo-800 flex items-center">
              <Award className="w-8 h-8 mr-2 text-yellow-500" />
              {lesson.points[currentPoint].heading}
            </h2>
            <div
  className="text-lg text-indigo-700 whitespace-pre-line"
  dangerouslySetInnerHTML={{ __html: lesson.points[currentPoint].description }}
></div>

          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentPoint === 0}
              className="flex items-center px-6 py-3 rounded-full bg-indigo-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-indigo-600 transform hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 mr-2" /> Previous
            </button>
            {currentPoint === lesson.points.length - 1 ? (
              <button
                onClick={handleComplete}
                className="flex items-center px-6 py-3 rounded-full bg-green-500 text-white font-bold transition-colors hover:bg-green-600 transform hover:scale-105"
              >
                Complete Lesson <ChevronRight className="w-6 h-6 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 rounded-full bg-indigo-500 text-white font-bold transition-colors hover:bg-indigo-600 transform hover:scale-105"
              >
                Next <ChevronRight className="w-6 h-6 ml-2" />
              </button>
            )}
          </div>
        </main>
      </div>

      {modalVisible && <Modal />}
    </div>
  );
};

export default LessonPage;
