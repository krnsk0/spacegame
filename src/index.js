import { store } from './store/configureStore';
import { initializeCanvas } from './render/initializeCanvas';
import { setUpKeyListeners } from './utils/keypress';
import { clearCanvas } from './render/clearCanvas';
import { renderStars } from './render/renderStars';
import { renderPlayer } from './render/renderPlayer';
import { starsTick } from './store/starsModule';
import { playerTick } from './store/playerModule';

// setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
initializeCanvas(canvas, ctx);

// initialize controls
setUpKeyListeners(store.dispatch);

// Kick off gameloop
let lastTimestamp = 0;
const loop = (timestamp) => {
  const delta = timestamp && lastTimestamp ? timestamp - lastTimestamp : 0;
  lastTimestamp = timestamp;
  clearCanvas(ctx);
  renderStars(ctx, store.getState());
  renderPlayer(ctx, store.getState());
  store.dispatch(starsTick(delta));
  store.dispatch(playerTick(delta));
  requestAnimationFrame(loop);
};
loop();
