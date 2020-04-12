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

const STAR_SIZE = 5; // pixels
const STAR_STEP = 5; // pixels
const STAR_CHANCE = 0.5; // 0 to 1
const BASE_STAR_INTENSITY = 0.7; // 0 to 1

const loop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  // render stars
  state.stars.forEach((star) => {
    ctx.fillStyle = `hsla(0, 0%, 100%, ${BASE_STAR_INTENSITY * star.speed})`;
    ctx.fillRect(star.x, star.y, STAR_SIZE, STAR_SIZE);

    ctx.fillStyle = `hsla(0, 0%, 75%, ${BASE_STAR_INTENSITY * star.speed})`;
    ctx.fillRect(star.x, star.y - STAR_SIZE, STAR_SIZE, STAR_SIZE);

    ctx.fillStyle = `hsla(0, 0%, 25%, ${BASE_STAR_INTENSITY * star.speed})`;
    ctx.fillRect(star.x, star.y - 2 * STAR_SIZE, STAR_SIZE, STAR_SIZE);
  });

  const newStars = [];

  // update stars
  state.stars.forEach((star) => {
    if (star.y <= height) {
      newStars.push({
        x: star.x,
        y: star.y + Math.floor(star.speed * STAR_STEP),
        speed: star.speed,
      });
    }
  });

  // make new stars
  const chance = Math.random();
  if (chance < STAR_CHANCE) {
    newStars.push({
      x: Math.floor(Math.random() * width),
      y: 0,
      speed: 0.5 + Math.random() * 0.5,
    });
  }

  state.stars = newStars;

  requestAnimationFrame(loop);
};

loop();
