'use client';

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'corporate';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('nav');
      if (nav && !nav.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  const handleThemeChange = () => {
    const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setCurrentTheme(nextTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  if (!mounted) return <div className="h-16" />;

  return (
    <nav className="navbar sticky top-0 bg-base-200/70 backdrop-blur-md shadow-md z-50 px-6 py-2 border-b border-base-300 transition-all duration-300">
      <div className="flex w-full items-center justify-between max-w-6xl mx-auto">
        {/* Left - Logo or Name */}
        <Link href="/" className="text-xl font-bold tracking-wide hover:text-primary transition-colors">
          {/* Your name or logo here */}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-base-300 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} className="text-2xl" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: "/video-game", label: "Play me!" }
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-medium transition-transform hover:scale-105 ${
                pathname === link.href ? "text-primary underline underline-offset-4" : "hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={handleThemeChange}
            className="p-2 hover:rotate-180 transition-transform duration-500"
            aria-label="Change Theme"
          >
            <Icon icon={THEME_ICONS[currentTheme]} width={22} height={22} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown - Enhanced with solid background */}
      <div 
        className={`
          md:hidden absolute top-full left-0 right-0 
          bg-base-200 shadow-lg
          border-b border-base-300
          transition-all duration-300 ease-in-out
          ${menuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <div className="max-w-6xl mx-auto py-2 px-4">
          <div className="flex flex-col space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/projects", label: "Projects" },
              { href: "/video-game", label: "Play me!" }
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`
                  py-3 px-4 rounded-lg
                  transition-all duration-200
                  ${pathname === link.href 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-base-300 hover:text-primary"}
                `}
              >
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            
            {/* Theme section - Simplified */}
            <div className="pt-2 border-t border-base-300/30 mt-2">
              <button
                onClick={() => {
                  handleThemeChange();
                  closeMenu();
                }}
                className="
                  flex items-center justify-center w-full py-3 rounded-lg
                  hover:bg-base-300 transition-all duration-200
                "
              >
                <Icon 
                  icon={THEME_ICONS[currentTheme]} 
                  className="text-2xl"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}