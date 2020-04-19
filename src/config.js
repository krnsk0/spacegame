export const WIDTH = 310;
export const HEIGHT = 640;
export const TICK_LENGTH = 10; // in MS

export const MSG = {
  START: 'START',
  STATE_UPDATE: 'STATE_UPDATE',
  KEY_PRESS: 'KEY_PRESS',
};

export const DIRS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export const STAR = {
  SIZE: 4, // pixels
  SPEED: 500, // pixels/sec
  NUM: 100,
  BASE_INTENSITY: 0.5, // 0 to 1
};

export const PLAYER = {
  SIZE: 10, // pixels
  SPEED: 200, // pixels / sec
  ACCELERATION: 100, // pixels / sec
  INERTIA: 50, // pixels / sec
};
