export const slope = jest.fn();
export const distance = jest.fn();
export const approximatelyEqual = jest.fn();
export const computeHorizontalIntersectionAngle = jest.fn();
export const radiansToDegrees = jest.fn();
export const addVectors = jest.fn();
export const pointAwayFrom = jest.fn();
export const subtractAngles = jest.fn();
export const mockReset = () => {
  slope.mockReset();
  distance.mockReset();
  approximatelyEqual.mockReset();
  computeHorizontalIntersectionAngle.mockReset();
  radiansToDegrees.mockReset();
  addVectors.mockReset();
  pointAwayFrom.mockReset();
  subtractAngles.mockReset();
};

export default {
  slope,
  subtractAngles,
  distance,
  approximatelyEqual,
  computeHorizontalIntersectionAngle,
  radiansToDegrees,
  addVectors,
  mockReset,
  pointAwayFrom,
};
