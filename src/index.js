import { initializeCanvas } from './render/initialize';
import { makeInitialState } from './utils/initialState';
import { setUpKeyListeners } from './utils/keypress';
import { render } from './render/render';

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

// setup key events
setUpKeyListeners(worker);

// Kick off gameloop
const loop = () => {
  render(ctx, state);
  requestAnimationFrame(loop);
};
loop();
