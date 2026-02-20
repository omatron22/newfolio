'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import GameComponent from '@/components/game/GameComponent';
import CharacterSelect from '@/components/game/CharacterSelect';
import IntroScreen from '@/components/game/IntroScreen';

const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const SAMSON_PHOTOS = [
  '/images/mybestfriend.JPG',
  '/images/happy.JPG',
  '/images/fun.JPG',
  '/images/camaro.jpg',
  '/images/walking.jpeg',
];

export default function VideoGamePage() {
  const [currentScreen, setCurrentScreen] = useState<
    'intro' | 'characterSelect' | 'game'
  >('intro');
  const [selectedCharacter, setSelectedCharacter] = useState('og');
  const [isMobile, setIsMobile] = useState(() => getIsMobile());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(getIsMobile());
      setIsLoading(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
    setCurrentScreen('game');
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-bg flex items-center justify-center">
        <p className="text-text-muted font-mono text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg text-text-primary relative overflow-hidden">
      {/* Tiled Samson photo collage background — fills entire screen */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="grid grid-cols-6 w-full h-full">
          {Array.from({ length: 30 }, (_, i) => (
            <img
              key={i}
              src={SAMSON_PHOTOS[i % SAMSON_PHOTOS.length]}
              alt=""
              className="w-full h-full object-cover block"
            />
          ))}
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 font-geist text-[#00FF88] hover:opacity-70 transition-opacity uppercase"
        style={{ fontSize: '0.7rem', fontWeight: 800, textShadow: '0 2px 20px rgba(0,0,0,0.9)', letterSpacing: '0.05em' }}
      >
        i dont feel like looking at your dead dog
      </Link>

      {/* Content — text above, game below, shifted up */}
      <div className="h-full flex flex-col items-center justify-center relative z-[2]" style={{ marginTop: '-8vh' }}>
        {/* Memorial text — above game with gap */}
        <p
          className="font-geist text-[#00FF88] text-center uppercase"
          style={{
            fontSize: '2.5vw',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)',
            marginBottom: '4vh',
          }}
        >
          For my best friend Samson,<br />I really miss you buddy, rest in peace
        </p>

        {/* Game — scaled up, keeps 800x460 resolution */}
        <div style={{ transform: 'scale(1.15)', transformOrigin: 'center top' }}>
          {isMobile ? (
            <div className="w-[800px] h-[460px] border border-white/10 bg-surface flex items-center justify-center">
              <div className="text-center">
                <p className="font-geist text-xl font-bold mb-3 text-white">Desktop Only</p>
                <p className="font-geist text-sm text-text-muted">
                  This game requires a desktop or laptop computer.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {currentScreen === 'intro' && (
                <IntroScreen onPlay={() => setCurrentScreen('characterSelect')} />
              )}
              {currentScreen === 'characterSelect' && (
                <CharacterSelect onSelectCharacter={handleCharacterSelect} />
              )}
              {currentScreen === 'game' && (
                <GameComponent
                  character={selectedCharacter}
                  onCharacterSelect={() => setCurrentScreen('characterSelect')}
                  onMainMenu={() => setCurrentScreen('intro')}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
