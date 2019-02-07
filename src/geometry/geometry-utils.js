const slope = (p1, p2) => (p2.y - p1.y) / (p2.x - p1.x);

const angle = (p1, p2) => Math.atan(slope(p1, p2));

const approximatelyEqual = (n1, n2) => n1.toFixed(2) === n2.toFixed(2);

export default {
  slope,
  angle,
  approximatelyEqual,
};
