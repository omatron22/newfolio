// src/components/ui/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'corporate' | 'dracula' | 'retro' | 'aqua';
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('corporate');
  const [mounted, setMounted] = useState(false);

  // Update theme in localStorage and DOM
  const updateTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'corporate';
    updateTheme(savedTheme);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}