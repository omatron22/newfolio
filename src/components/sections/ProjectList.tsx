'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProjectArt from './ProjectArt';

interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

interface Project {
  name: string;
  category: string;
  tech: string;
  description: string;
  links: ProjectLink[];
  accent: string;
}

const PROJECTS: Project[] = [
  {
    name: 'QMIRAC',
    category: 'AI / Infrastructure',
    tech: 'TypeScript, React, Node.js, AI/ML',
    description: 'Leading AI system development and building core technical infrastructure for data processing at a startup.',
    links: [],
    accent: '#00F0FF',
  },
  {
    name: 'Hawkeye',
    category: 'Fullstack Platform',
    tech: 'TypeScript, React, Next.js',
    description: 'Building fullstack features and operational tools for a growing startup platform.',
    links: [],
    accent: '#FF00AA',
  },
  {
    name: 'GimmeMooreLight',
    category: 'Web',
    tech: 'Next.js, TypeScript, Tailwind',
    description: 'Custom website built for a client with modern design and responsive layout.',
    links: [{ label: 'Website', href: 'https://gimmemoorelight.com/', external: true }],
    accent: '#00FF88',
  },
  {
    name: 'Dianne Photography',
    category: 'Web',
    tech: 'Next.js, TypeScript, Tailwind',
    description: 'Portfolio website for a professional photographer featuring gallery showcases and responsive design.',
    links: [{ label: 'Website', href: 'https://dianne-portfolio-dun.vercel.app/', external: true }],
    accent: '#FF6600',
  },
  {
    name: 'MayaSite',
    category: 'Research',
    tech: 'Next.js, TypeScript, Roboflow, RAG',
    description: 'Built semantic search engine for Maya glyphs with a research team. Using computer vision and AI to identify patterns in ancient Mayan hieroglyphics.',
    links: [{ label: 'Website', href: 'https://mayasite.vercel.app/', external: true }],
    accent: '#00F0FF',
  },
  {
    name: 'Clearwater Pool & Spa',
    category: 'Web',
    tech: 'Next.js, TypeScript, Tailwind, Google Maps',
    description: 'Professional website for a family business. Google Maps integration, reCAPTCHA, responsive design.',
    links: [
      { label: 'Website', href: 'https://www.clearwaterpoolandspaservice.com/', external: true },
      { label: 'Source', href: 'https://github.com/omatron22/clearwater', external: true },
    ],
    accent: '#FF00AA',
  },
  {
    name: 'Samson The Game',
    category: 'Personal',
    tech: 'TypeScript, React, Phaser, Illustrator',
    description: 'A custom 2D runner with hand-drawn animations, original music, and multiple playable characters. Dedicated to my best friend.',
    links: [{ label: 'Source', href: 'https://github.com/omatron22/newfolio', external: true }],
    accent: '#00FF88',
  },
  {
    name: 'GPIB to SQL Automation',
    category: 'Professional',
    tech: 'C, LabVIEW, SQL',
    description: 'Automated data extraction from VISA machines into SQL databases, replacing manual processes. Built as a DLL for LabVIEW integration.',
    links: [],
    accent: '#FF6600',
  },
];

/* Retro popup title bar button styles */
const titleBarBtn =
  'w-[14px] h-[14px] text-[9px] leading-[14px] text-center font-bold border border-[#808080] bg-[#C0C0C0] shadow-[inset_-1px_-1px_0_#808080,inset_1px_1px_0_#fff] active:shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#fff] select-none';

function RetroPopup({
  project,
  onClose,
  index,
}: {
  project: Project;
  onClose: () => void;
  index: number;
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Randomize initial position slightly so stacked popups don't overlap perfectly
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const popW = Math.min(460, vw - 32);
    const popH = 380;
    setPos({
      x: Math.floor((vw - popW) / 2 + (index % 3 - 1) * 30),
      y: Math.floor((vh - popH) / 2 + (index % 3 - 1) * 20),
    });
  }, [index]);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const onPointerUp = () => setDragging(false);

  const adPhrases = [
    '!!! YOU WON\'T BELIEVE THIS !!!',
    'CLICK HERE FOR AMAZING DEALS',
    'CONGRATULATIONS! YOU FOUND IT',
    '>>> HOT NEW PROJECT <<<',
    'FREE DOWNLOAD - NO VIRUS',
    'DOCTORS HATE THIS ONE TRICK',
    'YOU ARE THE 1,000,000th VISITOR',
    'LIMITED TIME OFFER - ACT NOW',
  ];
  const adPhrase = adPhrases[index % adPhrases.length];

  return (
    <motion.div
      ref={popupRef}
      initial={{ scale: 0.3, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: 40 }}
      transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      className="fixed z-[9000]"
      style={{
        left: pos.x,
        top: pos.y,
        width: 'min(460px, calc(100vw - 32px))',
        fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Tahoma, sans-serif',
      }}
    >
      {/* Window chrome — classic Win98 look */}
      <div
        className="border-2 shadow-xl"
        style={{
          borderColor: '#fff #808080 #808080 #fff',
          backgroundColor: '#C0C0C0',
          boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-1 py-[2px] select-none"
          style={{
            background: 'linear-gradient(90deg, #000080, #1084D0)',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-white font-bold truncate drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
              {project.name}.exe - Internet Explorer
            </span>
          </div>
          <div className="flex gap-[2px]">
            <button className={titleBarBtn} onClick={onClose}>
              _
            </button>
            <button className={titleBarBtn}>
              <span className="text-[8px]">&#9633;</span>
            </button>
            <button className={titleBarBtn} onClick={onClose}>
              X
            </button>
          </div>
        </div>

        {/* Fake menu bar */}
        <div
          className="text-[11px] px-1 py-[1px] flex gap-3 border-b"
          style={{
            borderColor: '#808080',
            color: '#000',
          }}
        >
          <span className="underline">F</span>ile
          <span className="underline">E</span>dit
          <span className="underline">V</span>iew
          <span className="underline">H</span>elp
        </div>

        {/* Fake address bar */}
        <div className="flex items-center gap-1 px-1 py-[2px] text-[10px]" style={{ color: '#000' }}>
          <span>Address</span>
          <div
            className="flex-1 px-1 py-[1px] text-[10px] truncate"
            style={{
              border: '1px solid #808080',
              backgroundColor: '#fff',
              boxShadow: 'inset 1px 1px 0 #808080',
            }}
          >
            http://www.{project.name.toLowerCase().replace(/\s+/g, '')}.com/totally-real
          </div>
          <div
            className="px-2 py-[1px] text-[10px]"
            style={{
              border: '1px outset #C0C0C0',
              backgroundColor: '#C0C0C0',
            }}
          >
            Go
          </div>
        </div>

        {/* Content area */}
        <div
          className="p-3"
          style={{
            backgroundColor: '#fff',
            border: '2px inset #C0C0C0',
            margin: '2px',
          }}
        >
          {/* Retro ad banner top */}
          <div
            className="text-center py-1.5 mb-3 animate-pulse text-[11px] font-bold tracking-wide"
            style={{
              background: `linear-gradient(90deg, ${project.accent}, #ff0, ${project.accent})`,
              color: '#000',
              border: '2px solid #000',
            }}
          >
            {adPhrase}
          </div>

          {/* Project art */}
          <div
            className="w-full h-28 border border-[#808080] mb-3 overflow-hidden"
            style={{ imageRendering: 'pixelated' }}
          >
            <ProjectArt name={project.name} accent={project.accent} />
          </div>

          {/* Project info */}
          <div className="space-y-2">
            <div className="text-center">
              <span
                className="text-[18px] font-bold"
                style={{
                  color: project.accent,
                  textShadow: `1px 1px 0 #000`,
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                }}
              >
                {project.name}
              </span>
              <div className="text-[10px] text-[#666] italic">{project.category}</div>
            </div>

            <p className="text-[11px] text-[#333] leading-relaxed text-center">
              {project.description}
            </p>

            <div className="text-center">
              <span className="text-[9px] text-[#999] font-mono">{project.tech}</span>
            </div>

            {/* Links as retro buttons */}
            {project.links.length > 0 && (
              <div className="flex gap-2 justify-center pt-1 flex-wrap">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[11px] px-4 py-1 font-bold no-underline"
                    style={{
                      background: 'linear-gradient(180deg, #C0C0C0, #A0A0A0)',
                      border: '2px outset #C0C0C0',
                      color: '#000',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {link.label} &gt;&gt;
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Retro ad banner bottom */}
          <div
            className="mt-3 text-center py-1 text-[9px] tracking-widest"
            style={{
              background: '#000',
              color: project.accent,
              border: `1px solid ${project.accent}`,
            }}
          >
            CLOSE THIS WINDOW TO RETURN &bull; 100% FREE &bull; NO SPYWARE
          </div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center px-1 py-[1px] text-[10px]"
          style={{
            borderTop: '1px solid #808080',
            color: '#000',
          }}
        >
          <span style={{ border: '1px inset #C0C0C0', padding: '0 4px', flex: 1 }}>
            Done
          </span>
          <span style={{ border: '1px inset #C0C0C0', padding: '0 4px' }}>
            Internet
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectList() {
  const [openPopups, setOpenPopups] = useState<number[]>([]);

  const togglePopup = (i: number) => {
    setOpenPopups((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i]
    );
  };

  const closePopup = (i: number) => {
    setOpenPopups((prev) => prev.filter((idx) => idx !== i));
  };

  return (
    <section id="projects" className="accent-magenta py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--accent)] mb-4 tracking-widest uppercase">
            Selected Work
          </p>
          <h2 className="font-clash text-5xl md:text-7xl font-bold mb-16">Projects</h2>
        </ScrollReveal>

        <div className="border-t border-border">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.05}>
              <div
                className="border-b border-border cursor-pointer group"
                style={{ '--accent': project.accent, '--accent-glow': `${project.accent}40` } as React.CSSProperties}
                onClick={() => togglePopup(i)}
              >
                {/* Row */}
                <div className="flex items-center justify-between py-6 md:py-8">
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-mono text-sm text-text-muted w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-clash text-2xl md:text-4xl font-bold group-hover:text-[var(--accent)] transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-text-muted hidden md:block">
                    {project.category}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Retro popup overlays */}
      <AnimatePresence>
        {openPopups.map((i) => (
          <RetroPopup
            key={PROJECTS[i].name}
            project={PROJECTS[i]}
            index={i}
            onClose={() => closePopup(i)}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}
