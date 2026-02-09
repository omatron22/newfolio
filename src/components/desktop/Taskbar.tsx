'use client';

import { useState, useEffect } from 'react';

interface TaskbarProps {
  openWindows: { id: string; title: string; minimized: boolean }[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  startMenuOpen: boolean;
}

export default function Taskbar({
  openWindows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  startMenuOpen,
}: TaskbarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="win-taskbar">
      {/* Start Button */}
      <button
        className={`win-start-btn ${startMenuOpen ? 'active' : ''}`}
        onClick={onStartClick}
      >
        <span className="text-[16px]">🪟</span>
        <span>Start</span>
      </button>

      {/* Separator */}
      <div className="w-[2px] h-[28px] mx-1" style={{ borderLeft: '1px solid #808080', borderRight: '1px solid #FFFFFF' }} />

      {/* Window tabs */}
      <div className="flex gap-[3px] flex-1 overflow-hidden">
        {openWindows.map((win) => (
          <button
            key={win.id}
            className={`win-task-tab ${activeWindowId === win.id && !win.minimized ? 'active' : ''}`}
            onClick={() => onWindowClick(win.id)}
          >
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="win-clock">
        {time}
      </div>
    </div>
  );
}
