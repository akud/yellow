import utils from 'utils';

export default class ConstraintDefinition {
  constructor(type) {
    this.type = utils.requireOneOf(type, Object.values(ConstraintType));
  }
}

export const ConstraintType = {
  FIXED_DISTANCE: Symbol('Fixed Distance Constraint'),
  PREVENT_COLLISIONS: Symbol('Collision Constraint'),
}

export class FixedDistanceConstraintDefinition extends ConstraintDefinition {
  constructor({ between, distance=10 }) {
    super(ConstraintType.FIXED_DISTANCE);
    this.between = utils.requireArrayOfLength(between, 2);
    this.distance = distance;
  }
}

export class PreventCollisionsConstraintDefinition extends ConstraintDefinition {
  constructor({ elementId }) {
    super(ConstraintType.PREVENT_COLLISIONS);
    this.elementId = utils.requirePresent(elementId);
  }
}
