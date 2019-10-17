let sequence = 0;

export default class MockRuleDefinition {
  constructor() {
    this.id = (++sequence).toString();
  }
}
