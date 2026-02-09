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

  const images = [
    { src: '/images/mybestfriend.JPG', alt: 'My Best Friend 1' },
    { src: '/images/happy.JPG', alt: 'My Best Friend 2' },
    { src: '/images/fun.JPG', alt: 'My Best Friend 3' },
    { src: '/images/camaro.jpg', alt: 'My Best Friend 4' },
    { src: '/images/walking.jpeg', alt: 'My Best Friend 5' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen win95-desktop-bg flex items-center justify-center">
        <p className="text-white text-[13px] animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen win95-desktop-bg text-win-black flex flex-col overflow-auto">
      {/* Back link */}
      <div className="p-4">
        <Link
          href="/"
          className="win-btn text-[12px] no-underline text-win-black"
        >
          ← Back to Desktop
        </Link>
      </div>

      {/* Game Section */}
      <section className="flex-grow flex items-center justify-center py-4">
        {isMobile ? (
          <div className="win-window-border bg-win-gray p-6 text-center max-w-lg mx-4">
            <p className="font-bold text-[14px] mb-3">Desktop Only</p>
            <p className="text-[12px]">
              This game requires a desktop or laptop computer.
            </p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </section>

      {/* Dedication Section */}
      <section className="py-10 bg-win-gray border-t-2 border-win-gray-light">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="font-bold text-[16px] mb-2">
            Dedicated to My Best Friend
          </p>
          <p className="text-[12px] text-win-gray-dark mb-8">
            In loving memory of someone very important to me. Rest in peace Samson.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              {images.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="w-36 win-sunken overflow-hidden"
                >
                  <div className="relative w-full aspect-square">
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
            <div className="flex flex-wrap justify-center gap-4">
              {images.slice(3, 5).map((image, index) => (
                <div
                  key={index + 3}
                  className="w-36 win-sunken overflow-hidden"
                >
                  <div className="relative w-full aspect-square">
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
      </section>
    </div>
  );
}
