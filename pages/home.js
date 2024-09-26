import React from 'react'
import { Rocket, Book, Award, Globe, Zap, Users, Star, Sun, Moon, Cloud, Wind, Droplet, ThermometerSun, Factory, TreeDeciduous } from 'lucide-react'

const UpdatedLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 text-white">
      {/* Rectangular background design */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-indigo-700 opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <header className="relative container mx-auto px-4 py-24 text-center">
        <h1 
          className="text-6xl md:text-7xl font-bold mb-6 text-yellow-300 animate-float" 
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          GreenSpace Explorer
        </h1>
        <p className="text-2xl md:text-3xl mb-8 animate-pulse">
          Your cosmic journey to save Earth begins here!
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 animate-bounce">
          Launch Your Adventure
        </button>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Rocket className="w-12 h-12 text-yellow-300" />
        </div>
      </header>

      {/* SDG 13 Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">SDG 13: Climate Action</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl mb-6">
                Climate change is not just an environmental issue; it's a call to action for every inhabitant of Earth. Our mission is to educate and inspire the next generation of climate heroes.
              </p>
              <p className="text-xl mb-6">
                Through interactive lessons, engaging quizzes, and real-world challenges, we're turning complex climate science into an exciting space adventure.
              </p>
              <p className="text-xl">
                Join us in this crucial mission to protect our home planet and secure a sustainable future for all life forms across the galaxy!
              </p>
            </div>
            <div className="relative">
              <Globe className="w-64 h-64 text-blue-400 mx-auto animate-spin-slow" />
              <Cloud className="absolute top-0 left-0 w-16 h-16 text-white animate-float" />
              <Sun className="absolute top-1/4 right-0 w-20 h-20 text-yellow-400 animate-pulse" />
              <Wind className="absolute bottom-1/4 left-0 w-16 h-16 text-green-300 animate-float" />
              <Droplet className="absolute bottom-0 right-1/4 w-12 h-12 text-blue-300 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Explore Our Cosmic Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Book className="w-16 h-16 text-yellow-300" />}
              title="Interactive Lessons"
              description="Embark on thrilling space missions that teach you about climate change, renewable energy, and sustainable practices."
              animation="animate-float"
            />
            <FeatureCard
              icon={<Award className="w-16 h-16 text-yellow-300" />}
              title="Galactic Quizzes"
              description="Test your knowledge in our space-themed quizzes and earn cosmic badges to showcase your expertise."
              animation="animate-pulse"
            />
            <FeatureCard
              icon={<Globe className="w-16 h-16 text-yellow-300" />}
              title="3D Climate Map"
              description="Navigate through an immersive 3D globe to visualize climate data, extreme weather events, and conservation efforts."
              animation="animate-spin-slow"
            />
          </div>
        </div>
      </section>

      {/* Climate Action: Causes, Effects, and Solutions Section */}
      <section className="py-24 bg-indigo-800 bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Climate Action: Our Cosmic Mission</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <ClimateCard
              icon={<Factory className="w-16 h-16 text-red-400" />}
              title="Causes"
              items={[
                "Greenhouse gas emissions",
                "Deforestation",
                "Industrial processes",
                "Transportation",
                "Agriculture and livestock"
              ]}
            />
            <ClimateCard
              icon={<ThermometerSun className="w-16 h-16 text-yellow-400" />}
              title="Effects"
              items={[
                "Rising global temperatures",
                "Extreme weather events",
                "Melting ice caps and rising sea levels",
                "Biodiversity loss",
                "Food and water insecurity"
              ]}
            />
            <ClimateCard
              icon={<TreeDeciduous className="w-16 h-16 text-green-400" />}
              title="Solutions"
              items={[
                "Renewable energy adoption",
                "Sustainable transportation",
                "Reforestation and conservation",
                "Sustainable agriculture",
                "Education and awareness"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Your Intergalactic Adventure</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Earn Stellar Rewards</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-300 mr-4 animate-spin-slow" />
                  Collect cosmic coins for completing eco-friendly missions
                </li>
                <li className="flex items-center">
                  <Zap className="w-8 h-8 text-yellow-300 mr-4 animate-pulse" />
                  Level up your space explorer rank and unlock new planets
                </li>
                <li className="flex items-center">
                  <Award className="w-8 h-8 text-yellow-300 mr-4 animate-bounce" />
                  Earn achievement badges for your intergalactic profile
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Compete Across the Cosmos</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center">
                  <Users className="w-8 h-8 text-yellow-300 mr-4 animate-float" />
                  Form or join cosmic crews for collaborative challenges
                </li>
                <li className="flex items-center">
                  <Rocket className="w-8 h-8 text-yellow-300 mr-4 animate-bounce" />
                  Race to the top of the galactic leaderboard
                </li>
                <li className="flex items-center">
                  <Globe className="w-8 h-8 text-yellow-300 mr-4 animate-spin-slow" />
                  Participate in global climate action events and competitions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section
      <section className="py-24 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Voices from the Galaxy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="GreenSpace Explorer made learning about climate change fun and exciting for my students!"
              author="Ms. Stella, 5th Grade Teacher"
              avatar="/placeholder.svg?height=64&width=64"
            />
            <TestimonialCard
              quote="I've learned so much about sustainability while having a blast on cosmic adventures!"
              author="Alex, Age 12"
              avatar="/placeholder.svg?height=64&width=64"
            />
            <TestimonialCard
              quote="This platform is revolutionizing how we teach environmental science to young minds."
              author="Dr. Cosmos, Climate Scientist"
              avatar="/placeholder.svg?height=64&width=64"
            />
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Save the Planet?</h2>
        <p className="text-2xl mb-12">Join thousands of space explorers on the mission of a lifetime!</p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 animate-pulse">
          Blast Off into Adventure!
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 GreenSpace Explorer. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-yellow-300 transition-colors">About Us</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description, animation }) => (
  <div className={`bg-indigo-800 bg-opacity-50 p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105 ${animation}`}>
    <div className="flex justify-center mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-lg">{description}</p>
  </div>
)

const ClimateCard = ({ icon, title, items }) => (
  <div className="bg-indigo-700 bg-opacity-50 p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105">
    <div className="flex justify-center mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <ul className="text-left">
      {items.map((item, index) => (
        <li key={index} className="mb-2 flex items-start">
          <Star className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

const TestimonialCard = ({ quote, author, avatar }) => (
  <div className="bg-indigo-800 bg-opacity-50 p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105">
    <p className="text-lg mb-4 italic">"{quote}"</p>
    <div className="flex items-center">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4" />
      <p className="font-bold">{author}</p>
    </div>
  </div>
)

export default UpdatedLandingPage