// src/components/sections/ExperienceSection.tsx - Improved responsive design
import React from 'react';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';

export default function ExperienceSection() {
  return (
    <section className="relative experience bg-base-100 py-10 flex">
      <div className="w-full md:w-1/2 text-left px-4 md:px-10 z-20">
        {/* Content Section as Modern Floating Card */}
        <div className="relative bg-base-100 shadow-md border border-base-300 rounded-lg overflow-hidden">
          
          {/* Header Tab */}
          <div className="bg-secondary text-base-content py-3 px-4">
            <h2 className="text-lg font-semibold">Experience</h2>
          </div>

          {/* Card Content */}
          <div className="p-4 md:p-6">
            <h3 className="text-lg">
              <Link
                href="https://experiorlabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-info transition-colors duration-300"
              >
                Experior Laboratories
              </Link>
            </h3>
            
            <p className="text-lg text-secondary">Programming Intern (Summer 2023)</p>
            
            <p className="text-base md:text-lg">
              Developed shortcuts for the LabVIEW software using C, SQLite, and other technologies. Learn more about the project{" "}
              <Link
                href="https://github.com/omatron22/GPIB-to-SQL-DLL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-info hover:underline ml-1"
              >
                here.
              </Link>
            </p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Icon icon="mdi:tools" className="text-2xl text-base-400 min-w-[1.5rem] mr-3" />
                <p className="text-base md:text-lg">Automation Project Lead</p>
              </div>

              <div className="flex items-center">
                <Icon icon="mdi:database" className="text-2xl text-base-400 min-w-[1.5rem] mr-3" />
                <p className="text-base md:text-lg">Optimized Data Management Processes</p>
              </div>

              <div className="flex items-center">
                <Icon icon="mdi:code-tags" className="text-2xl text-base-400 min-w-[1.5rem] mr-3" />
                <p className="text-base md:text-lg">C, SQLite, LabVIEW Expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 z-10">
        {/* Empty right space on larger screens */}
      </div>
    </section>
  );
}