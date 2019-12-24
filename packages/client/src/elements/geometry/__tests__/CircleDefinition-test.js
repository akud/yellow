import CircleDefinition from '../CircleDefinition';

describe('CircleDefinition', () => {
  describe('computeIntersectionWithRay', () => {
    it('computes the intersection with the ray from the provided point to the center', () => {
      const testCases = [
        {
          name: 'pi/4 angle up and to the right 1 unit from origin',
          nearPoint: { x: 0, y: 0 },
          farPoint: { x: 2, y: 2 },
          radius: 1,
          expected: { x: Math.SQRT1_2, y: Math.SQRT1_2 }
        },
        {
          name: 'pi/4 angle down and to the left 1 unit to origin',
          nearPoint: { x: 2, y: 2 },
          farPoint: { x: 0, y: 0 },
          radius: 1,
          expected: { x: 2 - Math.SQRT1_2, y: 2 - Math.SQRT1_2 }
        },
        {
          name: 'pi/4 angle up and to the right 1 unit',
          nearPoint: { x: 2, y: 3 },
          farPoint: { x: 6, y: 7 },
          radius: 1,
          expected: { x: 2 + Math.SQRT1_2, y: 3 + Math.SQRT1_2 }
        },
        {
          name: 'pi/4 angle up and to the right 2 units',
          nearPoint: { x: 2, y: 3 },
          farPoint: { x: 6, y: 7 },
          radius: 2,
          expected: { x: 2 + 2 * Math.SQRT1_2, y: 3 + 2 * Math.SQRT1_2 }
        },
        {
          name: '3/4/5 triangle up and to the right 5 units',
          nearPoint: { x: 2, y: 3 },
          farPoint: { x: 17, y: 23 },
          radius: 5,
          expected: { x: 5, y: 7 }
        },
        {
          name: '3/4/5 triangle down and to the left 5 units',
          nearPoint: { x: 17, y: 23 },
          farPoint: { x: 2, y: 3 },
          radius: 5,
          expected: { x: 14, y: 19 }
        },
        {
          name: 'vertical intersection from above',
          nearPoint: { x: 5, y: -10 },
          farPoint: { x: 5, y: 3 },
          radius: 5,
          expected: { x: 5, y: -5 }
        },
        {
          name: 'vertical intersection from below',
          nearPoint: { x: 2, y: 3 },
          farPoint: { x: 2, y: -3 },
          radius: 4,
          expected: { x: 2, y: -1 }
        },
      ];

      testCases.forEach(({name, nearPoint, farPoint, radius, expected}) => {
        const circle = new CircleDefinition({ radius });
        const intersectionPoint = circle.computeIntersectionWithRay(nearPoint, farPoint);
        const xDistance = intersectionPoint.x - nearPoint.x;
        const yDistance = intersectionPoint.y - nearPoint.y;

        const hypotenuseDistance = Math.sqrt(
          Math.pow(xDistance, 2) + Math.pow(yDistance, 2)
        );

        expect(hypotenuseDistance, 'Test Case: ' + name).toBeCloseTo(radius, 3);

        expect(intersectionPoint.x, 'Test Case: ' + name).toBeCloseTo(expected.x, 3);
        expect(intersectionPoint.y, 'Test Case: ' + name).toBeCloseTo(expected.y, 3);
      });
    });
  });
});
