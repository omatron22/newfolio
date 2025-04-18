'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify-icon/react';
import MySVGComponent from '@/components/ui/svgs/MySVGComponent';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define theme constants (same as in AppBar)
const THEMES = ['corporate', 'dracula', 'retro', 'aqua'];
type Theme = typeof THEMES[number];

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>('corporate');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'corporate';
    setCurrentTheme(savedTheme);
  }, []);

// Theme switching function with debugging
const handleThemeChange = () => {
  console.log('Theme change clicked!', currentTheme);
  const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
  const nextTheme = THEMES[nextIndex];
  console.log(`Changing theme from ${currentTheme} to ${nextTheme}`);
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  setCurrentTheme(nextTheme);
};

  const handleScrollToAbout = () => {
    if (aboutSectionRef.current) {
      const aboutSectionTop = aboutSectionRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: aboutSectionTop,
        behavior: "smooth",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
{/* Hero Section - Desktop positioned / Mobile centered */}
<section className="h-screen flex relative overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 z-0"></div>
  
  {/* SVG Component - Desktop positioning */}
  <motion.div 
  className="absolute z-30 hidden md:block" // Increased z-index
  initial={{ opacity: 0, x: 150 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  style={{ 
    right: "22%",
    top: "40%",
    transform: "translateY(-50%)",
    pointerEvents: "none" // Explicitly enable pointer events
  }}
>
  {/* Make SVG clickable for theme switching */}
  <div 
    className="relative z-10 scale-[1.5] lg:scale-[2] xl:scale-[3.3]"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="inline-block cursor-pointer pointer-events-none"
    >
      <MySVGComponent 
        className="w-full h-auto max-w-none cursor-pointer"
        onClick={handleThemeChange} // Keep this onClick handler too for redundancy
      />
    </motion.div>
  </div>
  
  <motion.div 
    className="absolute -z-10 right-1/2 top-1/2 w-full h-full rounded-full bg-gradient-radial from-primary/20 via-secondary/15 to-transparent blur-3xl transform translate-x-1/2 -translate-y-1/2"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.6, 0.4]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  ></motion.div>
</motion.div>

  {/* Desktop Content - Original layout preserved */}
  <div className="w-full hidden md:flex">
    {/* Content column */}
    <div className="w-full flex flex-col justify-between py-12 lg:py-16 z-20">
      {/* Top content */}
      <div className="mt-8">
        {/* Name - aligned with left side elements */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-8 md:left-16 lg:left-24"
          style={{ top: "14%" }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-clash font-bold leading-tight">
            <motion.span 
              className="text-primary inline-block"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Hey,
            </motion.span>{" "}
            I'm Omar!
          </h1>
        </motion.div>
      </div>
      
      {/* Stacked Role Labels - Left side */}
      <motion.div
        className="absolute left-8 md:left-16 lg:left-24 top-1/3 transform -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <motion.div 
            className="text-3xl md:text-4xl lg:text-5xl font-clash font-medium"
            whileHover={{ x: 10, color: 'var(--color-secondary)' }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-secondary">Web Developer</span>
          </motion.div>
          <motion.div 
            className="text-3xl md:text-4xl lg:text-5xl font-clash font-medium"
            whileHover={{ x: 10, color: 'var(--color-accent)' }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-primary">Software Engineer</span>
          </motion.div>
          <motion.div 
            className="text-3xl md:text-4xl lg:text-5xl font-clash font-medium"
            whileHover={{ x: 10, color: 'var(--color-secondary)' }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-secondary">Creator</span>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Bottom content */}
      <div className="flex justify-between items-end mt-auto">
        {/* Action buttons - aligned with role labels */}
        <motion.div 
          className="flex gap-6 absolute left-8 md:left-16 lg:left-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ bottom: "calc(19% + 3px)" }}
        >
          <motion.button 
            onClick={handleScrollToAbout}
            className="btn btn-primary btn-lg px-8 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
          
          <motion.a 
            href="/images/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline btn-primary btn-lg px-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Resume
          </motion.a>
        </motion.div>
        
        {/* Social media links */}
        <motion.div 
          className="flex gap-8 absolute right-8 md:right-16 lg:right-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ bottom: "calc(19% + 3px)" }} 
        >
          <motion.a 
            href="https://www.linkedin.com/in/omaresp22/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -8 }}
            className="text-4xl hover:text-primary transition-colors duration-300"
          >
            <Icon icon="mdi:linkedin" />
          </motion.a>
          <motion.a 
            href="https://github.com/omatron22" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -8 }}
            className="text-4xl hover:text-secondary transition-colors duration-300"
          >
            <Icon icon="mdi:github" />
          </motion.a>
          <motion.a 
            href="mailto:your-email@example.com" 
            whileHover={{ y: -8 }}
            className="text-4xl hover:text-primary transition-colors duration-300"
          >
            <Icon icon="mdi:email-outline" />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator - Desktop */}
      <motion.div 
        className="mx-auto mt-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={handleScrollToAbout}
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="text-primary"
        >
          <Icon icon="mdi:chevron-down" className="text-4xl" />
        </motion.div>
      </motion.div>
    </div>
  </div>
  
  {/* Mobile-only Content - Completely centered approach with fixed height distribution */}
  <div className="md:hidden w-full h-full flex flex-col items-center z-20 relative">
    <div className="flex flex-col items-center justify-between h-[92vh] py-6">
      {/* Top content container */}
      <div className="flex flex-col items-center">
        {/* Name - centered */}
        <motion.div
          className="text-center px-4 mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-clash font-bold leading-tight">
            <motion.span 
              className="text-primary inline-block"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Hey,
            </motion.span>{" "}
            I'm Omar!
          </h1>
        </motion.div>
        
        {/* Stacked Role Labels - centered */}
        <motion.div
          className="text-center px-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col gap-2 sm:gap-3">
            <motion.div 
              className="text-2xl sm:text-3xl font-clash font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-secondary">Web Developer</span>
            </motion.div>
            <motion.div 
              className="text-2xl sm:text-3xl font-clash font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-primary">Software Engineer</span>
            </motion.div>
            <motion.div 
              className="text-2xl sm:text-3xl font-clash font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-secondary">Creator</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
{/* SVG Container - Taking the middle space but with absolute positioning for SVG */}
<div className="relative h-60 w-full flex-shrink-0">
  <motion.div
    className="absolute z-10"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    style={{
      right: '-9%',
      top: '20%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',   /* ⬅️ ignore clicks */
    }}
  >
    <div className="scale-150 sm:scale-[1.8] pointer-events-none">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="inline-block cursor-pointer pointer-events-none"
      >
        <MySVGComponent
          className="w-full h-auto max-w-none cursor-pointer"
          onClick={handleThemeChange}   /* the one and only handler */
        />
      </motion.div>
    </div>
  
  <motion.div 
    className="absolute -z-10 right-1/2 top-1/2 w-full h-full rounded-full bg-gradient-radial from-primary/20 via-secondary/15 to-transparent blur-3xl transform translate-x-1/2 -translate-y-1/2"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.6, 0.4]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  ></motion.div>
</motion.div>
</div>
      
      {/* Bottom content container */}
      <div className="flex flex-col items-center w-full">
        {/* Action buttons - centered */}
        <div className="w-full px-6 flex flex-col gap-3">
          <motion.button 
            onClick={handleScrollToAbout}
            className="btn btn-primary w-full shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore My Work
          </motion.button>
          
          <motion.a 
            href="/images/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline btn-primary w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Resume
          </motion.a>
        </div>
        
        {/* Social links - centered */}
        <motion.div 
          className="flex gap-6 justify-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.a 
            href="https://www.linkedin.com/in/omaresp22/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="text-3xl hover:text-primary transition-colors duration-300"
          >
            <Icon icon="mdi:linkedin" />
          </motion.a>
          <motion.a 
            href="https://github.com/omatron22" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="text-3xl hover:text-secondary transition-colors duration-300"
          >
            <Icon icon="mdi:github" />
          </motion.a>

        </motion.div>
        
        {/* Scroll Indicator - Fixed position for mobile */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={handleScrollToAbout}
          style={{ cursor: 'pointer' }}
        >
          <motion.div
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="text-primary"
          >
            <Icon icon="mdi:chevron-down" className="text-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* Unified Overview Section */}
      <motion.section
        ref={aboutSectionRef}
        className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-16 sm:space-y-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        id="overview"
      >
        {/* About - Responsive Layout */}
        <motion.div 
          variants={itemVariants} 
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center text-center md:text-left"
        >
          {/* Image Side – Responsive Photo Cluster */}
          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] flex justify-center items-center mx-auto md:mx-0 md:-translate-x-6 md:translate-y-10 max-w-md">
            {/* Glow Aura */}
            <div className="absolute w-[80%] h-[80%] bg-primary/10 blur-3xl rounded-full -left-6 top-1/2 -translate-y-1/2 -z-10" />

            {/* Photo 1 – Left */}
            <div className="absolute top-12 left-[5%] sm:left-[10%] md:left-0 rotate-[-4deg] hover:rotate-[-1deg] transition-transform duration-300 z-20 scale-90 sm:scale-100">
              <div className="bg-base-100 border border-base-300 rounded-xl p-2 shadow-md">
                <Image 
                  src="/images/one.JPG"
                  alt="Climbing"
                  width={180}
                  height={240}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Photo 2 – Right */}
            <div className="absolute top-12 right-[5%] sm:right-[10%] md:left-60 rotate-[3deg] hover:rotate-[1deg] transition-transform duration-300 z-30 scale-90 sm:scale-100">
              <div className="bg-base-100 border border-base-300 rounded-xl p-2 shadow-lg">
                <Image 
                  src="/images/three.jpeg"
                  alt="Grad"
                  width={190}
                  height={250}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Photo 3 – Lower Middle */}
            <div className="absolute top-[180px] sm:top-[190px] left-[28%] sm:left-[34%] md:left-36 rotate-[6deg] hover:rotate-[3deg] transition-transform duration-300 z-10 scale-90 sm:scale-100">
              <div className="bg-base-100 border border-base-300 rounded-xl p-2 shadow-md">
                <Image 
                  src="/images/two.jpeg"
                  alt="Travel"
                  width={180}
                  height={230}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-clash font-bold mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-base-content leading-relaxed mb-6">
              I'm Omar Espinoza from Ventura, California. I love building things — whether it's software, music, or handmade furniture. 
              My background in Linguistics & CS from UCLA taught me how to think deeply and create intentionally. I'm excited to keep learning, designing, and making tech that feels human.
            </p>
            <div className="flex justify-center md:justify-start gap-3 sm:gap-4 flex-wrap">
              {[
                ["mdi:code-braces", "Web Development"],
                ["mdi:palette", "UI/UX Design"],
                ["mdi:music", "Music"],
                ["mdi:hammer-wrench", "DIY Projects"]
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 bg-base-200 rounded-full px-3 py-1 sm:px-4 sm:py-2 shadow-sm">
                  <Icon icon={icon} className="text-primary" />
                  <span className="text-xs sm:text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education + Experience Timeline */}
        <motion.div className="space-y-8 sm:space-y-10" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-clash font-bold text-center">Journey</h2>
          <div className="space-y-6 sm:space-y-10">
            {/* UCLA */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-4 sm:p-6 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-2">
                <Icon icon="mdi:school-outline" className="text-secondary" /> UCLA – B.A. Linguistics & Computer Science
              </h3>
              <p className="text-xs sm:text-sm text-base-content/80 mb-2">2020–2024 · Los Angeles, CA</p>
              <ul className="list-disc ml-6 text-base-content/90 text-xs sm:text-sm space-y-1">
                <li>Snow Team Athlete</li>
                <li>Web Developer @ Society of LatinX Engineers</li>
              </ul>
            </div>

            {/* Experior Labs */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-4 sm:p-6 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-2">
                <Icon icon="mdi:briefcase-outline" className="text-primary" /> Experior Laboratories – Programming Intern
              </h3>
              <p className="text-xs sm:text-sm text-base-content/80 mb-2">Summer 2023 · Oxnard, CA</p>
              <ul className="list-disc ml-6 text-base-content/90 text-xs sm:text-sm space-y-1">
                <li>Built automation scripts in C + LabVIEW</li>
                <li>Improved data parsing with SQLite</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-clash font-bold text-center">Skills & Tools</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {[
              "HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind",
              "Next.js", "Node.js", "MongoDB", "SQL", "Firebase",
              "Python", "C/C++", "Git", "Google Cloud", "Docker",
              "Figma", "Photoshop", "Illustrator", "Adobe XD"
            ].map((skill) => (
              <span key={skill} className="bg-base-200 px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-sm border border-base-300">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-base-300 py-8 sm:py-10 border-t border-base-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-clash font-bold text-base-content/80">Designed & Built by Omar Espinoza</p>
          <p className="text-xs font-clash font-bold text-base-content/60">© {new Date().getFullYear()} Omar Espinoza. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}