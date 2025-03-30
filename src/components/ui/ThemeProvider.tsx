// src/components/ui/ThemeProvider.tsx
'use client';

import React, { useState, useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setMounted(true);
    // Apply theme from localStorage if available
    const savedTheme = localStorage.getItem('theme') || 'corporate';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}