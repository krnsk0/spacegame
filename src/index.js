import { store } from './state/configureStore';
import { initializeCanvas } from './render/initializeCanvas';
import { clearCanvas } from './render/clearCanvas';
import { renderStars } from './render/renderStars';
import { starsTick } from './state/starsModule';

// setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
initializeCanvas(canvas, ctx);

// clear out this stuff
const state = { stars: [] };

const loop = () => {
  clearCanvas(ctx);
  renderStars(ctx, state);

  starsTick();

  requestAnimationFrame(loop);
};

loop();
