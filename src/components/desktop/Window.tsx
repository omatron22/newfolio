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
const MIN_WIDTH = 280;
const MIN_HEIGHT = 200;

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
  const [isResizing, setIsResizing] = useState(false);
  const [currentSize, setCurrentSize] = useState(defaultSize);

  // Track drag position so we can reset on maximize
  const motionX = useMotionValue(defaultPosition.x);
  const motionY = useMotionValue(defaultPosition.y);

  // Store pre-maximize position & size to restore later
  const preMaxPos = useRef({ x: defaultPosition.x, y: defaultPosition.y });
  const preMaxSize = useRef(defaultSize);

  useEffect(() => {
    constraintsRef.current = document.getElementById('desktop-area') as HTMLDivElement;
  }, []);

  const handleMaximize = useCallback(() => {
    if (!isMaximized) {
      preMaxPos.current = { x: motionX.get(), y: motionY.get() };
      preMaxSize.current = currentSize;
      motionX.set(0);
      motionY.set(0);
    } else {
      motionX.set(preMaxPos.current.x);
      motionY.set(preMaxPos.current.y);
      setCurrentSize(preMaxSize.current);
    }
    onMaximizeToggle?.();
  }, [isMaximized, motionX, motionY, onMaximizeToggle, currentSize]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    onDragStateChange?.(true);
  }, [onDragStateChange]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    onDragStateChange?.(false);
  }, [onDragStateChange]);

  // Resize handler — pointer-based for smooth resizing from any edge/corner
  const handleResizeStart = useCallback((e: React.PointerEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    onDragStateChange?.(true);
    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = currentSize.width;
    const startHeight = currentSize.height;
    const startPosX = motionX.get();
    const startPosY = motionY.get();

    const handleMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      if (direction.includes('e')) {
        newWidth = Math.max(MIN_WIDTH, startWidth + dx);
      }
      if (direction.includes('s')) {
        newHeight = Math.max(MIN_HEIGHT, startHeight + dy);
      }
      if (direction.includes('w')) {
        const proposedWidth = startWidth - dx;
        if (proposedWidth >= MIN_WIDTH) {
          newWidth = proposedWidth;
          newX = startPosX + dx;
        }
      }
      if (direction.includes('n')) {
        const proposedHeight = startHeight - dy;
        if (proposedHeight >= MIN_HEIGHT) {
          newHeight = proposedHeight;
          newY = startPosY + dy;
        }
      }

      setCurrentSize({ width: newWidth, height: newHeight });
      motionX.set(newX);
      motionY.set(newY);
    };

    const handleUp = () => {
      setIsResizing(false);
      onDragStateChange?.(false);
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
  }, [currentSize, motionX, motionY, onDragStateChange, onFocus]);

  // Resize handle definitions
  const resizeHandles = [
    { dir: 'n', style: 'top-0 left-[6px] right-[6px] h-[4px] cursor-n-resize' },
    { dir: 's', style: 'bottom-0 left-[6px] right-[6px] h-[4px] cursor-s-resize' },
    { dir: 'e', style: 'top-[6px] bottom-[6px] right-0 w-[4px] cursor-e-resize' },
    { dir: 'w', style: 'top-[6px] bottom-[6px] left-0 w-[4px] cursor-w-resize' },
    { dir: 'ne', style: 'top-0 right-0 w-[6px] h-[6px] cursor-ne-resize' },
    { dir: 'nw', style: 'top-0 left-0 w-[6px] h-[6px] cursor-nw-resize' },
    { dir: 'se', style: 'bottom-0 right-0 w-[6px] h-[6px] cursor-se-resize' },
    { dir: 'sw', style: 'bottom-0 left-0 w-[6px] h-[6px] cursor-sw-resize' },
  ];

  return (
    <motion.div
      className="absolute select-none"
      style={{
        zIndex,
        x: motionX,
        y: motionY,
        width: isMaximized ? '100vw' : currentSize.width,
        height: isMaximized ? `calc(100vh - ${TASKBAR_HEIGHT}px)` : currentSize.height,
        top: 0,
        left: 0,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
      onPointerDown={onFocus}
      drag={!isMaximized && !isResizing}
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
            if (!isMaximized && !isResizing) {
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

        {/* Content area */}
        <div
          className="flex-1 overflow-auto bg-win-white m-[3px] select-text"
          style={{
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
            borderWidth: '2px',
            borderStyle: 'solid',
            pointerEvents: (isDragging || isResizing) ? 'none' : 'auto',
          }}
        >
          {children}
        </div>

        {/* Status bar */}
        <div className="shrink-0 h-[22px] flex items-center px-3 text-[11px] text-win-gray-dark win-sunken m-[3px] mt-0">
          Ready
        </div>
      </div>

      {/* Resize handles — only shown when not maximized */}
      {!isMaximized && resizeHandles.map(({ dir, style }) => (
        <div
          key={dir}
          className={`absolute z-10 ${style}`}
          onPointerDown={(e) => handleResizeStart(e, dir)}
        />
      ))}
    </motion.div>
  );
}
