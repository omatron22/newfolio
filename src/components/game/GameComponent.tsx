// src/components/game/GameComponent.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// This component will render in place of the full Phaser game
// until you complete the migration
export default function GameComponent() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is where you would initialize Phaser
    // For now, we'll just show a placeholder
    
    async function initPhaser() {
      // We need to dynamically import Phaser to avoid SSR issues
      if (typeof window !== 'undefined') {
        try {
          // Will be implemented once other components are working
          console.log('Phaser will be initialized here');
        } catch (error) {
          console.error('Could not load Phaser:', error);
        }
      }
    }

    initPhaser();

    return () => {
      // Cleanup code for when component unmounts
    };
  }, []);

  return (
    <div className="relative w-[800px] h-[460px] mx-auto border-[8px] border-base-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-base-100 to-base-200 box-border overflow-hidden">
      {/* Game Container - this is where Phaser will render */}
      <div 
        ref={gameContainerRef}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Coming Soon!</h2>
          <p className="mb-4">The game is being migrated to Next.js</p>
          <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full">
            <Image 
              src="/images/three.jpeg" 
              alt="Game Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}