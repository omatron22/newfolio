// src/components/ui/SimpleImageSlider.tsx - A simplified version for Next.js
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SimpleImageSliderProps {
  width: number;
  height: number;
  images: string[];
}

export default function SimpleImageSlider({ width, height, images }: SimpleImageSliderProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const goNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div style={{ width, height, position: 'relative' }}>
      {images.map((src, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: index === currentImage ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Navigation buttons */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
        style={{ cursor: 'pointer' }}
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
        style={{ cursor: 'pointer' }}
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}