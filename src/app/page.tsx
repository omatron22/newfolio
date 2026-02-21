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
    description: 'Portfolio & brand site for a lighting designer.',
    image: '/images/gimmemoorelight.png',
    tech: ['Next.js', 'Framer Motion', 'Tailwind'],
  },
  {
    name: 'DIANNE',
    category: 'WEB',
    accent: '#00FF88',
    link: 'https://dianne-portfolio-dun.vercel.app',
    description: 'Photography portfolio with gallery showcases.',
    tech: ['Next.js', 'TypeScript', 'CSS'],
  },
  {
    name: 'MAYASITE',
    category: 'RESEARCH',
    accent: '#00FF88',
    link: 'https://mayasite.vercel.app',
    description: 'Semantic search engine for Maya glyphs.',
    tech: ['React', 'D3.js', 'TypeScript'],
  },
  {
    name: 'CLEARWATER',
    category: 'WEB',
    accent: '#00FF88',
    link: 'https://clearwaterpoolandspaservice.com',
    description: 'Business site for a pool & spa company.',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
  },
];

type Project = (typeof PROJECTS)[number];

// Distribute N points evenly on a sphere (Fibonacci sphere)
const SPHERE_POINTS = 12;
const SPHERE_ITEMS = Array.from({ length: SPHERE_POINTS }, (_, i) => {
  const project = PROJECTS[i % PROJECTS.length];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - ((i + 0.5) / SPHERE_POINTS) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = golden * i;
  return {
    project,
    baseX: Math.cos(theta) * radius,
    baseY: y,
    baseZ: Math.sin(theta) * radius,
  };
});

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Orb rotation — refs for smooth 60fps updates, single forceRender per frame
  const rot = useRef({ x: -0.3, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>(0);
  const scatter = useRef(0); // 0 = orb, 1 = fully scattered — smoothly lerped
  const selectedRef = useRef<Project | null>(null);
  const [, forceRender] = useReducer((n: number) => n + 1, 0);

  // Keep selectedRef in sync so rAF loop can read it without stale closures
  selectedRef.current = selectedProject;
  const isExpanded = selectedProject !== null;

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Single animation loop: spin + scatter interpolation
  useEffect(() => {
    const animate = () => {
      const expanded = selectedRef.current !== null;

      // Smooth scatter lerp — eases in/out over ~600ms
      const target = expanded ? 1 : 0;
      scatter.current += (target - scatter.current) * 0.045;
      // Snap to target when very close to avoid infinite micro-updates
      if (Math.abs(scatter.current - target) < 0.001) scatter.current = target;

      if (!isDragging.current) {
        if (expanded) {
          // Subtle slow drift when expanded
          rot.current.y += 0.0005;
        } else {
          velocity.current.x *= 0.95;
          velocity.current.y *= 0.95;
          rot.current.y += velocity.current.x + 0.002;
          rot.current.x += velocity.current.y;
        }
      }

      forceRender();
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  const selectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  // Drag handlers — mutate refs directly, no setState
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (selectedRef.current) return;
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || selectedRef.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    const sensitivity = 0.004;

    rot.current.y += dx * sensitivity;
    rot.current.x += dy * sensitivity;

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
  const scatterMultiplier = isMobile ? 1.8 : 2;
  const s = scatter.current;
  const currentRadius = orbRadius * (1 + (scatterMultiplier - 1) * s);

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
    const isSelected = selectedProject && item.project.name === selectedProject.name;

    // Opacity: lerp between normal and dimmed based on scatter
    const normalOpacity = 0.15 + depth * 0.85;
    const scatteredOpacity = isSelected ? 0 : 0.15 + depth * 0.25;
    const opacity = normalOpacity + (scatteredOpacity - normalOpacity) * s;

    return {
      ...item,
      screenX: x1 * currentRadius,
      screenY: y * currentRadius,
      z,
      opacity,
      scale: 0.6 + depth * 0.4,
    };
  });

  // Show detail card once scatter has progressed enough
  const showDetail = selectedProject && s > 0.4;

  return (
    <main
      className="relative h-screen w-screen overflow-hidden bg-bg"
      onClick={() => { if (isExpanded) setSelectedProject(null); }}
    >
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
        className="absolute top-[10vh] left-0 w-full z-10 px-4 font-geist uppercase text-white leading-[0.92] text-center md:text-left pointer-events-none"
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
        onClick={(e) => e.stopPropagation()}
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

      {/* Dim overlay — opacity driven by scatter amount */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{ backgroundColor: `rgba(0,0,0,${s * 0.5})` }}
      />

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
              onClick={(e) => {
                e.stopPropagation();
                if (!isExpanded) {
                  selectProject(item.project);
                } else if (item.project.name !== selectedProject?.name) {
                  setSelectedProject(item.project);
                }
              }}
              className="absolute group cursor-pointer whitespace-nowrap"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${item.screenX}px, ${item.screenY}px) scale(${item.scale})`,
                opacity: item.opacity,
                zIndex: Math.round(item.z * 10) + 10,
                pointerEvents: item.z < -0.3 && !isExpanded ? 'none' : 'auto',
              }}
            >
              <span className="font-geist text-xs md:text-2xl font-bold text-white tracking-tight group-hover:text-[#00FF88] transition-colors duration-200">
                {item.project.name}
              </span>
            </button>
          ))}
      </div>

      {/* Center detail — title, image, one-liner. Small and tight. */}
      <AnimatePresence mode="wait">
        {showDetail && selectedProject && (
          <motion.div
            key={selectedProject.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[20] flex items-center justify-center pointer-events-none"
          >
            <div
              className="text-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title */}
              <h3 className="font-geist text-base md:text-lg font-bold text-white tracking-tight mb-2">
                {selectedProject.name}
              </h3>

              {/* Clickable image */}
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mx-auto w-[180px] md:w-[240px] h-[100px] md:h-[140px] border border-white/10 bg-surface/60 backdrop-blur-md overflow-hidden group cursor-pointer relative"
              >
                {'image' in selectedProject && selectedProject.image ? (
                  <img
                    src={selectedProject.image as string}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center group-hover:bg-white/5 transition-colors duration-300">
                    <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase group-hover:text-[#00FF88] transition-colors">
                      VISIT &#8599;
                    </span>
                  </div>
                )}
              </a>

              {/* Short description */}
              <p className="mt-2 font-mono text-[9px] md:text-[10px] text-text-muted max-w-[200px] mx-auto">
                {selectedProject.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom bar — Studio Freight style footer */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white"
        onClick={(e) => e.stopPropagation()}
      >
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

          {/* Game link — >_< stacked over PLAY? */}
          <Link
            href="/video-game"
            className="flex flex-col items-end justify-center font-mono text-sm md:text-lg text-white hover:text-[#00FF88] transition-colors duration-300 leading-none"
            title="Play Samson The Game"
          >
            <span>{'>'}_{'<'}</span>
            <span>PLAY?</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
