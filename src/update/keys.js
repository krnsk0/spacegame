import { KEYS } from '../config';

export const initializeKeys = () => {
  return {
    [KEYS.UP]: false,
    [KEYS.DOWN]: false,
    [KEYS.LEFT]: false,
    [KEYS.RIGHT]: false,
    [KEYS.Z]: false,
  };
};

export const keysReducer = (state, action) => {
  state.keys[action.keyConstant] = action.keyState;
};
