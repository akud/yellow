export default class MockSimulation {
  constructor(opts) {
    Object.assign(this, {
      onNewLayout: jest.fn().mockReturnValue(this),
      getNodePosition: jest.fn(),
      getEdgePosition: jest.fn(),
    }, opts);
  }
}
