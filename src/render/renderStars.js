import { STAR } from '../config';

export const renderStars = (ctx, state) => {
  for (let i = 0; i < state.stars.length; i += 1) {
    const { x, y, distance } = state.stars[i];
    ctx.fillStyle = `hsla(0, 0%, 100%, ${
      STAR.BASE_INTENSITY * (distance / 100)
    })`;
    ctx.fillRect(x, y, STAR.SIZE, STAR.SIZE);

    ctx.fillStyle = `hsla(0, 0%, 75%, ${
      STAR.BASE_INTENSITY * (distance / 100)
    })`;
    ctx.fillRect(x, y - STAR.SIZE, STAR.SIZE, STAR.SIZE);

    ctx.fillStyle = `hsla(0, 0%, 25%, ${
      STAR.BASE_INTENSITY * (distance / 100)
    })`;
    ctx.fillRect(x, y - 2 * STAR.SIZE, STAR.SIZE, STAR.SIZE);
  }
};
