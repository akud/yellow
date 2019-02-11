import utils from 'utils';

export default class SimulatedNode {
  constructor({ id, shape }) {
    this.id = utils.requirePresent('id', id);
    this.shape = utils.requirePresent('shape', shape);
  }

  set x(x) {
    this.shape.setCenterX(x);
  }

  get x() {
    return this.shape.getCenter().x;
  }

  set y(y) {
    this.shape.setCenterY(y);
  }

  get y() {
    return this.shape.getCenter().y;
  }

  getCenter() {
    return this.shape.getCenter();
  }

  getCollisionRadius() {
    return this.shape.getBoundingRadius();
  }

  computeEdgeIntersection(otherNode) {
    return this.shape.computeIntersectionWithRayFrom(
      otherNode.getCenter()
    );
  }
}
