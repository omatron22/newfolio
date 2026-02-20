'use client';

export default function Footer() {
  return (
    <footer className="border-t border-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Omar Espinoza
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/omatron22"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-mono text-xs text-text-muted hover:text-[#00FF88] transition-colors"
          >
            GitHub
            <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="https://linkedin.com/in/omaresp22/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-mono text-xs text-text-muted hover:text-[#00FF88] transition-colors"
          >
            LinkedIn
            <span className="absolute left-0 -bottom-px h-px w-0 bg-[#00FF88] transition-all duration-300 group-hover:w-full" />
          </a>
          <span className="font-mono text-xs text-text-muted">
            E: omaresp35@gmail.com
          </span>
        </div>
      </div>
    </footer>
  );
}
