'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const LINKS = [
  { label: 'Email', href: 'mailto:omaresp35@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/omatron22', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/omaresp22/', external: true },
];

export default function Contact() {
  return (
    <section className="accent-orange py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--accent)] mb-4 tracking-widest uppercase">
            Contact
          </p>
          <h2 className="font-clash text-5xl md:text-7xl font-bold mb-12">
            Let&apos;s Build Something
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4">
            {LINKS.map((link) => (
              <MagneticButton key={link.label} as="div">
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="inline-block font-mono text-sm neon-border px-8 py-4 hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </a>
              </MagneticButton>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
