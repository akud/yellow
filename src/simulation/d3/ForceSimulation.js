import Simulation from 'simulation/Simulation';

import * as d3 from 'd3-force';
import { ForceType } from '../ForceDefinition';
import { ConstraintType } from '../ConstraintDefinition';

export default class ForceSimulation extends Simulation {
  constructor(config) {
    super(config);
    this.elements = constructElementIndex(this.config);
    this.forces = constructForces(this.config);

    this.simulation = d3.forceSimulation(Object.values(this.elements));
    this.forces.forEach(({ name, force }) => {
      this.simulation = this.simulation.force(name, force);
    });
    this.simulation.on('tick', () => {
      this.config.listeners.forEach(l => l(this));
    });
  }

  getElementData(id) {
    const element = this.elements[id];
    return { position: { x: element.x, y: element.y }, shape: element.shape };
  }
}

const constructElementIndex = (config) => {
  return config.getElementIds().reduce((obj, id) => {
    obj[id] = { id, shape: config.getElementShape(id), x: 0, y: 0 };
    return obj;
  }, {});
};

const constructForces = (config) => {
  const d3Forces = [];
  config.getForces()
    .filter(f => f.type != ForceType.DIRECTIONAL)
    .map(mapForce)
    .forEach((force) => {
      d3Forces.push(force);
    });

  const links = [];
  const collisionBoundaries = {};

  config.getConstraints().forEach(constraint => {
    if (constraint.type === ConstraintType.FIXED_DISTANCE) {
      links.push({
        source: constraint.between[0],
        target: constraint.between[1],
        distance: constraint.distance,
      });
    } else if (constraint.type === ConstraintType.PREVENT_COLLISIONS) {
      const elementId = constraint.elementId;
      collisionBoundaries[elementId] = config.getElementShape(elementId).getBoundingRadius();
    } else {
      throw new Error('Unknown constraint: ' + constraint);
    }
  });

  if (links.length) {
    d3Forces.push(
      {
        name: 'linking',
        force: d3.forceLink(links).id(e => e.id).distance(l => l.distance),
      }
    );
  }

  if (Object.keys(collisionBoundaries).length) {
    d3Forces.push(
      {
        name: 'collision',
        force: d3.forceCollide().radius(e => collisionBoundaries[e.id]),
      }
    );
  }

  return d3Forces;
}

const mapForce = (force) => {
  if (force.type === ForceType.CENTERING) {
    return {
      name: 'centering',
      force: d3.forceCenter(force.center.x, force.center.y)
    };
  } else if (force.type === ForceType.REPELLING) {
    return {
      name: 'repelling',
      force: d3.forceManyBody()
    };
  } else {
    throw new Error('Unknown force: ' + force);
  }
}
