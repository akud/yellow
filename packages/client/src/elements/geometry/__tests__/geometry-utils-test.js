import geometryUtils from '../geometry-utils';

describe('geometry utils', () => {
  describe('slope', () => {
    it('computes the slope of the line between two points', () => {
      expect(geometryUtils.slope({ x: 2, y: 3 }, { x: 7, y: 10 })).toBeCloseTo(7 / 5);
    });
  });

  describe('distance', () => {
    it('computes the euclidean distance between the two points', () => {
      expect(geometryUtils.distance({ x: 1, y: 1 }, { x: 2, y: 2 })).toBeCloseTo(ROOT_TWO)
      expect(geometryUtils.distance({ x: 4, y: 4 }, { x: 2, y: 5 })).toBeCloseTo(
        Math.sqrt(5)
      );
    });
  });

  describe('radiansToDegrees', () => {
    it('converts radians to degrees', () => {
      expect(geometryUtils.radiansToDegrees(Math.PI)).toBeCloseTo(180);
      expect(geometryUtils.radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
      expect(geometryUtils.radiansToDegrees(Math.PI / 4)).toBeCloseTo(45);
      expect(geometryUtils.radiansToDegrees(Math.PI / 6)).toBeCloseTo(30);
      expect(geometryUtils.radiansToDegrees(Math.PI / 3)).toBeCloseTo(60);
      expect(geometryUtils.radiansToDegrees(2 * Math.PI / 3)).toBeCloseTo(120);
    });
  });

  describe('computeHorizontalIntersectionAngle', () => {
    it('computes the angle of the line formed by the two points with the x axis', () => {
      const testCases = [
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 1, y: 4 },
          expected: Math.PI / 2,
        },
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 1, y: -1 },
          expected: 3 * Math.PI / 2,
        },
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 2, y: 1 + Math.sqrt(3) },
          expected: Math.PI / 3,
        },
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 1 + Math.sqrt(3), y: 2 },
          expected: Math.PI / 6,
        },
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 0, y: 1 + Math.sqrt(3) },
          expected: 2 * Math.PI / 3,
        },
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 1 - Math.sqrt(3), y: 2 },
          expected: 5 * Math.PI / 6,
        },
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 0, y: 1 - Math.sqrt(3) },
          expected: 4 * Math.PI / 3,
        },
        {
          nearPoint: { x: 1, y: 1 },
          farPoint: { x: 1 - Math.sqrt(3), y: 0 },
          expected: 7 * Math.PI / 6,
        },
        {
          nearPoint: { x: 0, y: 0 },
          farPoint: { x: Math.sqrt(3), y: -1 },
          expected: 11 * Math.PI / 6,
        },
      ];

      testCases.forEach(({ nearPoint, farPoint, expected }) => {
        const message = 'from: ' + JSON.stringify(nearPoint) + ' to ' + JSON.stringify(farPoint);
        expect(geometryUtils.computeHorizontalIntersectionAngle(nearPoint, farPoint), message).toBeCloseTo(expected);
      });
    });
  });

  describe('approximatelyEqual', () => {
    it('compares angle number up to two decimal points', () => {
      expect(geometryUtils.approximatelyEqual(2.01324, 2.01259)).toBe(true);
      expect(geometryUtils.approximatelyEqual(2.01324, 2.02259)).toBe(false);
    });

    it('compares large numbers by their relative difference', () => {
      expect(geometryUtils.approximatelyEqual(100, 98)).toBe(true);
      expect(geometryUtils.approximatelyEqual(100, 101)).toBe(true);
      expect(geometryUtils.approximatelyEqual(100, 95)).toBe(true);
      expect(geometryUtils.approximatelyEqual(100, 105)).toBe(true);
      expect(geometryUtils.approximatelyEqual(100, 90)).toBe(false);
      expect(geometryUtils.approximatelyEqual(100, 110)).toBe(false);
    });
  });

  describe('addVectors', () => {
    it('adds the vectors point-wise', () => {
      const p1 = { x: 1, y: -3 };
      const p2 = { x: 5, y: 10 };
      expect(geometryUtils.addVectors(p1, p2)).toEqual({ x: 6, y: 7 });
    });
  });
});
