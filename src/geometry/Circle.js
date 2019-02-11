import utils from 'utils';
import geometryUtils from './geometry-utils';
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

  computeIntersectionWithRayFrom(point) {
    const angle = geometryUtils.computeHorizontalIntersectionAngle(this.center, point);
    const xDistance = Math.cos(angle) * this.radius;
    const yDistance = Math.sin(angle) * this.radius;
    return { x: this.center.x + xDistance, y: this.center.y + yDistance };
  }
}

