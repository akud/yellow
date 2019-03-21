let sequence = 0;

export default class MockShapeDefinition {
  constructor(opts) {
    Object.assign(this, {
      id: ++sequence,
      getBoundingRadius: jest.fn().mockReturnValue((opts && opts.radius) || sequence),
      computeIntersectionWithRay: jest.fn().mockReturnValue((opts && opts.intersectionPoint) || newPosition()),
    }, opts);
  }
}
