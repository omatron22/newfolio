'use client';

import Image from 'next/image';

export default function AboutWindow() {
  return (
    <div className="p-4 font-system text-[13px] leading-[1.6] text-win-black">
      {/* Notepad-style menu bar */}
      <div className="flex gap-4 mb-3 text-[12px] border-b border-win-gray-dark pb-2">
        <span><span className="underline">F</span>ile</span>
        <span><span className="underline">E</span>dit</span>
        <span><span className="underline">V</span>iew</span>
        <span><span className="underline">H</span>elp</span>
      </div>

      <div className="flex gap-4 items-start mb-4">
        {/* Photo with flashing star effect */}
        <div className="shrink-0 relative">
          {/* Flashing star decorations */}
          <div className="win95-star" style={{ top: -6, left: -6, animationDelay: '0s' }}>✦</div>
          <div className="win95-star" style={{ top: -4, right: -8, animationDelay: '0.4s' }}>✦</div>
          <div className="win95-star" style={{ bottom: -6, left: -4, animationDelay: '0.8s' }}>✦</div>
          <div className="win95-star" style={{ bottom: -4, right: -6, animationDelay: '1.2s' }}>✦</div>
          <div className="win-sunken">
            <Image
              src="/images/three.png"
              alt="Omar Espinoza"
              width={130}
              height={170}
              className="block object-cover"
              style={{ width: 130, height: 'auto' }}
            />
          </div>
        </div>
        <div>
          <p className="font-bold text-[15px] mb-1">Omar Espinoza</p>
          <p className="text-[12px] text-win-gray-dark mb-2">
            Software Engineer &middot; Ventura, CA
          </p>
          <p>
            I build things on the web, make music, and love to be outside. 
            UCLA grad – Linguistics & Computer Science.
          </p>
        </div>
      </div>

      {/* About section */}
      <div className="space-y-3 mb-4">
        <p>
          Right now I'm leading software engineering at a startup, working on 
          AI systems and core infrastructure. Also doing fullstack work at Hawkeye. 
          I'm learning a lot and building exciting systems.
        </p>
        
        <p>
          But what really drives me is building things that make people feel 
          something. I think UI/UX is inherently artistic, and when I have creative 
          freedom, I want every interaction to land. That's the work I want to do 
          for the rest of my life—creating products that people actually connect with.
        </p>
      </div>

      {/* Experience section */}
      <div className="border-t border-win-gray-dark pt-3 mt-3">
        <p className="font-bold text-[13px] mb-2">[ Experience ]</p>
        <table className="text-[12px] w-full">
          <tbody>
            <tr className="border-b border-win-gray-light">
              <td className="py-1 pr-3 text-win-gray-dark whitespace-nowrap">2024-Now</td>
              <td className="py-1 font-bold">Lead Software Engineer</td>
              <td className="py-1 pl-2">QMIRAC (Startup)</td>
            </tr>
            <tr className="border-b border-win-gray-light">
              <td className="py-1 pr-3 text-win-gray-dark whitespace-nowrap">2025-Now</td>
              <td className="py-1 font-bold">Fullstack Engineer</td>
              <td className="py-1 pl-2">Hawkeye (Startup)</td>
            </tr>
            <tr className="border-b border-win-gray-light">
              <td className="py-1 pr-3 text-win-gray-dark whitespace-nowrap">2023</td>
              <td className="py-1 font-bold">Programming Intern</td>
              <td className="py-1 pl-2">Experior Laboratories</td>
            </tr>
            <tr>
              <td className="py-1 pr-3 text-win-gray-dark whitespace-nowrap">2020-2024</td>
              <td className="py-1 font-bold">B.A. Linguistics & CS</td>
              <td className="py-1 pl-2">UCLA</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-3">
        <a
          href="/images/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="win-btn text-[12px] no-underline text-win-black flex items-center gap-1"
        >
          <Image src="/icons/document.png" alt="" width={16} height={16} />
          Open Resume
        </a>
        <a
          href="mailto:omaresp35@gmail.com"
          className="win-btn text-[12px] no-underline text-win-black flex items-center gap-1"
        >
          <Image src="/icons/mail.png" alt="" width={16} height={16} />
          Contact
        </a>
      </div>
    </div>
  );
}
