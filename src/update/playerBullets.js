import { HEIGHT, PLAYER_BULLETS } from '../config';

export const initializePlayerBullets = () => {
  return [];
};

export const updatePlayerBullets = (delta, state) => {
  const sec = delta * 0.001;
  const baseMoveInPixels = PLAYER_BULLETS.SPEED * sec;
  const HALF_SIZE = Math.floor(PLAYER_BULLETS.SIZE / 2);
};
