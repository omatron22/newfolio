// src/components/sections/SkillsSection.tsx
import React from 'react';

export default function SkillsSection() {
  return (
    <section className="skills bg-base-100 py-16 px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
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
            className="relative bg-base-100 shadow-lg p-6 flex flex-col items-center text-center space-y-4 rounded-lg"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-trace">
              {skill.title}
            </h2>

            {/* Content */}
            <p className="text-base leading-relaxed text-base-content">
              {skill.skills}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}