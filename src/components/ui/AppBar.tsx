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

      {/* Mobile Dropdown - Similar to Example */}
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden mt-2`}>
        <div className="flex flex-col">
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: "/video-game", label: "Play me!" }
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="btn btn-ghost w-full text-left font-medium rounded-none"
            >
              {link.label}
            </Link>
          ))}
          
          <button
            onClick={() => {
              handleThemeChange();
              closeMenu();
            }}
            className="p-2 flex items-center justify-center mt-2 w-full border-2 border-base-content bg-base-100 hover:bg-primary hover:border-primary hover:text-base-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Change Theme"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Icon 
              icon={THEME_ICONS[currentTheme]} 
              width="24" 
              height="24" 
            />
          </button>
        </div>
      </div>
    </nav>
  );
}