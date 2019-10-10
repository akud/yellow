export const UP = Symbol('UP');
export const DOWN = Symbol('DOWN');
export const RIGHT = Symbol('RIGHT');
export const LEFT = Symbol('LEFT');

export const stringify = (dir) => {
  switch(dir) {
    case UP:
      return 'UP';
    case DOWN:
      return 'DOWN';
    case LEFT:
      return 'LEFT';
    case RIGHT:
      return 'RIGHT';
    default:
      throw new Error('unrecognized direction ' + dir);
  }
};

export default {
  UP,
  DOWN,
  RIGHT,
  LEFT,
  stringify,
};
