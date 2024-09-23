import { Info, ExternalLink } from 'lucide-react';

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

export default function NASASeaLevelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-purple-600 p-4 md:p-8 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            NASA Sea Level Data
          </h1>
          <div className="relative group">
            <button className="bg-white/10 border border-white/20 hover:bg-white/20 p-2 rounded-full">
              <Info className="h-4 w-4 text-white" />
            </button>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white text-gray-700 text-xs rounded-lg py-1 px-2 shadow-lg">
              Explore real-time sea level data from NASA
            </div>
          </div>
        </header>

        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-indigo-800">Global Sea Level Rise</h2>
            <p className="text-gray-500">
              Interactive visualization by NASA's Global Climate Change: Vital Signs of the Planet
            </p>
          </div>
          <div className="p-4">
            <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
              <iframe
                src="https://eyes.nasa.gov/apps/earth/#/vital-signs/sea-level/ocean-climate-measurements-monthly"
                title="NASA Sea Level Data Visualization"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-sm text-indigo-700">
              <p>
                This interactive tool shows how sea levels are changing over time. You can explore
                different time periods and see how sea levels have risen globally.
              </p>
              <p className="mt-2 font-semibold">Key points:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Sea levels are rising due to global warming</li>
                <li>Melting ice sheets and glaciers contribute to sea level rise</li>
                <li>Coastal areas are at risk from rising seas</li>
              </ul>
              <div className="mt-4 flex justify-end">
                <a
                  href="https://climate.nasa.gov/vital-signs/sea-level/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Learn more on NASA's website
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
