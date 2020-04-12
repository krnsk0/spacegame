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

// draw
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);

const state = { stars: [] };

const loop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  // render stars
  state.stars.forEach((star) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(star.x, star.y, 5, 5);
  });

  const newStars = [];

  // update stars
  state.stars.forEach((star) => {
    if (star.y <= height) {
      newStars.push({ x: star.x, y: star.y + 5 });
    }
  });

  // make new stars
  const chance = Math.random();
  if (chance > 0.95) {
    newStars.push({ x: Math.floor(Math.random() * width), y: 0 });
  }

  state.stars = newStars;

  requestAnimationFrame(loop);
};

loop();
