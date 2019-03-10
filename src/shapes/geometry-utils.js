export const slope = (p1, p2) => (p2.y - p1.y) / (p2.x - p1.x);

export const approximatelyEqual = (n1, n2) => n1.toFixed(2) === n2.toFixed(2);

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

export const radiansToDegrees = radians => radians * 180 / Math.PI;

export const addVectors = (point, vector) => ({ x: point.x + vector.x, y: point.y + vector.y });

export default {
  slope,
  approximatelyEqual,
  computeHorizontalIntersectionAngle,
  radiansToDegrees,
  addVectors,
};
