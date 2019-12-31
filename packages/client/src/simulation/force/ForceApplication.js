import utils from '../../utils';
import ElementSelector from './ElementSelector';

/*
 * Represents an application of a force to a group of elements
 *
 */
export default class ForceApplication {
  constructor({ elements, angle, strength=1.0 }) {
    this.selectorDefinition = ElementSelector.validate(elements);
    this.angle = utils.requireBetween(angle, 0, 2 * Math.PI);
    this.strength = utils.requireNonNegative(strength);
  }

  getAffectedElementIds(simulation) {
    return ElementSelector.select(this.selectorDefinition, simulation);
  }

  getXComponent() {
    return this.strength * Math.cos(this.angle);
  }

  getYComponent() {
    return this.strength * Math.sin(this.angle);
  }
}
