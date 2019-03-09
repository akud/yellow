import ShapeDefinition from './ShapeDefinition';

export default class Point extends ShapeDefinition {
  getBoundingRadius() {
    return 0;
  }

  computeIntersectionWithRay(center, rayOrigin) {
    return center;
  }
}
