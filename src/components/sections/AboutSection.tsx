// src/components/sections/AboutSection.tsx
import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="relative about bg-base-200 py-10 flex">
      <div className="w-3/5 text-left px-6 z-20">
        {/* Content Section as Modern Card */}
        <div className="bg-base-100 shadow-md border border-base-300 p-6 rounded-lg w-full">
          {/* Card Header */}
          <h2 className="text-xl font-bold mb-4">
            About Me
          </h2>

          {/* Card Content */}
          <p className="text-base leading-relaxed text-base-content">
            Hi, I&apos;m Omar Espinoza from Ventura, California. I like creating things – whether I&apos;m coding a web application, redesigning old furniture, or improvising on my guitar and piano. I aim to channel my passion into unique, thoughtful creations that bring ideas to life. Few things are more satisfying than transforming a vision into something real that resonates with others. I&apos;m looking to apply my technical and creative skills in a role where I can keep learning and improve how people interact with technology.
          </p>
        </div>
      </div>

      <div className="w-2/5 flex items-center justify-center z-10">
        {/* Image Section */}
        <div
          className="relative overflow-hidden shadow-lg border border-base-300 rounded-lg transition-transform"
          style={{ maxWidth: '450px', aspectRatio: '3 / 2' }}
        >
          <div
            className="bg-base-100 relative h-full w-full overflow-hidden"
          >
            {/* Next.js Image Component */}
            <Image
              src="/images/three.jpeg"
              alt="Omar Espinoza"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}