// app/projects/page.tsx
'use client';

import { Icon } from '@iconify-icon/react';
import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      title: "GPIB to SQL DLL Automation",
      company: "Experior Laboratories",
      companyUrl: "https://experiorlabs.com/",
      purpose: "Automate data extraction from VISA machines and streamline SQL database integration",
      language: "C, LabVIEW (DLL integration)",
      description: `Developed a solution to automate the process of extracting data from VISA machines, which previously required manual effort and separate LabVIEW algorithms for each machine. The C code communicated with machines to retrieve measurement data, automatically adding it to an SQL database by either updating an existing entry or creating a new one. The code was converted into a DLL for integration with LabVIEW, allowing for easy replication and significantly improving efficiency.`,
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
    },
  ];

  return (
    <div className="bg-gradient-to-b from-base-100 to-base-200 min-h-screen flex flex-col items-center">
      <div className="py-16 px-6 w-full max-w-[1920px]">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-base-100 shadow-lg border border-base-300 rounded-lg p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-base-content">
                  {project.title}
                </h1>
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

              <p className="text-sm text-base-content leading-relaxed mt-4">
                {project.description}
              </p>

              <div className="flex justify-end mt-4 space-x-4">
                {project.gameLink && (
                  <Link 
                    href={project.gameLink} 
                    className="text-base-content hover:text-primary transition-transform transform hover:scale-110"
                  >
                    <Icon icon="mdi:dog" className="text-3xl" />
                  </Link>
                )}
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base-content hover:text-primary transition-transform transform hover:scale-110"
                  >
                    <Icon icon="mdi:github" className="text-3xl" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}