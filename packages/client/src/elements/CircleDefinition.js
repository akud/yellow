import utils from '../utils';
import geometryUtils from './geometry-utils';
import ShapeDefinition from './ShapeDefinition';

export default class CircleDefinition extends ShapeDefinition {

  /**
   * options: {
   *   center: { x: number, y: number },
   *   radius: number
   * }
   *
   */
  constructor({ radius }) {
    super();
    this.radius = utils.requirePresent('radius', radius);
  }

  getBoundingRadius() {
    return this.radius;
  }

  computeIntersectionWithRay(center, rayOrigin) {
    const angle = geometryUtils.computeHorizontalIntersectionAngle(center, rayOrigin);
    const xDistance = Math.cos(angle) * this.radius;
    const yDistance = Math.sin(angle) * this.radius;
    return { x: center.x + xDistance, y: center.y + yDistance };
  }
}

