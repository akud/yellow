class Orientation {
  constructor(name, angle) {
    this.name = name;
    this.angle = angle;
  }

  isPrimary() {
    return false;
  }

  getName() {
    return this.name;
  }

  isSpatiallyOriented() {
    return this.angle !== null && this.angle !== undefined;
  }

  getAngle() {
    return this.angle;
  }
}

class PrimaryOrientation extends Orientation {
  constructor() {
    super('PRIMARY', null);
  }

  isPrimary() {
    return true;
  }
}

export default {
  TOP_LEFT: new Orientation('TOP_LEFT', 3 * Math.PI / 4),
  TOP: new Orientation('TOP', Math.PI / 2),
  TOP_RIGHT: new Orientation('TOP_RIGHT', Math.PI / 4),
  RIGHT: new Orientation('RIGHT', 0),
  BOTTOM_RIGHT: new Orientation('BOTTOM_RIGHT', 7 * Math.PI / 4),
  BOTTOM: new Orientation('BOTTOM', 3 * Math.PI / 2),
  BOTTOM_LEFT: new Orientation('BOTTOM_LEFT', 5 * Math.PI / 4),
  LEFT: new Orientation('LEFT', Math.PI),
  UNSPECIFIED: new Orientation('UNSPECIFIED', null),
  PRIMARY: new PrimaryOrientation(),
}
