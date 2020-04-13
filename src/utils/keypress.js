import { DIRS } from '../config';
import { updateKey } from '../store/playerModule';

export const setUpKeyListeners = (dispatch) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode >= 37 && evt.keyCode <= 40) {
      evt.preventDefault();
      if (evt.repeat === false) {
        if (evt.keyCode === 38) {
          dispatch(updateKey({ direction: DIRS.UP, keyState: true }));
        } else if (evt.keyCode === 40) {
          dispatch(updateKey({ direction: DIRS.DOWN, keyState: true }));
        } else if (evt.keyCode === 37) {
          dispatch(updateKey({ direction: DIRS.LEFT, keyState: true }));
        } else if (evt.keyCode === 39) {
          dispatch(updateKey({ direction: DIRS.RIGHT, keyState: true }));
        }
      }
    }
  });

  document.addEventListener('keyup', (evt) => {
    if (evt.keyCode >= 37 && evt.keyCode <= 40) {
      evt.preventDefault();
      if (evt.keyCode === 38) {
        dispatch(updateKey({ direction: DIRS.UP, keyState: false }));
      } else if (evt.keyCode === 40) {
        dispatch(updateKey({ direction: DIRS.DOWN, keyState: false }));
      } else if (evt.keyCode === 37) {
        dispatch(updateKey({ direction: DIRS.LEFT, keyState: false }));
      } else if (evt.keyCode === 39) {
        dispatch(updateKey({ direction: DIRS.RIGHT, keyState: false }));
      }
    }
  });
};
