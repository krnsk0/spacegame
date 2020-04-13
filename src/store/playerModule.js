import { HEIGHT, WIDTH, PLAYER_SIZE, PLAYER_SPEED, DIRS } from '../config';

const MOVE_PLAYER = 'MOVE_PLAYER';
const UPDATE_KEY_STATE = 'UPDATE_KEY_STATE';

export const playerTick = (delta) => {
  return (dispatch, getState) => {
    const {
      player: { keys },
    } = getState();

    const sec = delta * 0.001;
    const baseMoveInPixels = PLAYER_SPEED * sec;
    const dx =
      (keys[DIRS.LEFT] ? -baseMoveInPixels : 0) +
      (keys[DIRS.RIGHT] ? baseMoveInPixels : 0);
    const dy =
      (keys[DIRS.UP] ? -baseMoveInPixels : 0) +
      (keys[DIRS.DOWN] ? baseMoveInPixels : 0);

    dispatch(movePlayer({ dx, dy }));
  };
};

export const movePlayer = ({ dx, dy }) => ({
  type: MOVE_PLAYER,
  dx,
  dy,
});

export const updateKey = ({ direction, keyState }) => ({
  type: UPDATE_KEY_STATE,
  direction,
  keyState,
});

const initialState = {
  x: Math.floor(WIDTH / 2 - PLAYER_SIZE / 2),
  y: Math.floor(HEIGHT - PLAYER_SIZE * 2),
  keys: {
    [DIRS.UP]: false,
    [DIRS.DOWN]: false,
    [DIRS.LEFT]: false,
    [DIRS.RIGHT]: false,
  },
};

export const playerReducer = (state = initialState, action) => {
  const cases = {
    [MOVE_PLAYER]: () => {
      return {
        ...state,
        x: state.x + action.dx,
        y: state.y + action.dy,
      };
    },
    [UPDATE_KEY_STATE]: () => {
      return {
        ...state,
        keys: {
          ...state.keys,
          [action.direction]: action.keyState,
        },
      };
    },
  };

  if (cases[action.type]) return cases[action.type]();
  return state;
};
