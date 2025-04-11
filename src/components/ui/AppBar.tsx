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
      <nav className="navbar sticky top-0 bg-base-200/80 backdrop-blur-sm text-base-content shadow-sm z-50 px-0">
        <div className="w-full"></div>
      </nav>
    );
  }

  return (
    <nav className="navbar sticky top-0 bg-base-200/80 backdrop-blur-sm text-base-content shadow-sm z-50 px-0">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute left-4 flex items-center justify-center p-2 rounded-md hover:bg-base-300 transition-colors duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
        aria-expanded={menuOpen}
      >
        <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} className="text-xl" />
      </button>

      {/* Right-aligned Navigation Links */}
      <div
        className={`${
          menuOpen ? "flex flex-col absolute top-16 left-0 right-0 bg-base-200/95 backdrop-blur-sm z-50 p-4 shadow-md" : "hidden"
        } md:flex md:flex-row md:relative md:top-0 md:bg-transparent md:p-0 md:shadow-none items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0 ml-auto mr-14`}
      >
        {[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { href: "/video-game", label: "Play me!" }
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 w-full md:w-auto text-left font-clash font-medium md:text-center hover:text-primary transition-colors duration-200 ${
              pathname === link.href ? "text-primary underline underline-offset-4" : ""
            }`}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        
        {/* Theme Toggle Button - Inline with navigation */}
        <button
          className="p-2 flex items-center justify-center rounded-full bg-transparent hover:bg-base-300 transition-all duration-300 focus:outline-none"
          aria-label={`Change Theme (Current: ${currentTheme})`}
          onClick={handleThemeChange}
        >
          <Icon
            icon={THEME_ICONS[currentTheme]}
            width="20"
            height="20"
          />
        </button>
      </div>
    </nav>
  );
}