import Ray from '../Ray';
import ApproachDirection from '../ApproachDirection';

describe('Ray', () => {
  describe('getApproachDirectionTowards', () => {
    it('returns the direction at which the ray approaches the point', () => {
      const testCases = [
        {
          nearPoint: { x: 2, y: 3 },
          farPoint: { x: 2, y: 15 },
          expected: ApproachDirection.VERTICALLY_FROM_BELOW,
        },
        {
          nearPoint: { x: 2.01, y: 3 },
          farPoint: { x: 2.009, y: 15 },
          expected: ApproachDirection.VERTICALLY_FROM_BELOW,
        },
        {
          nearPoint: { x: 2, y: 3 },
          farPoint: { x: 2, y: 0 },
          expected: ApproachDirection.VERTICALLY_FROM_ABOVE,
        },
        {
          nearPoint: { x: 2.35, y: 3 },
          farPoint: { x: 2.35001, y: 0 },
          expected: ApproachDirection.VERTICALLY_FROM_ABOVE,
        },
        {
          nearPoint: { x: -2, y: 3 },
          farPoint: { x: 2, y: 0 },
          expected: ApproachDirection.FROM_TOP_LEFT,
        },
        {
          nearPoint: { x: -2, y: -3 },
          farPoint: { x: 2, y: 0 },
          expected: ApproachDirection.FROM_BOTTOM_LEFT,
        },
        {
          nearPoint: { x: 2, y: 3 },
          farPoint: { x: -2, y: 0 },
          expected: ApproachDirection.FROM_TOP_RIGHT,
        },
        {
          nearPoint: { x: 2, y: -3 },
          farPoint: { x: -2, y: 0 },
          expected: ApproachDirection.FROM_BOTTOM_RIGHT,
        },
      ];
      testCases.forEach(({nearPoint, farPoint, expected}) => {
        const ray = new Ray(nearPoint, farPoint);
        const msg = `From {x: ${nearPoint.x}, y: ${nearPoint.y}} to {x: ${farPoint.x}, y: ${farPoint.y}}`
        expect(ray.getApproachDirectionTowards(farPoint), msg).toBe(expected);
      });
    });
  });
});
