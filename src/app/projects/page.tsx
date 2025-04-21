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
  image?: string;
  websiteLink?: string;
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
      tags: ["professional"],
      status: "completed",
      image: "/images/experior.jpg" // Placeholder image path
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
      githubLink: "https://github.com/omatron22/newfolio",
      gameLink: "/video-game", 
      tags: ["personal"],
      status: "completed",
      image: "/images/videogame.png" // Placeholder image path
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
      githubLink: "https://github.com/omatron22/newfolio",
      tags: ["personal", "web"],
      status: "completed",
      image: "/images/heropage.png" // Placeholder image path
    },
    {
      title: "Clearwater Pool and Spa Service Website",
      company: "Family Business Project",
      companyUrl: "https://www.clearwaterpoolandspaservice.com/",
      purpose: "Create a professional online presence for a family pool and spa service business",
      language: "Next.js, TypeScript, Tailwind CSS, Google Maps API",
      description: `Designed and developed a modern, responsive website for a family-run pool and spa service business. 
      Implemented Google reCAPTCHA for spam prevention and customer protection, ensuring secure form submissions. 
      Integrated Google Maps API to display service areas and locations, making it easy for customers to find and contact the business.
      The website features a clean, professional design with detailed service offerings, testimonials, and contact information.
      Built with performance and accessibility in mind, creating a seamless experience across all devices.`,
      githubLink: "https://github.com/omatron22/clearwater",
      websiteLink: "https://www.clearwaterpoolandspaservice.com/",
      tags: ["personal", "web"],
      status: "completed",
      image: "/images/clearwater.png" // You'll need to add a screenshot
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
      image: "/images/beanpod.jpeg" // Placeholder image path
    },
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  // Split projects into two columns for masonry layout
  const leftColumnProjects = filteredProjects.filter((_, index) => index % 2 === 0);
  const rightColumnProjects = filteredProjects.filter((_, index) => index % 2 === 1);

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

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div 
      className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
      variants={itemVariants}
    >
      {/* Project Image - Now with a cleaner overlay design */}
      <div className="w-full h-48 relative overflow-hidden">
        {project.image ? (
          <div 
            className="absolute inset-0 bg-center bg-cover transform hover:scale-105 transition-transform duration-500" 
            style={{ backgroundImage: `url(${project.image})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}
        
        {/* Status Badge Overlay */}
        <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
          <Icon 
            icon={statusIcons[project.status].icon} 
            className={`${statusIcons[project.status].color} mr-1.5 text-lg`}
          />
          <span className="text-xs font-medium">{statusIcons[project.status].label}</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-clash font-bold text-base-content mb-1">
          {project.title}
        </h2>

        {/* Company - More subtle */}
        {project.company && (
          <div className="flex items-center space-x-2 mb-4 text-sm">
            <Icon icon="mdi:briefcase-outline" className="text-primary text-lg" />
            <span className="text-base-content/70">
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

        {/* Purpose - With better spacing */}
        {project.purpose && (
          <div className="text-base-content/80 text-sm mb-6">
            {project.purpose}
          </div>
        )}

        {/* Technologies */}
        {project.language && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.language.split(', ').map((tech, idx) => (
              <span 
                key={idx}
                className="bg-base-200 text-xs px-3 py-1 rounded-full text-base-content/80"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Description - Full text always visible */}
        <p className="text-sm text-base-content/70 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-primary/10 text-xs px-2 py-1 rounded-full text-primary font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Links - Only show if there are any links */}
        {(project.websiteLink || project.gameLink || project.githubLink) && (
          <div className="flex gap-3 mt-6 pt-6 border-t border-base-200">
            {project.websiteLink && (
              <Link 
                href={project.websiteLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm flex-1 gap-2"
              >
                <Icon icon="mdi:web" className="text-xl" />
                Website
              </Link>
            )}
            {project.gameLink && (
              <Link 
                href={project.gameLink} 
                className="btn btn-primary btn-sm flex-1 gap-2"
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
                className="btn btn-ghost btn-sm flex-1 gap-2"
              >
                <Icon icon="mdi:github" className="text-xl" />
                Code
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

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

      {/* Filter Buttons - Removed family, game, automation */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {['all', 'personal', 'professional', 'academic', 'web'].map(filter => (
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

      {/* Projects Grid with Masonry Columns */}
      <div className="w-full px-6 max-w-7xl mx-auto pb-24">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <div className="flex flex-col">
            {leftColumnProjects.map((project, index) => (
              <ProjectCard key={index * 2} project={project} index={index * 2} />
            ))}
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col">
            {rightColumnProjects.map((project, index) => (
              <ProjectCard key={index * 2 + 1} project={project} index={index * 2 + 1} />
            ))}
          </div>
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
          href="mailto:omaresp35@gmail.com" 
          className="btn btn-primary"
        >
          Get In Touch
        </Link>
      </motion.div>
    </div>
  );
}