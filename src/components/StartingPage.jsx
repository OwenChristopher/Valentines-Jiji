import React, { useContext, useState, useEffect } from 'react';
import { MusicContext } from '../contexts/MusicContext';
import Book from './Book';

const StartingPage = () => {
  const { /* startMusic, */ } = useContext(MusicContext); 
  // We'll actually call startMusic from Book, so we don't call it directly here.

  const [started, setStarted] = useState(false); // Once the book is opened

  const [hearts, setHearts] = useState([]);

  // Function to create a new heart
  const createHeart = () => {
    const heart = {
      id: Date.now(),
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 3,
      scale: 0.5 + Math.random() * 1,
      opacity: 0.3 + Math.random() * 0.7
    };
    setHearts(prevHearts => [...prevHearts, heart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(h => h.id !== heart.id));
    }, heart.animationDuration * 1000);
  };

  // Create hearts periodically
  useEffect(() => {
    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  // Called by the Book once it’s actually opened
  const handleBookOpened = () => {
    setStarted(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 to-rose-200">
      {/* Animated floating hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-pink-400 animate-float-up"
            style={{
              left: `${heart.left}%`,
              animation: `floatUp ${heart.animationDuration}s linear`,
              fontSize: `${heart.scale * 24}px`,
              opacity: heart.opacity
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Soft overlay that pulses */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 animate-pulse" />

      {/* Book container, centered */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {/* Pass a callback to Book so we know when it's opened */}
        <Book onOpen={handleBookOpened} />
      </div>

      {/* Instruction text (only show if not started) */}
      {!started && (
        <div className="absolute bottom-20 left-0 right-0 text-center animate-bounce">
          <p className="text-rose-700 text-xl font-semibold drop-shadow-lg">
            Click the book to open your gift...
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StartingPage;
