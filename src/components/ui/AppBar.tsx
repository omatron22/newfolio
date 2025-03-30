// src/components/ui/AppBar.tsx
'use client';

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Theme configuration
const THEMES = ['corporate', 'dracula', 'retro', 'aqua'] as const;
type Theme = typeof THEMES[number];

const THEME_ICONS: Record<Theme, string> = {
  corporate: "mdi:weather-sunny",
  dracula: "mdi:weather-night",
  retro: "mdi:vinyl",
  aqua: "mdi:waves",
};

export default function AppBar() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('corporate');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Initialize from localStorage on client-side
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'corporate';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeChange = () => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setCurrentTheme(nextTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="navbar sticky top-0 bg-base-200 text-base-content shadow-md z-50 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          <span className="text-xl font-clash font-bold tracking-tight">Omar&apos;s Portfolio</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar sticky top-0 bg-base-200 text-base-content shadow-md z-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center w-full">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-clash font-bold tracking-tight hover:text-primary transition-colors duration-300"
        >
          Omar&apos;s Portfolio
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-base-300 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} className="text-2xl" />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex flex-col absolute top-16 left-0 right-0 bg-base-200 z-50 p-4 shadow-lg" : "hidden"
          } md:flex md:flex-row md:relative md:top-0 md:bg-transparent md:p-0 md:shadow-none items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: "/video-game", label: "Play me!" }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn btn-ghost w-full md:w-auto text-left font-clash font-semibold md:text-center rounded-md hover:bg-base-300 transition-colors duration-200 ${
                pathname === link.href ? "text-primary border-b-2 border-primary md:rounded-none md:border-b-2" : ""
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Theme Toggle Button */}
          <button
            className={`p-2 flex items-center justify-center mt-2 md:mt-0 rounded-md border-2 border-base-content bg-base-100 hover:bg-primary hover:border-primary hover:text-base-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              menuOpen ? "w-full" : "md:w-10 md:h-10"
            }`}
            aria-label={`Change Theme (Current: ${currentTheme})`}
            onClick={() => {
              handleThemeChange();
              closeMenu();
            }}
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Icon
              icon={THEME_ICONS[currentTheme]}
              width="24"
              height="24"
              className="transform transition-transform duration-300 hover:scale-110"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}