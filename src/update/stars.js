import { WIDTH, HEIGHT, STAR } from '../config';

const randomStarX = () => Math.floor(Math.random() * WIDTH);
const randomStarY = () => Math.floor(Math.random() * HEIGHT) - STAR.SIZE;
const randomStarDistance = () => Math.floor(Math.random() * 80);

export const initializeStars = () => {
  return Array.from({ length: STAR.NUM }, () => {
    return {
      x: randomStarX(),
      y: randomStarY(),
      distance: randomStarDistance(),
    };
  });
};

export const updateStars = (delta, state) => {
  const sec = delta * 0.001;
  const baseMoveInPixels = STAR.SPEED * sec;

  // update stars
  // for loop appears to be the most performant here
  for (let i = 0; i < STAR.NUM; i += 1) {
    const star = state.stars[i];

    // move down the screen
    if (star.y <= HEIGHT + STAR.SIZE) {
      star.y =
        star.y + Math.floor(baseMoveInPixels * ((star.distance + 20) / 100));
    }
    // reset to top with random x and distance
    else {
      star.x = randomStarX();
      star.y = 0;
      star.distance = randomStarDistance();
    }
  }
};
