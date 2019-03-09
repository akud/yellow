export class MockSimulation {
  constructor(config) {
    this.config = config;
  }
}
export const getElementData = jest.fn();

export default jest.fn().mockImplementation((opts) => ({ getElementData }));
