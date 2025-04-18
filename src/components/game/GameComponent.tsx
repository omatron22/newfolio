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

export default function GameComponent({ 
  character, 
  onCharacterSelect, 
  onMainMenu 
}: GameComponentProps) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<any>(null);
  const isPausedRef = useRef(false);
  const highScoreRef = useRef(0);

  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showGuide, setShowGuide] = useState(() => {
    // We need to check on client side only
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('guideShown') !== 'true';
    }
    return true;
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [isGameInitialized, setIsGameInitialized] = useState(false);

  // Initialize highScore from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHighScore = localStorage.getItem('highScore');
      const parsedHighScore = savedHighScore ? parseInt(savedHighScore, 10) : 0;
      setHighScore(parsedHighScore);
      highScoreRef.current = parsedHighScore;
    }
  }, []);

  // Update the highScoreRef whenever highScore changes
  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  const handleGameOver = useCallback(() => {
    setGameOver(true);

    if (gameInstanceRef.current) {
      const currentScene = gameInstanceRef.current.scene.getScene('mainScene');

      if (currentScene) {
        currentScene.physics.world.pause();
        currentScene.scene.pause();
      }
    }
  }, []);

  // Function to handle starting the game after the guide
  const handleStartGame = () => {
    setShowGuide(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('guideShown', 'true');
    }
  };

  useEffect(() => {
    if (!gameContainerRef.current || showGuide || isGameInitialized) return;

    const initializePhaser = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Dynamically import Phaser to avoid SSR issues
          const Phaser = (await import('phaser')).default;
          
          // Ensure previous game instance is fully destroyed
          if (gameInstanceRef.current) {
            gameInstanceRef.current.destroy(true);
            gameInstanceRef.current = null;
          }

          const scaleFactor = 0.3333;
          const hitboxWidth = 213;
          const hitboxHeight = 193;
          const duckHitboxHeight = 147;
          const groundHeightLevel = 400;
          let isDuckingPrevious = false;
          let player: Phaser.Physics.Arcade.Sprite | null = null;
          let cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
          let scoreText: Phaser.GameObjects.Text;
          let obstacles: Phaser.Physics.Arcade.Group;
          let score = 0;

          const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
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
            scene: {
              key: 'mainScene',
              preload: function(this: Phaser.Scene) {
                // Determine character prefix based on selected character
                const characterPrefix =
                  character === 'birthday' ? 'birthday' : character === 'jeans' ? 'jeans' : 'og';

                // Load common assets (original sizes)
                this.load.spritesheet('background', '/assets/background.png', {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 199,
                });
                this.load.spritesheet('background2', '/assets/background2.png', {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 68,
                });
                this.load.spritesheet('chocolate', '/assets/choco.png', {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 3,
                });
                this.load.spritesheet('ball', '/assets/tennis-ball.png', {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 3,
                });
                this.load.spritesheet('bone', '/assets/bone.png', {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 3,
                });

                // Load character-specific assets
                this.load.image(`${characterPrefix}idle`, `/assets/${characterPrefix}-idle.png`);
                this.load.image(`${characterPrefix}duck_idle`, `/assets/${characterPrefix}-duck-idle.png`);

                this.load.spritesheet(`${characterPrefix}moving`, `/assets/${characterPrefix}-moving.png`, {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 7,
                });
                this.load.spritesheet(`${characterPrefix}duck_moving`, `/assets/${characterPrefix}-duck-moving.png`, {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 1,
                });
                this.load.spritesheet(`${characterPrefix}jump`, `/assets/${characterPrefix}-jump.png`, {
                  frameWidth: 1200,
                  frameHeight: 690,
                  endFrame: 2,
                });
              },
              create: function(this: Phaser.Scene) {
                const characterPrefix =
                  character === 'birthday' ? 'birthday' : character === 'jeans' ? 'jeans' : 'og';

                score = 0;
                setCurrentScore(0);

                // Create animations
                this.anims.create({
                  key: 'background_animation',
                  frames: this.anims.generateFrameNumbers('background', { start: 0, end: 199 }),
                  frameRate: 8,
                  repeat: -1,
                });

                this.anims.create({
                  key: 'background2_animation',
                  frames: this.anims.generateFrameNumbers('background2', { start: 0, end: 68 }),
                  frameRate: 8,
                  repeat: -1,
                });

                // Player animations
                this.anims.create({
                  key: `${characterPrefix}idle_animation`,
                  frames: [{ key: `${characterPrefix}idle` }],
                  frameRate: 1,
                  repeat: -1,
                });
                this.anims.create({
                  key: `${characterPrefix}duck_idle_animation`,
                  frames: [{ key: `${characterPrefix}duck_idle` }],
                  frameRate: 1,
                  repeat: -1,
                });

                this.anims.create({
                  key: `${characterPrefix}moving_animation`,
                  frames: this.anims.generateFrameNumbers(`${characterPrefix}moving`, {
                    start: 0,
                    end: 7,
                  }),
                  frameRate: 5,
                  repeat: -1,
                });

                this.anims.create({
                  key: `${characterPrefix}jump_animation`,
                  frames: this.anims.generateFrameNumbers(`${characterPrefix}jump`, { start: 0, end: 2 }),
                  frameRate: 3,
                  repeat: 0,
                });

                this.anims.create({
                  key: `${characterPrefix}duck_moving_animation`,
                  frames: this.anims.generateFrameNumbers(`${characterPrefix}duck_moving`, {
                    start: 0,
                    end: 1,
                  }),
                  frameRate: 5,
                  repeat: -1,
                });

                // Obstacle animations
                this.anims.create({
                  key: 'chocolate_animation',
                  frames: this.anims.generateFrameNumbers('chocolate', { start: 0, end: 3 }),
                  frameRate: 2,
                  repeat: -1,
                });

                this.anims.create({
                  key: 'ball_animation',
                  frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 3 }),
                  frameRate: 2,
                  repeat: -1,
                });

                this.anims.create({
                  key: 'bone_animation',
                  frames: this.anims.generateFrameNumbers('bone', { start: 0, end: 3 }),
                  frameRate: 2,
                  repeat: -1,
                });

                // Set background sprite and add animation
                const background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
                background.setDisplaySize(800, 460); // Adjusted size
                background.anims.play('background_animation');

                // Set second background sprite and add animation
                const background2 = this.add.sprite(0, 0, 'background2').setOrigin(0, 0);
                background2.setDisplaySize(800, 460); // Adjusted size
                background2.anims.play('background2_animation');

                // Set world bounds
                this.physics.world.setBounds(0, 0, 800, groundHeightLevel);

                // Create the player sprite and start with idle animation
                player = this.physics.add.sprite(100, groundHeightLevel - 50, `${characterPrefix}idle`);
                player.setBounce(0.1).setCollideWorldBounds(true);
                player.setScale(scaleFactor);
                player.setOrigin(0.5, 1);
                (player.body as Phaser.Physics.Arcade.Body).setSize(hitboxWidth, hitboxHeight);
                player.anims.play(`${characterPrefix}idle_animation`);

                // Input handling for player movement
                cursors = this.input.keyboard?.createCursorKeys() ?? null;

                // Display score on the screen
                scoreText = this.add
                  .text(11, 11, '0', {
                    fontSize: '24px',
                    color: '#fff',
                    fontFamily: 'VT323, monospace',
                    fixedWidth: 133,
                  })
                  .setScrollFactor(0)
                  .setStroke('#000', 2.7);

                // Create obstacle group
                obstacles = this.physics.add.group({
                  maxSize: 10,
                });

                // Add collider for player and obstacles
                this.physics.add.collider(player, obstacles, (player, obstacle) => {
                  const obs = obstacle as Phaser.Physics.Arcade.Sprite;

                  if (obs.texture.key === 'chocolate') {
                    handleGameOver();
                  } else {
                    // Collectible obstacles: bone and ball
                    score += 10;
                    setCurrentScore(score);
                    scoreText.setText(`${score}`);
                    obs.destroy();

                    // Update high score if current score is greater
                    if (score > highScoreRef.current) {
                      setHighScore(score);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('highScore', score.toString());
                      }
                    }
                  }
                });

                // Spawning logic for obstacles
                this.time.addEvent({
                  delay: 1500,
                  callback: () => {
                    if (gameOver) return; // Stop spawning when game is over

                    const randomY = Phaser.Math.Between(groundHeightLevel - 120, groundHeightLevel - 30);
                    const obstacleType = Phaser.Math.RND.pick([
                      'chocolate',
                      'chocolate',
                      'chocolate',
                      'bone',
                      'ball',
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
                if (isPausedRef.current || gameOver) {
                  return;
                }
                if (!player || !cursors) return;

                const characterPrefix =
                  character === 'birthday' ? 'birthday' : character === 'jeans' ? 'jeans' : 'og';

                player.setVelocityX(0);
                const isOnGround = player.body?.blocked.down;
                const isDownPressed = cursors.down?.isDown;
                const isLeftPressed = cursors.left?.isDown;
                const isRightPressed = cursors.right?.isDown;
                const isUpPressed = cursors.up?.isDown;

                let isDucking = false;
                let isMoving = false;

                // Jump logic
                if (isUpPressed && isOnGround) {
                  player.setVelocityY(-400);
                  player.anims.play(`${characterPrefix}jump_animation`, true);
                }

                // Movement logic
                if (isLeftPressed) {
                  player.setVelocityX(-133);
                  isMoving = true;
                } else if (isRightPressed) {
                  player.setVelocityX(133);
                  isMoving = true;
                }

                // Ducking logic
                if (isDownPressed && isOnGround) {
                  isDucking = true;
                }

                // Adjust the hitbox size when ducking
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

                // Animation logic
                if (isDucking && isMoving) {
                  if (player.anims.currentAnim?.key !== `${characterPrefix}duck_moving_animation`) {
                    player.anims.play(`${characterPrefix}duck_moving_animation`, true);
                  }
                } else if (isDucking) {
                  if (player.anims.currentAnim?.key !== `${characterPrefix}duck_idle_animation`) {
                    player.anims.play(`${characterPrefix}duck_idle_animation`, true);
                  }
                } else if (isMoving) {
                  if (
                    player.anims.currentAnim?.key !== `${characterPrefix}moving_animation` &&
                    player.anims.currentAnim?.key !== `${characterPrefix}jump_animation`
                  ) {
                    player.anims.play(`${characterPrefix}moving_animation`, true);
                  }
                } else {
                  if (
                    player.anims.currentAnim?.key !== `${characterPrefix}idle_animation` &&
                    player.anims.currentAnim?.key !== `${characterPrefix}jump_animation`
                  ) {
                    player.anims.play(`${characterPrefix}idle_animation`, true);
                  }
                }

                // Reset to idle or moving animation after jump animation finishes
                if (
                  isOnGround &&
                  player.anims.currentAnim?.key === `${characterPrefix}jump_animation` &&
                  !player.anims.isPlaying
                ) {
                  if (isMoving) {
                    player.anims.play(`${characterPrefix}moving_animation`, true);
                  } else {
                    player.anims.play(`${characterPrefix}idle_animation`, true);
                  }
                }

                // Cleanup obstacles
                obstacles.children.iterate((obstacle) => {
                  const obs = obstacle as Phaser.Physics.Arcade.Sprite;

                  if (obs.body && (obs.x < -50 || !obs.body.enable)) {
                    obstacles.killAndHide(obs);
                    obs.body.enable = false;
                  }

                  return true;
                });
              }
            },
            parent: gameContainerRef.current,
          };

          gameInstanceRef.current = new Phaser.Game(config);
          setIsGameInitialized(true);
        } catch (error) {
          console.error('Could not load Phaser:', error);
        }
      }
    };

    initializePhaser();

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
      setIsGameInitialized(false);
    };
  }, [showGuide, character, gameOver, handleGameOver, isGameInitialized]);

  const togglePause = () => {
    setIsPaused((prev) => {
      if (prev) {
        gameInstanceRef.current?.scene.resume('mainScene');
      } else {
        gameInstanceRef.current?.scene.pause('mainScene');
      }
      isPausedRef.current = !prev;
      return !prev;
    });
  };

  const handleRestart = () => {
    setGameOver(false);
    setCurrentScore(0);

    if (gameInstanceRef.current) {
      const currentScene = gameInstanceRef.current.scene.getScene('mainScene');

      if (currentScene) {
        currentScene.scene.restart();
        currentScene.physics.world.resume();
      }
    }
  };

  return (
    <div
      className="relative w-[800px] h-[460px] mx-auto border-[8px] border-base-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-base-100 to-base-200 box-border overflow-hidden"
    >
      {/* Show the HowToPlay screen before starting the game */}
      {showGuide ? (
        <HowToPlay onClose={handleStartGame} />
      ) : (
        <>
          {/* Top-right control buttons */}
          <div
            style={{
              position: 'absolute',
              top: '6.7px',
              right: '60px',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {/* Pause Button */}
            <img
              src={isPaused ? '/assets/play-button.png' : '/assets/pause-button.png'}
              onClick={togglePause}
              alt={isPaused ? 'Play' : 'Pause'}
              style={{
                cursor: 'pointer',
                width: '33px',
                height: '33px',
              }}
            />
          </div>

          {/* Game container */}
          <div ref={gameContainerRef} style={{ width: '100%', height: '100%' }}></div>

          {/* Game Over screen */}
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