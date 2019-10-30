
let sequence = 0;


export class StateChange {
  constructor(elementIds) {
    this.id = ++sequence;
    this.elementIds = elementIds;
    this.apply = jest.fn();
  }

  getAffectedElementIds() {
    return this.elementIds;
  }
}

export class ForceApplication extends StateChange {
  constructor({ elementIds, angle, strength=1.0 }) {
    super(elementIds);
  }
}

export default {
  StateChange,
  ForceApplication,
}
