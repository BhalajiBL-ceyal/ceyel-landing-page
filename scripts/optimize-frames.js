import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../public/frames');
const hdDir = path.resolve(__dirname, '../public/frames/hd');
const mobileDir = path.resolve(__dirname, '../public/frames/mobile');

// Ensure output directories exist
if (!fs.existsSync(hdDir)) fs.mkdirSync(hdDir, { recursive: true });
if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });

async function optimizeFrames() {
  try {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    
    // Sort files naturally so ezgif-frame-001 comes before 010 etc.
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    console.log(`Found ${files.length} frames. Starting optimization...`);

    let index = 1;
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const paddedIndex = String(index).padStart(4, '0');
      const outputName = `frame_${paddedIndex}.webp`;

      const hdPath = path.join(hdDir, outputName);
      const mobilePath = path.join(mobileDir, outputName);

      // Process HD version (1920px max width, 90% quality)
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 90, effort: 6 })
        .toFile(hdPath);

      // Process Mobile version (1080px max width, 80% quality)
      await sharp(inputPath)
        .resize({ width: 1080, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(mobilePath);

      console.log(`Converted: ${outputName}`);
      index++;
    }

    console.log('✅ All frames optimized successfully!');
  } catch (error) {
    console.error('❌ Error optimizing frames:', error);
    process.exit(1);
  }
}

optimizeFrames();
