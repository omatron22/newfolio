'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="accent-cyan relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Mouse-reactive gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 240, 255, 0.08), transparent 60%)`,
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="font-mono text-sm text-text-muted mb-6 tracking-widest uppercase">
          Software Engineer &middot; Creative Developer
        </p>

        <GlitchText
          as="h1"
          className="font-clash text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight"
        >
          OMAR ESPINOZA
        </GlitchText>

        <motion.p
          className="font-mono text-sm text-text-muted mt-8 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Building products that people actually connect with.
          Currently engineering at QMIRAC & Hawkeye.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="font-mono text-xs text-text-muted">scroll</span>
        <motion.div
          className="w-px h-8 bg-text-muted"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
