"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Users, Trophy, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Head from 'next/head'
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
  const [userBadges, setUserBadges] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [userLevel, setUserLevel] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("userLevel")) || 0;
    }
    return 0;
  });
  
  const [coins, setCoins] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("totalPoints")) || 0;
    }
    return 0;
  });

  const [username, setUsername] = useState(""); // New state for username
  const [levelName, setLevelName] = useState(() => {
    if (typeof window !== 'undefined') {
      // Try to get the levelName from localStorage
      const storedLevelName = localStorage.getItem("levelName");
      // Return the stored value if it exists; otherwise, return an empty string
      return storedLevelName ? storedLevelName : "";
    }
    return ""; // Fallback for SSR or if window is not defined
  });
  

  useEffect(() => {
    // Retrieve badges from localStorage
    const badges = JSON.parse(localStorage.getItem("userBadges")) || [];
    setUserBadges(badges);

    // Retrieve completed lessons from localStorage
    const lessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
    setCompletedLessons(lessons);

    // Retrieve user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    setUsername(userInfo.username || "Guest"); // Set username from userInfo
  }, []);

  const totalBadges = userBadges.length;
  const totalLessons = completedLessons.length;
  const userStats = [
    { label: "Coins", value: coins, icon: DollarSign },
    { label: "Total Badges", value: totalBadges, icon: Award },
    { label: "Total Lessons", value: totalLessons, icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-4 md:p-8 relative overflow-hidden">
    <Head>
    <title>
    Profile
    </title>
    </Head>

      <StarryBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <Header coins={coins} /> {/* Pass coins and level to Header */}

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
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">{username}</h2> {/* Display username */}
              <span className="px-4 py-1 bg-yellow-400 text-indigo-800 rounded-full font-semibold my-2">Level {userLevel}  </span>
              <span className="px-4 py-1 bg-yellow-400 text-indigo-800 rounded-full font-semibold">{levelName} </span>
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

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">Recent Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userBadges.length > 0 ? (
                userBadges.map((achievement, index) => (
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
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-2 md:col-span-4">No badges available.</p>
              )}
            </div>
          </div>

          {/* Additional buttons or components can be added here */}
          
        </main>
      </div>
    </div>
  );
}
