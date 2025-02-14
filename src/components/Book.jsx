import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Book.css';

const Book = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      // Wait for the animation to finish before navigating
      setTimeout(() => navigate('/page1'), 1800);
    }
  };

  return (
    <div className="book-container">
      <div className={`book ${open ? 'open' : ''}`} onClick={handleClick}>
        {/* Pages container zooms in when open */}
        <div className={`pages ${open ? 'pages-zoom' : ''}`}>
          <div className="page page3"></div>
          <div className="page page2"></div>
          <div className="page page1"></div>
        </div>
        
        {/* The cover rotates open from the left edge */}
        <div className={`cover front-cover ${open ? 'cover-open' : ''}`}>
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
        
        <div className="spine"></div>
        <div className="ribbon"></div>
      </div>
      
      <div className="shadow"></div>
    </div>
  );
};

export default Book;
