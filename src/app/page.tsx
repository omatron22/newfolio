'use client';

import { useState, useRef, useCallback, useEffect, useReducer } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import HologramImage from '@/components/ui/HologramImage';

const MARQUEE_TEXT =
  'Any chance you care about what I have to say? I got A LOT of OPINIONssssS. Check out MY BLOG BLOG B L O G pleaseeeee. \u00a0\u00a0//\u00a0\u00a0';

const PROJECTS = [
  {
    name: 'GIMMEMOORELIGHT',
    category: 'WEB',
    accent: '#00FF88',
    link: 'https://gimmemoorelight.com',
    description: 'Creative portfolio and brand website for a lighting designer.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind'],
  },
  {
    name: 'DIANNE',
    category: 'WEB',
    accent: '#00FF88',
    link: 'https://dianne-portfolio-dun.vercel.app',
    description: 'Elegant portfolio website showcasing creative work and projects.',
    tech: ['Next.js', 'TypeScript', 'CSS'],
  },
  {
    name: 'MAYASITE',
    category: 'RESEARCH',
    accent: '#00FF88',
    link: 'https://mayasite.vercel.app',
    description: 'Research-focused website with interactive data visualizations.',
    tech: ['React', 'D3.js', 'TypeScript'],
  },
  {
    name: 'CLEARWATER',
    category: 'WEB',
    accent: '#00FF88',
    link: 'https://clearwaterpoolandspaservice.com',
    description: 'Business website for a pool and spa service company.',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
  },
];

type Project = (typeof PROJECTS)[number];

// Distribute N points evenly on a sphere (Fibonacci sphere)
const SPHERE_POINTS = 12;
const SPHERE_ITEMS = Array.from({ length: SPHERE_POINTS }, (_, i) => {
  const project = PROJECTS[i % PROJECTS.length];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - ((i + 0.5) / SPHERE_POINTS) * 2; // offset so no point sits on a pole
  const radius = Math.sqrt(1 - y * y);
  const theta = golden * i;
  return {
    project,
    baseX: Math.cos(theta) * radius,
    baseY: y,
    baseZ: Math.sin(theta) * radius,
  };
});

interface OpenWindow {
  id: number;
  project: Project;
  x: number;
  y: number;
  zIndex: number;
}

let windowIdCounter = 0;

export default function Home() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [topZ, setTopZ] = useState(100);

  // Orb rotation — refs for smooth 60fps updates, single forceRender per frame
  const rot = useRef({ x: -0.3, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>(0);
  const [, forceRender] = useReducer((n: number) => n + 1, 0);

  // Single animation loop: idle spin + momentum + render trigger
  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;

        rot.current.y += velocity.current.x + 0.002;
        rot.current.x += velocity.current.y;
      }
      forceRender();
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  // Drag handlers — mutate refs directly, no setState
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    const sensitivity = 0.004;

    // Apply rotation immediately
    rot.current.y += dx * sensitivity;
    rot.current.x += dy * sensitivity;

    // Smoothed velocity for momentum on release
    velocity.current.x = velocity.current.x * 0.5 + dx * sensitivity * 0.5;
    velocity.current.y = velocity.current.y * 0.5 + dy * sensitivity * 0.5;

    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Compute rotated 3D positions from ref values
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const orbRadius = isMobile ? 110 : 140;
  const { x: rx, y: ry } = rot.current;
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);

  const sphereItems = SPHERE_ITEMS.map((item) => {
    // Rotate around Y axis
    const x1 = item.baseX * cosY + item.baseZ * sinY;
    const z1 = -item.baseX * sinY + item.baseZ * cosY;

    // Rotate around X axis
    const y = item.baseY * cosX - z1 * sinX;
    const z = item.baseY * sinX + z1 * cosX;

    const depth = (z + 1) / 2;
    return {
      ...item,
      screenX: x1 * orbRadius,
      screenY: y * orbRadius,
      z,
      opacity: 0.15 + depth * 0.85,
      scale: 0.6 + depth * 0.4,
    };
  });

  const openWindow = useCallback((project: Project) => {
    const id = ++windowIdCounter;
    const w = window.innerWidth;
    const winW = w < 768 ? 280 : 340;
    const offsetX = (windows.length % 5) * 20;
    const offsetY = (windows.length % 5) * 20;
    const x = Math.min(w / 2 - winW / 2 + offsetX, w - winW - 10);
    const y = Math.min(window.innerHeight / 2 - 150 + offsetY, window.innerHeight - 320);
    const newZ = topZ + 1;
    setTopZ(newZ);
    setWindows((prev) => [...prev, { id, project, x, y, zIndex: newZ }]);
  }, [windows.length, topZ]);

  const closeWindow = useCallback((id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const bringToFront = useCallback((id: number) => {
    const newZ = topZ + 1;
    setTopZ(newZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
    );
  }, [topZ]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-bg">
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,180,255,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Title — full-width, Geist bold */}
      <h1
        className="absolute top-[10vh] left-0 w-full z-10 px-4 font-geist uppercase text-white leading-[0.92] text-center md:text-left"
        style={{
          fontSize: '11.5vw',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}
      >
        <span className="hidden md:inline">OMAR ESPINOZA</span>
        <span className="md:hidden">OMAR<br />ESPINOZA</span>
      </h1>

      {/* Blog marquee ticker — pixelated blur, top of screen */}
      <Link
        href="/blog"
        className="absolute top-0 left-0 right-0 z-40 overflow-hidden py-2 cursor-pointer block group"
      >
        <div className="pixel-blur transition-all duration-500">
          <div className="marquee-track opacity-50 group-hover:opacity-100 transition-opacity duration-500">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-mono text-[11px] text-white group-hover:text-[#00FF88] uppercase tracking-widest whitespace-nowrap px-4 transition-colors duration-500"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Left arm (Adam) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-[1]">
        <HologramImage
          src="/images/left.png"
          alt="Adam's hand reaching"
          width={400}
          height={180}
          className="w-[35vw] max-w-[400px]"
        />
      </div>

      {/* Right arm (God) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-[1]">
        <HologramImage
          src="/images/right.png"
          alt="God's hand reaching"
          width={400}
          height={180}
          className="w-[35vw] max-w-[400px]"
        />
      </div>

      {/* 3D Project Orb */}
      <div
        className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] select-none"
        style={{ width: orbRadius * 2 + 120, height: orbRadius * 2 + 120, touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Render items sorted back-to-front by z */}
        {[...sphereItems]
          .sort((a, b) => a.z - b.z)
          .map((item, i) => (
            <button
              key={`${item.project.name}-${i}`}
              onClick={() => openWindow(item.project)}
              className="absolute group cursor-pointer whitespace-nowrap"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${item.screenX}px, ${item.screenY}px) scale(${item.scale})`,
                opacity: item.opacity,
                zIndex: Math.round(item.z * 10) + 10,
                pointerEvents: item.z < -0.3 ? 'none' : 'auto',
              }}
            >
              <span className="font-geist text-xs md:text-2xl font-bold text-white tracking-tight group-hover:text-[#00FF88] transition-colors duration-200">
                {item.project.name}
              </span>
            </button>
          ))}
      </div>

      {/* Draggable project windows */}
      <AnimatePresence>
        {windows.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            drag
            dragMomentum={false}
            onPointerDown={() => bringToFront(w.id)}
            className="fixed w-[280px] md:w-[340px] shadow-2xl shadow-black/50"
            style={{
              left: w.x,
              top: w.y,
              zIndex: w.zIndex,
            }}
          >
            {/* Title bar — drag handle */}
            <div className="flex items-center justify-between bg-[#1a1a24] border border-white/10 border-b-0 px-3 py-2 cursor-grab active:cursor-grabbing select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                <span className="font-mono text-[10px] text-white uppercase tracking-widest">
                  {w.project.name}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(w.id);
                }}
                className="font-mono text-[10px] text-text-muted hover:text-red-400 transition-colors cursor-pointer leading-none"
              >
                &#10005;
              </button>
            </div>

            {/* Window body */}
            <div className="bg-surface border border-white/10 p-5">
              <span className="font-mono text-[10px] text-text-muted tracking-widest">
                {w.project.category}
              </span>

              <p className="mt-4 font-inter text-sm text-text-muted leading-relaxed">
                {w.project.description}
              </p>

              {/* Tech stack */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {w.project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-2 py-0.5 border border-white/10 text-text-muted tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              {w.project.link && (
                <a
                  href={w.project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 font-mono text-[10px] text-[#00FF88] tracking-wider hover:underline"
                >
                  VISIT SITE &#8599;
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bottom bar — Studio Freight style footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white">
        <div className="grid grid-cols-3 px-3 md:px-10 py-2 md:py-4">
          {/* Bio — left */}
          <div className="space-y-0.5">
            <p className="font-mono text-[7px] md:text-xs text-white uppercase tracking-wider">
              Senior eng at QMIRAC
            </p>
            <p className="font-mono text-[7px] md:text-xs text-white uppercase tracking-wider">
              Fullstack UI/UX at Hawkeye
            </p>
          </div>

          {/* Links — centered, 2-col grid */}
          <div className="grid grid-cols-2 gap-x-3 md:gap-x-8 gap-y-0.5 md:gap-y-1 justify-self-center">
            <a href="https://github.com/omatron22" target="_blank" rel="noopener noreferrer" className="group relative font-mono text-[7px] md:text-xs text-white uppercase tracking-wider transition-colors hover:text-[#00FF88] w-fit">
              GITHUB
              <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="/images/resume.pdf" target="_blank" rel="noopener noreferrer" className="group relative font-mono text-[7px] md:text-xs text-white uppercase tracking-wider transition-colors hover:text-[#00FF88] w-fit">
              RESUME
              <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="https://linkedin.com/in/omaresp22/" target="_blank" rel="noopener noreferrer" className="group relative font-mono text-[7px] md:text-xs text-white uppercase tracking-wider transition-colors hover:text-[#00FF88] w-fit">
              LINKEDIN
              <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
            </a>
            <span className="font-mono text-[7px] md:text-xs text-white uppercase tracking-wider whitespace-nowrap">
              E: omaresp35@gmail.com
            </span>
          </div>

          {/* Copyright + hidden game link — right */}
          <div className="flex flex-col items-end gap-0.5 md:gap-1">
            <Link
              href="/video-game"
              className="font-mono text-[7px] md:text-[10px] text-white hover:text-[#00FF88] transition-colors duration-300"
              title="Play Samson The Game"
            >
              {'>'}_{'<'} PLAY?
            </Link>
            <span className="font-mono text-[7px] md:text-xs text-white">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
