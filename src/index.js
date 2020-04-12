const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// https://devlog.disco.zone/2016/07/22/canvas-scaling/
const width = 310;
const height = 640;
const pixelRatio = window.devicePixelRatio || 1;
canvas.width = width * pixelRatio;
canvas.height = height * pixelRatio;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
canvas.style.margin = 'auto';
ctx.scale(pixelRatio, pixelRatio);
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const state = { stars: [] };

const STAR_SIZE = 5;
const STAR_STEP = 5;
const STAR_CHANCE = 0.2;

const loop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  // render stars
  state.stars.forEach((star) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(star.x, star.y, STAR_SIZE, STAR_SIZE);

    ctx.fillStyle = 'darkgrey';
    ctx.fillRect(star.x, star.y - 2 * STAR_SIZE, STAR_SIZE, STAR_SIZE);

    ctx.fillStyle = 'grey';
    ctx.fillRect(star.x, star.y - 4 * STAR_SIZE, STAR_SIZE, STAR_SIZE);
  });

  const newStars = [];

  // update stars
  state.stars.forEach((star) => {
    if (star.y <= height) {
      newStars.push({ x: star.x, y: star.y + STAR_STEP });
    }
  });

  // make new stars
  const chance = Math.random();
  if (chance < STAR_CHANCE) {
    newStars.push({ x: Math.floor(Math.random() * width), y: 0 });
  }

  state.stars = newStars;

  requestAnimationFrame(loop);
};

loop();
