import utils from 'utils';

export default class ForceDefinition {
  constructor(type) {
    this.type = utils.requireOneOf(type, Object.values(ForceType));
  }
}

export const ForceType = {
  CENTERING: Symbol('Centering Force'),
  REPELLING: Symbol('Repelling Force'),
};

export class CenteringForceDefinition extends ForceDefinition {
  constructor(center) {
    super(ForceType.CENTERING);
    this.center = utils.requirePositionObject(center);
  }
}

export class RepellingForceDefinition extends ForceDefinition {
  constructor() {
    super(ForceType.REPELLING);
  }
}
