export const slope = jest.fn();
export const distance = jest.fn();
export const approximatelyEqual = jest.fn();
export const computeHorizontalIntersectionAngle = jest.fn();
export const isOriented = jest.fn();
export const radiansToDegrees = jest.fn();
export const addVectors = jest.fn();
export const mockReset = () => {
  slope.mockReset();
  distance.mockReset();
  approximatelyEqual.mockReset();
  computeHorizontalIntersectionAngle.mockReset();
  radiansToDegrees.mockReset();
  addVectors.mockReset();
  isOriented.mockReset();
};

export default {
  slope,
  distance,
  approximatelyEqual,
  computeHorizontalIntersectionAngle,
  isOriented,
  radiansToDegrees,
  addVectors,
  mockReset,
};
