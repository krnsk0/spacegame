import { WIDTH, HEIGHT, STAR_SPEED, STAR_SIZE, NUM_STARS } from '../config';

const randomStarX = () => Math.floor(Math.random() * WIDTH);
const randomStarY = () => Math.floor(Math.random() * HEIGHT) - STAR_SIZE;
const randomStarDistance = () => 0.5 + Math.random() * 0.5;

export const initializeStars = () => {
  return Array.from({ length: NUM_STARS }, () => {
    return {
      x: randomStarX(),
      y: randomStarY(),
      distance: randomStarDistance(),
    };
  });
};

export const updateStars = (delta, state) => {
  const sec = delta * 0.001;
  const baseMoveInPixels = STAR_SPEED * sec;

  // update stars
  // for loop appears to be the most performant here
  for (let i = 0; i < NUM_STARS; i += 1) {
    const star = state.stars[i];
    // move down the screen
    if (star.y <= HEIGHT + STAR_SIZE) {
      star.y = star.y + Math.floor(baseMoveInPixels * star.distance);
    }
    // reset to top with random x and distance
    else {
      star.x = randomStarX();
      star.y = 0;
      star.distance = randomStarDistance();
    }
  }
};
