import sharp from 'sharp';
import { execSync } from 'child_process';
import { mkdirSync, rmSync } from 'fs';
import path from 'path';

const FRAME_W = 1200;
const FRAME_H = 690;
const OUTPUT_W = 800;
const OUTPUT_H = 460;
const BG1_COLS = 11; // 13200 / 1200
const BG2_COLS = 6;  // 7200 / 1200
const BG1_FRAMES = 200;
const BG2_FRAMES = 69;

const TMP = '/tmp/game-bg-frames';
const ASSETS = path.resolve('public/assets');

function extractFrame(rawData, imgWidth, channels, frameIdx, cols) {
  const col = frameIdx % cols;
  const row = Math.floor(frameIdx / cols);
  const buf = Buffer.alloc(FRAME_W * FRAME_H * channels);
  for (let y = 0; y < FRAME_H; y++) {
    const srcOff = ((row * FRAME_H + y) * imgWidth + col * FRAME_W) * channels;
    const dstOff = y * FRAME_W * channels;
    rawData.copy(buf, dstOff, srcOff, srcOff + FRAME_W * channels);
  }
  return buf;
}

async function main() {
  mkdirSync(TMP, { recursive: true });

  console.log('Loading background1 (this takes a moment)...');
  const { data: bg1, info: bg1Info } = await sharp(path.join(ASSETS, 'background.png'))
    .raw().toBuffer({ resolveWithObject: true });
  console.log(`  ${bg1Info.width}x${bg1Info.height}, ${bg1Info.channels}ch`);

  console.log('Loading background2...');
  const { data: bg2, info: bg2Info } = await sharp(path.join(ASSETS, 'background2.png'))
    .raw().toBuffer({ resolveWithObject: true });
  console.log(`  ${bg2Info.width}x${bg2Info.height}, ${bg2Info.channels}ch`);

  console.log('Compositing frames...');
  for (let i = 0; i < BG1_FRAMES; i++) {
    const bg1Frame = extractFrame(bg1, bg1Info.width, bg1Info.channels, i, BG1_COLS);
    const bg2Frame = extractFrame(bg2, bg2Info.width, bg2Info.channels, i % BG2_FRAMES, BG2_COLS);

    // Resize both frames to output size first, then composite
    const bg1Png = await sharp(bg1Frame, { raw: { width: FRAME_W, height: FRAME_H, channels: bg1Info.channels } })
      .resize(OUTPUT_W, OUTPUT_H).png().toBuffer();
    const bg2Png = await sharp(bg2Frame, { raw: { width: FRAME_W, height: FRAME_H, channels: bg2Info.channels } })
      .resize(OUTPUT_W, OUTPUT_H).png().toBuffer();

    await sharp(bg1Png)
      .composite([{ input: bg2Png, top: 0, left: 0 }])
      .png()
      .toFile(path.join(TMP, `frame_${String(i).padStart(3, '0')}.png`));

    if (i % 25 === 0) console.log(`  ${i}/${BG1_FRAMES}`);
  }

  console.log('Encoding MP4 with ffmpeg...');
  execSync([
    'ffmpeg -y',
    `-framerate 8`,
    `-i ${TMP}/frame_%03d.png`,
    '-c:v libx264 -pix_fmt yuv420p',
    '-crf 23 -preset medium',
    '-movflags +faststart',
    `${path.join(ASSETS, 'background-mobile.mp4')}`,
  ].join(' '));

  rmSync(TMP, { recursive: true });
  console.log('Done! Created public/assets/background-mobile.mp4');
}

main().catch(console.error);
