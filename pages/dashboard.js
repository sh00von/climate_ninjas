import { useState, useEffect } from "react";
import { Book, Award, Unlock } from "lucide-react";
import Link from "next/link";
import StarryBackground from "../components/StarryBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { lessons } from "../data/lesson";
import quizData from "../data/quiz";
import Head from "next/head";

export default function Home() {
  const [coins, setCoins] = useState(() => {
    // Load coins from localStorage, default to 0 if not found
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("totalPoints")) || 0;
    }
    return 0; // Fallback for SSR or if window is not defined
  });

  const [unlockedResources, setUnlockedResources] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]); // State for completed lessons
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // State for completed quizzes

  const resources = [
    { id: 1, name: "Space Explorer's Handbook" },
    { id: 2, name: "Virtual Greenhouse Tour" },
    { id: 3, name: "Eco-Hero Sticker Pack" },
  ];

  const unlockResource = (resource) => {
    if (!unlockedResources.includes(resource.id)) {
      setUnlockedResources([...unlockedResources, resource.id]);
    }
  };

  useEffect(() => {
    // Only run this code in the browser
    if (typeof window !== "undefined") {
      // Load completed lessons and level from localStorage
      const completedLessons =
        JSON.parse(localStorage.getItem("completedLessons")) || [];
      setCompletedLessons(completedLessons);

      // Load completed quizzes from localStorage
      const completedQuizzes =
        JSON.parse(localStorage.getItem("completedQuizzes")) || [];
      setCompletedQuizzes(completedQuizzes);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever coins change
    if (typeof window !== "undefined") {
      localStorage.setItem("totalPoints", JSON.stringify(coins));
    }
  }, [coins]);

  const handleQuizCompletion = (quizId) => {
    if (!completedQuizzes.includes(quizId)) {
      const newCompletedQuizzes = [...completedQuizzes, quizId];
      setCompletedQuizzes(newCompletedQuizzes);
      localStorage.setItem(
        "completedQuizzes",
        JSON.stringify(newCompletedQuizzes)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-8 relative overflow-hidden">
      <Head>
        <title>Climate Ninjas - Dashboard</title>
      </Head>
      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <Header coins={coins} /> {/* Pass coins and level to Header */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800 flex items-center">
              <Book className="w-6 h-6 mr-2" />
              Study Materials
            </h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg transition-colors border-2 ${
                    completedLessons.includes(lesson.id)
                      ? "bg-yellow-400 border-gray-400 cursor-not-allowed" // Style for completed lessons
                      : "bg-blue-100 border-blue-300 hover:bg-blue-200 cursor-pointer"
                  }`}
                >
                  <h3 className="font-semibold text-indigo-800">
                    {lesson.title}
                  </h3>
                  {completedLessons.includes(lesson.id) ? (
                    <p className="text-sm text-gray-600">Completed</p> // Static text for completed lessons
                  ) : (
                    <Link href={`/lesson/${lesson.id}`} passHref>
                      <p className="text-sm text-indigo-600">
                        Click to learn more!
                      </p>
                    </Link>
                  )}
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
              {quizData.map((quiz, index) => (
                <div
                  key={index}
                  className={`bg-green-100 p-4 rounded-lg border-2 transition-colors ${
                    completedQuizzes.includes(quiz.id)
                      ? "bg-yellow-400 border-gray-400 cursor-not-allowed" // Style for completed quizzes
                      : "cursor-pointer hover:bg-green-200 border-green-300"
                  }`}
                  onClick={() => {
                    if (!completedQuizzes.includes(quiz.id)) {
                      handleQuizCompletion(quiz.id);
                    }
                  }}
                >
                  <h3 className="font-semibold text-green-800">{quiz.title}</h3>
                  <Link href={`/quiz/${quiz.id}`}>
                    <p className="text-sm text-green-600">
                      Test your knowledge and earn coins!
                    </p>
                  </Link>
                  {completedQuizzes.includes(quiz.id) && (
                    <p className="text-sm text-gray-600">Completed</p> // Static text for completed quizzes
                  )}
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
                <div
                  key={resource.id}
                  className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300"
                >
                  <h3 className="font-semibold text-purple-800">
                    {resource.name}
                  </h3>
                  <button
                    onClick={() => unlockResource(resource)}
                    disabled={unlockedResources.includes(resource.id)}
                    className={`px-4 py-2 rounded-full font-bold text-white ${
                      unlockedResources.includes(resource.id)
                        ? "bg-green-500"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    <span className="flex items-center">
                      <Unlock className="w-4 h-4 mr-1" />
                      {unlockedResources.includes(resource.id)
                        ? "Open"
                        : "Open"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
