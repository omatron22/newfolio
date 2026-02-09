'use client';

import { useState, useEffect } from 'react';

export default function BlogWindow() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 font-system text-[13px] h-full">
      {/* Notepad menu */}
      <div className="flex gap-4 mb-3 text-[12px] border-b border-win-gray-dark pb-2">
        <span><span className="underline">F</span>ile</span>
        <span><span className="underline">E</span>dit</span>
        <span><span className="underline">V</span>iew</span>
        <span><span className="underline">H</span>elp</span>
      </div>

      <div className="font-[monospace] text-[13px] leading-[1.8]">
        <p>// blog.txt</p>
        <p>// Last modified: 02/08/2026</p>
        <p>//</p>
        <br />
        <p>Coming soon.</p>
        <br />
        <p>I&apos;m working on some writing about</p>
        <p>building software, design decisions,</p>
        <p>and things I find interesting.</p>
        <br />
        <p>Check back later.{showCursor ? '█' : ' '}</p>
      </div>
    </div>
  );
}
