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

const loop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);

  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, 10, 10);

  requestAnimationFrame(loop);
};

loop();
