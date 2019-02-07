import utils from 'utils';

/**
 * Defines the interface all node shapes must implement
 *
 */
export default class Shape {

  constructor({ center }) {
    this.center = utils.requirePresent(center);
  }

  getBoundingRadius() {
    throw new Error('Subclasses must override getBoundingRadius');
  }

  computeRayIntersection(ray) {
    throw new Error('Subclasses must override computeRayIntersection');
  }

  getCenter() {
    return this.center;
  }

  /**
   * write a new x value for the center
   */
  setCenterX(x) {
    this.center.x = x;
  }
  /**
   * write a new y value for the center
   */
  setCenterY(y) {
    this.center.y = y;
  }
}
