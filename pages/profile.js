"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Award, Trophy, Target, Zap, ChevronRight, Book, Users } from "lucide-react";

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

export default function ProfilePage() {
  const [xp, setXp] = useState(750);
  const [level, setLevel] = useState(5);
  const xpToNextLevel = 1000;

  const userStats = [
    { icon: Star, label: "Points", value: "1,234" },
    { icon: Trophy, label: "Achievements", value: "15" },
    { icon: Target, label: "Quizzes Completed", value: "23" },
    { icon: Book, label: "Lessons Completed", value: "18" },
    { icon: Zap, label: "Current Streak", value: "7 days" },
    { icon: Users, label: "Friends", value: "42" },
  ];

  const recentAchievements = [
    "Climate Champion",
    "Quiz Master",
    "Eco Warrior",
    "Green Thumb",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-4 md:p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            EcoWarrior Profile
          </h1>
          <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform -rotate-3 hover:rotate-0 transition-transform">
            <Star className="w-5 h-5 mr-2" />
            1,234 Points
          </div>
        </header>

        <main className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-indigo-600">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile picture"
                  className="w-full h-full rounded-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-indigo-100 rounded-full">EW</span>
              </div>
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">EcoWarrior123</h2>
              <span className="px-4 py-1 bg-yellow-400 text-indigo-800 rounded-full font-semibold">Level {level} Explorer</span>
              <div className="w-full max-w-xs mt-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-indigo-600">XP Progress</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${(xp / xpToNextLevel) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    ></div>
                  </div>
                  <p className="text-sm text-indigo-600 text-center">
                    {xp} / {xpToNextLevel} XP to Level {level + 1}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-indigo-50 rounded-lg p-4 flex items-center"
                  >
                    <stat.icon className="w-8 h-8 text-indigo-500 mr-3" />
                    <div>
                      <p className="text-sm text-indigo-600">{stat.label}</p>
                      <p className="text-lg font-semibold text-indigo-800">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">Recent Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-green-100 rounded-lg p-4 flex flex-col items-center text-center"
                >
                  <Award className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-sm font-medium text-green-800">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 flex justify-end">
            <button className="flex items-center px-6 py-3 rounded-full bg-indigo-500 text-white font-bold transition-all hover:bg-indigo-600 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
              View All Achievements <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
