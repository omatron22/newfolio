'use client';

import React from 'react';

interface GameOverProps {
  currentScore: number;
  highScore: number;
  handleRestart: () => void;
  onCharacterSelect?: () => void;
  onMainMenu: () => void;
}

export default function GameOver({
  currentScore,
  highScore,
  handleRestart,
  onCharacterSelect,
  onMainMenu,
}: GameOverProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Game Over Background Image */}
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <img
          src="/assets/gameover-menu.png"
          alt="Game Over Menu"
          style={{
            width: '333px',
            height: 'auto',
          }}
        />

        {/* High Score and Current Score */}
        <div
          style={{
            position: 'absolute',
            top: '56%',
            left: '64%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: '1rem',
              margin: '0 0 6.67px 0',
              color: '#dc78fb',
              fontFamily: 'VT323, monospace',
              textShadow: '-1px 1px #000',
            }}
          >
            : {highScore}
          </p>
          <p
            style={{
              fontSize: '1rem',
              margin: '13.33px 0 0 0',
              color: '#dc78fb',
              fontFamily: 'VT323, monospace',
              textShadow: '-1px 1px #000',
            }}
          >
            : {currentScore}
          </p>
        </div>

        {/* Restart, Main Menu, and Paw Buttons */}
        <div
          style={{
            position: 'absolute',
            top: '82.5%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {/* Restart Button */}
          <img
            src="/assets/restart.png"
            alt="Restart Button"
            onClick={handleRestart}
            style={{
              width: '53px',
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.1)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = 'scale(1)')
            }
          />
          {/* Main Menu Button */}
          <img
            src="/assets/home-button.png"
            alt="Main Menu Button"
            onClick={onMainMenu}
            style={{
              width: '53px',
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.1)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = 'scale(1)')
            }
          />
          {/* Paw Button to Go to Character Select */}
          {onCharacterSelect && (
            <img
              src="/assets/paw-button.png"
              alt="Paw Button"
              onClick={onCharacterSelect}
              style={{
                width: '53px',
                height: 'auto',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}