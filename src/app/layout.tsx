import './globals.css';
import type { Metadata } from 'next';
import { inter } from './fonts';
import GrainOverlay from '@/components/ui/GrainOverlay';

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
    <html lang="en" className={inter.variable}>
      <body className="h-screen overflow-hidden bg-win-desktop font-system">
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
