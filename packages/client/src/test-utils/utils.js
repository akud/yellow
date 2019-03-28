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
};
