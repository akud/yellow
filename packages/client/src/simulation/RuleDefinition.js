import utils from '../utils';

export default class RuleDefinition {
  constructor(type) {
    this.type = utils.requireOneOf(type, Object.values(RuleType));
  }
}

export const RuleType = {
  DISTANCE_SETTING: Symbol('DISTANCE_SETTING'),
  POSITIONING: Symbol('POSITIONING'),
  RELATIVE_POSITIONING: Symbol('RELATIVE_POSITIONING'),
}

export class DistanceSettingRuleDefinition extends RuleDefinition {
  constructor({ between, distance=10, strengthMultiplier=1.0 }) {
    super(RuleType.DISTANCE_SETTING);
    this.between = utils.requireArrayOfLength(between, 2);
    this.distance = distance;
    this.strengthMultiplier = strengthMultiplier;
  }
}

export class PositioningRuleDefinition extends RuleDefinition {
  constructor({ elementId, x=0, y=0 }) {
    super(RuleType.POSITIONING);
    this.elementId = utils.requirePresent(elementId);
    this.x = x;
    this.y = y;
  }
}

export class RelativePositioningRuleDefinition extends RuleDefinition {
  constructor({ baseElementId, targetElementId, directions, strengthMultiplier=1.0 }) {
    super(RuleType.RELATIVE_POSITIONING);
    this.baseElementId = utils.requirePresent(baseElementId);
    this.targetElementId = utils.requirePresent(targetElementId);
    this.directions = utils.requireArray(directions);
    this.strengthMultiplier = strengthMultiplier;
  }
}
