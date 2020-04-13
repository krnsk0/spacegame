import { store } from './store/configureStore';
import { initializeCanvas } from './render/initializeCanvas';
import { clearCanvas } from './render/clearCanvas';
import { renderStars } from './render/renderStars';
import { renderPlayer } from './render/renderPlayer';
import { starsTick } from './store/starsModule';

// setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
initializeCanvas(canvas, ctx);

// clear out this stuff
let lastTimestamp = 0;

const loop = (timestamp) => {
  const delta = timestamp && lastTimestamp ? timestamp - lastTimestamp : 0;
  lastTimestamp = timestamp;
  clearCanvas(ctx);
  renderStars(ctx, store.getState());
  renderPlayer(ctx, store.getState());
  store.dispatch(starsTick(delta));
  requestAnimationFrame(loop);
};

loop();
