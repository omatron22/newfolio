export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-bg flex flex-col items-center justify-center px-6">
      <div className="tv-static-bg" aria-hidden="true" />

      <h1
        className="broadcast-text relative z-10 font-geist uppercase text-center leading-[0.92] pointer-events-none"
        style={{
          fontSize: 'clamp(48px, 11.5vw, 220px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}
      >
        <span className="hidden md:inline">OMAR ESPINOZA</span>
        <span className="md:hidden">OMAR<br />ESPINOZA</span>
      </h1>

      <p className="broadcast-text-sm relative z-10 mt-8 font-mono text-xs md:text-sm uppercase tracking-widest text-center">
        Portfolio under construction
      </p>

      <div className="relative z-10 mt-12 flex flex-col items-center gap-3 font-mono text-[11px] md:text-xs uppercase tracking-wider">
        <a
          href="mailto:omaresp35@gmail.com"
          className="broadcast-text-sm group relative transition-colors hover:!text-[#00FF88]"
        >
          omaresp35@gmail.com
          <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href="https://github.com/omatron22"
          target="_blank"
          rel="noopener noreferrer"
          className="broadcast-text-sm group relative transition-colors hover:!text-[#00FF88]"
        >
          github.com/omatron22
          <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
        </a>
      </div>
    </main>
  );
}
