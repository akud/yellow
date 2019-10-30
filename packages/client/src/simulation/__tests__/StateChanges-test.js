import { ForceApplication } from '../StateChanges';

describe('StateChanges', () => {
  describe('ForceApplication', () => {
    const makeForce = (args) => new ForceApplication(Object.assign(
      {
        elementIds: [ '1' ],
        angle: ZERO,
        strength: 1.0,
      },
      args
    ));

    describe('apply', () => {
      it('it breaks the angle into x and y components and applies to element velocity', () => {
        const testCases = [
          {
            description: '0',
            angle: ZERO,
            expectedXVelocityChange: 1,
            expectedYVelocityChange: 0,
          },
          {
            description: 'π/4',
            angle: PI_OVER_FOUR,
            expectedXVelocityChange: ROOT_TWO_OVER_TWO,
            expectedYVelocityChange: ROOT_TWO_OVER_TWO,
          },
          {
            description: 'π/2',
            angle: PI_OVER_TWO,
            expectedXVelocityChange: 0,
            expectedYVelocityChange: 1,
          },
          {
            description: '3π/4',
            angle: THREE_PI_OVER_FOUR,
            expectedXVelocityChange: -ROOT_TWO_OVER_TWO,
            expectedYVelocityChange: ROOT_TWO_OVER_TWO,
          },
          {
            description: 'π',
            angle: PI,
            expectedXVelocityChange: -1,
            expectedYVelocityChange: 0,
          },
          {
            description: '5π/4',
            angle: FIVE_PI_OVER_FOUR,
            expectedXVelocityChange: -ROOT_TWO_OVER_TWO,
            expectedYVelocityChange: -ROOT_TWO_OVER_TWO,
          },
          {
            description: '3π/2',
            angle: THREE_PI_OVER_TWO,
            expectedXVelocityChange: 0,
            expectedYVelocityChange: -1,
          },
          {
            description: '7π/4',
            angle: SEVEN_PI_OVER_FOUR,
            expectedXVelocityChange: ROOT_TWO_OVER_TWO,
            expectedYVelocityChange: -ROOT_TWO_OVER_TWO,
          },
          {
            description: '2π',
            angle: TWO_PI,
            expectedXVelocityChange:  1.0,
            expectedYVelocityChange: 0,
          },
        ];

        testCases.forEach(({ description, angle, expectedXVelocityChange, expectedYVelocityChange }) => {
          let element = { vx: 23, vy: 92 };
          makeForce({ angle }).apply(1.0, element);
          expect(element, description + '; alpha=1.0').toEqual({
            vx: 23 + expectedXVelocityChange,
            vy: 92 + expectedYVelocityChange,
          });

          element = { vx: -45, vy: 106 };
          makeForce({ angle }).apply(0.5, element);
          expect(element, description + '; alpha=0,5').toEqual({
            vx: -45 + 0.5 * expectedXVelocityChange,
            vy: 106 + 0.5 * expectedYVelocityChange,
          });
        });
      });
    });
  });
});
