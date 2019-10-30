import utils from '../utils';

export class StateChange {
  constructor(elementIds) {
    this.elementIds = utils.requireArray(elementIds);
  }

  getAffectedElementIds() {
    return this.elementIds;
  }

  apply(element) {
    throw new Error('Subclasses must implement `apply`');
  }
}


/*
 * Represents an application of a force to a group of elements
 *
 */
export class ForceApplication extends StateChange {
  constructor({ elementIds, angle, strength=1.0 }) {
    super(elementIds);
    this.angle = utils.requireBetween(angle, 0, 2 * Math.PI);
    this.strength = utils.requireNonNegative(strength);
  }

  apply(alpha, element) {
    const xComponent = this.strength * Math.cos(this.angle);
    const yComponent = this.strength * Math.sin(this.angle);
    element.vx += alpha * xComponent;
    element.vy += alpha * yComponent;
  }
}

export default {
  StateChange,
  ForceApplication,
}
