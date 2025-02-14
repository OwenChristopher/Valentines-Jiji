import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../contexts/MusicContext';
import './Book.css';

const Book = ({ onOpen }) => {
  const [open, setOpen] = useState(false);
  const { startMusic } = useContext(MusicContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation(); // prevent any parent onClick from firing
    if (!open) {
      setOpen(true);
      // Start music the moment the book is clicked
      startMusic();
      // Tell parent (StartingPage) we've opened the book
      if (onOpen) onOpen();

      // Optionally navigate after 1.8s (matching your cover animation time)
      setTimeout(() => navigate('/page1'), 1800);
    }
  };

  return (
    <div className="book-container">
      <div className={`book ${open ? 'open' : ''}`} onClick={handleClick}>
        {/* PAGES */}
        <div className="pages">
          <div className="page page3"></div>
          <div className="page page2"></div>
          <div className="page page1"></div>
        </div>

        {/* COVER */}
        <div className="cover front-cover">
          <div className="cover-content">
            <div className="title-container">
              <h1 className="title">Valentines for Jiji</h1>
              <div className="decorative-line"></div>
            </div>
            <div className="hearts-container">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`floating-heart heart-${i + 1}`}>♥</div>
              ))}
            </div>
          </div>
        </div>

        {/* Spine and ribbon */}
        <div className="spine"></div>
        <div className="ribbon"></div>
      </div>
      <div className="shadow"></div>
    </div>
  );
};

export default Book;
