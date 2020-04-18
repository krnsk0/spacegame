import { initializeCanvas } from './render/initializeCanvas';
import { makeInitialState } from './utils/initialState';
import { clearCanvas } from './render/clearCanvas';
import { renderStars } from './render/renderStars';
import Worker from './update/update.worker.js';
import { MSG } from './config';

// setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
initializeCanvas(canvas, ctx);

// state
let state = makeInitialState();

// set up worker
const worker = new Worker();
worker.postMessage({ cmd: MSG.START });
worker.onmessage = (event) => {
  if (event.data.cmd === MSG.STATE_UPDATE) state = event.data.state;
};

// Kick off gameloop
const loop = () => {
  // render phase
  clearCanvas(ctx);
  renderStars(ctx, state);

  requestAnimationFrame(loop);
};
loop();
