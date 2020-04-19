import { DIRS, MSG } from '../config';

export const setUpKeyListeners = (worker) => {
  const updateKey = (data) => {
    worker.postMessage(data);
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode >= 37 && evt.keyCode <= 40) {
      evt.preventDefault();
      if (evt.repeat === false) {
        if (evt.keyCode === 38) {
          updateKey({ cmd: MSG.KEY_PRESS, direction: DIRS.UP, keyState: true });
        } else if (evt.keyCode === 40) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            direction: DIRS.DOWN,
            keyState: true,
          });
        } else if (evt.keyCode === 37) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            direction: DIRS.LEFT,
            keyState: true,
          });
        } else if (evt.keyCode === 39) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            direction: DIRS.RIGHT,
            keyState: true,
          });
        }
      }
    }
  });

  document.addEventListener('keyup', (evt) => {
    if (evt.keyCode >= 37 && evt.keyCode <= 40) {
      evt.preventDefault();
      if (evt.keyCode === 38) {
        updateKey({ cmd: MSG.KEY_PRESS, direction: DIRS.UP, keyState: false });
      } else if (evt.keyCode === 40) {
        updateKey({
          cmd: MSG.KEY_PRESS,
          direction: DIRS.DOWN,
          keyState: false,
        });
      } else if (evt.keyCode === 37) {
        updateKey({
          cmd: MSG.KEY_PRESS,
          direction: DIRS.LEFT,
          keyState: false,
        });
      } else if (evt.keyCode === 39) {
        updateKey({
          cmd: MSG.KEY_PRESS,
          direction: DIRS.RIGHT,
          keyState: false,
        });
      }
    }
  });
};
