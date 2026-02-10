'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import Image from 'next/image';

// Lazy-load game components so they don't block the main bundle
const IntroScreen = lazy(() => import('@/components/game/IntroScreen'));
const CharacterSelect = lazy(() => import('@/components/game/CharacterSelect'));
const GameComponent = lazy(() => import('@/components/game/GameComponent'));

const MEMORIAL_IMAGES = [
  { src: '/images/mybestfriend.JPG', alt: 'My Best Friend 1' },
  { src: '/images/happy.JPG', alt: 'My Best Friend 2' },
  { src: '/images/fun.JPG', alt: 'My Best Friend 3' },
  { src: '/images/camaro.jpg', alt: 'My Best Friend 4' },
  { src: '/images/walking.jpeg', alt: 'My Best Friend 5' },
];

interface GameWindowProps {
  isMaximized?: boolean;
}

export default function GameWindow({ isMaximized = false }: GameWindowProps) {
  const [currentScreen, setCurrentScreen] = useState<
    'loading' | 'intro' | 'characterSelect' | 'game'
  >('loading');
  const [selectedCharacter, setSelectedCharacter] = useState('og');
  const [progress, setProgress] = useState(0);

  // Fake loading bar then transition to intro
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentScreen('intro'), 300);
          return 100;
        }
        return p + Math.random() * 18 + 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
    setCurrentScreen('game');
  };

  // Loading screen
  if (currentScreen === 'loading') {
    return (
      <div className="font-system text-[13px] p-6 flex flex-col items-center justify-center h-full bg-win-gray">
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <Image src="/icons/tree.png" alt="" width={32} height={32} />
          </div>
          <p className="font-bold text-[15px] mb-1">Samson The Game</p>
          <p className="text-[12px] text-win-gray-dark mb-6">
            A 2D runner dedicated to my best friend
          </p>
          <p className="text-[12px] mb-2">Loading game files...</p>
          <div className="w-[240px] h-[20px] win-sunken bg-win-white mx-auto">
            <div
              className="h-full bg-win-navy transition-all duration-200"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-win-gray-dark mt-2">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>
      </div>
    );
  }

  // The actual game renderer
  const gameContent = (
    <Suspense
      fallback={
        <div className="flex items-center justify-center" style={{ minWidth: 800, minHeight: 460 }}>
          <p className="text-[13px] animate-pulse">Loading game...</p>
        </div>
      }
    >
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
    </Suspense>
  );

  // Fullscreen / maximized — game + memorial photos
  if (isMaximized) {
    return (
      <div className="h-full w-full flex flex-col bg-win-gray overflow-auto">
        {/* Game area */}
        <div className="flex items-center justify-center flex-shrink-0 py-4 bg-gradient-to-b from-[#C0C0C0] to-[#A8A8A8]">
          {gameContent}
        </div>

        {/* Memorial section — only visible in fullscreen */}
        <div className="flex-shrink-0 border-t-2 border-win-gray-dark bg-win-gray py-6 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-bold text-[14px] mb-1 text-win-black">
              Dedicated to My Best Friend
            </p>
            <p className="text-[12px] text-win-gray-dark mb-5">
              In loving memory of someone very important to me. Rest in peace Samson.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {MEMORIAL_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className="win-sunken overflow-hidden bg-win-white"
                  style={{ width: 100, height: 100 }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal windowed layout — just the game centered
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-[#C0C0C0] to-[#A0A0A0] overflow-hidden">
      {gameContent}
    </div>
  );
}
