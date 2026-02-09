'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useDragControls, useMotionValue } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onDragStateChange?: (isDragging: boolean) => void;
  zIndex: number;
  isMaximized?: boolean;
  onMaximizeToggle?: () => void;
}

const TASKBAR_HEIGHT = 40;

export default function Window({
  id,
  title,
  children,
  isActive,
  defaultPosition = { x: 80, y: 40 },
  defaultSize = { width: 500, height: 380 },
  onFocus,
  onClose,
  onMinimize,
  onDragStateChange,
  zIndex,
  isMaximized = false,
  onMaximizeToggle,
}: WindowProps) {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  // Track drag position so we can reset on maximize
  const motionX = useMotionValue(defaultPosition.x);
  const motionY = useMotionValue(defaultPosition.y);

  // Store pre-maximize position to restore later
  const preMaxPos = useRef({ x: defaultPosition.x, y: defaultPosition.y });

  useEffect(() => {
    constraintsRef.current = document.getElementById('desktop-area') as HTMLDivElement;
  }, []);

  const handleMaximize = useCallback(() => {
    if (!isMaximized) {
      preMaxPos.current = { x: motionX.get(), y: motionY.get() };
      motionX.set(0);
      motionY.set(0);
    } else {
      motionX.set(preMaxPos.current.x);
      motionY.set(preMaxPos.current.y);
    }
    onMaximizeToggle?.();
  }, [isMaximized, motionX, motionY, onMaximizeToggle]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    onDragStateChange?.(true);
  }, [onDragStateChange]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    onDragStateChange?.(false);
  }, [onDragStateChange]);

  return (
    <motion.div
      className="absolute select-none"
      style={{
        zIndex,
        x: motionX,
        y: motionY,
        width: isMaximized ? '100vw' : defaultSize.width,
        height: isMaximized ? `calc(100vh - ${TASKBAR_HEIGHT}px)` : defaultSize.height,
        top: 0,
        left: 0,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
      onPointerDown={onFocus}
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Window chrome */}
      <div className={`bg-win-gray flex flex-col h-full ${isMaximized ? '' : 'win-window-border'}`}>
        {/* Title bar — drag handle */}
        <div
          className={`win-titlebar shrink-0 ${!isActive ? 'win-titlebar-inactive' : ''}`}
          onPointerDown={(e) => {
            onFocus();
            if (!isMaximized) {
              dragControls.start(e);
            }
          }}
          onDoubleClick={handleMaximize}
          style={{ touchAction: 'none' }}
        >
          <span className="truncate mr-2 pointer-events-none">{title}</span>
          <div className="flex gap-[3px] shrink-0">
            <button
              className="win-titlebar-btn"
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Minimize"
            >
              _
            </button>
            <button
              className="win-titlebar-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Maximize"
            >
              {isMaximized ? '❐' : '▢'}
            </button>
            <button
              className="win-titlebar-btn"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content area — pointer-events disabled during drag to prevent canvas interference */}
        <div
          className="flex-1 overflow-auto bg-win-white m-[3px] select-text"
          style={{
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
            borderWidth: '2px',
            borderStyle: 'solid',
            pointerEvents: isDragging ? 'none' : 'auto',
          }}
        >
          {children}
        </div>

        {/* Status bar */}
        <div className="shrink-0 h-[22px] flex items-center px-3 text-[11px] text-win-gray-dark win-sunken m-[3px] mt-0">
          Ready
        </div>
      </div>
    </motion.div>
  );
}
