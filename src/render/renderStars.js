import { STAR_SIZE, BASE_STAR_INTENSITY } from '../config';

export const renderStars = (ctx, state) => {
  for (let i = 0; i < state.stars.length; i += 1) {
    const { x, y, distance } = state.stars[i];
    ctx.fillStyle = `hsla(0, 0%, 100%, ${BASE_STAR_INTENSITY * distance})`;
    ctx.fillRect(x, y, STAR_SIZE, STAR_SIZE);

    ctx.fillStyle = `hsla(0, 0%, 75%, ${BASE_STAR_INTENSITY * distance})`;
    ctx.fillRect(x, y - STAR_SIZE, STAR_SIZE, STAR_SIZE);

    ctx.fillStyle = `hsla(0, 0%, 25%, ${BASE_STAR_INTENSITY * distance})`;
    ctx.fillRect(x, y - 2 * STAR_SIZE, STAR_SIZE, STAR_SIZE);
  }
};
