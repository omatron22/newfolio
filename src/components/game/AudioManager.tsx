'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AudioManagerProps {
  currentScreen: string;
}

export default function AudioManager({ currentScreen }: AudioManagerProps) {
  // Start with music ON
  const [isMusicOn, setIsMusicOn] = useState(true);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Cleanup previous audio instance if it exists
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current.src = '';
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

    audio.loop = true;
    audioInstanceRef.current = audio;

    // Auto-play if music is on
    if (isMusicOn) {
      audio.play().catch(() => {
        // Browser blocked autoplay — will play on first user interaction
        const handleFirstInteraction = () => {
          if (audioInstanceRef.current && isMusicOn) {
            audioInstanceRef.current.play().catch(() => {});
          }
          hasInteracted.current = true;
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
        };
        if (!hasInteracted.current) {
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('keydown', handleFirstInteraction);
        }
      });
    }

    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
        audioInstanceRef.current.src = '';
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreen]);

  const toggleMusic = () => {
    setIsMusicOn((prev) => {
      const newState = !prev;

      if (audioInstanceRef.current) {
        if (newState) {
          audioInstanceRef.current.play().catch((error) => {
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
        top: '6px',
        right: '6px',
        zIndex: 2,
      }}
    >
      <button
        onClick={toggleMusic}
        className="win-btn"
        style={{
          width: '28px',
          height: '28px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
        }}
        title={isMusicOn ? 'Mute Sound' : 'Unmute Sound'}
      >
        {isMusicOn ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
