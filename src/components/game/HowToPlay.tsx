'use client';

import React from 'react';

interface HowToPlayProps {
  onClose: () => void;
}

function HowToPlay({ onClose }: HowToPlayProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/assets/howtoplay.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          bottom: '6.67px',
          right: '33px',
          width: '233px',
          height: '93px',
          backgroundImage: 'url(/assets/startgame.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = 'scale(1.1)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = 'scale(1)')
        }
      />
    </div>
  );
}

export default React.memo(HowToPlay);
