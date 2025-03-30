// src/components/ui/ViewportController.tsx - A direct migration of your original scaling approach
'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface ViewportControllerProps {
  children: ReactNode;
}

export default function ViewportController({ children }: ViewportControllerProps) {
  // Scaling logic
  const [scale, setScale] = useState(1);
  const scalingContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const designWidth = 1440; // Your full-screen design width in pixels

    const handleResize = () => {
      const currentWidth = window.innerWidth;
    
      // Detect pinch zoom on mobile devices
      const isPinchZoomed = window.innerWidth !== window.outerWidth;
    
      if (isPinchZoomed) {
        // Skip the scaling logic during pinch zoom
        return;
      }
    
      const scaleFactor = currentWidth / designWidth;
      setScale(scaleFactor);
    
      if (contentRef.current && scalingContainerRef.current) {
        const contentHeight = contentRef.current.offsetHeight; // Unscaled height
        const scaledHeight = contentHeight * scaleFactor; // Scaled visual height
        scalingContainerRef.current.style.height = `${scaledHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial scale
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-base-100 text-base-content overflow-hidden">
      {/* Scaling container */}
      <div
        ref={scalingContainerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
          // Height is set dynamically
        }}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
}