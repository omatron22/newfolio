// src/components/ui/AppBar.tsx
'use client';

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppBar() {
  const [themes] = useState<string[]>(['corporate', 'dracula', 'retro', 'aqua']);
  const [currentTheme, setCurrentTheme] = useState('corporate');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Initialize from localStorage on client-side
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'corporate';
    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeChange = () => {
    if (themes.length === 0) return;
    
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setCurrentTheme(nextTheme);
  };

  const themeIcons: Record<string, string> = {
    corporate: "mdi:weather-sunny",
    dracula: "mdi:weather-night",
    retro: "mdi:vinyl",
    aqua: "mdi:waves",
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <nav className="navbar bg-base-200 text-base-content shadow-none px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center w-full">
        <span className="text-xl font-bold">Omar&apos;s Portfolio</span>
      </div>
    </nav>;
  }

  return (
    <nav className="navbar bg-base-200 text-base-content shadow-none px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Omar&apos;s Portfolio
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Icon icon="mdi:menu" className="text-2xl" />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block absolute top-16 left-0 right-0 bg-base-200 z-50 p-4" : "hidden"
          } md:flex md:relative md:top-0 md:bg-transparent md:p-0 items-center space-x-0 md:space-x-4 mt-4 md:mt-0`}
        >
          <Link
            href="/"
            className={`btn btn-ghost w-full md:w-auto text-left font-semibold md:text-center rounded-none ${pathname === "/" ? "text-primary" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`btn btn-ghost w-full md:w-auto text-left font-semibold md:text-center rounded-none ${pathname === "/projects" ? "text-primary" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/video-game"
            className={`btn btn-ghost w-full md:w-auto text-left font-semibold md:text-center rounded-none ${pathname === "/video-game" ? "text-primary" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Play me!
          </Link>
          <button
            className={`p-2 flex items-center justify-center mt-2 md:mt-0 border-2 border-base-content bg-base-100 hover:bg-primary hover:border-primary hover:text-base-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              menuOpen ? "w-full" : "md:w-10 h-10 rounded-none"
            }`}
            aria-label="Change Theme"
            onClick={() => {
              handleThemeChange();
              setMenuOpen(false);
            }}
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Icon
              icon={themeIcons[currentTheme] || "mdi:brightness-auto"}
              width="24"
              height="24"
              className="inherit"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}