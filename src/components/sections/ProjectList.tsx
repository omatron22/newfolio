'use client';

import { useState } from 'react';
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

export default function ProjectList() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
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

                {/* Expanded detail */}
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 flex flex-col md:flex-row gap-6 md:gap-12">
                        {/* Art */}
                        <div className="w-full md:w-48 h-32 md:h-48 rounded border border-border overflow-hidden flex-shrink-0">
                          <ProjectArt name={project.name} accent={project.accent} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                          <p className="font-inter text-sm text-text-primary leading-relaxed">
                            {project.description}
                          </p>
                          <p className="font-mono text-xs text-text-muted">
                            {project.tech}
                          </p>
                          {project.links.length > 0 && (
                            <div className="flex gap-3 flex-wrap">
                              {project.links.map((link) => (
                                <a
                                  key={link.label}
                                  href={link.href}
                                  target={link.external ? '_blank' : undefined}
                                  rel={link.external ? 'noopener noreferrer' : undefined}
                                  className="font-mono text-xs neon-border px-4 py-2 hover:text-[var(--accent)] transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {link.label} &rarr;
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
