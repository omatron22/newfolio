'use client';

import React from 'react';

// Deterministic hash from project name
function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface ProjectArtProps {
  name: string;
  accent: string;
  className?: string;
}

export default function ProjectArt({ name, accent, className = '' }: ProjectArtProps) {
  const seed = hashStr(name);
  const rand = seededRandom(seed);

  const shapes: React.ReactElement[] = [];
  const count = 5 + Math.floor(rand() * 4);

  for (let i = 0; i < count; i++) {
    const type = rand();
    const x = rand() * 100;
    const y = rand() * 100;
    const size = 10 + rand() * 40;
    const opacity = 0.15 + rand() * 0.5;
    const rotation = rand() * 360;

    if (type < 0.33) {
      shapes.push(
        <circle
          key={i}
          cx={`${x}%`}
          cy={`${y}%`}
          r={size / 2}
          fill="none"
          stroke={accent}
          strokeWidth={1}
          opacity={opacity}
        />
      );
    } else if (type < 0.66) {
      shapes.push(
        <rect
          key={i}
          x={`${x - size / 2}%`}
          y={`${y - size / 2}%`}
          width={size}
          height={size}
          fill="none"
          stroke={accent}
          strokeWidth={1}
          opacity={opacity}
          transform={`rotate(${rotation} ${x} ${y})`}
        />
      );
    } else {
      const x2 = x + (rand() - 0.5) * 60;
      const y2 = y + (rand() - 0.5) * 60;
      shapes.push(
        <line
          key={i}
          x1={`${x}%`}
          y1={`${y}%`}
          x2={`${Math.max(0, Math.min(100, x2))}%`}
          y2={`${Math.max(0, Math.min(100, y2))}%`}
          stroke={accent}
          strokeWidth={1}
          opacity={opacity}
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="100" height="100" fill="#12121A" />
      {shapes}
    </svg>
  );
}
