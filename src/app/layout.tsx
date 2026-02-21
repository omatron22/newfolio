import './globals.css';
import type { Metadata } from 'next';
import { geist, geistMono } from './fonts';
import GrainOverlay from '@/components/ui/GrainOverlay';
import Navigation from '@/components/ui/Navigation';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  title: 'Omar Espinoza',
  description: 'Omar Espinoza — developer, creator, builder of things.',
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://omarsportfolio.com',
    title: 'Omar Espinoza',
    description: 'Omar Espinoza — developer, creator, builder of things.',
    siteName: 'Omar Espinoza',
    images: [{
      url: '/images/heropage.png',
      width: 1200,
      height: 630,
      alt: 'Omar Espinoza',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omar Espinoza',
    description: 'Omar Espinoza — developer, creator, builder of things.',
    images: ['/images/heropage.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-bg text-text-primary font-geist scan-lines">
        <CustomCursor />
        <GrainOverlay />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
