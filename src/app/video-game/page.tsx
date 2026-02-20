'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

const images = [
  { src: '/images/mybestfriend.JPG', alt: 'My Best Friend 1' },
  { src: '/images/happy.JPG', alt: 'My Best Friend 2' },
  { src: '/images/fun.JPG', alt: 'My Best Friend 3' },
  { src: '/images/camaro.jpg', alt: 'My Best Friend 4' },
  { src: '/images/walking.jpeg', alt: 'My Best Friend 5' },
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
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 font-mono text-[10px] text-text-muted hover:text-[#00FF88] transition-colors uppercase tracking-widest"
      >
        &larr; Back
      </Link>

      {/* Game + memorial — all in one screen */}
      <div className="h-full flex flex-col items-center justify-center px-6">
        {/* Memorial text — above game */}
        <p className="font-mono text-[10px] text-white tracking-widest uppercase text-center max-w-lg mb-4">
          For my best friend Samson, I really miss you buddy, rest in peace
        </p>

        {/* Game frame */}
        <div className="w-full max-w-3xl">
          {isMobile ? (
            <div className="border border-white/10 bg-surface p-8 text-center">
              <p className="font-geist text-xl font-bold mb-3 text-white">Desktop Only</p>
              <p className="font-geist text-sm text-text-muted">
                This game requires a desktop or laptop computer.
              </p>
            </div>
          ) : (
            <div className="border border-white/10">
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

        {/* Memorial photos — below game */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-24 h-24 md:w-28 md:h-28 overflow-hidden border border-white/20 hover:border-[#00FF88]/40 transition-colors"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
