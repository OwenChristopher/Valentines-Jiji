// src/components/Page1.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Page1.css";

function Page1() {
  // Dialogue texts for the initial phases.
  const mysteryDialogue = "heyyyy there! heh! are you lost?";
  const revealDialogue = "Hi I'm Bob! What's your name?";
  const finalDialogue =
    "WOAHHH! That's such a beautiful name, come to think of it, someone did tell me about you...";

  // The new conversation dialogues after the final message.
  const conversationDialogues = [
    "Oh right! Was his name Owen?",
    "He told me about how gorgeous you are! About the multiple talents you have, and that you were the smartest girl he has ever encountered!",
    "He looked so LOVESTRUCK talking about you.... *sigh*",
    "I wish I had someone talking about me like that.... maybe one day someone will!",
    "Oh right! back to the main point!!! There was something he wanted to tell you!",
    "Umm where was it again???? Oh right here it is a letter for you!"
  ];

  // Define the overall phases.
  // Phases: "mystery" → "reveal" → "final" → "conversation"
  const [phase, setPhase] = useState("mystery");
  // Used to step through the conversationDialogues.
  const [dialogueStep, setDialogueStep] = useState(0);
  
  // Typewriter effect states.
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  
  // When true, the overlay with name input is visible.
  const [showNameOverlay, setShowNameOverlay] = useState(false);
  // User's name.
  const [userName, setUserName] = useState("");

  // For navigation using react-router-dom.
  const navigate = useNavigate();

  // Determine the full text to type based on phase.
  let fullText = "";
  if (phase === "mystery") fullText = mysteryDialogue;
  else if (phase === "reveal") fullText = revealDialogue;
  else if (phase === "final") fullText = finalDialogue;
  else if (phase === "conversation") fullText = conversationDialogues[dialogueStep] || "";

  // Typewriter effect: add one character at a time.
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[textIndex]);
        setTextIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      // When reveal dialogue finishes, show the name input overlay.
      if (phase === "reveal") {
        setTimeout(() => setShowNameOverlay(true), 500);
      }
    }
  }, [textIndex, fullText, phase]);

  // Hearts state for falling hearts effect.
  const [hearts, setHearts] = useState([]);
  const createHeart = () => {
    const id = Date.now();
    const heart = {
      id,
      left: Math.random() * 100, // random horizontal position
      animationDuration: 4 + Math.random() * 3, // 4s to 7s
      fontSize: 16 + Math.random() * 24, // random size
      opacity: 0.7 + Math.random() * 0.3, // opacity between 0.7 and 1
    };

    setHearts((prev) => [...prev, heart]);
    // Remove the heart after its animation finishes.
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, heart.animationDuration * 1000);
  };

  // Create hearts every 200ms.
  useEffect(() => {
    const interval = setInterval(createHeart, 200);
    return () => clearInterval(interval);
  }, []);

  // Handle clicks on the dialogue box.
  const handleDialogueClick = () => {
    // Only allow advancing if the typewriter effect is finished.
    if (displayedText !== fullText) return;
    
    // Phase transitions:
    if (phase === "mystery") {
      setPhase("reveal");
      setDisplayedText("");
      setTextIndex(0);
    } else if (phase === "final") {
      // After the final message, start the conversation sequence.
      setPhase("conversation");
      setDialogueStep(0);
      setDisplayedText("");
      setTextIndex(0);
    } else if (phase === "conversation") {
      // In conversation phase, if not at the end, go to the next dialogue.
      if (dialogueStep < conversationDialogues.length - 1) {
        setDialogueStep(dialogueStep + 1);
        setDisplayedText("");
        setTextIndex(0);
      } else {
        // Conversation is complete, navigate to the MailTransition page.
        navigate("/mail-transition");
      }
    }
  };

  // Handle submission of the name from the overlay.
  const handleNameSubmit = (e) => {
    if (e.key === "Enter" && userName.trim() !== "") {
      setShowNameOverlay(false);
      // Proceed to final dialogue phase.
      setPhase("final");
      setDisplayedText("");
      setTextIndex(0);
    }
  };

  return (
    <div className="page1-container">
      {/* Falling hearts background */}
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

      {/* Main page content with inline background image */}
      <div
        className="page"
        style={{
          backgroundImage: "url('/assets/defaultbg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        {/* Dialogue Box */}
        <div className="dialogue-box" onClick={handleDialogueClick}>
          <div className="character">
            <img
              src={
                phase === "mystery"
                  ? "/assets/question.png"
                  : "/assets/cat1.jpg"
              }
              alt="Character"
              className={`character-sprite ${phase === "mystery" ? "mystery" : "reveal"}`}
            />
          </div>
          <div className="dialogue-text">{displayedText}</div>
          <div
            className="dialogue-arrow"
            style={{
              backgroundImage: "url('/assets/filled_white_arrow.png')",
            }}
          ></div>
        </div>
      </div>

      {/* Name Input Overlay (shown during reveal phase) */}
      {showNameOverlay && (
        <div className="name-input-overlay">
          <div className="name-input-container">
            <label htmlFor="name-input">Type your name:</label>
            <input
              id="name-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleNameSubmit}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page1;
