import Shape from './Shape';

export default class Point extends Shape {
  getBoundingRadius() {
    return 0;
  }

  computeIntersectionWithRayFrom(point) {
    return this.getCenter();
  }
}
