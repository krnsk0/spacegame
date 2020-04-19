export const makeInitialState = () => {
  return {
    stars: [],
    player: {},
    keys: {},
    playerBullets: {
      timeout: 0,
      bullets: [],
    },
  };
};
