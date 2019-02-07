export default class MockShape {
  constructor(opts) {
    Object.assign(this, {
      getBoundingRadius: jest.fn(),
      getCenter: jest.fn(),
      computeRayIntersection: jest.fn(),
      setCenterX: jest.fn(),
      setCenterY: jest.fn(),
    }, opts);
  }
}
