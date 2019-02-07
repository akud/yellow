import utils from 'utils';
import ApproachDirection from './ApproachDirection';
import Shape from './Shape';

export default class Circle extends Shape {

  /**
   * options: {
   *   center: { x: number, y: number },
   *   radius: number
   * }
   *
   */
  constructor({ center, radius }) {
    super({ center });
    this.radius = utils.requirePresent('radius', radius);
  }

  getBoundingRadius() {
    return this.radius;
  }

  computeRayIntersection(ray) {
    switch(ray.getApproachDirectionTowards(this.getCenter())) {
      case ApproachDirection.VERTICALLY_FROM_ABOVE:
        return { x: this.center.x, y: this.center.y + this.radius };
      case ApproachDirection.VERTICALLY_FROM_BELOW:
        return { x: this.center.x, y: this.center.y - this.radius };
      case ApproachDirection.FROM_TOP_RIGHT:
      case ApproachDirection.FROM_BOTTOM_RIGHT:
        return this._intersection(ray.getAngle());
      case ApproachDirection.FROM_TOP_LEFT:
      case ApproachDirection.FROM_BOTTOM_LEFT:
        return this._intersection(ray.getAngle() - Math.PI);
      default:
        throw new Error('unknown relative position');
    }
  }

  _intersection(angle) {
    const xDistance = Math.cos(angle) * this.radius;
    const yDistance = Math.sin(angle) * this.radius;
    return { x: this.center.x + xDistance, y: this.center.y + yDistance };
  }
}

