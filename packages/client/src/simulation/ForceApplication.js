import utils from '../utils';

/*
 * Represents an application of a force to a group of elements
 *
 */
export default class ForceApplication {
  constructor({ elementIds, angle, strength=1.0 }) {
    this.elementIds = utils.requireArray(elementIds);
    this.angle = utils.requireBetween(angle, 0, 2 * Math.PI);
    this.strength = utils.requireNonNegative(strength);
  }

  getAffectedElementIds() {
    return this.elementIds;
  }

  getXComponent() {
    return this.strength * Math.cos(this.angle);
  }

  getYComponent() {
    return -1 * this.strength * Math.sin(this.angle);
  }
}
