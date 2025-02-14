// src/contexts/MusicContext.jsx
import React, { createContext, useRef, useState } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  // Create a ref to store the audio element.
  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);

  // Initialize audio on first use.
  if (!audioRef.current) {
    // Adjust the path to where your audio file is located (e.g., public/assets/music.mp3)
    audioRef.current = new Audio('/assets/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8;
  }

  const startMusic = () => {
    if (!musicStarted) {
      // Attempt to play the audio (user gesture should allow playback)
      audioRef.current.play().catch((error) => {
        console.error('Error playing music:', error);
      });
      setMusicStarted(true);
    }
  };

  return (
    <MusicContext.Provider value={{ startMusic, audioRef }}>
      {children}
    </MusicContext.Provider>
  );
};
