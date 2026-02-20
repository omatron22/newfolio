'use client';

import React, { useEffect, useRef, useState } from 'react';
import AudioManager from './AudioManager';

interface IntroScreenProps {
  onPlay: () => void;
}

export default function IntroScreen({ onPlay }: IntroScreenProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const phaserInstanceRef = useRef<Phaser.Game | null>(null);
  const onPlayRef = useRef(onPlay);
  const [isError, setIsError] = useState(false);

  // Keep onPlay ref stable to avoid Phaser re-initialization
  useEffect(() => {
    onPlayRef.current = onPlay;
  }, [onPlay]);

  useEffect(() => {
    if (!introRef.current) return;

    const initPhaser = async () => {
      try {
        const Phaser = (await import('phaser')).default;

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
                frameWidth: 1200, frameHeight: 690, endFrame: 199,
              });
              this.load.spritesheet('samson2', '/assets/samson2.png', {
                frameWidth: 1200, frameHeight: 690, endFrame: 69,
              });
              this.load.image('playButton', '/assets/play.png');
            },
            create: function(this: Phaser.Scene) {
              this.anims.create({
                key: 'samson_animation',
                frames: this.anims.generateFrameNumbers('samson', { start: 0, end: 199 }),
                frameRate: 8, repeat: -1,
              });
              const samsonSprite = this.add.sprite(400, 230, 'samson');
              samsonSprite.setScale(0.6667);
              samsonSprite.setOrigin(0.5, 0.5);
              samsonSprite.play('samson_animation');

              this.anims.create({
                key: 'samson2_animation',
                frames: this.anims.generateFrameNumbers('samson2', { start: 0, end: 69 }),
                frameRate: 6, repeat: -1,
              });
              const samson2Sprite = this.add.sprite(400, 230, 'samson2');
              samson2Sprite.setScale(0.6667);
              samson2Sprite.setOrigin(0.5, 0.5);
              samson2Sprite.play('samson2_animation');

              const playButton = this.add
                .image(400, 230, 'playButton')
                .setInteractive({ pixelPerfect: true, alphaTolerance: 1 });

              playButton.setScale(0.6667);
              playButton.setOrigin(0.5, 0.5);
              // Use ref to avoid stale closure
              playButton.on('pointerdown', () => onPlayRef.current());
              playButton.on('pointerover', () => playButton.setScale(0.7334));
              playButton.on('pointerout', () => playButton.setScale(0.6667));
            },
          },
          parent: introRef.current,
        };

        phaserInstanceRef.current = new Phaser.Game(config);
      } catch {
        setIsError(true);
      }
    };

    initPhaser();

    return () => {
      if (phaserInstanceRef.current) {
        phaserInstanceRef.current.destroy(true);
        phaserInstanceRef.current = null;
      }
    };
  // Stable — no longer depends on onPlay
  }, []);

  if (isError) {
    return (
      <div className="relative w-[800px] h-[460px] mx-auto border border-border bg-surface box-border overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-geist text-2xl font-bold mb-4">Samson The Game</h2>
          <button onClick={onPlay} className="game-btn px-8 py-3">
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[800px] h-[460px] mx-auto border border-border bg-surface box-border overflow-hidden">
      <div ref={introRef} className="w-full h-full" />
      <AudioManager currentScreen="intro" />
    </div>
  );
}
