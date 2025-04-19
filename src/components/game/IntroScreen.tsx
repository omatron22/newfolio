'use client';

import React, { useEffect, useRef, useState } from 'react';
import AudioManager from './AudioManager';

interface IntroScreenProps {
  onPlay: () => void;
}

export default function IntroScreen({ onPlay }: IntroScreenProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const phaserInstanceRef = useRef<any>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!introRef.current) return;

    const initPhaser = async () => {
      try {
        console.log("Initializing intro screen...");
        // Dynamically import Phaser
        const Phaser = (await import('phaser')).default;
        
        // Destroy previous instance
        if (phaserInstanceRef.current) {
          phaserInstanceRef.current.destroy(true);
        }

        const config = {
          type: Phaser.AUTO,
          width: 800,
          height: 460,
          transparent: true,
          scene: {
            preload: function(this: Phaser.Scene) {
              this.load.spritesheet('samson', '/assets/samson.png', {
                frameWidth: 1200,
                frameHeight: 690,
                endFrame: 199,
              });
              this.load.spritesheet('samson2', '/assets/samson2.png', {
                frameWidth: 1200,
                frameHeight: 690,
                endFrame: 69,
              });
              this.load.image('playButton', '/assets/play.png');
            },
            create: function(this: Phaser.Scene) {
              // Animation for samson
              this.anims.create({
                key: 'samson_animation',
                frames: this.anims.generateFrameNumbers('samson', { start: 0, end: 199 }),
                frameRate: 8,
                repeat: -1,
              });
              const samsonSprite = this.add.sprite(400, 230, 'samson');
              samsonSprite.setScale(0.6667);
              samsonSprite.setOrigin(0.5, 0.5);
              samsonSprite.play('samson_animation');

              // Animation for samson2
              this.anims.create({
                key: 'samson2_animation',
                frames: this.anims.generateFrameNumbers('samson2', { start: 0, end: 69 }),
                frameRate: 6,
                repeat: -1,
              });
              const samson2Sprite = this.add.sprite(400, 230, 'samson2');
              samson2Sprite.setScale(0.6667);
              samson2Sprite.setOrigin(0.5, 0.5);
              samson2Sprite.play('samson2_animation');

              // Add play button
              const playButton = this.add
              .image(400, 230, 'playButton')
              .setInteractive({ 
                pixelPerfect: true,  // This makes the hitbox match the non-transparent parts of the image
                alphaTolerance: 1    // This sets how strict the transparency detection is (0-255)
              });
            
            playButton.setScale(0.6667);
            playButton.setOrigin(0.5, 0.5);
            playButton.on('pointerdown', onPlay);
            playButton.on('pointerover', () => {
              playButton.setScale(0.7334);
            });
            playButton.on('pointerout', () => {
              playButton.setScale(0.6667);
            });
            },
          },
          parent: introRef.current,
        };

        phaserInstanceRef.current = new Phaser.Game(config);
        console.log("Intro screen initialized successfully");
      } catch (error) {
        console.error('Could not load Phaser for intro screen:', error);
        setIsError(true);
      }
    };

    initPhaser();

    return () => {
      if (phaserInstanceRef.current) {
        phaserInstanceRef.current.destroy(true);
      }
    };
  }, [onPlay]);

  // Fallback UI in case of error
  if (isError) {
    return (
      <div className="relative w-[800px] h-[460px] mx-auto border-[8px] border-base-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-base-100 to-base-200 box-border overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Samson The Game</h2>
          <button 
            onClick={onPlay}
            className="btn btn-primary px-8 py-3"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-[800px] h-[460px] mx-auto border-[8px] border-base-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-base-100 to-base-200 box-border overflow-hidden"
    >
      <div ref={introRef} className="w-full h-full"></div>
      <AudioManager currentScreen="intro" />
    </div>
  );
}