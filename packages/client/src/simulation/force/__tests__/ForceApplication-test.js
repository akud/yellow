import ForceApplication from '../ForceApplication';

describe('ForceApplication', () => {
  const makeForce = (args) => new ForceApplication(Object.assign(
    {
      elementIds: [ '1' ],
      angle: ZERO,
      strength: 1.0,
    },
    args
  ));

  it('it breaks the angle into x and y components', () => {
    const testCases = [
      {
        description: '0',
        angle: ZERO,
        expectedXComponent: 1,
        expectedYComponent: 0,
      },
      {
        description: 'π/4',
        angle: PI_OVER_FOUR,
        expectedXComponent: ROOT_TWO_OVER_TWO,
        expectedYComponent: ROOT_TWO_OVER_TWO,
      },
      {
        description: 'π/2',
        angle: PI_OVER_TWO,
        expectedXComponent: 0,
        expectedYComponent: 1,
      },
      {
        description: '3π/4',
        angle: THREE_PI_OVER_FOUR,
        expectedXComponent: -ROOT_TWO_OVER_TWO,
        expectedYComponent: ROOT_TWO_OVER_TWO,
      },
      {
        description: 'π',
        angle: PI,
        expectedXComponent: -1,
        expectedYComponent: 0,
      },
      {
        description: '5π/4',
        angle: FIVE_PI_OVER_FOUR,
        expectedXComponent: -ROOT_TWO_OVER_TWO,
        expectedYComponent: -ROOT_TWO_OVER_TWO,
      },
      {
        description: '3π/2',
        angle: THREE_PI_OVER_TWO,
        expectedXComponent: 0,
        expectedYComponent: -1,
      },
      {
        description: '7π/4',
        angle: SEVEN_PI_OVER_FOUR,
        expectedXComponent: ROOT_TWO_OVER_TWO,
        expectedYComponent: -ROOT_TWO_OVER_TWO,
      },
      {
        description: '2π',
        angle: TWO_PI,
        expectedXComponent:  1.0,
        expectedYComponent: 0,
      },
    ];

    testCases.forEach(({ description, angle, expectedXComponent, expectedYComponent }) => {
      const force = makeForce({ angle });
      expect(force.getXComponent(), description).toBeCloseTo(expectedXComponent);
      expect(force.getYComponent(), description).toBeCloseTo(expectedYComponent);
    });
  });
});
