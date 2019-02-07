let sequence = 0;

export default class MockSimulatedEdge {
  constructor(opts) {
    Object.assign(this, {
      source: (++sequence).toString(),
      target: (++sequence).toString(),
      getDistance: jest.fn(),
    }, opts);
  }
}
