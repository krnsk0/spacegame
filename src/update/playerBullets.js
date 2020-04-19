import { HEIGHT, PLAYER_BULLETS, KEYS } from '../config';

const bulletObjectPool = Array.from(
  { length: PLAYER_BULLETS.MAX_BULLETS },
  () => {
    return {
      x: 0,
      y: 0,
    };
  }
);

export const initializePlayerBullets = () => {
  return {
    cooldown: 0,
    bullets: [],
  };
};

export const updatePlayerBullets = (delta, state) => {
  const sec = delta * 0.001;
  const baseMoveInPixels = PLAYER_BULLETS.SPEED * sec;
  const HALF_SIZE = Math.floor(PLAYER_BULLETS.SIZE / 2);

  // if cooldown is active, increment
  if (state.playerBullets.cooldown > 0) {
    state.playerBullets.cooldown += delta;
  }

  // reset cooldown
  if (state.playerBullets.cooldown >= PLAYER_BULLETS.COOLDOWN) {
    state.playerBullets.cooldown = 0;
  }

  // shoot if cooldown is at zero and key is down
  if (
    state.playerBullets.cooldown === 0 &&
    bulletObjectPool.length &&
    state.keys[KEYS.Z]
  ) {
    const bullet = bulletObjectPool.pop();
    bullet.x = state.player.x;
    bullet.y = state.player.y;
    state.playerBullets.bullets.push(bullet);
    // kick off cooldown
    state.playerBullets.cooldown += delta;
  }

  // move bullets
  for (let i = 0; i < state.playerBullets.bullets.length; i += 1) {
    const bullet = state.playerBullets.bullets[i];
    bullet.y -= baseMoveInPixels;
  }

  // check for collision with top and destroy
  state.playerBullets.bullets = state.playerBullets.bullets.reduce(
    (output, bullet) => {
      if (bullet.y <= 0 - HALF_SIZE) {
        bulletObjectPool.push(bullet);
      } else {
        output.push(bullet);
      }
      return output;
    },
    []
  );
};
