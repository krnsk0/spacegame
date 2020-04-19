import { KEYS, MSG } from '../config';

export const setUpKeyListeners = (worker) => {
  const updateKey = (data) => {
    worker.postMessage(data);
  };

  document.addEventListener('keydown', (evt) => {
    if ((evt.keyCode >= 37 && evt.keyCode <= 40) || evt.keyCode === 90) {
      evt.preventDefault();
      if (evt.repeat === false) {
        if (evt.keyCode === 38) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            keyConstant: KEYS.UP,
            keyState: true,
          });
        } else if (evt.keyCode === 40) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            keyConstant: KEYS.DOWN,
            keyState: true,
          });
        } else if (evt.keyCode === 37) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            keyConstant: KEYS.LEFT,
            keyState: true,
          });
        } else if (evt.keyCode === 39) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            keyConstant: KEYS.RIGHT,
            keyState: true,
          });
        } else if (evt.keyCode === 90) {
          updateKey({
            cmd: MSG.KEY_PRESS,
            keyConstant: KEYS.Z,
            keyState: true,
          });
        }
      }
    }
  });

  document.addEventListener('keyup', (evt) => {
    if ((evt.keyCode >= 37 && evt.keyCode <= 40) || evt.keyCode === 90) {
      evt.preventDefault();
      if (evt.keyCode === 38) {
        updateKey({
          cmd: MSG.KEY_PRESS,
          keyConstant: KEYS.UP,
          keyState: false,
        });
      } else if (evt.keyCode === 40) {
        updateKey({
          cmd: MSG.KEY_PRESS,
          keyConstant: KEYS.DOWN,
          keyState: false,
        });
      } else if (evt.keyCode === 37) {
        updateKey({
          cmd: MSG.KEY_PRESS,
          keyConstant: KEYS.LEFT,
          keyState: false,
        });
      } else if (evt.keyCode === 39) {
        updateKey({
          cmd: MSG.KEY_PRESS,
          keyConstant: KEYS.RIGHT,
          keyState: false,
        });
      } else if (evt.keyCode === 90) {
        updateKey({
          cmd: MSG.KEY_PRESS,
        });
      }
    }
  });
};
