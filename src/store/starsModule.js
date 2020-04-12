import { HEIGHT, WIDTH, STAR_STEP, STAR_CHANCE } from '../config';
import { uuid } from '../utils/uuid';

const ADD_STAR = 'ADD_STAR';
const REMOVE_STAR = 'REMOVE_STAR';
const MOVE_STAR = 'MOVE_STAR';

export const starsTick = () => {
  return (dispatch, getState) => {
    const { stars } = getState();

    // parse stars
    Object.entries(stars).forEach(([id, { x, y, distance }]) => {
      // move stars
      if (y <= HEIGHT) {
        dispatch(moveStar({ id, x, y: y + Math.floor(distance * STAR_STEP) }));
      }

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

const moveStar = ({ id, x, y }) => ({
  type: MOVE_STAR,
  id,
  x,
  y,
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
      const { id, x, y } = action;
      return {
        ...state,
        [id]: {
          x,
          y,
          distance: state[id].distance,
        },
      };
    },
  };

  if (cases[action.type]) return cases[action.type]();
  return state;
};
