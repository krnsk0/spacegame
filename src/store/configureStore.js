import { starsReducer } from './starsModule';

const configureStore = (rootReducer) => {
  let state = rootReducer({}, '@@GET_INITIAL_STATE');

  const store = {
    getState() {
      return state;
    },
    dispatch(actionOrThunk) {
      if (typeof actionOrThunk === 'function') {
        actionOrThunk(this.dispatch, this.getState);
      } else if (typeof actionOrThunk === 'object') {
        state = rootReducer(state, actionOrThunk);
      }
    },
  };

  return store;
};

const rootReducer = (state, action) => ({
  stars: starsReducer(state.stars, action),
});

export const store = configureStore(rootReducer);
