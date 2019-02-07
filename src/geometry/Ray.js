import ApproachDirection from './ApproachDirection';
import utils from 'utils';
import geometryUtils from './geometry-utils';

export default class Ray {
  constructor(fromPoint, toPoint) {
    this.fromPoint = utils.requirePresent('fromPoint', fromPoint);
    this.toPoint = utils.requirePresent('toPoint', toPoint);
    this.angle = geometryUtils.angle(fromPoint, toPoint);
  }

  getApproachDirectionTowards(point) {
    if (geometryUtils.approximatelyEqual(this.fromPoint.x, point.x)) {
      return this.fromPoint.y < point.y ? ApproachDirection.VERTICALLY_FROM_BELOW : ApproachDirection.VERTICALLY_FROM_ABOVE;
    } else if (this.fromPoint.x < point.x) {
      return this.fromPoint.y < point.y ? ApproachDirection.FROM_BOTTOM_LEFT : ApproachDirection.FROM_TOP_LEFT;
    } else {
      return this.fromPoint.y < point.y ? ApproachDirection.FROM_BOTTOM_RIGHT : ApproachDirection.FROM_TOP_RIGHT;
    }
  }

  getAngle() {
    return this.angle;
  }
}
