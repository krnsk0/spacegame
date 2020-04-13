import {
  HEIGHT,
  WIDTH,
  PLAYER_SIZE,
  PLAYER_BASE_SPEED,
  DIRS,
  PLAYER_INERTIA,
  PLAYER_ACCELERATION,
} from '../config';

const MOVE_PLAYER = 'MOVE_PLAYER';
const UPDATE_KEY_STATE = 'UPDATE_KEY_STATE';
const UPDATE_PLAYER_VELOCITY = 'UPDATE_PLAYER_VELOCITY';

export const playerTick = (delta) => {
  return (dispatch, getState) => {
    const {
      player: { xVel, yVel, keys },
    } = getState();

    // const sec = delta * 0.001;
    // const baseMoveInPixels = PLAYER_BASE_SPEED * sec;

    const dx = xVel;
    const dy = yVel;
    dispatch(movePlayer({ dx, dy }));

    const newXVel = xVel;
    // xVel -
    // PLAYER_INERTIA +
    // (keys[DIRS.LEFT] ? -PLAYER_ACCELERATION : 0) +
    // (keys[DIRS.RIGHT] ? PLAYER_ACCELERATION : 0);
    const newYVel = yVel;
    // yVel -
    // PLAYER_INERTIA +
    // (keys[DIRS.UP] ? -PLAYER_ACCELERATION : 0) +
    // (keys[DIRS.DOWN] ? PLAYER_ACCELERATION : 0);
    dispatch(updatePlayerVelocity({ xVel: newXVel, yVel: newYVel }));
  };
};

export const movePlayer = ({ dx, dy }) => ({
  type: MOVE_PLAYER,
  dx,
  dy,
});

export const updatePlayerVelocity = ({ xVel, yVel }) => ({
  type: UPDATE_PLAYER_VELOCITY,
  xVel,
  yVel,
});

export const updateKey = ({ direction, keyState }) => ({
  type: UPDATE_KEY_STATE,
  direction,
  keyState,
});

const initialState = {
  x: Math.floor(WIDTH / 2 - PLAYER_SIZE / 2),
  y: Math.floor(HEIGHT - PLAYER_SIZE * 2),
  xVel: 0,
  yVel: 0,
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
    [UPDATE_PLAYER_VELOCITY]: () => {
      return {
        ...state,
        xVel: action.xVel,
        yVel: action.yVel,
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
