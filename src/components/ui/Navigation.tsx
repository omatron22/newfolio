'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();

  // Home, blog, and game pages handle their own navigation
  if (pathname === '/' || pathname === '/blog' || pathname === '/video-game') {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">
        <Link
          href="/"
          className="font-mono text-sm text-text-muted hover:text-[#00FF88] transition-colors"
        >
          &larr; Home
        </Link>
      </div>
    </nav>
  );
}
