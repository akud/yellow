let id = 0;

export default class MockShapeDefinition {
  constructor(opts) {
    Object.assign(this, {
      id: ++id,
      getBoundingRadius: jest.fn().mockReturnValue(opts && opts.radius),
      computeIntersectionWithRay: jest.fn().mockReturnValue(opts && opts.intersectionPoint),
    }, opts);
  }
}
