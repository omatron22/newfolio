// app/projects/page.tsx
'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define types for project status
type ProjectStatus = 'completed' | 'progress' | 'concept';

// Define project interface
interface Project {
  title: string;
  company: string;
  companyUrl?: string;
  purpose: string;
  language: string;
  description: string;
  githubLink?: string;
  gameLink?: string;
  tags: string[];
  status: ProjectStatus;
  featured?: boolean;
  image?: string;
}

export default function Projects() {
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects: Project[] = [
    {
      title: "GPIB to SQL DLL Automation",
      company: "Experior Laboratories",
      companyUrl: "https://experiorlabs.com/",
      purpose: "Automate data extraction from VISA machines and streamline SQL database integration",
      language: "C, LabVIEW (DLL integration)",
      description: `Developed a solution to automate the process of extracting data from VISA machines, which previously required manual effort and separate LabVIEW algorithms for each machine. The C code communicated with machines to retrieve measurement data, automatically adding it to an SQL database by either updating an existing entry or creating a new one. The code was converted into a DLL for integration with LabVIEW, allowing for easy replication and significantly improving efficiency.`,
      tags: ["professional", "automation"],
      status: "completed",
      image: "/images/project-code.jpg" // Placeholder image path
    },
    {
      title: "Personal Portfolio Website",
      company: "Personal Project",
      purpose: "Showcase skills, projects, and personality through a custom-built interactive experience",
      language: "TypeScript, React, Tailwind CSS, DaisyUI",
      description: `Built a custom portfolio website using React and TypeScript, designed to create a visually engaging and interactive experience. 
      The entire site features hand-drawn SVG designs, created from scratch with Illustrator and Photoshop, giving it a distinctive, personal style.
      The colors dynamically adapt using DaisyUI theme switching, creating a seamless visual experience across different themes.
      The site also includes a typewriter text animation, an image slider, and smooth scrolling for responsive navigation.
      An integrated 2D runner game, created with React and Phaser, adds an interactive element, featuring original animations, dynamic character selection, and custom music composed and recorded for a unique touch.`,
      githubLink: "https://github.com/omatron22/Portfolio",
      tags: ["personal", "web"],
      status: "completed",
      featured: true,
      image: "/images/project-portfolio.jpg" // Placeholder image path
    },
    {
      title: "Samson The Game",
      company: "Personal Project",
      purpose: "Create a unique 2D runner from scratch, combining animations, gameplay, and my own music",
      language: "JavaScript, TypeScript, React, Phaser",
      description: `Created a custom 2D game using React and Phaser, inspired by classic 8-bit games. 
      Designed frame-by-frame animations for characters and backgrounds, all drawn with sprite sheets using Piskel, Illustrator, and Photoshop.
      The game features obstacle generation, collision detection, and a scoring system.
      You can choose between different characters, each with its own design.
      The background music and sound effects are original, recorded and mixed by me.`,
      githubLink: "https://github.com/omatron22/Portfolio",
      gameLink: "/video-game", 
      tags: ["personal", "game"],
      status: "completed",
      image: "/images/project-game.jpg" // Placeholder image path
    },
    {
      title: "BeanPod",
      company: "35-L: Software Construction Course",
      companyUrl: "https://web.cs.ucla.edu/classes/fall23/cs35L/",
      purpose: "Create a messaging app prototype tailored for student communication needs",
      language: "React, Firebase, Git",
      description: `BeanPod is a prototype of a private messaging app developed as a group project for a software construction course. 
      It features a dynamic and responsive UI built with React, designed with student communication in mind. 
      The backend leverages Firebase for real-time database management, enabling instant message syncing and secure Google sign-in authentication. 
      Key features include streamlined Google Authentication, real-time chat functionality, image sharing, a comprehensive chat history feature, and a user-friendly dark mode toggle.`,
      githubLink: "https://github.com/omatron22/Bean-Pod", 
      tags: ["academic", "web"],
      status: "completed",
      image: "/images/project-chat.jpg" // Placeholder image path
    },
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  // Define status icons with proper typing
  const statusIcons: Record<ProjectStatus, { icon: string; color: string; label: string }> = {
    completed: { icon: "mdi:check-circle", color: "text-success", label: "Completed" },
    progress: { icon: "mdi:progress-clock", color: "text-warning", label: "In Progress" },
    concept: { icon: "mdi:lightbulb-outline", color: "text-info", label: "Concept" }
  };

  return (
    <div className="bg-gradient-to-b from-base-100 to-base-200 min-h-screen flex flex-col items-center">
      {/* Page Header */}
      <motion.div 
        className="w-full py-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-clash font-bold text-base-content">
          My <span className="text-primary">Projects</span>
        </h1>
        <p className="text-base-content/80 mt-4 max-w-xl mx-auto px-6">
          A collection of work that showcases my skills, interests, and evolving journey in technology.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {['all', 'personal', 'professional', 'academic', 'web', 'game', 'automation'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === filter 
                ? 'bg-primary text-primary-content shadow-md' 
                : 'bg-base-200 text-base-content hover:bg-base-300'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="w-full px-6 max-w-7xl mx-auto pb-24">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index} 
              className={`bg-base-100 border border-base-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
                project.featured ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100' : ''
              }`}
              variants={itemVariants}
            >
              {/* Project Image/Header */}
              <div className="w-full h-48 bg-gradient-to-r from-primary/10 to-secondary/10 relative flex items-center justify-center">
                {project.image && (
                  <div className="absolute inset-0 opacity-30 bg-center bg-cover" 
                       style={{ backgroundImage: `url(${project.image})` }}></div>
                )}
                <div className="relative z-10 text-center px-6">
                  <h2 className="text-2xl font-clash font-bold text-base-content">{project.title}</h2>
                  {project.featured && (
                    <span className="inline-block bg-primary text-primary-content text-xs px-2 py-1 rounded-full mt-2">
                      Featured Project
                    </span>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Status Badge */}
                <div className="flex items-center mb-4">
                  <Icon 
                    icon={statusIcons[project.status].icon} 
                    className={`${statusIcons[project.status].color} mr-2`} 
                  />
                  <span className="text-xs font-medium">{statusIcons[project.status].label}</span>
                </div>

                <div className="space-y-4">
                  {project.company && (
                    <div className="flex items-center space-x-2">
                      <Icon icon="mdi:briefcase-outline" className="text-primary" />
                      <span className="font-medium text-base-content">
                        {project.companyUrl ? (
                          <Link
                            href={project.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {project.company}
                          </Link>
                        ) : (
                          project.company
                        )}
                      </span>
                    </div>
                  )}
                  {project.purpose && (
                    <div className="flex items-center space-x-2">
                      <Icon icon="mdi:target" className="text-error" />
                      <span className="font-medium text-base-content">
                        {project.purpose}
                      </span>
                    </div>
                  )}
                  {project.language && (
                    <div className="flex items-center space-x-2">
                      <Icon icon="mdi:code-tags" className="text-success" />
                      <span className="font-medium text-base-content">
                        {project.language}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-base-content/80 leading-relaxed mt-4 line-clamp-4 hover:line-clamp-none transition-all duration-300">
                  {project.description}
                </p>

                {/* Tags */}
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-base-200 text-xs px-2 py-1 rounded-full text-base-content/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                <div className="flex justify-end items-center mt-6 space-x-4">
                  {project.gameLink && (
                    <Link 
                      href={project.gameLink} 
                      className="flex items-center gap-2 btn btn-sm btn-primary"
                    >
                      <Icon icon="mdi:game" className="text-xl" />
                      Play Game
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content hover:text-secondary transition-transform transform hover:scale-110"
                    >
                      <Icon icon="mdi:github" className="text-3xl" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div 
        className="w-full bg-base-300 py-16 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-clash font-bold mb-4">Interested in collaborating?</h2>
        <p className="text-base-content/80 max-w-xl mx-auto mb-6">
          I'm always open to discussing new projects and creative ideas. Let's build something amazing together.
        </p>
        <Link 
          href="mailto:your-email@example.com" 
          className="btn btn-primary"
        >
          Get In Touch
        </Link>
      </motion.div>
    </div>
  );
}