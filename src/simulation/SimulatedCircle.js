import geometry from './geometry';

export default class SimulatedCircle {
  constructor({ id, radius, x, y }) {
    this.id = id;
    this.radius = radius;
    this.x = x;
    this.y = y;
  }

  getCollisionRadius() {
    return this.radius;
  }

  getCenter() {
    return { x: this.x, y: this.y };

  }
  computeIntersectionWithLine(farPoint) {
    return geometry.computeCircleIntersection({
      nearPoint: this.getCenter(),
      farPoint: farPoint,
      radius: this.radius
    });
  }
}
