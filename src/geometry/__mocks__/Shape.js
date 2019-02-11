export default class MockShape {
  constructor(opts) {
    Object.assign(this, {
      getBoundingRadius: jest.fn().mockReturnValue(opts && opts.radius),
      getCenter: jest.fn().mockReturnValue(opts && opts.center),
      computeIntersectionWithRayFrom: jest.fn().mockReturnValue(opts && opts.intersectionPoint),
      setCenterX: jest.fn(),
      setCenterY: jest.fn(),
    }, opts);
  }
}
