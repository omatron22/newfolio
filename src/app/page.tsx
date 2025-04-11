'use client';

import React, { useRef } from 'react';
import TypingAnimation from '@/components/ui/TypingAnimation';
import { Icon } from '@iconify-icon/react';
import MySVGComponent from '@/components/ui/svgs/MySVGComponent';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);

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
{/* Hero Section - Balanced Layout with Stacked Roles on Left */}
<section className="h-screen flex relative overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 z-0"></div>
  
  {/* SVG Component - Fixed position */}
  <motion.div 
    className="absolute z-10"
    initial={{ opacity: 0, x: 150 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    style={{ 
      right: "22%",
      top: "40%",
      transform: "translateY(-50%)"
    }}
  >
    <div className="relative z-10 scale-[2] lg:scale-[3.3]">
      <MySVGComponent className="w-full h-auto max-w-none" />
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
        <span className="text-accent">Designer</span>
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

  {/* Content layout with left alignment */}
  <div className="w-full flex">
    {/* Content column */}
    <div className="w-full flex flex-col justify-between py-12 lg:py-16 z-20">
      {/* Top content */}
      <div className="mt-6">
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
      
      {/* Bottom content */}
      <div className="flex justify-between items-end mt-auto">
        {/* Action buttons - aligned with role labels */}
        <motion.div 
          className="flex flex-wrap gap-6 absolute left-8 md:left-16 lg:left-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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
            className="btn btn-outline btn-secondary btn-lg px-8"
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
            whileHover={{ y: -8, color: '#0077B5' }}
            className="text-4xl hover:text-info transition-colors duration-300"
          >
            <Icon icon="mdi:linkedin" />
          </motion.a>
          <motion.a 
            href="https://github.com/omatron22" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -8, color: '#6e5494' }}
            className="text-4xl hover:text-success transition-colors duration-300"
          >
            <Icon icon="mdi:github" />
          </motion.a>
          <motion.a 
            href="mailto:your-email@example.com" 
            whileHover={{ y: -8, color: '#ea4335' }}
            className="text-4xl hover:text-error transition-colors duration-300"
          >
            <Icon icon="mdi:email-outline" />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator - Positioned within the viewport */}
      <motion.div 
        className="mt-16 mx-auto"
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
</section>

      {/* About Section */}
      <motion.section 
        ref={aboutSectionRef} 
        className="py-24 bg-base-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-16">
            <motion.div 
              className="inline-block mb-3"
              variants={itemVariants}
            >
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-clash font-bold text-center"
              variants={itemVariants}
            >
              Get to Know <span className="text-primary">Me</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="w-full md:w-2/5"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Image with frame and decorative elements */}
                <div className="rounded-lg overflow-hidden shadow-xl relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                  <Image 
                    src="/images/three.jpeg" 
                    alt="Profile Image" 
                    width={450}
                    height={300}
                    className="object-cover w-full h-auto"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-10 z-0"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-full opacity-10 z-0"></div>
                <div className="absolute bottom-4 left-4 p-3 bg-base-100 shadow-lg rounded-lg z-20">
                  <p className="text-sm font-medium">Ventura, California</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-3/5"
              variants={itemVariants}
            >
              <div className="bg-base-100 shadow-lg border border-base-300 p-8 rounded-lg">
                <p className="text-base leading-relaxed text-base-content mb-6">
                  Hi, I&apos;m Omar Espinoza from Ventura, California. I like creating things – whether I&apos;m coding a web application, redesigning old furniture, or improvising on my guitar and piano. I aim to channel my passion into unique, thoughtful creations that bring ideas to life.
                </p>
                <p className="text-base leading-relaxed text-base-content mb-6">
                  Few things are more satisfying than transforming a vision into something real that resonates with others. I&apos;m looking to apply my technical and creative skills in a role where I can keep learning and improve how people interact with technology.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center">
                    <Icon icon="mdi:code-braces" className="text-xl text-primary mr-2" />
                    <span>Web Development</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="mdi:palette" className="text-xl text-primary mr-2" />
                    <span>UI/UX Design</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="mdi:music" className="text-xl text-primary mr-2" />
                    <span>Music</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="mdi:hammer-wrench" className="text-xl text-primary mr-2" />
                    <span>DIY Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Education & Experience Section */}
      <motion.section 
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-16">
            <motion.div 
              className="inline-block mb-3"
              variants={itemVariants}
            >
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-clash font-bold text-center"
              variants={itemVariants}
            >
              Education & <span className="text-primary">Experience</span>
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Card */}
            <motion.div 
              className="bg-base-100 shadow-xl border border-base-300 rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300 h-full"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-secondary to-secondary/70 text-base-100 py-6 px-6">
                <h3 className="text-xl font-clash font-bold flex items-center">
                  <Icon icon="mdi:school-outline" className="mr-3 text-2xl" />
                  Education
                </h3>
              </div>

              <div className="p-6">
                <div className="bg-base-200/50 p-4 rounded-lg mb-6">
                  <h4 className="font-clash text-xl mb-2">
                    <Link
                      href="https://www.ucla.edu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-info transition-colors duration-300 flex items-center"
                    >
                      <span className="mr-2">University of California, Los Angeles</span>
                      <Icon icon="mdi:open-in-new" className="text-sm" />
                    </Link>
                  </h4>
                  
                  <div className="flex items-center text-secondary mb-3">
                    <Icon icon="mdi:calendar" className="mr-2" />
                    <p className="font-medium">2020-2024</p>
                  </div>
                  
                  <p className="text-lg mb-3 font-medium">B.A. Linguistics and Computer Science</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center p-3 bg-base-100 rounded-lg">
                      <div className="bg-info/10 p-2 rounded-full mr-4">
                        <Icon icon="mdi:snowflake" className="text-xl text-info" />
                      </div>
                      <div>
                        <Link
                          href="https://uclaclubsports.com/sports/mens-skiing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-info transition-colors duration-300 text-base font-medium"
                        >
                          UCLA Snowteam Athlete
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-base-100 rounded-lg">
                      <div className="bg-info/10 p-2 rounded-full mr-4">
                        <Icon icon="mdi:account-group" className="text-xl text-info" />
                      </div>
                      <div>
                        <Link
                          href="https://uclasoles.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-info transition-colors duration-300 text-base font-medium"
                        >
                          Society of LatinX Engineers 
                        </Link>
                        <p className="text-sm"><em>Web Developer</em></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div 
              className="bg-base-100 shadow-xl border border-base-300 rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300 h-full"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-primary to-primary/70 text-base-100 py-6 px-6">
                <h3 className="text-xl font-clash font-bold flex items-center">
                  <Icon icon="mdi:briefcase-outline" className="mr-3 text-2xl" />
                  Experience
                </h3>
              </div>

              <div className="p-6">
                <div className="bg-base-200/50 p-4 rounded-lg mb-6">
                  <h4 className="font-clash text-xl mb-2">
                    <Link
                      href="https://experiorlabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-info transition-colors duration-300 flex items-center"
                    >
                      <span className="mr-2">Experior Laboratories</span>
                      <Icon icon="mdi:open-in-new" className="text-sm" />
                    </Link>
                  </h4>
                  
                  <div className="flex items-center text-primary mb-3">
                    <Icon icon="mdi:calendar" className="mr-2" />
                    <p className="font-medium">Summer 2023</p>
                  </div>
                  
                  <p className="text-lg mb-3 font-medium">Programming Intern</p>
                  
                  <p className="text-base mb-6">
                    Developed shortcuts for the LabVIEW software using C, SQLite, and other technologies. Learn more about the project{" "}
                    <Link
                      href="https://github.com/omatron22/GPIB-to-SQL-DLL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info hover:underline font-medium"
                    >
                      here
                    </Link>.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center p-3 bg-base-100 rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-full mr-4">
                        <Icon icon="mdi:tools" className="text-xl text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-medium">Automation Project Lead</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-base-100 rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-full mr-4">
                        <Icon icon="mdi:database" className="text-xl text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-medium">Optimized Data Management Processes</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-base-100 rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-full mr-4">
                        <Icon icon="mdi:code-tags" className="text-xl text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-medium">C, SQLite, LabVIEW Expertise</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className="py-24 bg-base-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-16">
            <motion.div 
              className="inline-block mb-3"
              variants={itemVariants}
            >

            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-clash font-bold text-center"
              variants={itemVariants}
            >
              My <span className="text-primary">Skills</span>
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Frontend Development', 
                skills: 'HTML, CSS, JavaScript, React, Tailwind CSS, DaisyUI',
                icon: 'mdi:code-tags'
              },
              { 
                title: 'Backend Development', 
                skills: 'Node.js, MongoDB, SQL',
                icon: 'mdi:server'
              },
              { 
                title: 'UI/UX Design', 
                skills: 'Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator',
                icon: 'mdi:palette'
              },
              { 
                title: 'Database Management', 
                skills: 'Relational Databases (MySQL), NoSQL Databases (Firebase)',
                icon: 'mdi:database'
              },
              { 
                title: 'Version Control', 
                skills: 'Git, GitHub',
                icon: 'mdi:git'
              },
              { 
                title: 'Cloud Services', 
                skills: 'Google Cloud, Firebase Hosting',
                icon: 'mdi:cloud'
              },
              { 
                title: 'Automation', 
                skills: 'Python Scripting, C/C++',
                icon: 'mdi:robot'
              },
              { 
                title: 'DevOps', 
                skills: 'Docker, CI/CD',
                icon: 'mdi:cog-sync'
              }
            ].map((skill, index) => (
              <motion.div 
                key={index} 
                className="bg-base-100 shadow-lg p-6 flex flex-col items-center text-center space-y-4 rounded-lg transform transition-all hover:scale-105 hover:shadow-xl duration-300 border border-base-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary/10 p-4 rounded-full mb-2">
                  <Icon icon={skill.icon} className="text-4xl text-primary" />
                </div>
                
                <h3 className="text-xl font-clash font-semibold">
                  {skill.title}
                </h3>
                
                <p className="text-base leading-relaxed">
                  {skill.skills}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section 
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-16">
            <motion.div 
              className="inline-block mb-3"
              variants={itemVariants}
            >

            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-clash font-bold text-center"
              variants={itemVariants}
            >
              Tech <span className="text-primary">Stack</span>
            </motion.h2>
          </div>
          
          <motion.div 
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 justify-items-center"
            variants={itemVariants}
          >
            {[
              { src: "/images/c:c++.png", alt: "C/C++", width: 86, height: 86 },
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
              { src: "/images/xd.png", alt: "xd", width: 84, height: 84 }
            ].map((icon, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-center bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 border border-base-300/50"
                whileHover={{ y: -5 }}
                variants={itemVariants}
              >
                <Image 
                  src={icon.src} 
                  alt={icon.alt} 
                  width={icon.width}
                  height={icon.height}
                  className="object-contain" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>


      {/* Footer */}
      <footer className="bg-base-300 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm font-clash mb-1">Designed & Built by Omar Espinoza</p>
          <p className="text-sm font-clash">© 2024 Omar Espinoza</p>
        </div>
      </footer>
    </div>
  );
}