import { HEIGHT, WIDTH, STAR_STEP, STAR_CHANCE } from '../config';

const ADD_STAR = 'ADD_STAR';
const REMOVE_STAR = 'REMOVE_STAR';
const MOVE_STAR = 'MOVE_STAR';

export const starsTick = () => {
  return (dispatch, getState) => {
    const { stars } = getState();

    // move stars
    Object.entries(stars).forEach(([id, { x, y, distance }]) => {
      if (y <= HEIGHT) {
        dispatch(moveStar({ id, x, y: y + Math.floor(distance * STAR_STEP) }));
      }
    });

    // add new stars
    const chance = Math.random();
    if (chance < STAR_CHANCE) {
      dispatch(
        addStar({
          x: Math.floor(Math.random() * WIDTH),
          y: 0,
          distance: 0.5 + Math.random() * 0.5,
        })
      );
    }
  };
  // update stars
  // state.stars.forEach((star) => {
  //   if (star.y <= height) {
  //     newStars.push({
  //       x: star.x,
  //       y: star.y + Math.floor(star.speed * STAR_STEP),
  //       speed: star.speed,
  //     });
  //   }
  // });
  // make new stars
  // const chance = Math.random();
  // if (chance < STAR_CHANCE) {
  //   newStars.push({
  //     x: Math.floor(Math.random() * width),
  //     y: 0,
  //     speed: 0.5 + Math.random() * 0.5,
  //   });
  // }
};

const addStar = ({ id, x, y, distance }) => ({
  type: ADD_STAR,
  id,
  x,
  y,
  distance,
});

const removeStar = ({ id }) => ({
  type: ADD_STAR,
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
      const newState = { ...state };
      delete newState[id];
      return newState;
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
