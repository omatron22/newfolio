'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Project {
  name: string;
  type: string;
  status: string;
  tech: string;
  description: string;
  links: { label: string; href: string; external?: boolean }[];
}

const PROJECTS: Project[] = [
  {
    name: 'QMIRAC',
    type: 'Professional',
    status: 'In Progress',
    tech: 'TypeScript, React, Node.js, AI/ML',
    description: 'Leading AI system development and building core technical infrastructure for data processing at a startup.',
    links: [],
  },
  {
    name: 'Samson The Game',
    type: 'Personal',
    status: 'Completed',
    tech: 'TypeScript, React, Phaser, Illustrator',
    description: 'A custom 2D runner with hand-drawn animations, original music, and multiple playable characters. Dedicated to my best friend.',
    links: [
      { label: '📂 Source', href: 'https://github.com/omatron22/newfolio', external: true },
    ],
  },
  {
    name: 'Clearwater Pool & Spa',
    type: 'Family',
    status: 'Completed',
    tech: 'Next.js, TypeScript, Tailwind, Google Maps',
    description: 'Professional website for a family business. Google Maps integration, reCAPTCHA, responsive design.',
    links: [
      { label: '🌐 Website', href: 'https://www.clearwaterpoolandspaservice.com/', external: true },
      { label: '📂 Source', href: 'https://github.com/omatron22/clearwater', external: true },
    ],
  },
  {
    name: 'GPIB to SQL Automation',
    type: 'Professional',
    status: 'Completed',
    tech: 'C, LabVIEW, SQL',
    description: 'Automated data extraction from VISA machines into SQL databases, replacing manual processes. Built as a DLL for LabVIEW integration.',
    links: [],
  },
  {
    name: 'BeanPod',
    type: 'Academic',
    status: 'Completed',
    tech: 'React, Firebase, Git',
    description: 'Private messaging app prototype with real-time chat, Google auth, image sharing. UCLA CS35L team project.',
    links: [
      { label: '📂 Source', href: 'https://github.com/omatron22/Bean-Pod', external: true },
    ],
  },
];

export default function ProjectsWindow() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="font-system text-[12px] h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex gap-4 px-3 py-1.5 bg-win-gray border-b border-win-gray-dark text-[12px]">
        <span><span className="underline">F</span>ile</span>
        <span><span className="underline">E</span>dit</span>
        <span><span className="underline">V</span>iew</span>
        <span><span className="underline">H</span>elp</span>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-win-gray border-b border-win-gray-dark">
        <span className="text-[12px]">📁 Address:</span>
        <div className="flex-1 win-sunken bg-win-white px-2 py-[2px] text-[12px]">
          C:\Omar\Projects\
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_90px_90px] gap-0 bg-win-gray border-b border-win-gray-dark">
        <div className="px-3 py-1.5 border-r border-win-gray-dark font-bold">Name</div>
        <div className="px-3 py-1.5 border-r border-win-gray-dark font-bold">Type</div>
        <div className="px-3 py-1.5 font-bold">Status</div>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-auto bg-win-white">
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            className={`grid grid-cols-[1fr_90px_90px] gap-0 cursor-pointer ${
              selectedIndex === i ? 'bg-win-navy text-white' : 'hover:bg-[#E8E8E8]'
            }`}
            onClick={() => setSelectedIndex(i)}
          >
            <div className="px-3 py-[5px] border-b border-win-gray-light flex items-center gap-2 truncate">
              <span>📁</span> {project.name}
            </div>
            <div className="px-3 py-[5px] border-b border-win-gray-light">{project.type}</div>
            <div className="px-3 py-[5px] border-b border-win-gray-light">{project.status}</div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selectedIndex !== null && (
        <div className="border-t-2 border-win-gray-dark bg-win-gray p-3 max-h-[150px] overflow-auto">
          <p className="font-bold text-[13px] mb-1">{PROJECTS[selectedIndex].name}</p>
          <p className="text-[12px] text-win-gray-dark mb-1">
            Tech: {PROJECTS[selectedIndex].tech}
          </p>
          <p className="text-[12px] mb-2">{PROJECTS[selectedIndex].description}</p>
          {PROJECTS[selectedIndex].links.length > 0 && (
            <div className="flex gap-3">
              {PROJECTS[selectedIndex].links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win-btn text-[12px] no-underline text-win-black"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="win-btn text-[12px] no-underline text-win-black"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
