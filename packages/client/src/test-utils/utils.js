import { mount } from 'enzyme';

export const point = (x, y) => ({ x, y });
export const newPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
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
  registerBoundingClientRectMock,
  unregisterBoundingClientRectMock,

  ZERO: 0,
  PI_OVER_FOUR: Math.PI / 4,
  PI_OVER_TWO: Math.PI / 2,
  THREE_PI_OVER_FOUR: 3 * Math.PI / 4,
  PI: Math.PI,
  FIVE_PI_OVER_FOUR: 5 * Math.PI/4,
  THREE_PI_OVER_TWO: 3 * Math.PI / 2,
  SEVEN_PI_OVER_FOUR: 7 * Math.PI / 4,
  TWO_PI: 2 * Math.PI,

  ROOT_TWO: Math.SQRT2,
  ROOT_TWO_OVER_TWO: Math.SQRT2 / 2,
  TWO_ROOT_TWO: 2 * Math.SQRT2,

};
