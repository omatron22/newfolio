'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GameComponent from '@/components/game/GameComponent';
import CharacterSelect from '@/components/game/CharacterSelect';
import IntroScreen from '@/components/game/IntroScreen';
import GameOver from '@/components/game/GameOver';
import HowToPlay from '@/components/game/HowToPlay';
import AudioManager from '@/components/game/AudioManager';

export default function VideoGamePage() {
  const [currentScreen, setCurrentScreen] = useState<
    'intro' | 'characterSelect' | 'game'
  >('intro');
  const [selectedCharacter, setSelectedCharacter] = useState('og');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if running on client-side
    if (typeof window !== 'undefined') {
      // Detect if the user is on a mobile device
      const mobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobile);
    }
  }, []);

  // Handle character selection and start game
  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
    setCurrentScreen('game');
  };

  // Handle navigation back to character selection screen
  const handleGoToCharacterSelect = () => {
    setCurrentScreen('characterSelect');
  };

  // Handle navigation back to the main menu (intro screen)
  const handleGoToMainMenu = () => {
    setCurrentScreen('intro');
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 text-base-content flex items-center justify-center">
        <div className="bg-base-100 shadow-lg p-8 rounded-lg text-center max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Game Not Supported on Mobile Devices</h1>
          <p className="text-lg mb-8">
            Sorry, this game is not supported on mobile devices. Please access it from a desktop or laptop computer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 text-base-content flex flex-col">
      {/* Game Section */}
      <section className="flex-grow flex items-center justify-center py-8">
        {currentScreen === 'intro' && (
          <IntroScreen onPlay={() => setCurrentScreen('characterSelect')} />
        )}

        {currentScreen === 'characterSelect' && (
          <CharacterSelect onSelectCharacter={handleCharacterSelect} />
        )}

        {currentScreen === 'game' && (
          <GameComponent 
            character={selectedCharacter}
            onCharacterSelect={handleGoToCharacterSelect}
            onMainMenu={handleGoToMainMenu}
          />
        )}
      </section>

      {/* Dedication Section */}
      <section className="py-16 bg-gradient-to-b from-base-200 to-base-300">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
            Dedicated to My Best Friend
          </h2>
          <p className="text-lg md:text-xl text-base-content mb-10">
            In loving memory of someone very important to me. Rest in peace Samson.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { src: '/images/mybestfriend.JPG', alt: 'My Best Friend 1' },
              { src: '/images/happy.JPG', alt: 'My Best Friend 2' },
              { src: '/images/fun.JPG', alt: 'My Best Friend 4' },
              { src: '/images/camaro.jpg', alt: 'My Best Friend 5' },
              { src: '/images/walking.jpeg', alt: 'My Best Friend 3' },
            ].map((image, index) => (
              <div
                key={index}
                className="w-40 sm:w-40 md:w-40 lg:w-58 overflow-hidden shadow-lg border-4 border-base-100 rounded-lg transition-transform transform hover:scale-110 hover:shadow-xl"
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="relative w-full h-full" style={{ aspectRatio: '1/1' }}>
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
      </section>
    </div>
  );
}