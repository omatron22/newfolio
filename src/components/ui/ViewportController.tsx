// src/components/ui/ViewportController.tsx - Improved version with better height handling
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const designWidth = 1440; // Your full-screen design width in pixels

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      
      // Set mobile state
      setIsMobile(currentWidth <= 768);
      
      // Detect pinch zoom on mobile devices
      const isPinchZoomed = window.innerWidth !== window.outerWidth;
    
      if (isPinchZoomed) {
        // Skip the scaling logic during pinch zoom
        return;
      }

      // For mobile, don't apply scaling
      if (currentWidth <= 768) {
        setScale(1);
        if (scalingContainerRef.current) {
          scalingContainerRef.current.style.height = 'auto';
          scalingContainerRef.current.style.transform = 'none';
          scalingContainerRef.current.style.width = '100%';
        }
        return;
      }
    
      // For desktop, calculate scale based on viewport width
      const scaleFactor = Math.min(currentWidth / designWidth, 1);
      setScale(scaleFactor);
    
      if (contentRef.current && scalingContainerRef.current) {
        // Add a small delay to let the content render first
        setTimeout(() => {
          if (contentRef.current && scalingContainerRef.current) {
            const contentHeight = contentRef.current.offsetHeight;
            const scaledHeight = contentHeight * scaleFactor;
            scalingContainerRef.current.style.minHeight = '100vh';
            document.body.style.overflowY = 'auto';
            document.body.style.overflowX = 'hidden';
          }
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    // Run once after mount
    setTimeout(handleResize, 200);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  // Different rendering for mobile and desktop
  if (isMobile) {
    return (
      <div className="mobile-container">
        {children}
      </div>
    );
  }

  return (
    <div className="bg-base-100 text-base-content overflow-hidden w-full">
      {/* Scaling container */}
      <div
        ref={scalingContainerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <div ref={contentRef} className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}