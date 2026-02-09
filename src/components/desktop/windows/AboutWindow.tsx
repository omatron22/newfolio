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
        <div className="shrink-0 win-sunken">
          <Image
            src="/images/three.jpeg"
            alt="Omar Espinoza"
            width={130}
            height={170}
            className="block object-cover"
            style={{ width: 130, height: 'auto' }}
          />
        </div>
        <div>
          <p className="font-bold text-[15px] mb-1">Omar Espinoza</p>
          <p className="text-[12px] text-win-gray-dark mb-2">Software Engineer &middot; Ventura, CA</p>
          <p>
            I build things on the web, make music, and
            occasionally craft furniture. UCLA grad —
            Linguistics & Computer Science.
          </p>
        </div>
      </div>

      <p className="mb-3">
        Currently leading software engineering at a
        startup, working on AI systems and core
        infrastructure. Previously interned at Experior
        Laboratories building automation tools in C.
      </p>

      <p className="mb-4">
        When I&apos;m not writing code, I&apos;m on the
        slopes, recording music, or making something
        with my hands.
      </p>

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
          className="win-btn text-[12px] no-underline text-win-black"
        >
          📋 Open Resume
        </a>
        <a
          href="mailto:omaresp35@gmail.com"
          className="win-btn text-[12px] no-underline text-win-black"
        >
          📧 Contact
        </a>
      </div>
    </div>
  );
}
