import ShapeDefinition from './ShapeDefinition';

class PointDefinition extends ShapeDefinition {
  getBoundingRadius() {
    return 0;
  }

  computeIntersectionWithRay(center, rayOrigin) {
    return center;
  }
}

PointDefinition.INSTANCE = new PointDefinition();
export default PointDefinition;
