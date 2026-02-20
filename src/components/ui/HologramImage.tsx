'use client';

import Image from 'next/image';

interface HologramImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function HologramImage({
  src,
  alt,
  width,
  height,
  className = '',
}: HologramImageProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Glow backdrop */}
      <div
        className="absolute -inset-8 opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,180,255,0.3) 0%, transparent 65%)',
        }}
      />

      {/* The arm — hologram filter only, no overlays on transparent areas */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="relative"
        style={{
          filter:
            'grayscale(1) contrast(1.4) brightness(0.7) sepia(1) hue-rotate(160deg) saturate(3) drop-shadow(0 0 12px rgba(0,180,255,0.3))',
        }}
      />
    </div>
  );
}
