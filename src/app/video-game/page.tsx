'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify-icon/react';
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

  const images = [
    { src: '/images/mybestfriend.JPG', alt: 'My Best Friend 1' },
    { src: '/images/happy.JPG', alt: 'My Best Friend 2' },
    { src: '/images/fun.JPG', alt: 'My Best Friend 3' },
    { src: '/images/camaro.jpg', alt: 'My Best Friend 4' },
    { src: '/images/walking.jpeg', alt: 'My Best Friend 5' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 text-base-content flex flex-col">
      {/* Game Section */}
      <section className="flex-grow flex items-center justify-center py-8">
        {isMobile ? (
          // Mobile-only message
          <div className="bg-base-100 rounded-2xl shadow-lg p-8 text-center max-w-lg mx-6">
            <Icon icon="mdi:monitor-off" className="text-5xl text-primary mb-4 mx-auto" />
            <h1 className="text-2xl font-clash font-bold mb-4">Game Not Supported on Mobile Devices</h1>
            <p className="text-base-content/80">
              Sorry, this game is not supported on mobile devices. Please access it from a desktop or laptop computer.
            </p>
          </div>
        ) : (
          // Desktop game components
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
                onCharacterSelect={handleGoToCharacterSelect}
                onMainMenu={handleGoToMainMenu}
              />
            )}
          </>
        )}
      </section>

      {/* Dedication Section - Always visible */}
      <section className="py-16 bg-gradient-to-b from-base-200 to-base-300">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-clash font-bold text-base-content mb-6">
            Dedicated to My Best Friend
          </h2>
          <p className="text-lg md:text-xl text-base-content/90 mb-12">
            In loving memory of someone very important to me. Rest in peace Samson.
          </p>
          
          {/* Elegant 3-2 Layout */}
          <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
            {/* Top row - 3 images */}
            <div className="flex flex-wrap justify-center gap-6">
              {images.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="w-40 sm:w-44 md:w-48 lg:w-52 overflow-hidden rounded-lg shadow-lg border border-base-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
                >
                  <div className="relative w-full aspect-square bg-base-300">
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
            
            {/* Bottom row - 2 images centered */}
            <div className="flex flex-wrap justify-center gap-6">
              {images.slice(3, 5).map((image, index) => (
                <div
                  key={index + 3}
                  className="w-40 sm:w-44 md:w-48 lg:w-52 overflow-hidden rounded-lg shadow-lg border border-base-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
                >
                  <div className="relative w-full aspect-square bg-base-300">
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