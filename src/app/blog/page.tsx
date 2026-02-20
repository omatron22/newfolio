'use client';

import Link from 'next/link';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg relative">
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 font-mono text-[10px] text-text-muted hover:text-[#00FF88] transition-colors uppercase tracking-widest"
      >
        &larr; Back
      </Link>

      {/* Content — centered */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="font-mono text-[10px] text-[#00FF88] mb-4 tracking-widest uppercase">
          Blog
        </p>
        <h1 className="font-geist text-5xl md:text-7xl font-bold text-white mb-6 text-center">
          Coming Soon
        </h1>
        <p className="font-mono text-sm text-text-muted text-center max-w-md leading-relaxed">
          I&apos;m working on some writing. Check back later.
        </p>
      </div>
    </main>
  );
}
