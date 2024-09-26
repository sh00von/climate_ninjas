'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Book,ArrowDownToDot , Award, Globe, Zap, Users, Star, Sun, Cloud, Wind, Droplet, ThermometerSun, Factory, TreeDeciduous, Leaf, Recycle, Lightbulb } from 'lucide-react'

const UpdatedLandingPage = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated star background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <header className="relative container mx-auto px-4 py-32 text-center">
        <motion.h1 
          className="text-7xl md:text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          GreenSpace Explorer
        </motion.h1>
        <motion.p 
          className="text-2xl md:text-3xl mb-12 text-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          🌍✨ Embark on an Epic Cosmic Quest to Save Our Planet!
        </motion.p>
        <Link href="#section2">
        <motion.button 
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Launch Your Eco-Adventure
        </motion.button>
        </Link>
        <div className="flex items-center justify-center">
  <motion.div 
    className="absolute bottom-4"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <Rocket className="w-16 h-16 text-blue-300" />
  </motion.div>
</div>

      </header>

      {/* SDG 13 Section */}
      <section className="relative py-32 overflow-hidden" id="section2">
        <div className="container mx-auto px-4 relative">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-16 text-center text-green-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🌱 SDG 13: Climate Action
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-xl mb-8 leading-relaxed text-justify">
                Imagine a world where every action you take helps heal our planet. 🌎✨ Climate change is not just a challenge; it's an opportunity for you to become a hero in the fight for our future!
              </p>
              <p className="text-xl mb-8 leading-relaxed text-justify">
                With our interactive lessons and thrilling space missions, you'll uncover the secrets of climate science while embarking on an epic adventure through the cosmos. 🚀
              </p>
              <p className="text-xl leading-relaxed text-justify">
                Are you ready to join forces with fellow explorers and protect our home? Together, we can create a sustainable future for all life forms across the galaxy! 🌌
              </p>
            </motion.div>
            <motion.div 
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-80 h-80 text-blue-400 mx-auto" />
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
              >
                <Cloud className="absolute top-0 left-1/4 w-16 h-16 text-white" />
                <Sun className="absolute top-1/4 right-0 w-20 h-20 text-yellow-400" />
                <Wind className="absolute bottom-1/4 left-0 w-16 h-16 text-green-300" />
                <Droplet className="absolute bottom-0 right-1/4 w-12 h-12 text-blue-300" />
              </motion.div>
            </motion.div>
          </div>
          
        </div>
        <Link href="#section3"><div className="flex items-center justify-center ">
  <motion.div 
    className="absolute mt-8"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <ArrowDownToDot className="w-16 h-16  text-blue-300" />
  </motion.div>
        </div></Link>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-purple-900 to-slate-900" id="section3">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-20 text-center text-blue-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🚀 Explore Our Stellar Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-16">
            <FeatureCard
              icon={<Book className="w-20 h-20 text-green-400" />}
              title="Interactive Lessons"
              description="Embark on thrilling space missions that teach you about climate change, renewable energy, and sustainable practices. Each lesson is a new adventure waiting to unfold!"
              delay={0.2}
            />
            <FeatureCard
              icon={<Award className="w-20 h-20 text-yellow-400" />}
              title="Galactic Achievements"
              description="Conquer space-themed challenges and earn cosmic badges! Showcase your expertise as you level up and become a true climate champion."
              delay={0.4}
            />
            <FeatureCard
              icon={<Globe className="w-20 h-20 text-blue-400" />}
              title="3D Climate Explorer"
              description="Navigate an immersive 3D globe that brings climate data to life! Visualize extreme weather events and conservation efforts like never before."
              delay={0.6}
            />
          </div>
        </div>        <Link href="#section4"><div className="flex items-center justify-center ">
  <motion.div 
    className="absolute mt-8"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <ArrowDownToDot className="w-16 h-16  text-blue-300" />
  </motion.div>
        </div></Link>
      </section>

      {/* Climate Action: Causes, Effects, and Solutions Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-purple-900" id="section4">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-20 text-center text-green-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🌍 Climate Action: Our Cosmic Mission
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-16">
            <ClimateCard
              icon={<Factory className="w-20 h-20 text-red-400" />}
              title="Causes"
              items={[
                "🏭 Industrial emissions",
                "🌳 Deforestation",
                "🚗 Transportation",
                "🐄 Agriculture",
                "🏠 Energy consumption"
              ]}
              delay={0.2}
            />
            <ClimateCard
              icon={<ThermometerSun className="w-20 h-20 text-yellow-400" />}
              title="Effects"
              items={[
                "🌡️ Rising temperatures",
                "🌪️ Extreme weather",
                "🌊 Rising sea levels",
                "🐾 Biodiversity loss",
                "🍎 Food insecurity"
              ]}
              delay={0.4}
            />
            <ClimateCard
              icon={<Leaf className="w-20 h-20 text-green-400" />}
              title="Solutions"
              items={[
                "☀️ Renewable energy",
                "🚲 Sustainable transport",
                "🌱 Reforestation",
                "♻️ Circular economy",
                "📚 Climate education"
              ]}
              delay={0.6}
            />
          </div>
        </div>        <Link href="#section5"><div className="flex items-center justify-center ">
  <motion.div 
    className="absolute mt-8"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <ArrowDownToDot className="w-16 h-16  text-blue-300" />
  </motion.div>
        </div></Link>
      </section>

      {/* Gamification Section */}
      <section className="py-32 bg-gradient-to-b from-purple-900 to-slate-900" id="section5">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-20 text-center text-blue-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            🌌 Your Intergalactic Adventure Awaits
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16">
            <GamificationCard
              title="✨ Earn Stellar Rewards"
              items={[
                { icon: <Star className="w-10 h-10 text-yellow-400" />, text: "Collect cosmic coins for eco-friendly missions" },
                { icon: <Zap className="w-10 h-10 text-blue-400" />, text: "Level up and unlock new planets to explore" },
                { icon: <Award className="w-10 h-10 text-green-400" />, text: "Earn badges for your intergalactic profile" }
              ]}
              delay={0.2}
            />
            <GamificationCard
              title="🌠 Compete Across the Cosmos"
              items={[
                { icon: <Users className="w-10 h-10 text-purple-400" />, text: "Form cosmic crews for collaborative challenges" },
                { icon: <Rocket className="w-10 h-10 text-red-400" />, text: "Race to the top of the galactic leaderboard" },
                { icon: <Globe className="w-10 h-10 text-blue-400" />, text: "Join global climate action events" }
              ]}
              delay={0.4}
            />
          </div>
        </div>        <Link href="#section6"><div className="flex items-center justify-center ">
  <motion.div 
    className="absolute mt-8"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <ArrowDownToDot className="w-16 h-16  text-blue-300" />
  </motion.div>
        </div></Link>
      </section>

      {/* Call to Action */}
      <section className="py-32 text-center bg-gradient-to-b from-slate-900 to-purple-900" id="section6">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-8 text-green-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🚀 Ready to Save the Planet?
        </motion.h2>
        <motion.p 
          className="text-2xl mb-12 text-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Join thousands of space explorers on the mission of a lifetime!
        </motion.p>
        <motion.button 
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Blast Off into Adventure!
        </motion.button>
      </section>

      {/* Footer */}
      {/* <footer className="bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-blue-200">© 2024 GreenSpace Explorer. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-green-300 hover:text-green-400 transition-colors">About Us</a>
            <a href="#" className="text-green-300 hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-green-300 hover:text-green-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-green-300 hover:text-green-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div 
    className="bg-slate-800 bg-opacity-50 p-8 rounded-3xl text-center transform transition-all duration-300 hover:scale-105 shadow-lg border border-purple-500"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    <motion.div 
      className="flex justify-center mb-6"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-bold mb-4 text-blue-300">{title}</h3>
    <p className="text-lg text-gray-300">{description}</p>
  </motion.div>
)

const ClimateCard = ({ icon, title, items, delay }) => (
  <motion.div 
    className="bg-slate-800 bg-opacity-50 p-8 rounded-3xl text-center transform transition-all duration-300 hover:scale-105 shadow-lg border border-green-500"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    <motion.div 
      className="flex justify-center mb-6"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-bold mb-6 text-green-300">{title}</h3>
    <ul className="text-left space-y-4">
      {items.map((item, index) => (
        <motion.li 
          key={index} 
          className="flex items-center text-gray-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + index * 0.1 }}
        >
          <Leaf className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
)

const GamificationCard = ({ title, items, delay }) => (
  <motion.div 
    className="bg-slate-800 bg-opacity-50 p-8 rounded-3xl transform transition-all duration-300 hover:scale-105 shadow-lg border border-blue-500"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    <h3 className="text-3xl font-bold mb-8 text-blue-300">{title}</h3>
    <ul className="space-y-6">
      {items.map((item, index) => (
        <motion.li 
          key={index} 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + index * 0.1 }}
        >
          <motion.div 
            className="mr-4 flex-shrink-0"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {item.icon}
          </motion.div>
          <span className="text-xl text-gray-300">{item.text}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
)

export default UpdatedLandingPage