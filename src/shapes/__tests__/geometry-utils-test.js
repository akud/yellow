import geometryUtils from '../geometry-utils';

describe('geometry utils', () => {
  describe('slope', () => {
    it('computes the slope of the line between two points', () => {
      expect(geometryUtils.slope({ x: 2, y: 3 }, { x: 7, y: 10 })).toBeCloseTo(7 / 5);
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
    it('compares numbers up to two decimal points', () => {
      expect(geometryUtils.approximatelyEqual(2.01324, 2.01259)).toBe(true);
      expect(geometryUtils.approximatelyEqual(2.01324, 2.02259)).toBe(false);
    });
  });
});
