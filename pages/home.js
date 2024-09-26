import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Book, Globe, PenTool, Zap, Award, Rocket } from 'lucide-react';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-blue-900 text-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/stars-bg.png")',
            backgroundSize: 'cover',
            y: y1,
          }}
        />
        <motion.div 
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: 'url("/planet-earth.png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            y: y2,
          }}
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mb-6">
            Join the Climate Action Adventure!
          </h1>
          <p className="text-xl md:text-2xl mb-8">Embark on a Cosmic Journey to Save Our Planet!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition duration-300"
          >
            Start Your Adventure
          </motion.button>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 bg-indigo-800 bg-opacity-50 text-center">
        <h2 className="text-5xl font-bold text-yellow-400 mb-6">What is SDG 13?</h2>
        <p className="text-lg mb-8">
          SDG 13 calls for urgent action to combat climate change and its impacts. 
          Climate change affects everyone, and by acting now, we can make a difference!
        </p>
        <p className="text-lg mb-4"><strong>Key Statistics:</strong></p>
        <ul className="list-disc list-inside mb-8">
          <li>🌍 Global temperatures have risen by 1.2°C since pre-industrial times.</li>
          <li>🔥 Climate-related disasters displace millions of people every year.</li>
          <li>🌱 Transitioning to renewable energy could create 24 million jobs globally by 2030.</li>
        </ul>
      </section>

      {/* Learning Journey */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-yellow-400 mb-12">Your Learning Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { icon: <Book className="w-16 h-16 text-green-400" />, title: '1. Explore', description: 'Dive into interactive lessons about climate change, its causes, and impacts on our planet.' },
              { icon: <PenTool className="w-16 h-16 text-blue-400" />, title: '2. Test Your Knowledge', description: 'Take fun quizzes to check your understanding and earn cosmic badges!' },
              { icon: <Zap className="w-16 h-16 text-yellow-400" />, title: '3. Take Action', description: 'Learn how to make a real difference with practical climate action steps.' },
            ].map(({ icon, title, description }, index) => (
              <div key={index} className="bg-indigo-700 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 text-center">
                {icon}
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosmic Features Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/constellation-bg.png")',
            backgroundSize: 'cover',
            y: y3,
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-yellow-400 mb-12 text-center">Cosmic Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: <Globe className="w-12 h-12 text-blue-400" />, title: 'Interactive Climate Maps', description: 'Explore how climate change affects different parts of the world with our interactive global maps.' },
              { icon: <PenTool className="w-12 h-12 text-green-400" />, title: 'Climate Action Quizzes', description: 'Test your knowledge with fun, engaging quizzes and earn cosmic badges as you learn!' },
              { icon: <Rocket className="w-12 h-12 text-red-400" />, title: 'Virtual Climate Missions', description: 'Embark on virtual missions to solve climate challenges and save ecosystems around the world.' },
              { icon: <Award className="w-12 h-12 text-yellow-400" />, title: 'Progress Tracking', description: 'Track your learning journey, earn achievements, and become a certified Climate Action Hero!' },
            ].map(({ icon, title, description }, index) => (
              <div key={index} className="bg-indigo-700 bg-opacity-75 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                {icon}
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-indigo-800 bg-opacity-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-yellow-400 mb-8">Ready to Save the Planet?</h2>
          <p className="text-xl mb-8">
            Join our team of young climate champions and start your exciting journey to protect our Earth!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition duration-300"
          >
            Begin Your Mission
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-center py-8">
        <p>&copy; 2024 SDG 13 Climate Action Education. Empowering young heroes to save the planet!</p>
      </footer>
    </div>
  );
};

export default Home;
