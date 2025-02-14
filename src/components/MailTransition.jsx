import React, { useState, useEffect, useRef } from "react";
import "./MailTransition.css";

function MailTransition() {
  // Envelope states: 1=locked, 2=unlocked, 3=fully opened
  const [envelopeStage, setEnvelopeStage] = useState(1);

  // "Will you be my valentine?" overlay
  const [showOverlay, setShowOverlay] = useState(false);

  // "No" button runaway
  const [noButtonPosition, setNoButtonPosition] = useState({
    top: "60%",
    left: "50%",
  });
  const overlayRef = useRef(null);

  // Hearts for the falling background
  const [hearts, setHearts] = useState([]);

  // Whether to show the letter & cards/roses after fully opening
  const [showLetter, setShowLetter] = useState(false);

  // Controls the envelope's "opening" CSS animation
  const [envelopeOpenAnimation, setEnvelopeOpenAnimation] = useState(false);

  // Card modal state
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Photo cards
  const photoCards = [
    {
      id: 1,
      src: "/assets/pic1.jpeg",
      text: "I love her! if only she knew... I think she does though!",
    },
    { id: 2, src: "/assets/pic2.jpeg", text: "MINE! AND ONLY MINE!!!" },
    {
      id: 3,
      src: "/assets/pic3.jpeg",
      text: "dog person btw, oh uhummmm. pretty no matter what she does",
    },
    { id: 4, src: "/assets/pic4.jpeg", text: "us togetherrr!!" },
    { id: 5, src: "/assets/pic5.jpeg", text: "look at usss!!!!" },
    {
      id: 6,
      src: "/assets/pic6.jpeg",
      text: "WHO IS THIS BEAUTIFUL, GORGEOUS, PRETTY, CUTE GIRL??? IM SO IN LOVE!",
    },
  ];

  // Generate hearts at intervals
  const createHeart = () => {
    const id = Date.now() + Math.random();
    const heart = {
      id,
      left: Math.random() * 100,
      animationDuration: 4 + Math.random() * 3, // 4-7s
      fontSize: 20 + Math.random() * 30,
      opacity: 0.7 + Math.random() * 0.3,
    };
    setHearts((prev) => [...prev, heart]);

    // Remove the heart after its animation ends
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, heart.animationDuration * 1000);
  };

  useEffect(() => {
    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  // Envelope click logic
  const handleEnvelopeClick = () => {
    if (envelopeStage === 1) {
      // Show "Valentine?" overlay
      setShowOverlay(true);
    } else if (envelopeStage === 2) {
      // Trigger opening animation
      setEnvelopeOpenAnimation(true);
      setTimeout(() => {
        setEnvelopeStage(3);
        setEnvelopeOpenAnimation(false);
      }, 700);
    }
  };

  // "Yes" => close overlay, unlock envelope (stage 2)
  const handleYes = () => {
    setShowOverlay(false);
    setEnvelopeStage(2);
  };

  // "No" => run away but stay on screen
  const handleNoHover = () => {
    if (!overlayRef.current) return;
    const overlayRect = overlayRef.current.getBoundingClientRect();

    const btnWidth = 90;
    const btnHeight = 44;
    const margin = 20;

    const maxLeft = overlayRect.width - btnWidth - margin;
    const maxTop = overlayRect.height - btnHeight - margin;

    const randLeft = Math.random() * (maxLeft - margin) + margin;
    const randTop = Math.random() * (maxTop - margin) + margin;

    setNoButtonPosition({
      top: `${randTop}px`,
      left: `${randLeft}px`,
    });
  };

  // Show letter + behind objects after the envelope is fully open
  useEffect(() => {
    if (envelopeStage === 3) {
      const timer = setTimeout(() => setShowLetter(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [envelopeStage]);

  // Envelope image pick
  let envelopeSrc = "/assets/envstate1.png";
  if (envelopeStage === 2) envelopeSrc = "/assets/envstate2.png";
  if (envelopeStage === 3) envelopeSrc = "/assets/envstate3.png";

  return (
    <div className="mail-transition-container">
      {/* Falling hearts */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animation: `floatUpDynamic ${heart.animationDuration}s linear`,
              fontSize: `${heart.fontSize}px`,
              opacity: heart.opacity,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Envelope */}
      <div className={`envelope-wrapper ${envelopeOpenAnimation ? "open" : ""}`}>
        <img
          src={envelopeSrc}
          alt="Envelope"
          className="envelope-image"
          onClick={handleEnvelopeClick}
        />
      </div>

      {/* Overlay: "Will you be my valentine?" */}
      {showOverlay && (
        <div className="valentine-overlay" ref={overlayRef}>
          <div className="overlay-content">
            <h2>Will you be my valentine?</h2>
            <div className="buttons-container">
              <button className="yes-btn" onClick={handleYes}>
                Yes
              </button>
              <button
                className="no-btn"
                style={{
                  top: noButtonPosition.top,
                  left: noButtonPosition.left,
                }}
                onMouseEnter={handleNoHover}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Letter container with 2 roses pinned in corners, no animation */}
      {showLetter && (
        <div className="letter-container">
          {/* Photo cards behind */}
          <div className="decor-behind">
            {photoCards.map((photo, i) => (
              <div
                key={photo.id}
                className={`card card${i + 1}`}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  backgroundImage: `url(${photo.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </div>

          {/* Actual letter content (2 roses pinned with no hover animations) */}
          <div className="letter-content">
            <img
              src="/assets/rose.png"
              alt="Rose"
              className="rose-corner1"
            />
            <img
              src="/assets/rose.png"
              alt="Rose"
              className="rose-corner2"
            />

            <p className="letter-opening">Dear Jiji,</p>
            <p>
              I'll never get bored receiving letters from you, for you, I'd do my all,
              thats how much I love you! I remember the day we met, it was pretty silly
              of me I guess, but I knew that there was something about you. 
              Jiji, or perhaps if you want to be called yeobs, I'm happy that I'm with you,
              I'm happy that you want to make sacrifices and wait for me.
              I know we're not going to meet for months, it breaks my heart, but its ok!
              Love is patient, Love is kind, it does not envy, it does not boast, it is not proud.
              I'll be back for you, please do trust me, and of course I know my dream is always
              to be in Singapore and I would always like for you to come one day to share
              my dream with you. I love you so much, you don't even know it, the stars
              supernova doesnt even compare to the immense feelings I have for you.
              You are gorgeous, you are kind, you are serene, you are beautiful,
              you are cute, you are smart, but most importantly you are mine NYEHEHEHEH :3
              I love you, may Jesus bless you and protect our love together, forever...
              and ever.... Happy Valentines once again!
            </p>
            <p className="letter-signature">Love, Owen ♥</p>
          </div>

          {/* Basket image (click to go to Spotify) */}
          <img
            src="/assets/basket.png"
            alt="Basket"
            className="basket-image"
            onClick={() =>
              window.open(
                "https://open.spotify.com/playlist/6bpspjtW3AP9IPLOmIfIe2?si=e95edffd1df740ac",
                "_blank"
              )
            }
          />
        </div>
      )}

      {/* Photo-card modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              className="modal-photo"
              src={selectedPhoto.src}
              alt="Selected"
            />
            <div className="modal-text">{selectedPhoto.text}</div>
            <button className="close-btn" onClick={() => setSelectedPhoto(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MailTransition;
