import { HEIGHT, WIDTH, PLAYER_SIZE } from '../config';

const MOVE_PLAYER = 'MOVE_PLAYER';

export const playerTick = (delta) => {
  return (dispatch, getState) => {
    const { player } = getState();
  };
};

export const movePlayer = ({ dx, dy }) => ({
  type: MOVE_PLAYER,
  dx,
  dy,
});

const initialState = {
  x: Math.floor(WIDTH / 2 - PLAYER_SIZE / 2),
  y: Math.floor(HEIGHT - PLAYER_SIZE * 2),
};

export const playerReducer = (state = initialState, action) => {
  const cases = {
    [MOVE_PLAYER]: () => {
      return {
        x: state.x + action.dx,
        y: state.y + action.dy,
      };
    },
  };

  if (cases[action.type]) return cases[action.type]();
  return state;
};
