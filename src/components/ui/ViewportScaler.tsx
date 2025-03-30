// src/components/ui/ViewportScaler.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ViewportScalerProps {
  children: ReactNode;
  baseWidth?: number; // Width the design was made for
}

export default function ViewportScaler({ 
  children, 
  baseWidth = 1440 
}: ViewportScalerProps) {
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set initial scale and add resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        // For mobile, use a scrollable view at 100% scale
        setScale(1);
      } else {
        // For desktop, scale based on viewport width
        const newScale = Math.min(width / baseWidth, 1);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [baseWidth]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  // For mobile, don't apply scaling
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        {children}
      </div>
    );
  }

  // For desktop, apply scaling
  return (
    <div className="min-h-screen overflow-hidden">
      <div 
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          maxWidth: baseWidth,
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}