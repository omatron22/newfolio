// src/app/layout.tsx
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import AppBar from '@/components/ui/AppBar';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Omar Espinoza | Portfolio',
  description: 'Omar Espinoza\'s portfolio website showcasing projects and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-base-100 text-base-content">
        <ThemeProvider>
          <AppBar />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}