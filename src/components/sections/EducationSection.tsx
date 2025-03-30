// src/components/sections/EducationSection.tsx
import React from 'react';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';

export default function EducationSection() {
  return (
    <section className="relative education bg-base-200 py-10 flex">
      <div className="w-1/2 flex items-center justify-start z-10">
        {/* Empty left space */}
      </div>
      <div className="w-1/2 text-left px-10 z-20">
        {/* Content Section as Modern Floating Card */}
        <div className="relative bg-base-100 shadow-md border border-base-300 rounded-lg overflow-hidden">
          
          {/* Header Tab */}
          <div className="bg-secondary text-base-content py-3 px-4">
            <h2 className="text-lg font-semibold">Education</h2>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <h3 className="text-lg">
              <Link
                href="https://www.ucla.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-info transition-colors duration-300"
              >
                University of California, Los Angeles
              </Link>
            </h3>
            
            <p className="text-lg text-secondary">(2020-2024)</p>
            
            <p className="text-lg">B.A. Linguistics and Computer Science</p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Icon icon="mdi:snowflake" className="text-2xl text-base-400 mr-3" />
                <p className="text-lg">
                  <Link
                    href="https://uclaclubsports.com/sports/mens-skiing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-info transition-colors duration-300"
                  >
                    UCLA Snowteam Athlete
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:account-group" className="text-2xl text-base-400 mr-3" />
                <p className="text-lg">
                  <Link
                    href="https://uclasoles.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-info transition-colors duration-300"
                  >
                    Society of LatinX Engineers Member <em>(Web Developer)</em>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}