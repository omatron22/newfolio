'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import GameWindow from './windows/GameWindow';
import BlogWindow from './windows/BlogWindow';

interface WindowState {
  id: string;
  title: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const TASKBAR_HEIGHT = 40;

// Window sizes (positions computed dynamically to center on screen)
const WINDOW_CONFIGS: Record<string, { title: string; size: { width: number; height: number } }> = {
  about:    { title: 'About.txt - Notepad',  size: { width: 520, height: 420 } },
  projects: { title: 'Projects - Explorer',   size: { width: 560, height: 400 } },
  game:     { title: 'Samson.exe',            size: { width: 860, height: 540 } },
  blog:     { title: 'Blog.txt - Notepad',    size: { width: 420, height: 300 } },
};

const DESKTOP_ICONS = [
  { id: 'about', label: 'About.txt', icon: '📄' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'game', label: 'Samson.exe', icon: '🎮' },
  { id: 'blog', label: 'Blog.txt', icon: '📝' },
  { id: 'resume', label: 'Resume.pdf', icon: '📋' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WINDOW_CONTENT: Record<string, React.ComponentType<any>> = {
  about: AboutWindow,
  projects: ProjectsWindow,
  game: GameWindow,
  blog: BlogWindow,
};

// Only these three open on load — NOT game, NOT resume. About opens LAST (on top).
const AUTO_OPEN_SEQUENCE = ['projects', 'blog', 'about'];
const AUTO_OPEN_DELAY = 450;

// Compute a centered position for a window, with cascade offset to prevent overlap
function computeCenteredPosition(
  size: { width: number; height: number },
  cascadeIndex: number,
): { x: number; y: number } {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const availableHeight = vh - TASKBAR_HEIGHT;

  // Cascade offset: each window shifts 30px right and 30px down
  const cascadeOffset = cascadeIndex * 30;

  const x = Math.max(10, Math.round((vw - size.width) / 2) + cascadeOffset);
  const y = Math.max(10, Math.round((availableHeight - size.height) / 2) + cascadeOffset);

  return { x, y };
}

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveId, setMobileActiveId] = useState<string | null>(null);
  const [anyDragging, setAnyDragging] = useState(false);
  const hasAutoOpened = useRef(false);
  const openCountRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Staged auto-open animation on first load (desktop only)
  useEffect(() => {
    if (isMobile || hasAutoOpened.current) return;
    hasAutoOpened.current = true;

    AUTO_OPEN_SEQUENCE.forEach((id, index) => {
      setTimeout(() => {
        const config = WINDOW_CONFIGS[id];
        if (!config) return;

        const position = computeCenteredPosition(config.size, index);

        setWindows((prev) => [
          ...prev,
          {
            id,
            title: config.title,
            minimized: false,
            maximized: false,
            zIndex: 100 + index,
            position,
            size: config.size,
          },
        ]);
        setNextZIndex(100 + index + 1);
        setActiveWindowId(id);
        openCountRef.current = index + 1;
      }, AUTO_OPEN_DELAY * (index + 1));
    });
  }, [isMobile]);

  const openWindow = useCallback((id: string) => {
    if (id === 'resume') {
      window.open('/images/resume.pdf', '_blank');
      return;
    }

    if (isMobile) {
      setMobileActiveId((prev) => (prev === id ? null : id));
      return;
    }

    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id
            ? { ...w, minimized: false, zIndex: nextZIndex }
            : w
        );
      }

      const config = WINDOW_CONFIGS[id];
      if (!config) return prev;

      const position = computeCenteredPosition(config.size, openCountRef.current);
      openCountRef.current += 1;

      return [
        ...prev,
        {
          id,
          title: config.title,
          minimized: false,
          maximized: false,
          zIndex: nextZIndex,
          position,
          size: config.size,
        },
      ];
    });

    setNextZIndex((z) => z + 1);
    setActiveWindowId(id);
  }, [nextZIndex, isMobile]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setActiveWindowId((current) => (current === id ? null : current));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
    setNextZIndex((z) => z + 1);
    setActiveWindowId(id);
    setStartMenuOpen(false);
  }, [nextZIndex]);

  const handleTaskbarWindowClick = useCallback((id: string) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;

    if (win.minimized) {
      openWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  }, [windows, activeWindowId, openWindow, minimizeWindow, focusWindow]);

  const handleDragStateChange = useCallback((isDragging: boolean) => {
    setAnyDragging(isDragging);
  }, []);

  // Start button refreshes the page
  const handleStartClick = useCallback(() => {
    window.location.reload();
  }, []);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="h-screen w-screen overflow-hidden flex flex-col win95-desktop-bg">
        <div className="flex-1 overflow-auto p-3 pb-[44px]">
          <div className="text-center mb-4 pt-2">
            <p className="text-white text-[15px] font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Omar Espinoza
            </p>
            <p className="text-white/80 text-[12px]" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
              Software Engineer
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {DESKTOP_ICONS.map((item) => {
              if (item.id === 'resume') {
                return (
                  <a key={item.id} href="/images/resume.pdf" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="win-window-border bg-win-gray">
                      <div className="win-titlebar">
                        <span className="truncate">{item.icon} Resume.pdf</span>
                        <span className="text-[12px]">↗</span>
                      </div>
                    </div>
                  </a>
                );
              }

              const ContentComponent = WINDOW_CONTENT[item.id];
              if (!ContentComponent) return null;
              const isOpen = mobileActiveId === item.id;

              return (
                <div key={item.id} className="win-window-border bg-win-gray">
                  <div
                    className={`win-titlebar cursor-pointer ${!isOpen ? 'win-titlebar-inactive' : ''}`}
                    onClick={() => setMobileActiveId(isOpen ? null : item.id)}
                  >
                    <span className="truncate">{item.icon} {WINDOW_CONFIGS[item.id]?.title || item.label}</span>
                    <div className="flex gap-[2px]">
                      <span className="win-titlebar-btn text-[10px]">{isOpen ? '−' : '+'}</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="bg-win-white m-[3px] overflow-auto max-h-[50vh]"
                          style={{ borderColor: '#808080 #FFFFFF #FFFFFF #808080', borderWidth: '2px', borderStyle: 'solid' }}
                        >
                          <ContentComponent />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <a href="https://www.linkedin.com/in/omaresp22/" target="_blank" rel="noopener noreferrer" className="win-btn text-[12px] no-underline text-win-black">🔗 LinkedIn</a>
            <a href="https://github.com/omatron22" target="_blank" rel="noopener noreferrer" className="win-btn text-[12px] no-underline text-win-black">💻 GitHub</a>
            <a href="mailto:omaresp35@gmail.com" className="win-btn text-[12px] no-underline text-win-black">📧 Email</a>
          </div>
        </div>

        <div className="win-taskbar">
          <div className="flex items-center gap-2 px-3 w-full">
            <span className="text-[16px]">🪟</span>
            <span className="font-bold text-[12px]">Omar95</span>
            <div className="ml-auto win-clock">
              {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div
      className="h-screen w-screen overflow-hidden relative win95-desktop-bg"
      onClick={() => setStartMenuOpen(false)}
    >
      {/* Pointer-event blocker overlay */}
      {anyDragging && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 9990, pointerEvents: 'auto', cursor: 'grabbing' }}
        />
      )}

      {/* Desktop icons area */}
      <div id="desktop-area" className="absolute inset-0 bottom-[40px] p-4">
        <div className="flex flex-col gap-3 items-start">
          {DESKTOP_ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              icon={icon.icon}
              onOpen={() => openWindow(icon.id)}
            />
          ))}
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows
          .filter((w) => !w.minimized)
          .map((win) => {
            const ContentComponent = WINDOW_CONTENT[win.id];
            if (!ContentComponent) return null;

            return (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                isActive={activeWindowId === win.id}
                defaultPosition={win.position}
                defaultSize={win.size}
                onFocus={() => focusWindow(win.id)}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onDragStateChange={handleDragStateChange}
                onMaximizeToggle={() => toggleMaximize(win.id)}
                isMaximized={win.maximized}
                zIndex={win.zIndex}
              >
                <ContentComponent isMaximized={win.maximized} />
              </Window>
            );
          })}
      </AnimatePresence>

      {/* Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenWindow={openWindow}
      />

      {/* Taskbar */}
      <Taskbar
        openWindows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={handleStartClick}
        startMenuOpen={startMenuOpen}
      />
    </div>
  );
}
