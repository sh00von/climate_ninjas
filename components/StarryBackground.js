import React, { useEffect, useState } from 'react';

const StarryBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = [...Array(300)].map((_, i) => {
      const size = Math.random() * 3 + 1;
      const animationDuration = Math.random() * 8 + 4;
      const driftAnimation = Math.random() < 0.5 ? 'driftLarge' : 'driftSmall';

      return {
        key: i,
        size,
        animationDuration,
        driftAnimation,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      };
    });

    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-indigo-900">
        {stars.map((star) => (
          <div
            key={star.key}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${Math.random() * 3 + 2}s linear infinite, ${star.driftAnimation} ${star.animationDuration}s ease-in-out infinite`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 5 + 5;

          return (
            <div
              key={`yellow-${i}`}
              className="absolute rounded-full bg-yellow-300"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `twinkle ${Math.random() * 3 + 1}s linear infinite`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StarryBackground; // Ensure default export
