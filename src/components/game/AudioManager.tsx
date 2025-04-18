'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AudioManagerProps {
  currentScreen: string;
}

export default function AudioManager({ currentScreen }: AudioManagerProps) {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup previous audio instance if it exists
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current.src = ''; // Clear source to release memory
      audioInstanceRef.current = null;
    }

    // Set up new audio based on the current screen
    let audio: HTMLAudioElement;

    if (currentScreen === 'intro') {
      audio = new Audio('/assets/titlescreen.mp3');
    } else if (currentScreen === 'game') {
      audio = new Audio('/assets/maingame.mp3');
    } else {
      return;
    }

    audio.loop = true; // Loop the audio for background music

    // Set the new audio instance in the ref
    audioInstanceRef.current = audio;

    // Play the music if it's enabled
    if (isMusicOn) {
      const playPromise = audio.play();
      // Handle potential promise rejection due to autoplay restrictions
      playPromise?.catch((error) => {
        console.error('Playback prevented by browser: ', error);
      });
    }

    return () => {
      // Clean up the audio when the component unmounts or on dependency change
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
        audioInstanceRef.current.src = ''; // Clear source to release memory
      }
    };
  }, [currentScreen, isMusicOn]); // Dependencies include `currentScreen` and `isMusicOn`

  const toggleMusic = () => {
    setIsMusicOn((prev) => {
      const newState = !prev;
      
      if (audioInstanceRef.current) {
        if (newState) {
          audioInstanceRef.current.play().catch(error => {
            console.error('Playback prevented by browser: ', error);
          });
        } else {
          audioInstanceRef.current.pause();
        }
      }
      
      return newState;
    });
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '6.67px',
        right: '6.67px',
        zIndex: 2,
      }}
    >
      <img
        src={isMusicOn ? '/assets/sound-on.png' : '/assets/sound-off.png'}
        onClick={toggleMusic}
        alt={isMusicOn ? 'Sound On' : 'Sound Off'}
        style={{ cursor: 'pointer', width: '33px', height: '33px' }}
      />
    </div>
  );
}