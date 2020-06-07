import { mount } from 'enzyme';

export const point = (x, y) => ({ x, y });
export const newPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
});

export const newElementData = () => ({
  position: newPosition(),
  velocity: newPosition(),
});


let oldBoundingClientRect;

export const registerBoundingClientRectMock = () => {
  oldBoundingClientRect = Element.prototype.getBoundingClientRect;
  let mockBoundingClientRect;
  Element.prototype.getBoundingClientRect = mockBoundingClientRect = jest.fn()
    .mockReturnValue({ width: 10, height: 10 });
  return mockBoundingClientRect;
}

export const unregisterBoundingClientRectMock = () => {
  Element.prototype.getBoundingClientRect = oldBoundingClientRect;
}


export default {
  point,
  newPosition,
  newElementData,
  registerBoundingClientRectMock,
  unregisterBoundingClientRectMock,

  ZERO: 0,
  PI_OVER_SIX: Math.PI / 6,
  PI_OVER_FOUR: Math.PI / 4,
  PI_OVER_THREE: Math.PI / 3,
  PI_OVER_TWO: Math.PI / 2,
  TWO_PI_OVER_THREE: 2 * Math.PI / 3,
  THREE_PI_OVER_FOUR: 3 * Math.PI / 4,
  FIVE_PI_OVER_SIX: 5 * Math.PI / 6,
  PI: Math.PI,
  SEVEN_PI_OVER_SIX: 9 * Math.PI / 6,
  FIVE_PI_OVER_FOUR: 5 * Math.PI/4,
  FOUR_PI_OVER_THREE: 4 * Math.PI / 3,
  THREE_PI_OVER_TWO: 3 * Math.PI / 2,
  SEVEN_PI_OVER_FOUR: 7 * Math.PI / 4,
  FIVE_PI_OVER_THREE: 5 * Math.PI / 3,
  ELEVEN_PI_OVER_SIX: 11 * Math.PI / 6,
  TWO_PI: 2 * Math.PI,

  ROOT_TWO: Math.SQRT2,
  ROOT_TWO_OVER_TWO: Math.SQRT2 / 2,
  TWO_ROOT_TWO: 2 * Math.SQRT2,

  ROOT_THREE: Math.sqrt(3),

  ONE: 1,

};
