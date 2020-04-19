import { WIDTH, HEIGHT } from '../config';

export const initializeCanvas = (canvas, ctx) => {
  // https://devlog.disco.zone/2016/07/22/canvas-scaling/

  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = WIDTH * pixelRatio;
  canvas.height = HEIGHT * pixelRatio;
  canvas.style.width = `${WIDTH}px`;
  canvas.style.height = `${HEIGHT}px`;
  canvas.style.margin = 'auto';
  ctx.scale(pixelRatio, pixelRatio);
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
};
