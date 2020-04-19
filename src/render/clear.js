import { WIDTH, HEIGHT } from '../config';

export const clearCanvas = (ctx) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};
