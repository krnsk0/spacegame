import { updateStars, initializeStars } from './updateStars';
import { TICK_LENGTH, MSG } from '../config';

// initialize state
const state = {
  stars: initializeStars(),
};

self.onmessage = (event) => {
  if (event.data.cmd === MSG.START) {
    setInterval(() => {
      updateStars(TICK_LENGTH, state);
      postMessage({ cmd: MSG.STATE_UPDATE, state });
    }, TICK_LENGTH);
  }
};
