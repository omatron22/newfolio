'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hide default cursor globally
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement;
      const isHover = target.closest('a, button, [role="button"], input, textarea, select, [data-hover]');
      setIsPointer(!!isHover);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    let animId: number;
    const animate = () => {
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.35;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
      document.documentElement.style.cursor = '';
      style.remove();
    };
  }, [visible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[10000] pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.15s',
      }}
    >
      {/* Classic pixel arrow cursor, scaled up 2x for retro chunky feel */}
      <svg
        width="32"
        height="42"
        viewBox="0 0 16 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          marginLeft: -1,
          marginTop: -1,
          filter: isPointer ? 'drop-shadow(0 0 6px var(--accent))' : 'none',
          transition: 'filter 0.2s',
        }}
        shapeRendering="crispEdges"
      >
        {/* Black outline */}
        <path
          d="M0 0 L0 17 L4 13 L7 20 L10 19 L7 12 L12 12 Z"
          fill="black"
          stroke="black"
          strokeWidth="1"
        />
        {/* White fill */}
        <path
          d="M1 1.5 L1 15 L4.5 11.5 L7.5 18.5 L9 18 L6 11 L11 11 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
