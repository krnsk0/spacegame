import { PLAYER } from '../config';

export const renderPlayer = (ctx, state) => {
  ctx.fillStyle = `hsla(0, 0%, 100%, 1)`;

  const { x, y } = state.player;
  const HALF = Math.floor(PLAYER.SIZE / 2);

  ctx.fillRect(x - HALF, y - HALF, PLAYER.SIZE, PLAYER.SIZE);
};
