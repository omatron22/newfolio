// src/components/sections/SkillsSection.tsx - Improved responsive design
import React from 'react';

export default function SkillsSection() {
  return (
    <section className="skills bg-base-100 py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { title: 'Frontend Development', skills: 'HTML, CSS, JavaScript, React, Tailwind CSS, DaisyUI' },
            { title: 'Backend Development', skills: 'Node.js, MongoDB, SQL' },
            { title: 'UI/UX Design', skills: 'Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator' },
            { title: 'Database Management', skills: 'Relational Databases (MySQL), NoSQL Databases (Firebase)' },
            { title: 'Version Control', skills: 'Git, GitHub' },
            { title: 'Cloud Services', skills: 'Google Cloud, Firebase Hosting' },
            { title: 'Automation', skills: 'Python Scripting, C/C++' },
            { title: 'DevOps', skills: 'Docker, CI/CD' }
          ].map((skill, index) => (
            <div 
              key={index} 
              className="relative bg-base-100 shadow-lg p-4 md:p-6 flex flex-col items-center text-center space-y-4 rounded-lg"
            >
              {/* Title */}
              <h2 className="text-lg md:text-xl font-semibold text-trace">
                {skill.title}
              </h2>

              {/* Content */}
              <p className="text-sm md:text-base leading-relaxed text-base-content">
                {skill.skills}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}