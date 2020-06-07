import geometryUtils from '../elements/geometry/geometry-utils';

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

  /**
   * Indicate if the target point is oriented correctly relative to the
   * anchor point with a 0-1 scale, 1 being completely oriented and 0 being completely
   * not oriented
   *
   * tolerance - radians to allow on either side of desired angle
   *
   */
  getOrientationRating({anchorPoint, targetPoint, range=Math.PI/12}) {
    if (!this.isSpatiallyOriented()) {
      return 1;
    }

    const angle = geometryUtils.computeHorizontalIntersectionAngle(
      anchorPoint,
      targetPoint
    );

    const angleDifference = geometryUtils.subtractAngles(
      this.getAngle(),
      angle
    );
    return angleDifference >= range ?
      0 :
      (range - angleDifference) / range;
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
  TOP_LEFT: new Orientation('TOP_LEFT', 5 * Math.PI / 4),
  TOP: new Orientation('TOP', 3 * Math.PI / 2),
  TOP_RIGHT: new Orientation('TOP_RIGHT', 7 * Math.PI / 4),
  RIGHT: new Orientation('RIGHT', 0),
  BOTTOM_RIGHT: new Orientation('BOTTOM_RIGHT', Math.PI / 4),
  BOTTOM: new Orientation('BOTTOM', Math.PI / 2),
  BOTTOM_LEFT: new Orientation('BOTTOM_LEFT', 3 * Math.PI / 4),
  LEFT: new Orientation('LEFT', Math.PI),
  UNSPECIFIED: new Orientation('UNSPECIFIED', null),
  PRIMARY: new PrimaryOrientation(),
}
