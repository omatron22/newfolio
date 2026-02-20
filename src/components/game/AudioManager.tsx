'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AudioManagerProps {
  currentScreen: string;
}

function AudioManager({ currentScreen }: AudioManagerProps) {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);
  const listenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Cleanup previous audio instance
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current.src = '';
      audioInstanceRef.current = null;
    }

    // Remove any lingering interaction listeners
    if (listenerRef.current) {
      document.removeEventListener('click', listenerRef.current);
      document.removeEventListener('keydown', listenerRef.current);
      listenerRef.current = null;
    }

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

    if (isMusicOn) {
      audio.play().catch(() => {
        const handleFirstInteraction = () => {
          if (audioInstanceRef.current && isMusicOn) {
            audioInstanceRef.current.play().catch(() => {});
          }
          hasInteracted.current = true;
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          listenerRef.current = null;
        };
        if (!hasInteracted.current) {
          listenerRef.current = handleFirstInteraction;
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('keydown', handleFirstInteraction);
        }
      });
    }

    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
        audioInstanceRef.current.currentTime = 0;
        audioInstanceRef.current.src = '';
        audioInstanceRef.current = null;
      }
      if (listenerRef.current) {
        document.removeEventListener('click', listenerRef.current);
        document.removeEventListener('keydown', listenerRef.current);
        listenerRef.current = null;
      }
    };
  }, [currentScreen, isMusicOn]);

  const toggleMusic = () => {
    setIsMusicOn((prev) => {
      const newState = !prev;
      if (audioInstanceRef.current) {
        if (newState) {
          audioInstanceRef.current.play().catch(() => {});
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
        style={{
          width: '28px',
          height: '28px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
        title={isMusicOn ? 'Mute Sound' : 'Unmute Sound'}
      >
        <img
          src={isMusicOn ? '/assets/sound-on.png' : '/assets/sound-off.png'}
          alt={isMusicOn ? 'Sound On' : 'Sound Off'}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </button>
    </div>
  );
}

export default React.memo(AudioManager);
