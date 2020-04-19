import { WIDTH, HEIGHT, PLAYER, KEYS } from '../config';

export const initializePlayer = () => {
  return {
    x: Math.floor(WIDTH / 2) - Math.floor(PLAYER.SIZE / 2),
    y: HEIGHT - 4 * PLAYER.SIZE,
    keys: {
      [KEYS.UP]: false,
      [KEYS.DOWN]: false,
      [KEYS.LEFT]: false,
      [KEYS.RIGHT]: false,
      [KEYS.Z]: false,
    },
  };
};

export const updatePlayer = (delta, state) => {
  const sec = delta * 0.001;
  const baseMoveInPixels = PLAYER.SPEED * sec;
  const HALF_SIZE = Math.floor(PLAYER.SIZE / 2);

  // compute deltas
  let dx = 0;
  if (state.player.keys.LEFT) dx -= baseMoveInPixels;
  if (state.player.keys.RIGHT) dx += baseMoveInPixels;
  let dy = 0;
  if (state.player.keys.UP) dy -= baseMoveInPixels;
  if (state.player.keys.DOWN) dy += baseMoveInPixels;

  // attempt move
  state.player.x = state.player.x + dx;
  state.player.y = state.player.y + dy;

  // wall collision check
  if (state.player.x + HALF_SIZE > WIDTH) state.player.x = WIDTH - HALF_SIZE;
  if (state.player.x - HALF_SIZE < 0) state.player.x = HALF_SIZE;
  if (state.player.y + HALF_SIZE > HEIGHT) state.player.y = HEIGHT - HALF_SIZE;
  if (state.player.y - HALF_SIZE < 0) state.player.y = HALF_SIZE;
};
