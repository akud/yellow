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

  describe('subtractAngles', () => {
    it('subtracts angles considering their distance around the circle', () => {
      expect(
        geometryUtils.subtractAngles(
          PI_OVER_FOUR,
          PI_OVER_TWO
        )
      ).toBeCloseTo(PI_OVER_FOUR);
      expect(
        geometryUtils.subtractAngles(
          PI_OVER_FOUR,
          TWO_PI
        )
      ).toBeCloseTo(PI_OVER_FOUR);
      expect(
        geometryUtils.subtractAngles(
          0,
          PI_OVER_THREE
        )
      ).toBeCloseTo(PI_OVER_THREE);
      expect(
        geometryUtils.subtractAngles(
          SEVEN_PI_OVER_FOUR,
          0
        )
      ).toBeCloseTo(PI_OVER_FOUR);
    });
  });

  describe('complement', () => {
    it('returns the opposite angle', () => {
      expect(geometryUtils.complement(PI_OVER_FOUR)).toBeCloseTo(FIVE_PI_OVER_FOUR);
      expect(geometryUtils.complement(PI_OVER_TWO)).toBeCloseTo(THREE_PI_OVER_TWO);
      expect(geometryUtils.complement(SEVEN_PI_OVER_FOUR)).toBeCloseTo(THREE_PI_OVER_FOUR);
    });
  });

  describe('normalize', () => {
    it('normalizes the angle to be within 0 and 2 pi', () => {
      expect(geometryUtils.normalize(-PI_OVER_THREE)).toBeCloseTo(FIVE_PI_OVER_THREE);
      expect(geometryUtils.normalize(11 * Math.PI / 4)).toBeCloseTo(THREE_PI_OVER_FOUR);
      expect(geometryUtils.normalize(0)).toBeCloseTo(0);
      expect(geometryUtils.normalize(TWO_PI)).toBeCloseTo(TWO_PI);
      expect(geometryUtils.normalize(TWO_PI_OVER_THREE)).toBeCloseTo(TWO_PI_OVER_THREE);
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

  describe('pointAwayFrom', () => {
    it('finds point the specified distance away at the specified angle', () => {
      const testCases = [
        {
          base: { x: 0, y: 0 },
          distance: 45,
          angle: PI_OVER_TWO,
          expected: { x: 0, y: 45 }
        },
        {
          base: { x: 0, y: 10 },
          distance: 23,
          angle: PI,
          expected: { x: -23, y: 10 }
        },
        {
          base: { x: -56, y: 89 },
          distance: 2,
          angle: PI_OVER_FOUR,
          expected: { x: -56 + ROOT_TWO, y: 89 + ROOT_TWO }
        },
        {
          base: { x: 0, y: 0 },
          distance: 10,
          angle: FIVE_PI_OVER_FOUR,
          expected: { x: -5 * ROOT_TWO, y: -5 * ROOT_TWO }
        },
      ];
      testCases.forEach(({ base, distance, angle, expected }) => {
        const actual = geometryUtils.pointAwayFrom({ base, distance, angle });
        expect(actual.x).toBeCloseTo(expected.x);
        expect(actual.y).toBeCloseTo(expected.y);
      });
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
