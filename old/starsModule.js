import { HEIGHT, WIDTH, STAR_SPEED, STAR_CHANCE } from '../config';
import { uuid } from '../utils/uuid';

const ADD_STAR = 'ADD_STAR';
const REMOVE_STAR = 'REMOVE_STAR';
const MOVE_STAR = 'MOVE_STAR';

export const starsTick = (delta) => {
  return (dispatch, getState) => {
    const { stars } = getState();
    const sec = delta * 0.001;
    const baseMoveInPixels = STAR_SPEED * sec;

    Object.entries(stars).forEach(([id, { y, distance }]) => {
      // move stars
      if (y <= HEIGHT) {
        dispatch(
          moveStar({
            id,
            dx: 0,
            dy: Math.floor(baseMoveInPixels * distance),
          })
        );
      }

      // remove stars
      if (y > HEIGHT) {
        dispatch(removeStar({ id }));
      }
    });

    // add new stars
    const chance = Math.random();
    if (chance < STAR_CHANCE) {
      dispatch(
        addStar({
          id: uuid(),
          x: Math.floor(Math.random() * WIDTH),
          y: 0,
          distance: 0.5 + Math.random() * 0.5,
        })
      );
    }
  };
};

const addStar = ({ id, x, y, distance }) => ({
  type: ADD_STAR,
  id,
  x,
  y,
  distance,
});

const removeStar = ({ id }) => ({
  type: REMOVE_STAR,
  id,
});

const moveStar = ({ id, dx, dy }) => ({
  type: MOVE_STAR,
  id,
  dx,
  dy,
});

export const starsReducer = (state = {}, action) => {
  const cases = {
    [ADD_STAR]: () => {
      const { id, x, y, distance } = action;
      return {
        ...state,
        [id]: { x, y, distance },
      };
    },
    [REMOVE_STAR]: () => {
      const { id } = action;
      delete state[id];
      return { ...state };
    },
    [MOVE_STAR]: () => {
      const { id, dx, dy } = action;
      return {
        ...state,
        [id]: {
          x: state[id].x + dx,
          y: state[id].y + dy,
          distance: state[id].distance,
        },
      };
    },
  };

  if (cases[action.type]) return cases[action.type]();
  return state;
};
