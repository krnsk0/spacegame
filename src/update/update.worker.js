import { makeInitialState } from '../utils/initialState';
import { updateStars, initializeStars } from './stars';
import { updatePlayer, initializePlayer } from './player';
import { TICK_LENGTH, MSG } from '../config';

// initialize state
const state = makeInitialState();

self.onmessage = (event) => {
  const { data } = event;

  if (data.cmd === MSG.START) {
    // state initializers
    state.stars = initializeStars();
    state.player = initializePlayer();

    // updates
    setInterval(() => {
      updateStars(TICK_LENGTH, state);
      updatePlayer(TICK_LENGTH, state);

      // post update
      postMessage({ cmd: MSG.STATE_UPDATE, state });
    }, TICK_LENGTH);
  }

  if (data.cmd === MSG.KEY_PRESS) {
    state.player.keys[data.keyConstant] = data.keyState;
  }
};
