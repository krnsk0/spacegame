import { PLAYER_BULLETS } from '../config';

export const renderPlayerBullets = (ctx, state) => {
  ctx.fillStyle = `hsla(0, 0%, 100%, 1)`;
  const HALF = Math.floor(PLAYER_BULLETS.SIZE / 2);

  for (let i = 0; i < state.playerBullets.bullets.length; i += 1) {
    const { x, y } = state.playerBullets.bullets[i];
    ctx.fillRect(x - HALF, y - HALF, PLAYER_BULLETS.SIZE, PLAYER_BULLETS.SIZE);
  }
};
