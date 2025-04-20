// src/app/layout.tsx test
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import AppBar from '@/components/ui/AppBar';
import './globals.css';
import type { Metadata } from 'next';
import { inter } from './fonts';

export const metadata: Metadata = {
  title: 'Omar Espinoza | Portfolio',
  description: 'Omar Espinoza\'s portfolio website showcasing projects and skills',
  icons: {
    icon: '/images/icon.png', // This will be used for browser tabs
    shortcut: '/images/icon.png', // For legacy browsers
    apple: '/images/icon.png', // For Apple devices
  },
  openGraph: {
    type: 'website',
    url: 'https://omarsportfolio.com', // Replace with your actual URL
    title: 'Omar Espinoza | Portfolio',
    description: 'Omar Espinoza\'s portfolio website showcasing projects and skills',
    siteName: 'Omar Espinoza Portfolio',
    images: [{
      url: '/images/heropage.png', // This will be used for social media sharing
      width: 1200,
      height: 630,
      alt: 'Omar Espinoza Portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omar Espinoza | Portfolio',
    description: 'Omar Espinoza\'s portfolio website showcasing projects and skills',
    images: ['/images/heropage.png'], // This will be used for Twitter sharing
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-base-100 text-base-content ${inter.className}`}>
        <ThemeProvider>
          <AppBar />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}