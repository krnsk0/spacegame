import { WIDTH, HEIGHT, STAR_SPEED, STAR_SIZE, STAR_CHANCE } from '../config';

export const updateStars = (delta, state) => {
  const sec = delta * 0.001;
  const baseMoveInPixels = STAR_SPEED * sec;

  const newStars = [];

  // update stars
  state.stars.forEach((star) => {
    if (star.y <= HEIGHT) {
      star.y = star.y + Math.floor(baseMoveInPixels * star.distance);
      newStars.push(star);
    }
  });

  // add new stars
  const chance = Math.random();
  if (chance < STAR_CHANCE) {
    newStars.push({
      x: Math.floor(Math.random() * WIDTH),
      y: 0 - STAR_SIZE,
      distance: 0.5 + Math.random() * 0.5,
    });
  }

  state.stars = newStars;
};
