import utils from '../utils';

export default class ForceDefinition {
  constructor(type) {
    this.type = utils.requireOneOf(type, Object.values(ForceType));
  }
}

export const ForceType = {
  CENTERING: Symbol('Centering Force'),
  REPELLING: Symbol('Repelling Force'),
  DIRECTIONAL: Symbol('Directional Force'),
};

export class CenteringForceDefinition extends ForceDefinition {
  constructor(center) {
    super(ForceType.CENTERING);
    this.center = utils.requirePositionObject(center);
  }
}

export class RepellingForceDefinition extends ForceDefinition {
  constructor({ strengthMultiplier=1.0 }) {
    super(ForceType.REPELLING);
    this.strengthMultiplier = strengthMultiplier;
  }
}

export class DirectionalForceDefinition extends ForceDefinition {
  constructor({elementId, directions, strengthMultiplier=1.0}) {
    super(ForceType.DIRECTIONAL);
    this.elementId = utils.requirePresent(elementId);
    this.directions = utils.requireArray(directions);
    this.strengthMultiplier = strengthMultiplier;
  }
}
