// src/app/page.tsx
'use client';

import React, { useRef } from 'react';
import TypingAnimation from '@/components/ui/TypingAnimation';
import MySVGComponent from '@/components/ui/svgs/MySVGComponent';
import MySVGComponent2 from '@/components/ui/svgs/MySVGComponent2';
import { Icon } from '@iconify-icon/react';
import Image from 'next/image';
import Link from 'next/link';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);

  const handleHeroClick = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-base-100 text-base-content overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-start items-center p-0 m-0 overflow-hidden h-auto">
        {/* Typing Animation - Top Center */}
        <div className="z-10 text-center absolute top-10 w-full">
          <TypingAnimation texts={["Hey, I'm Omar!"]} speed={200} />
        </div>

        {/* Clickable SVG Wrapper */}
        <div
          className="w-full h-auto flex justify-start items-center mt-24 mb-2 transform transition-transform duration-300 hover:scale-105 cursor-pointer z-30"
          onClick={handleHeroClick}
        >
          <MySVGComponent className="w-[90%] h-auto ml-auto" />
        </div>

        <div className="relative w-full h-auto mt-8 mb-2">
          {/* Parent container for SVG, Education, and Experience */}
          <div className="relative w-full h-auto">
            
            {/* About Section */}
            <div ref={aboutSectionRef}>
              <AboutSection />
            </div>

            {/* Education Section */}
            <EducationSection />

            {/* Experience Section */}
            <ExperienceSection />

            {/* SVG Background */}
            <div 
              className="absolute w-full h-full z-10 pointer-events-none" 
              style={{ top: '350px', transform: 'scale(1.5)', left: '285px' }}
            >
              <MySVGComponent2 className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Tech Stack Section */}
      <section className="tech-stack bg-base-200 py-10">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-4 w-full px-6">
          {/* Icon List */}
          {[
            { src: "/images/c:c++.png", alt: "C/C++", width: 96, height: 96 },
            { src: "/images/python.png", alt: "Python", width: 56, height: 56 },
            { src: "/images/javascript.png", alt: "JavaScript", width: 56, height: 56 },
            { src: "/images/html.png", alt: "HTML", width: 56, height: 56 },
            { src: "/images/css.png", alt: "CSS", width: 56, height: 56 },
            { src: "/images/logo192.png", alt: "React.JS", width: 56, height: 56 },
            { src: "/images/git.png", alt: "Git", width: 56, height: 56 },
            { src: "/images/SQL.png", alt: "SQL", width: 56, height: 56 },
            { src: "/images/mongo.png", alt: "MongoDB", width: 56, height: 56 },
            { src: "/images/firebase.png", alt: "Firebase", width: 56, height: 56 },
            { src: "/images/google.png", alt: "Google Cloud", width: 48, height: 48 },
            { src: "/images/photoshop.png", alt: "Photoshop", width: 44, height: 44 },
            { src: "/images/illustrator.png", alt: "illustrator", width: 64, height: 64 }, 
            { src: "/images/xd.png", alt: "xd", width: 96, height: 96 }
          ].map((icon, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image 
                src={icon.src} 
                alt={icon.alt} 
                width={icon.width}
                height={icon.height}
                className="object-contain" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer with LinkedIn, GitHub, and CV */}
      <footer className="bg-base-300 py-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="https://www.linkedin.com/in/omaresp22/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon icon="mdi:linkedin" className="text-4xl hover:text-info hover:scale-110 transition-transform duration-300" />
          </Link>
          <Link href="https://github.com/omatron22" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icon icon="mdi:github" className="text-4xl hover:text-success hover:scale-110 transition-transform duration-300" />
          </Link>
          <Link href="/images/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download CV">
            <Icon icon="mdi:file-document-outline" className="text-4xl hover:text-error hover:scale-110 transition-transform duration-300" />
          </Link>
        </div>
        <p className="text-sm">© 2024 Omar Espinoza</p>
      </footer>
    </div>
  );
}