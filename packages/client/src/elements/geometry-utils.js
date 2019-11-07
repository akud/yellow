import Orientation from './Orientation';

/**
 * Determine the slope of the line formed by the two points
 *
 */
export const slope = (p1, p2) => (p2.y - p1.y) / (p2.x - p1.x);

/**
 * Indicate if two numeric values are approximately equal
 *
 */
export const approximatelyEqual = (n1, n2) => n1.toFixed(2) === n2.toFixed(2);

/**
 * Compute the angle formed by the line determined by the provided points and the x axis.
 * The returned angle will always be in the range [0, 2pi].
 *
 * In the following examples, theta would be the return value
 *
 *       /*p2     *p2
 *      /          \
 *     /            \
 *    / theta        \__ theta
 *   / )              \ )
 * .*p1                *p1
 *        _
 *       ( |
 * theta (/ *p1
 *       /
 *      /
 *     *p2
 */
export const computeHorizontalIntersectionAngle = (p1, p2) => {
  if (approximatelyEqual(p1.x, p2.x)) {
    return p1.y < p2.y ? Math.PI / 2 : 3 * Math.PI / 2;
  } else if (p1.x > p2.x) {
    return Math.atan(slope(p1, p2)) + Math.PI;
  } else if (p1.y > p2.y) {
    return Math.atan(slope(p1, p2)) + 2 * Math.PI;
  } else {
    return Math.atan(slope(p1, p2));
  }
}

/**
 * Indicates if the target point is oriented correctly with respect to the target orientation.
 *
 * params:
 *   anchorPoint - the anchor point
 *   targetPoint - the point to consider
 *   tolerance - radians to allow on either side of the target angle. Defaults to pi/6
 */
export const isOriented = ({
  anchorPoint,
  targetPoint,
  orientation=Orientation.UNSPECIFIED,
  tolerance=Math.PI/6,
}) => {
  if (!orientation.isSpatiallyOriented()) {
    return true;
  }

  const angleBetweenPositions = computeHorizontalIntersectionAngle(
    anchorPoint,
    targetPoint,
  );
  return Math.abs(angleBetweenPositions - orientation.getAngle()) <= tolerance;
}

/**
 * Calculate the eudlidean distance between two points
 */
export const distance = (p1, p2) => Math.sqrt(
  (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
);

/**
 * Convert radians to degrees
 */
export const radiansToDegrees = radians => radians * 180 / Math.PI;

/**
 * Add two vectors together
 */
export const addVectors = (point, vector) => ({ x: point.x + vector.x, y: point.y + vector.y });

export default {
  slope,
  distance,
  approximatelyEqual,
  computeHorizontalIntersectionAngle,
  isOriented,
  radiansToDegrees,
  addVectors,
};
