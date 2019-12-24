import RectangleDefinition from '../RectangleDefinition';

describe('RectangleDefinition', () => {
  describe('getBoundingRadius', () => {
    it('returns the length of the diagonal', () => {
      const testCases = [
        { width: 8, height: 6, expected: 5 },
        { width: 6, height: 8, expected: 5 },
        { width: 2, height: 2, expected: Math.SQRT2 },
      ];

      testCases.forEach(({ width, height, expected}) => {
        const rectangleDefinition = new RectangleDefinition({ width, height });
        const message = 'Expected rectangle with width '
          + width + ' and height '
          + height + ' to have a radius of '
          + expected;
        expect(rectangleDefinition.getBoundingRadius(), message).toAlmostEqual(expected)
      });
    });
  });

  describe('computeIntersectionWithRay', () => {
    it('computes the correct intersection point depending on the side', () => {
      const testCases = [
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(1 + 4 * Math.sqrt(3), 5),
          expected: point(5, 1 + 4 / Math.sqrt(3)),
          message: 'right side at pi/6 angle'
        },
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(4, 1 + 3 * Math.sqrt(3)),
          expected: point(1 + 3 / Math.sqrt(3), 4),
          message: 'top right side at pi/3 angle'
        },
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(-2, 1 + 3 * Math.sqrt(3)),
          expected: point(1 - 3 / Math.sqrt(3), 4),
          message: 'top left side (2pi/3)'
        },
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(1 - 4 * Math.sqrt(3), 5),
          expected: point(-3, 1 + 4 / Math.sqrt(3)),
          message: 'left top side (5pi/6)'
        },
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(1 - 4 * Math.sqrt(3), -3),
          expected: point(-3, 1 - 4 / Math.sqrt(3)),
          message: 'left bottom side (7pi/6)'
        },
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(-2, 1 - 3 * Math.sqrt(3)),
          expected: point(1 - 3 / Math.sqrt(3), -2),
          message: 'bottom side (4pi/3)'
        },
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(4, 1 - 3 * Math.sqrt(3)),
          expected: point(1 + 3 / Math.sqrt(3), -2),
          message: 'bottom right side (5pi/3)'
        },
        {
          width: 8,
          height: 6,
          center: point(1, 1),
          farPoint: point(1 + 4 * Math.sqrt(3), -3),
          expected: point(5, 1 - 4 / Math.sqrt(3)),
          message: 'right side (11pi/6)'
        },
      ];

      testCases.forEach(({ width, height, center, farPoint, expected, message}) => {
        const rectangleDefinition = new RectangleDefinition({ width, height });
        const intersectionPoint = rectangleDefinition.computeIntersectionWithRay(
          center, farPoint
        );
        expect(intersectionPoint, message).toAlmostEqual(expected)
      });
    });
  });
});
