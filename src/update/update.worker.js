import { makeInitialState } from '../utils/initialState';
import { updateStars, initializeStars } from './stars';
import { updatePlayer, initializePlayer } from './player';
import { updatePlayerBullets, initializePlayerBullets } from './playerBullets';
import { initializeKeys, keysReducer } from './keys';
import { TICK_LENGTH, MSG } from '../config';

// initialize state
const state = makeInitialState();
state.stars = initializeStars();
state.player = initializePlayer();
state.keys = initializeKeys();
state.playerBullets = initializePlayerBullets();

self.onmessage = (event) => {
  const { data } = event;

  // handle start event
  if (data.cmd === MSG.START) {
    // updates
    setInterval(() => {
      updateStars(TICK_LENGTH, state);
      updatePlayer(TICK_LENGTH, state);
      updatePlayerBullets(TICK_LENGTH, state);

      // post update
      postMessage({ cmd: MSG.STATE_UPDATE, state });
    }, TICK_LENGTH);
  }
  // all other events target mutating reducers
  else {
    if (data.cmd === MSG.KEY_PRESS) keysReducer(state, data);
  }
};
