import { makeInitialState } from '../utils/initialState';
import { updateStars, initializeStars } from './updateStars';
import { TICK_LENGTH, MSG } from '../config';

// initialize state
const state = makeInitialState();

self.onmessage = (event) => {
  if (event.data.cmd === MSG.START) {
    // state initializers
    state.stars = initializeStars();

    // updates
    setInterval(() => {
      updateStars(TICK_LENGTH, state);

      // post update
      postMessage({ cmd: MSG.STATE_UPDATE, state });
    }, TICK_LENGTH);
  }
};
