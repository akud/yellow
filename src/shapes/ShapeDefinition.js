/**
 * Defines the interface all node shapes must implement
 *
 */
export default class ShapeDefinition {

  getBoundingRadius() {
    throw new Error('Subclasses must override getBoundingRadius');
  }

  computeIntersectionWithRay(center, rayOrigin) {
    throw new Error('Subclasses must override computeRayIntersection');
  }
}
