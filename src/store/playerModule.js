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
      player: { dx, dy, keys },
    } = getState();

    const sec = delta * 0.001;
    const basePixelsToMove = PLAYER_BASE_SPEED * sec;
    dispatch(movePlayerByDelta({ basePixelsToMove }));

    // const newYVel = Math.max(
    //   yVel -
    //     PLAYER_INERTIA +
    //     (keys[DIRS.UP] ? -PLAYER_ACCELERATION : 0) +
    //     (keys[DIRS.DOWN] ? PLAYER_ACCELERATION : 0),
    //   0
    // );
    let ddx = 0;
    let ddy = 0;
    if (dx > 0) ddx = -PLAYER_INERTIA;
    if (dx < 0) ddx = -PLAYER_INERTIA;
    if (dy > 0) ddy = -PLAYER_INERTIA;
    if (dy < 0) ddy = -PLAYER_INERTIA;
    dispatch(updatePlayerVelocity({ ddx, ddy }));
  };
};

export const movePlayerByDelta = ({ basePixelsToMove }) => ({
  type: MOVE_PLAYER,
  basePixelsToMove,
});

export const updatePlayerVelocity = ({ ddx, ddy }) => ({
  type: UPDATE_PLAYER_VELOCITY,
  ddx,
  ddy,
});

export const updateKey = ({ direction, keyState }) => ({
  type: UPDATE_KEY_STATE,
  direction,
  keyState,
});

const initialState = {
  x: Math.floor(WIDTH / 2 - PLAYER_SIZE / 2),
  y: Math.floor(HEIGHT - PLAYER_SIZE * 2),
  dx: 0, // pixels/sec, -1 to 1
  dy: 0, // pixels/sec, -1 to 1
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
        x: state.x + state.dx * action.basePixelsToMove,
        y: state.y + state.dy * action.basePixelsToMove,
      };
    },
    [UPDATE_PLAYER_VELOCITY]: () => {
      return {
        ...state,
        dx: state.dx + action.ddx,
        dy: state.dy + action.ddy,
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
