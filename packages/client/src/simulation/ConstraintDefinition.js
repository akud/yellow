import utils from '../utils';

export default class ConstraintDefinition {
  constructor(type) {
    this.type = utils.requireOneOf(type, Object.values(ConstraintType));
  }
}

export const ConstraintType = {
  FIXED_DISTANCE: Symbol('Fixed Distance Constraint'),
  FIXED_POSITION: Symbol('Fixed Position Constraint'),
}

export class FixedDistanceConstraintDefinition extends ConstraintDefinition {
  constructor({ between, distance=10 }) {
    super(ConstraintType.FIXED_DISTANCE);
    this.between = utils.requireArrayOfLength(between, 2);
    this.distance = distance;
  }
}

export class FixedPositionConstraintDefinition extends ConstraintDefinition {
  constructor({ elementId, x=0, y=0 }) {
    super(ConstraintType.FIXED_POSITION);
    this.elementId = utils.requirePresent(elementId);
    this.x = x;
    this.y = y;
  }
}
