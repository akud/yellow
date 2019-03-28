import Direction from 'simulation/Direction';

class Orientation {
  constructor(name, directions) {
    this.name = name;
    this.directions = directions;
  }

  getDirections() {
    return this.directions;
  }

  isPrimary() {
    return false;
  }

  getName() {
    return this.name;
  }

  hasDirections() {
    return !!this.directions.length;
  }
}

class PrimaryOrientation extends Orientation {
  constructor() {
    super('PRIMARY', []);
  }

  isPrimary() {
    return true;
  }
}

export default {
  TOP_LEFT: new Orientation('TOP_LEFT', [Direction.UP, Direction.LEFT]),
  TOP: new Orientation('TOP', [Direction.UP]),
  TOP_RIGHT: new Orientation('TOP_RIGHT', [Direction.UP, Direction.RIGHT]),
  RIGHT: new Orientation('RIGHT', [Direction.RIGHT]),
  BOTTOM_RIGHT: new Orientation('RIGHT', [Direction.DOWN, Direction.RIGHT]),
  BOTTOM: new Orientation('BOTTOM', [Direction.DOWN]),
  BOTTOM_LEFT: new Orientation('BOTTOM_LEFT', [Direction.DOWN, Direction.LEFT]),
  LEFT: new Orientation('BOTTOM_LEFT', [Direction.LEFT]),
  UNSPECIFIED: new Orientation('UNSPECIFIED', []),
  PRIMARY: new PrimaryOrientation(),
}
