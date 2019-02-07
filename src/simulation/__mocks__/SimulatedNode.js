let sequence = 0;

export default class MockSimulatedNode {
  constructor(opts) {
    Object.assign(this, {
      id: (++sequence).toString(),
      setX: jest.fn(),
      setY: jest.fn(),
      getCenter: jest.fn().mockReturnValue(opts && opts.center),
      getCollisionRadius: jest.fn().mockReturnValue(opts && opts.radius),
      computeEdgeIntersection: jest.fn().mockReturnValue(opts && opts.intersectionPoint)
    }, opts);
  }

  set x(x) {
    this.setX(x);
  }

  set y(y) {
    this.setY(y);
  }
}
