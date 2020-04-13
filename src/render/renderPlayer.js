import { PLAYER_SIZE } from '../config';
export const renderPlayer = (ctx, { player: { x, y } }) => {
  ctx.fillStyle = `hsla(0, 0%, 100%, 1)`;
  ctx.fillRect(x, y, PLAYER_SIZE, PLAYER_SIZE);
};
