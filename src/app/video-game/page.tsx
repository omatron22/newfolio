// src/app/video-game/page.tsx
'use client';

import React from 'react';

export default function VideoGamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 text-base-content flex items-center justify-center">
      <div className="bg-base-100 shadow-lg p-8 rounded-lg text-center max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg mb-8">
          The game is currently being migrated from React to Next.js.
          Check back soon to play!
        </p>
        <div className="flex justify-center">
          <img 
            src="/images/three.jpeg"
            alt="Game Preview" 
            className="w-64 h-64 object-cover rounded-lg" 
          />
        </div>
      </div>
    </div>
  );
}