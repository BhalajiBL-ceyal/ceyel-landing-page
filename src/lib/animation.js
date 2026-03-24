/**
 * animation.js — Scroll-driven frame animation utilities for CEYEL hero section
 */

const FRAME_COUNT = 48;
const FRAME_PATTERN = (i, quality) => `/frames/${quality}/frame_${String(i).padStart(4, '0')}.webp`;

/**
 * Build array of frame paths from 1 → count based on quality
 */
export function buildFramePaths(count = FRAME_COUNT, quality = 'hd') {
  return Array.from({ length: count }, (_, i) => FRAME_PATTERN(i + 1, quality));
}

/**
 * Preload images progressively.
 * - First `eager` frames load immediately
 * - Remaining frames load lazily after a short defer
 */
export function preloadImages(paths, eager = 10, onProgress = null) {
  const images = new Array(paths.length).fill(null);
  let loaded = 0;

  const loadOne = (index) => {
    const img = new Image();
    img.onload = () => {
      images[index] = img;
      loaded++;
      if (onProgress) onProgress(loaded, paths.length);
    };
    img.onerror = () => {
      loaded++;
      if (onProgress) onProgress(loaded, paths.length);
    };
    img.src = paths[index];
  };

  for (let i = 0; i < Math.min(eager, paths.length); i++) {
    loadOne(i);
  }

  if (paths.length > eager) {
    setTimeout(() => {
      for (let i = eager; i < paths.length; i++) {
        loadOne(i);
      }
    }, 200);
  }

  return images;
}

/**
 * Linear interpolation
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Draw an image onto a canvas using cover-fit behaviour (object-fit: cover).
 * Centres and scales the image to fully cover the canvas.
 */
export function drawFrame(ctx, img, canvas) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.drawImage(img, sx, sy, sw, sh);
}

/**
 * Draw frame with a subtle radial glow overlay around the device centre.
 * Used for the scroll story stages to add atmospheric depth.
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement} img
 * @param {HTMLCanvasElement} canvas
 * @param {number} glowIntensity - 0 (none) to 1 (full glow)
 * @param {'blue'|'dark'} glowMode
 */
export function drawFrameWithGlow(ctx, img, canvas, glowIntensity = 0, glowMode = 'blue') {
  drawFrame(ctx, img, canvas);

  if (glowIntensity <= 0) return;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.45;

  const gradient = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);

  if (glowMode === 'blue') {
    gradient.addColorStop(0, `rgba(99, 102, 241, ${glowIntensity * 0.12})`);
    gradient.addColorStop(0.5, `rgba(34, 211, 238, ${glowIntensity * 0.06})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    // dark overlay for industrial mood
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.7, `rgba(0, 0, 0, ${glowIntensity * 0.35})`);
    gradient.addColorStop(1, `rgba(0, 0, 0, ${glowIntensity * 0.6})`);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Map scroll progress [0..1] to frame index [0..frameCount-1] with lerp smoothing.
 */
export function scrollToFrameIndex(progress, frameCount, currentFrameFloat, lerpSpeed = 0.15) {
  const target = Math.min(progress * (frameCount - 1), frameCount - 1);
  return lerp(currentFrameFloat, target, lerpSpeed);
}

/**
 * Get scroll story stage and intensity based on progress.
 * Returns { stage: 0-3, t: 0-1 } where t is progress within the stage.
 */
export function getScrollStage(progress) {
  if (progress < 0.25) return { stage: 0, t: progress / 0.25 };
  if (progress < 0.60) return { stage: 1, t: (progress - 0.25) / 0.35 };
  if (progress < 0.85) return { stage: 2, t: (progress - 0.60) / 0.25 };
  return { stage: 3, t: (progress - 0.85) / 0.15 };
}
