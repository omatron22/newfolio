'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Footer from '@/components/ui/Footer';

const EXPERIENCE = [
  { period: '2024 – Now', role: 'Lead Software Engineer', company: 'QMIRAC (Startup)' },
  { period: '2025 – Now', role: 'Fullstack Engineer', company: 'Hawkeye (Startup)' },
  { period: '2023', role: 'Programming Intern', company: 'Experior Laboratories' },
  { period: '2020 – 2024', role: 'B.A. Linguistics & CS', company: 'UCLA' },
];

const SKILLS = [
  'TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Python',
  'C', 'SQL', 'AI/ML', 'Tailwind CSS', 'Framer Motion', 'Phaser',
  'Git', 'LabVIEW', 'Roboflow', 'Google Maps API',
];

export default function AboutPage() {
  return (
    <main className="accent-green pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--accent)] mb-4 tracking-widest uppercase">
            About
          </p>
          <h1 className="font-geist text-5xl md:text-7xl font-bold mb-12">
            Omar Espinoza
          </h1>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-8 mb-20">
            <div className="flex-shrink-0">
              <div className="w-40 h-52 border border-border overflow-hidden">
                <Image
                  src="/images/three.jpeg"
                  alt="Omar Espinoza"
                  width={160}
                  height={208}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-mono text-sm text-text-muted">
                Software Engineer &middot; Ventura, CA
              </p>
              <p className="font-geist text-lg text-text-primary leading-relaxed">
                I build things on the web, make music, and love to be outside.
                UCLA grad — Linguistics & Computer Science.
              </p>
              <p className="font-geist text-base text-text-muted leading-relaxed">
                Right now I&apos;m leading software engineering at a startup, working on
                AI systems and core infrastructure. Also doing fullstack work at Hawkeye.
                I&apos;m learning a lot and building exciting systems.
              </p>
              <p className="font-geist text-base text-text-muted leading-relaxed">
                But what really drives me is building things that make people feel
                something. I think UI/UX is inherently artistic, and when I have creative
                freedom, I want every interaction to land. That&apos;s the work I want to
                do for the rest of my life — creating products that people actually connect with.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Experience Timeline */}
        <ScrollReveal delay={0.15}>
          <div className="mb-20">
            <h2 className="font-geist text-3xl font-bold mb-8">Experience</h2>
            <div className="border-t border-border">
              {EXPERIENCE.map((item) => (
                <div
                  key={item.role}
                  className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-5 border-b border-border"
                >
                  <span className="font-mono text-sm text-text-muted w-32 flex-shrink-0">
                    {item.period}
                  </span>
                  <span className="font-geist font-medium text-text-primary">
                    {item.role}
                  </span>
                  <span className="font-mono text-sm text-text-muted md:ml-auto">
                    {item.company}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal delay={0.2}>
          <div className="mb-20">
            <h2 className="font-geist text-3xl font-bold mb-8">Skills</h2>
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

        {/* Resume */}
        <ScrollReveal delay={0.25}>
          <a
            href="/images/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm neon-border px-6 py-3 hover:text-[var(--accent)] transition-colors"
          >
            Download Resume &rarr;
          </a>
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  );
}
