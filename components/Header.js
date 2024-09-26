import React, { useEffect, useState } from 'react'
import { Star, Rocket, User, Medal, Moon, Sun } from 'lucide-react'
import Link from "next/link"
const Header = ({ coins }) => {
  const [level, setLevel] = useState(1)
  const [levelName, setLevelName] = useState('') // New state for level name
  const [badges, setBadges] = useState([])
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
  const [username, setUsername] = useState('')

// Badge name criteria
const badgeCriteria = {
  'Carbon Footprint Neutralizer': 30,
  'Sustainability Pioneer': 70,
  'GHG Emissions Reducer': 120,
  'Eco-Friendly Warrior': 180,
  'Greenhouse Guardian': 240,
  'Climate Champion': 300,
  'Renewable Energy Advocate': 400,
  'Sustainable Innovator': 500,
  'Planet Protector': 600,
}

// Level name criteria
const levelNames = {
  1: 'Eco Star Walker',
  2: 'Carbon Explorer',
  3: 'Sustainability Adventurer',
  4: 'GHG Navigator',
  5: 'Green Planet Voyager',
  6: 'Eco Galaxy Explorer',
  7: 'Carbon Neutral Master',
  8: 'Climate Commander',
  9: 'Sustainability Guardian',
}


  // Function to load data from localStorage
  const loadDataFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedLevel = JSON.parse(localStorage.getItem('userLevel')) || 1
      const storedProfilePhotoUrl = localStorage.getItem('profilePhotoUrl') || ''
      const storedUsername = localStorage.getItem('username') || ''
      const storedBadges = JSON.parse(localStorage.getItem('userBadges')) || []
      const storedLevelName = localStorage.getItem('levelName') || levelNames[1]

      // Update state with the loaded data
      setLevel(storedLevel)
      setProfilePhotoUrl(storedProfilePhotoUrl)
      setUsername(storedUsername)
      setBadges(storedBadges)
      setLevelName(storedLevelName)
    }
  }

  // Function to determine level based on coins
  const determineLevel = (coins) => {
    if (coins <= 30) return 1
    else if (coins <= 70) return 2
    else if (coins <= 120) return 3
    else if (coins <= 180) return 4
    else if (coins <= 240) return 5
    else if (coins <= 300) return 6
    else if (coins <= 400) return 7
    else if (coins <= 500) return 8
    else return 9
  }

  // Function to check and award badges
  const checkAndAwardBadges = (coins) => {
    const newBadges = [...badges]
    Object.keys(badgeCriteria).forEach((badgeName) => {
      if (coins >= badgeCriteria[badgeName] && !newBadges.includes(badgeName)) {
        newBadges.push(badgeName)
      }
    })

    setBadges(newBadges)
    localStorage.setItem('userBadges', JSON.stringify(newBadges))
  }

  // Function to update level and level name based on coins
  const updateLevelAndName = (coins) => {
    const newLevel = determineLevel(coins)
    setLevel(newLevel)
    const newLevelName = levelNames[newLevel] || levelNames[1]
    setLevelName(newLevelName)
    localStorage.setItem('userLevel', JSON.stringify(newLevel))
    localStorage.setItem('levelName', newLevelName)
  }

  useEffect(() => {
    loadDataFromLocalStorage() // Load data when component mounts
  }, [])

  useEffect(() => {
    checkAndAwardBadges(coins) // Check badges when coins update
    updateLevelAndName(coins) // Update level and level name when coins update
  }, [coins])

  return (
    <header className="mb-8">
      <div className="flex flex-col items-center mb-6">
<Link href="/dashboard">       <h1
          className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mb-2 text-center"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          GreenSpace Explorer
        </h1></Link> 
        <div className="flex items-center space-x-2">
          <Moon className="w-5 h-5 text-blue-300" />
          <Sun className="w-6 h-6 text-yellow-400" />
          <Moon className="w-5 h-5 text-blue-300" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform hover:scale-105 transition-transform">
            <Star className="w-5 h-5 mr-2" />
            {coins} Coins
          </div>

          <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform hover:scale-105 transition-transform">
            <Rocket className="w-5 h-5 mr-2" />
            Level {level} - {levelName} {/* Display level and level name */}
          </div>
        </div>

   <div className="bg-indigo-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform hover:scale-105 transition-transform">
          {profilePhotoUrl ? (
            <img
              src={profilePhotoUrl}
              alt={username || "User's profile"}
              className="w-8 h-8 rounded-full mr-2 border-2 border-indigo-800"
            />
          ) : (
            <User className="w-6 h-6 mr-2" />
          )}
          <Link href="/profile">       {username || 'Space Explorer'}</Link>  
        </div>
      </div>

      {/* Cosmic Achievements */}
      <div className="mt-6 bg-indigo-800 bg-opacity-50 p-4 rounded-lg flex justify-center items-center flex-col">
        <h3 className="text-lg font-semibold text-yellow-300 mb-2 text-center">
          Cosmic Achievements:
        </h3>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-indigo-900 px-3 py-1 rounded-full flex items-center text-sm font-medium shadow-md transform hover:scale-105 transition-transform"
              >
                <Medal className="w-4 h-4 mr-2" /> {badge}
              </div>
            ))
          ) : (
            <p className="text-white italic text-center">
              No cosmic achievements yet. Keep exploring!
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
