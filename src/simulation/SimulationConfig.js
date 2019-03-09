import logging from '@akud/logging';
import Point from 'shapes/Point';

const LOGGER = new logging.Logger('SimulationConfig');

export default class SimulationConfig {
  static EMPTY = new SimulationConfig({});

  constructor({ elementIds, elementShapes, forces, constraints, listeners }) {
    this.elementIds = new Set(elementIds || []);
    this.elementShapes = elementShapes || {};
    this.forces = forces || [];
    this.constraints = constraints || [];
    this.listeners = listeners || [];
  }

  hasDefinitions() {
    return this.elementIds.size || this.forces.length || this.constraints.length;
  }

  getElementIds() {
    return [...this.elementIds];
  }

  getElementShape(elementId) {
    let shape = this.elementShapes[elementId];
    if (shape) {
      return shape;
    } else {
      LOGGER.warn('No shape defined for {}', elementId);
      return new Point();
    }
  }

  getForces() {
    return this.forces;
  }

  getConstraints() {
    return this.constraints;
  }

  combinedWith(other) {
    return new SimulationConfig({
      elementIds: [...this.elementIds].concat(...other.elementIds),
      elementShapes: Object.assign({}, this.elementShapes, other.elementShapes),
      forces: this.forces.concat(other.forces),
      constraints: this.constraints.concat(other.constraints),
      listeners: this.listeners.concat(other.listeners),
    });
  }

  withNewLayoutListener(listener) {
    return new SimulationConfig({
      elementIds: this.elementIds,
      elementShapes: this.elementShapes,
      forces: this.forces,
      constraints: this.constraints,
      listeners: this.listeners.concat([ listener ]),
    });
  }
}
