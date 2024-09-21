import { Star, Rocket } from 'lucide-react';

const Header = ({ coins, level }) => (
  <header className="mb-8">
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mb-4 text-center">
        GreenSpace Explorer
      </h1>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
      <div className="bg-yellow-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform rotate-3 hover:rotate-0 transition-transform">
        <Star className="w-5 h-5 mr-2" />
        {coins} Coins
      </div>
      <div className="bg-green-300 text-indigo-800 px-4 py-2 rounded-full font-bold flex items-center transform -rotate-3 hover:rotate-0 transition-transform">
        <Rocket className="w-5 h-5 mr-2" />
        Level {level}
      </div>
    </div>
  </header>
);

export default Header;
