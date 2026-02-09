'use client';

import { useState, useRef, useCallback } from 'react';

interface DesktopIconProps {
  label: string;
  icon: string;
  onOpen: () => void;
}

export default function DesktopIcon({ label, icon, onOpen }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  const lastClickRef = useRef(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickRef.current < 400) {
      onOpen();
      setSelected(false);
    } else {
      setSelected(true);
    }
    lastClickRef.current = now;
  }, [onOpen]);

  return (
    <div
      className={`win-icon ${selected ? 'selected' : ''}`}
      onClick={handleClick}
      onBlur={() => setSelected(false)}
      tabIndex={0}
      role="button"
      aria-label={`Open ${label}`}
    >
      <div className="text-4xl leading-none win-icon-img flex items-center justify-center">
        {icon}
      </div>
      <span className="win-icon-label">{label}</span>
    </div>
  );
}
