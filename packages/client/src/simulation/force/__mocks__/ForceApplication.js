let sequence = 0;

export default class StubbedForceApplication {
  constructor({ elementIds, xComponent, yComponent }) {
    this.id = ++sequence;
    this.elementIds = elementIds;
    this.xComponent = xComponent;
    this.yComponent = yComponent;
  }

  getAffectedElementIds(simulation) {
    return this.elementIds;
  }

  getXComponent() {
    return this.xComponent;
  }

  getYComponent() {
    return this.yComponent;
  }
}
