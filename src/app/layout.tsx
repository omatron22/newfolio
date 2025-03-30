// src/app/layout.tsx
import AppBar from '@/components/ui/AppBar';
import './globals.css';

export const metadata = {
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
      <body className="min-h-screen">
        <AppBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}