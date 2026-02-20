'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

const SKILLS = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'AI/ML', 'Tailwind', 'Phaser', 'SQL', 'Git',
];

export default function AboutPreview() {
  return (
    <section className="accent-green py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--accent)] mb-4 tracking-widest uppercase">
            About
          </p>
          <h2 className="font-clash text-5xl md:text-7xl font-bold mb-12">
            Who I Am
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16">
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <p className="font-inter text-lg text-text-primary leading-relaxed">
                I build things on the web, make music, and love to be outside.
                UCLA grad — Linguistics & Computer Science.
              </p>
              <p className="font-inter text-base text-text-muted leading-relaxed">
                What really drives me is building things that make people feel
                something. I think UI/UX is inherently artistic, and when I have
                creative freedom, I want every interaction to land. That&apos;s the
                work I want to do for the rest of my life — creating products
                that people actually connect with.
              </p>
              <MagneticButton as="div" className="inline-block">
                <Link
                  href="/about"
                  className="inline-block font-mono text-sm neon-border px-6 py-3 hover:text-[var(--accent)] transition-colors"
                >
                  Read More &rarr;
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <p className="font-mono text-xs text-text-muted mb-4 uppercase tracking-widest">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs border border-border px-3 py-1.5 text-text-muted hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
