// components/ui/TypingAnimation.tsx
'use client';

import React, { useEffect, useState } from "react";

type Props = {
  texts: string[];
  speed: number;
};

const TypingAnimation = ({ texts, speed }: Props) => {
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    // Typing Effect
    if (charIndex < texts[currentIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + texts[currentIndex].charAt(charIndex));
        setCharIndex(charIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Pause before resetting and typing the next text
      const pause = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Loop back to the start
      }, 2000);  // Adjust pause time if needed
      return () => clearTimeout(pause);
    }
  }, [charIndex, currentIndex, texts, speed]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);  // Blinking every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <h1 className="text-5xl font-clash font-medium min-h-[4rem]"> {/* Set a minimum height for the container */}
      {currentText}
      <span className={isCursorVisible ? "inline" : "hidden"}>|</span> {/* Cursor animation */}
    </h1>
  );
};

export default TypingAnimation;