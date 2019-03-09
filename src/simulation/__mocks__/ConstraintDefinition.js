let sequence = 0;

export default class MockConstraintDefinition {
  constructor() {
    this.id = (++sequence).toString();
  }
}
