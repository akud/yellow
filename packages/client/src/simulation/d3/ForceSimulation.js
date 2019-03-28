import Simulation from 'simulation/Simulation';

import * as d3 from 'd3-force';
import { ForceType } from '../ForceDefinition';
import { ConstraintType } from '../ConstraintDefinition';
import PointDefinition from 'elements/PointDefinition';
import logging from '@akud/logging';

const LOGGER = new logging.Logger('d3ForceSimulation');

const EMPTY_ELEMENT_DATA = {
  position: { x: 0, y: 0 },
  shape: new PointDefinition(),
};

export default class ForceSimulation extends Simulation {
  constructor() {
    super();
    this.elements = {};
    this.listeners = [];
    this.links = [];
    this.linkForce = d3.forceLink(this.links)
      .id(n => n.id)
      .distance(l => l.distance);

    this.simulation = d3.forceSimulation()
      .force('preventCollisions', d3.forceCollide().radius(n => n.shape.getBoundingRadius()))
      .force('link', this.linkForce)
      .on('tick', () => this.fireListeners());
  }

  getElementData(id) {
    const element = this.elements[id];
    if (element) {
      return { position: { x: element.x, y: element.y }, shape: element.shape };
    } else {
      return EMPTY_ELEMENT_DATA;
    }
  }

  registerElement(elementId, shape) {
    this.elements[elementId] = {
      id: elementId,
      x: 0,
      y: 0,
      shape,
    };
    this.simulation.nodes(Object.values(this.elements));
    return this;
  }

  onNewLayout(listener) {
    this.listeners.push(listener);
    return this;
  }

  registerForce(force) {
    switch(force.type) {
      case ForceType.CENTERING:
        this.simulation.force(
          'center', d3.forceCenter(force.center.x, force.center.y)
        );
        break;
      case ForceType.REPELLING:
        this.simulation.force('repelling', d3.forceManyBody());
        break;
      default:
        LOGGER.warn('unrecognized force {}', force);
    }
    return this;
  }

  registerConstraint(constraint) {
    switch(constraint.type) {
      case ConstraintType.FIXED_DISTANCE:
        this.links.push({
          source: constraint.between[0],
          target: constraint.between[1],
          distance: constraint.distance,
        });
        this.linkForce.links(this.links);
        break;
      default:
        LOGGER.warn('unrecognized constraint {}', constraint);
    }
    return this;
  }

  fireListeners() {
    this.listeners.forEach(l => l(this));
  }
}
