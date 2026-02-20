'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
const COPIES = 7;
const REPEATED = Array.from({ length: COPIES }, () => PROJECTS).flat();

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const innerRef = useRef<HTMLDivElement>(null);

  // Start scrolled to the middle so we can scroll both directions
  useEffect(() => {
    const el = scrollRef.current;
    const inner = innerRef.current;
    if (el && inner) {
      const setHeight = inner.scrollHeight / COPIES;
      el.scrollTop = setHeight * Math.floor(COPIES / 2);
    }
  }, []);

  const openWindow = useCallback((project: Project) => {
    const id = ++windowIdCounter;
    const offsetX = (windows.length % 5) * 30;
    const offsetY = (windows.length % 5) * 30;
    const x = Math.min(window.innerWidth / 2 - 180 + offsetX, window.innerWidth - 380);
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

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const setHeight = inner.scrollHeight / COPIES;
    const midStart = setHeight * Math.floor(COPIES / 2);
    // Snap back when straying too far from center
    if (el.scrollTop < setHeight) {
      el.scrollTop += setHeight;
    } else if (el.scrollTop > midStart + setHeight) {
      el.scrollTop -= setHeight;
    }
  }, []);

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
        className="absolute top-[10vh] left-0 w-full z-10 px-4 font-geist uppercase text-white leading-[0.92] whitespace-nowrap"
        style={{
          fontSize: '11.5vw',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}
      >
        OMAR ESPINOZA
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

      {/* Project list — centered, infinite user scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] h-[30vh] overflow-y-scroll scrollbar-hide mask-fade"
      >
        <div ref={innerRef} className="flex flex-col items-center">
          {REPEATED.map((project, i) => (
            <button
              key={`${project.name}-${i}`}
              onClick={() => openWindow(project)}
              className="group py-2.5 cursor-pointer text-center"
              style={{ '--proj-accent': project.accent } as React.CSSProperties}
            >
              <span className="font-geist text-lg md:text-2xl font-bold text-white tracking-tight group-hover:text-[var(--proj-accent)] transition-colors duration-200">
                {project.name}
              </span>
            </button>
          ))}
        </div>
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
            className="fixed w-[340px] shadow-2xl shadow-black/50"
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
        <div className="grid grid-cols-3 px-6 md:px-10 py-4">
          {/* Bio — left */}
          <div className="space-y-0.5">
            <p className="font-mono text-[10px] md:text-xs text-white uppercase tracking-wider">
              Senior eng at QMIRAC
            </p>
            <p className="font-mono text-[10px] md:text-xs text-white uppercase tracking-wider">
              Fullstack UI/UX at Hawkeye
            </p>
          </div>

          {/* Links — centered, 2-col grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 justify-self-center">
            <a href="https://github.com/omatron22" target="_blank" rel="noopener noreferrer" className="group relative font-mono text-[10px] md:text-xs text-white uppercase tracking-wider transition-colors hover:text-[#00FF88] w-fit">
              GITHUB
              <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="/images/resume.pdf" target="_blank" rel="noopener noreferrer" className="group relative font-mono text-[10px] md:text-xs text-white uppercase tracking-wider transition-colors hover:text-[#00FF88] w-fit">
              RESUME
              <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="https://linkedin.com/in/omaresp22/" target="_blank" rel="noopener noreferrer" className="group relative font-mono text-[10px] md:text-xs text-white uppercase tracking-wider transition-colors hover:text-[#00FF88] w-fit">
              LINKEDIN
              <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
            </a>
            <span className="font-mono text-[10px] md:text-xs text-white uppercase tracking-wider">
              E: omaresp35@gmail.com
            </span>
          </div>

          {/* Copyright + hidden game link — right */}
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[10px] md:text-xs text-white">
              &copy; {new Date().getFullYear()}
            </span>
            <Link
              href="/video-game"
              className="font-mono text-[10px] text-white hover:text-[#00FF88] transition-colors duration-300"
              title="Play Samson The Game"
            >
              {'>'}_{'<'} PLAY?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
