// src/components/ui/AppBar.tsx
'use client';

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

export default function AppBar() {
  const themes = ['corporate', 'dracula', 'retro', 'aqua'];
  const [currentTheme, setCurrentTheme] = useState<string>("corporate");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only run this effect on the client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "corporate";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeChange = () => {
    const html = document.documentElement;
    const currentThemeValue = html.getAttribute("data-theme") || themes[0];
    const currentIndex = themes.indexOf(currentThemeValue);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setCurrentTheme(nextTheme);
  };

  const themeIcons: Record<string, string> = {
    corporate: "mdi:weather-sunny",
    dracula: "mdi:weather-night",
    retro: "mdi:vinyl",
    aqua: "mdi:waves",
  };

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return null;
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
            menuOpen ? "block" : "hidden"
          } md:flex items-center space-x-0 md:space-x-4 mt-4 md:mt-0`}
        >
          <Link
            href="/"
            className="btn btn-ghost w-full md:w-auto text-left font-semibold md:text-center rounded-none"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="btn btn-ghost w-full md:w-auto text-left font-semibold md:text-center rounded-none"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/video-game"
            className="btn btn-ghost w-full md:w-auto text-left font-semibold md:text-center rounded-none"
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
              icon={themeIcons[currentTheme]}
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