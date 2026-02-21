'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import HowToPlay from './HowToPlay';
import GameOver from './GameOver';
import AudioManager from './AudioManager';

interface GameComponentProps {
  character: string;
  onCharacterSelect: () => void;
  onMainMenu: () => void;
}

// Extract character prefix once — reused across preload/create/update
const getCharacterPrefix = (character: string) =>
  character === 'birthday' ? 'birthday' : character === 'jeans' ? 'jeans' : 'og';

export default function GameComponent({
  character,
  onCharacterSelect,
  onMainMenu
}: GameComponentProps) {
  // Game refs
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const isPausedRef = useRef(false);
  const highScoreRef = useRef(0);
  const isGameInitializedRef = useRef(false);
  const gameOverRef = useRef(false);
  const spawnTimerRef = useRef<Phaser.Time.TimerEvent | null>(null);

  // Touch controls ref — checked in Phaser update loop
  const touchControls = useRef({ left: false, right: false, up: false, down: false });

  // React state
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Keep gameOverRef in sync
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  // Initialize highScore from localStorage once on client + detect touch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const guideShown = sessionStorage.getItem('guideShown') === 'true';
      setShowGuide(!guideShown);

      const savedHighScore = localStorage.getItem('highScore');
      const parsedHighScore = savedHighScore ? parseInt(savedHighScore, 10) : 0;
      setHighScore(parsedHighScore);
      highScoreRef.current = parsedHighScore;

      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  // Game over handler — stable ref, no stale closures
  const handleGameOver = useCallback(() => {
    setGameOver(true);
    gameOverRef.current = true;

    // Stop spawning obstacles immediately
    if (spawnTimerRef.current) {
      spawnTimerRef.current.remove();
      spawnTimerRef.current = null;
    }

    if (gameInstanceRef.current) {
      try {
        const currentScene = gameInstanceRef.current.scene.getScene('mainScene');
        if (currentScene) {
          currentScene.physics.world.pause();
          currentScene.scene.pause();
        }
      } catch {
        // Scene may already be destroyed
      }
    }
  }, []);

  // Close guide and start game
  const handleStartGame = useCallback(() => {
    setShowGuide(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('guideShown', 'true');
    }
  }, []);

  // Initialize game when ready and guide is dismissed
  useEffect(() => {
    if (!gameContainerRef.current || showGuide || isGameInitializedRef.current) return;

    // Game constants
    const scaleFactor = 0.3333;
    const hitboxWidth = 213;
    const hitboxHeight = 193;
    const duckHitboxHeight = 147;
    const groundHeightLevel = 400;
    const characterPrefix = getCharacterPrefix(character);

    // Capture touch ref for use inside Phaser
    const touchRef = touchControls;

    const initializePhaser = async () => {
      if (typeof window === 'undefined') return;

      try {
        const Phaser = (await import('phaser')).default;

        // Cleanup existing game instance
        if (gameInstanceRef.current) {
          gameInstanceRef.current.destroy(true);
          gameInstanceRef.current = null;
        }

        // Game variables
        let isDuckingPrevious = false;
        let player: Phaser.Physics.Arcade.Sprite | null = null;
        let cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
        let scoreText: Phaser.GameObjects.Text;
        let obstacles: Phaser.Physics.Arcade.Group;
        let score = 0;
        // Cache animation keys to avoid string concatenation in hot loop
        const animKeys = {
          idle: `${characterPrefix}idle_animation`,
          duckIdle: `${characterPrefix}duck_idle_animation`,
          moving: `${characterPrefix}moving_animation`,
          duckMoving: `${characterPrefix}duck_moving_animation`,
          jump: `${characterPrefix}jump_animation`,
        };

        const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        const config: Phaser.Types.Core.GameConfig = {
          type: isMobile ? Phaser.CANVAS : Phaser.AUTO,
          width: 800,
          height: 460,
          transparent: true,
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: 0, y: 533 },
              debug: false,
            },
          },
          input: {
            keyboard: !isMobile,
          },
          scene: {
            key: 'mainScene',
            preload: function(this: Phaser.Scene) {
              // Load common assets
              this.load.spritesheet('background', '/assets/background.png', {
                frameWidth: 1200, frameHeight: 690, endFrame: 199,
              });
              this.load.spritesheet('background2', '/assets/background2.png', {
                frameWidth: 1200, frameHeight: 690, endFrame: 68,
              });
              this.load.spritesheet('chocolate', '/assets/choco.png', {
                frameWidth: 1200, frameHeight: 690, endFrame: 3,
              });
              this.load.spritesheet('ball', '/assets/tennis-ball.png', {
                frameWidth: 1200, frameHeight: 690, endFrame: 3,
              });
              this.load.spritesheet('bone', '/assets/bone.png', {
                frameWidth: 1200, frameHeight: 690, endFrame: 3,
              });

              // Only load selected character assets
              this.load.image(`${characterPrefix}idle`, `/assets/${characterPrefix}-idle.png`);
              this.load.image(`${characterPrefix}duck_idle`, `/assets/${characterPrefix}-duck-idle.png`);
              this.load.spritesheet(`${characterPrefix}moving`, `/assets/${characterPrefix}-moving.png`, {
                frameWidth: 1200, frameHeight: 690, endFrame: 7,
              });
              this.load.spritesheet(`${characterPrefix}duck_moving`, `/assets/${characterPrefix}-duck-moving.png`, {
                frameWidth: 1200, frameHeight: 690, endFrame: 1,
              });
              this.load.spritesheet(`${characterPrefix}jump`, `/assets/${characterPrefix}-jump.png`, {
                frameWidth: 1200, frameHeight: 690, endFrame: 2,
              });
            },
            create: function(this: Phaser.Scene) {
              // Reset score
              score = 0;
              setCurrentScore(0);

              // Background animations
              this.anims.create({
                key: 'background_animation',
                frames: this.anims.generateFrameNumbers('background', { start: 0, end: 199 }),
                frameRate: 8, repeat: -1,
              });
              this.anims.create({
                key: 'background2_animation',
                frames: this.anims.generateFrameNumbers('background2', { start: 0, end: 68 }),
                frameRate: 8, repeat: -1,
              });

              // Player animations
              this.anims.create({
                key: animKeys.idle,
                frames: [{ key: `${characterPrefix}idle` }],
                frameRate: 1, repeat: -1,
              });
              this.anims.create({
                key: animKeys.duckIdle,
                frames: [{ key: `${characterPrefix}duck_idle` }],
                frameRate: 1, repeat: -1,
              });
              this.anims.create({
                key: animKeys.moving,
                frames: this.anims.generateFrameNumbers(`${characterPrefix}moving`, { start: 0, end: 7 }),
                frameRate: 5, repeat: -1,
              });
              this.anims.create({
                key: animKeys.jump,
                frames: this.anims.generateFrameNumbers(`${characterPrefix}jump`, { start: 0, end: 2 }),
                frameRate: 3, repeat: 0,
              });
              this.anims.create({
                key: animKeys.duckMoving,
                frames: this.anims.generateFrameNumbers(`${characterPrefix}duck_moving`, { start: 0, end: 1 }),
                frameRate: 5, repeat: -1,
              });

              // Obstacle animations
              this.anims.create({
                key: 'chocolate_animation',
                frames: this.anims.generateFrameNumbers('chocolate', { start: 0, end: 3 }),
                frameRate: 2, repeat: -1,
              });
              this.anims.create({
                key: 'ball_animation',
                frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 3 }),
                frameRate: 2, repeat: -1,
              });
              this.anims.create({
                key: 'bone_animation',
                frames: this.anims.generateFrameNumbers('bone', { start: 0, end: 3 }),
                frameRate: 2, repeat: -1,
              });

              // Background sprites
              const background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
              background.setDisplaySize(800, 460);
              background.anims.play('background_animation');

              const background2 = this.add.sprite(0, 0, 'background2').setOrigin(0, 0);
              background2.setDisplaySize(800, 460);
              background2.anims.play('background2_animation');

              // World bounds
              this.physics.world.setBounds(0, 0, 800, groundHeightLevel);

              // Player
              player = this.physics.add.sprite(100, groundHeightLevel - 50, `${characterPrefix}idle`);
              player.setBounce(0.1).setCollideWorldBounds(true);
              player.setScale(scaleFactor);
              player.setOrigin(0.5, 1);
              (player.body as Phaser.Physics.Arcade.Body).setSize(hitboxWidth, hitboxHeight);
              player.anims.play(animKeys.idle);

              // Input
              cursors = this.input.keyboard?.createCursorKeys() ?? null;

              // Score display
              scoreText = this.add
                .text(11, 11, '0', {
                  fontSize: '24px',
                  color: '#fff',
                  fontFamily: 'VT323, monospace',
                  fixedWidth: 133,
                })
                .setScrollFactor(0)
                .setStroke('#000', 2.7);

              // Obstacle group
              obstacles = this.physics.add.group({ maxSize: 10 });

              // Collision handling
              this.physics.add.collider(player, obstacles, (_playerObj, obstacle) => {
                const obs = obstacle as Phaser.Physics.Arcade.Sprite;

                if (obs.texture.key === 'chocolate') {
                  handleGameOver();
                } else {
                  score += 10;
                  setCurrentScore(score);
                  scoreText.setText(`${score}`);
                  obs.destroy();

                  if (score > highScoreRef.current) {
                    highScoreRef.current = score;
                    setHighScore(score);
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('highScore', score.toString());
                    }
                  }
                }
              });

              // Obstacle spawn timer — store ref for cleanup
              spawnTimerRef.current = this.time.addEvent({
                delay: 1500,
                callback: () => {
                  if (gameOverRef.current) return;

                  const randomY = Phaser.Math.Between(groundHeightLevel - 120, groundHeightLevel - 30);
                  const obstacleType = Phaser.Math.RND.pick([
                    'chocolate', 'chocolate', 'chocolate', 'bone', 'ball',
                  ]);

                  const obstacle = obstacles.get(800, randomY, obstacleType);
                  if (obstacle) {
                    obstacle.setActive(true);
                    obstacle.setVisible(true);
                    obstacle.setVelocityX(-133);
                    obstacle.body.enable = true;
                    obstacle.setScale(0.073);
                    const body = obstacle.body as Phaser.Physics.Arcade.Body;
                    body.setCircle(167);
                    body.setOffset(450, 200);
                    obstacle.body.setAllowGravity(false);
                    obstacle.anims.play(`${obstacleType}_animation`, true);
                  }
                },
                callbackScope: this,
                loop: true,
              });
            },
            update: function(this: Phaser.Scene) {
              if (isPausedRef.current || gameOverRef.current) return;
              if (!player) return;

              player.setVelocityX(0);
              const isOnGround = player.body?.blocked.down;
              const isDownPressed = cursors?.down?.isDown || touchRef.current.down;
              const isLeftPressed = cursors?.left?.isDown || touchRef.current.left;
              const isRightPressed = cursors?.right?.isDown || touchRef.current.right;
              const isUpPressed = cursors?.up?.isDown || touchRef.current.up;

              let isDucking = false;
              let isMoving = false;

              // Jump — consume touch jump immediately (one-shot)
              if (isUpPressed && isOnGround) {
                player.setVelocityY(-400);
                player.anims.play(animKeys.jump, true);
                touchRef.current.up = false;
              }

              // Movement
              if (isLeftPressed) {
                player.setVelocityX(-133);
                isMoving = true;
              } else if (isRightPressed) {
                player.setVelocityX(133);
                isMoving = true;
              }

              // Ducking
              if (isDownPressed && isOnGround) {
                isDucking = true;
              }

              // Hitbox adjustment
              const body = player.body as Phaser.Physics.Arcade.Body;
              if (isDucking && !isDuckingPrevious) {
                const deltaHeight = (hitboxHeight - duckHitboxHeight) * scaleFactor;
                body.setSize(hitboxWidth, duckHitboxHeight);
                player.y += deltaHeight / 2;
                isDuckingPrevious = true;
              } else if (!isDucking && isDuckingPrevious) {
                const deltaHeight = (hitboxHeight - duckHitboxHeight) * scaleFactor;
                body.setSize(hitboxWidth, hitboxHeight);
                player.y -= deltaHeight / 2;
                isDuckingPrevious = false;
              }

              // Animation logic — using cached keys
              const currentAnimKey = player.anims.currentAnim?.key;
              if (isDucking && isMoving) {
                if (currentAnimKey !== animKeys.duckMoving) {
                  player.anims.play(animKeys.duckMoving, true);
                }
              } else if (isDucking) {
                if (currentAnimKey !== animKeys.duckIdle) {
                  player.anims.play(animKeys.duckIdle, true);
                }
              } else if (isMoving) {
                if (currentAnimKey !== animKeys.moving && currentAnimKey !== animKeys.jump) {
                  player.anims.play(animKeys.moving, true);
                }
              } else {
                if (currentAnimKey !== animKeys.idle && currentAnimKey !== animKeys.jump) {
                  player.anims.play(animKeys.idle, true);
                }
              }

              // Landing after jump
              if (isOnGround && currentAnimKey === animKeys.jump && !player.anims.isPlaying) {
                if (isMoving) {
                  player.anims.play(animKeys.moving, true);
                } else {
                  player.anims.play(animKeys.idle, true);
                }
              }

              // Clean up off-screen obstacles
              obstacles.children.each((obstacle) => {
                const obs = obstacle as Phaser.Physics.Arcade.Sprite;
                if (obs.active && obs.x < -50) {
                  obstacles.killAndHide(obs);
                  obs.body!.enable = false;
                }
                return true;
              });
            }
          },
          parent: gameContainerRef.current,
        };

        gameInstanceRef.current = new Phaser.Game(config);
        isGameInitializedRef.current = true;
      } catch {
        // Phaser initialization failed
      }
    };

    initializePhaser();

    return () => {
      if (spawnTimerRef.current) {
        spawnTimerRef.current.remove();
        spawnTimerRef.current = null;
      }
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        isGameInitializedRef.current = false;
      }
    };
  }, [showGuide, character, handleGameOver]);

  // Toggle pause
  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      if (prev) {
        gameInstanceRef.current?.scene.resume('mainScene');
      } else {
        gameInstanceRef.current?.scene.pause('mainScene');
      }
      isPausedRef.current = !prev;
      return !prev;
    });
  }, []);

  // Restart game
  const handleRestart = useCallback(() => {
    setGameOver(false);
    gameOverRef.current = false;
    setCurrentScore(0);

    if (gameInstanceRef.current) {
      try {
        const currentScene = gameInstanceRef.current.scene.getScene('mainScene');
        if (currentScene) {
          currentScene.scene.restart();
          currentScene.physics.world.resume();
        }
      } catch {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        isGameInitializedRef.current = false;
      }
    }
  }, []);

  // Touch button handler helpers
  const onTouchStart = (dir: 'left' | 'right' | 'up' | 'down') => {
    touchControls.current[dir] = true;
  };
  const onTouchEnd = (dir: 'left' | 'right' | 'up' | 'down') => {
    touchControls.current[dir] = false;
  };

  const dpadButtonStyle: React.CSSProperties = {
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.08)',
    border: '1.5px solid rgba(255,255,255,0.25)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 22,
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'none',
    cursor: 'pointer',
  };

  return (
    <div className="relative w-[800px] h-[460px] mx-auto border border-border bg-surface box-border overflow-hidden">
      {showGuide ? (
        <HowToPlay onClose={handleStartGame} />
      ) : (
        <>
          {/* Pause button */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              right: '42px',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <button
              onClick={togglePause}
              style={{
                width: '28px',
                height: '28px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              title={isPaused ? 'Resume' : 'Pause'}
            >
              <img
                src={isPaused ? '/assets/play-button.png' : '/assets/pause-button.png'}
                alt={isPaused ? 'Resume' : 'Pause'}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </button>
          </div>

          {/* Game container */}
          <div ref={gameContainerRef} style={{ width: '100%', height: '100%' }} />

          {/* D-pad touch controls — touch devices only, WASD formation */}
          {!gameOver && isTouchDevice && (
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                pointerEvents: 'none',
              }}
            >
              {/* Top row: Jump (up) */}
              <div style={{ pointerEvents: 'auto' }}>
                <button
                  style={dpadButtonStyle}
                  onPointerDown={() => onTouchStart('up')}
                  onPointerUp={() => onTouchEnd('up')}
                  onPointerLeave={() => onTouchEnd('up')}
                  onPointerCancel={() => onTouchEnd('up')}
                  aria-label="Jump"
                >
                  &#9650;
                </button>
              </div>
              {/* Bottom row: Left, Duck (down), Right */}
              <div style={{ display: 'flex', gap: 4, pointerEvents: 'auto' }}>
                <button
                  style={dpadButtonStyle}
                  onPointerDown={() => onTouchStart('left')}
                  onPointerUp={() => onTouchEnd('left')}
                  onPointerLeave={() => onTouchEnd('left')}
                  onPointerCancel={() => onTouchEnd('left')}
                  aria-label="Move left"
                >
                  &#9664;
                </button>
                <button
                  style={dpadButtonStyle}
                  onPointerDown={() => onTouchStart('down')}
                  onPointerUp={() => onTouchEnd('down')}
                  onPointerLeave={() => onTouchEnd('down')}
                  onPointerCancel={() => onTouchEnd('down')}
                  aria-label="Duck"
                >
                  &#9660;
                </button>
                <button
                  style={dpadButtonStyle}
                  onPointerDown={() => onTouchStart('right')}
                  onPointerUp={() => onTouchEnd('right')}
                  onPointerLeave={() => onTouchEnd('right')}
                  onPointerCancel={() => onTouchEnd('right')}
                  aria-label="Move right"
                >
                  &#9654;
                </button>
              </div>
            </div>
          )}

          {/* Game Over */}
          {gameOver && (
            <GameOver
              currentScore={currentScore}
              highScore={highScore}
              handleRestart={handleRestart}
              onCharacterSelect={onCharacterSelect}
              onMainMenu={onMainMenu}
            />
          )}
          <AudioManager currentScreen="game" />
        </>
      )}
    </div>
  );
}
