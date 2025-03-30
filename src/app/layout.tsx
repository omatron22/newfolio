'use client';

import { useEffect } from 'react';
import AppBar from '@/components/ui/AppBar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize theme from localStorage on client side
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'corporate';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Omar Espinoza | Portfolio</title>
        <meta name="description" content="Omar Espinoza's portfolio website showcasing projects and skills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen">
        <AppBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}