let sequence = 0;

export default class MockForceDefinition {
  constructor() {
    this.id = (++sequence).toString();
  }
}
