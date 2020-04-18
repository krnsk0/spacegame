import { initializeCanvas } from './render/initializeCanvas';
import { clearCanvas } from './render/clearCanvas';
import { renderStars } from './render/renderStars';
import { updateStars, initializeStars } from './update/updateStars';

// setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
initializeCanvas(canvas, ctx);

// initialize state
const state = {
  stars: initializeStars(),
};

// Kick off gameloop
let lastTimestamp = 0;
const loop = (timestamp) => {
  const delta = timestamp && lastTimestamp ? timestamp - lastTimestamp : 0;
  lastTimestamp = timestamp;

  // update phase
  updateStars(delta, state);

  // render phase
  clearCanvas(ctx);
  renderStars(ctx, state);

  requestAnimationFrame(loop);
};
loop();
