// src/app/page.tsx - Redesigned Hero Section
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
      {/* Hero Section - Redesigned with larger SVG coming from left */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 z-0"></div>
        
        {/* Animated particles background */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute w-24 h-24 rounded-full bg-primary/20 top-1/4 left-1/5 animate-pulse"></div>
          <div className="absolute w-32 h-32 rounded-full bg-secondary/20 bottom-1/4 right-1/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-16 h-16 rounded-full bg-accent/20 top-2/3 left-1/3 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 md:px-8 z-10 flex items-center h-full pt-16 pb-24">
          <div className="flex flex-col lg:flex-row items-center justify-between relative">
            {/* Left side - SVG Component */}
            <motion.div 
              className="w-full lg:w-3/5 flex justify-center lg:justify-start relative -ml-16 lg:-ml-32"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div 
                className="transform hover:scale-105 transition-all duration-500 cursor-pointer relative z-10"
                onClick={handleScrollToAbout}
              >
                {/* SVG Component */}
                <MySVGComponent className="w-full h-auto max-w-4xl" />
              </div>
              
              {/* Decorative gradient circles behind SVG */}
              <div className="absolute -z-10 left-1/2 top-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
            
            {/* Right side - Text Content */}
            <motion.div 
              className="w-full lg:w-2/5 text-center lg:text-right mb-8 lg:mb-0 relative z-10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold mb-4 leading-tight">
                <span className="text-primary">Hey,</span> I'm Omar!
              </h1>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-clash font-medium mb-6">
                <span className="text-secondary">Web Developer</span> <span className="text-primary">|</span> <span className="text-accent">Designer</span> <span className="text-primary">|</span> <span className="text-secondary">Creator</span>
              </h2>
              
              <p className="mb-8 text-base md:text-lg leading-relaxed">
                I build things for the web, design beautiful interfaces, and create digital experiences that make a difference.
              </p>
              
              {/* Call to action buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                <motion.button 
                  onClick={handleScrollToAbout}
                  className="btn btn-primary px-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                </motion.button>
                
                <motion.a 
                  href="/images/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-secondary px-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Resume
                </motion.a>
              </div>
              
              {/* Social media links */}
              <div className="flex gap-4 mt-8 justify-center lg:justify-end">
                <motion.a 
                  href="https://www.linkedin.com/in/omaresp22/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#0077B5' }}
                  className="text-2xl hover:text-info transition-colors duration-300"
                >
                  <Icon icon="mdi:linkedin" />
                </motion.a>
                <motion.a 
                  href="https://github.com/omatron22" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#6e5494' }}
                  className="text-2xl hover:text-success transition-colors duration-300"
                >
                  <Icon icon="mdi:github" />
                </motion.a>
                <motion.a 
                  href="mailto:your-email@example.com" 
                  whileHover={{ y: -5, color: '#ea4335' }}
                  className="text-2xl hover:text-error transition-colors duration-300"
                >
                  <Icon icon="mdi:email-outline" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={handleScrollToAbout}
          style={{ cursor: 'pointer' }}
        >
          <p className="text-sm mb-2 font-medium">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
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
              <span className="bg-primary text-base-100 text-sm font-medium py-1 px-3 rounded-full">
                About Me
              </span>
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
              <span className="bg-primary text-base-100 text-sm font-medium py-1 px-3 rounded-full">
                Background
              </span>
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
              <span className="bg-primary text-base-100 text-sm font-medium py-1 px-3 rounded-full">
                Expertise
              </span>
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
              <span className="bg-primary text-base-100 text-sm font-medium py-1 px-3 rounded-full">
                Technologies
              </span>
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

      {/* Contact Section */}
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
              <span className="bg-primary text-base-100 text-sm font-medium py-1 px-3 rounded-full">
                Connect
              </span>
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-clash font-bold text-center"
              variants={itemVariants}
            >
              Get In <span className="text-primary">Touch</span>
            </motion.h2>
          </div>
          
          <motion.div 
            className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-xl p-8 border border-base-300"
            variants={itemVariants}
          >
            <p className="text-center text-lg mb-8">
              I'm always open to new opportunities and collaborations. Feel free to reach out through any of the platforms below!
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="https://www.linkedin.com/in/omaresp22/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-base-200 rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
              >
                <Icon icon="mdi:linkedin" className="text-4xl text-primary mb-2" />
                <span className="font-medium">LinkedIn</span>
              </Link>
              
              <Link 
                href="https://github.com/omatron22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-base-200 rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
              >
                <Icon icon="mdi:github" className="text-4xl text-primary mb-2" />
                <span className="font-medium">GitHub</span>
              </Link>
              
              <Link 
                href="mailto:your-email@example.com" 
                className="flex flex-col items-center p-4 bg-base-200 rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
              >
                <Icon icon="mdi:email-outline" className="text-4xl text-primary mb-2" />
                <span className="font-medium">Email</span>
              </Link>
              
              <Link 
                href="/images/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-base-200 rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
              >
                <Icon icon="mdi:file-document-outline" className="text-4xl text-primary mb-2" />
                <span className="font-medium">Resume</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-base-300 py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="https://www.linkedin.com/in/omaresp22/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Icon icon="mdi:linkedin" className="text-3xl hover:text-info hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link href="https://github.com/omatron22" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Icon icon="mdi:github" className="text-3xl hover:text-success hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link href="/images/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download CV">
              <Icon icon="mdi:file-document-outline" className="text-3xl hover:text-error hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
          <p className="text-sm font-clash mb-1">Designed & Built by Omar Espinoza</p>
          <p className="text-sm font-clash">© 2024 Omar Espinoza</p>
        </div>
      </footer>
    </div>
  );
}