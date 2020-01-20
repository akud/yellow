import Orientation from '../Orientation';

describe('Orientation', () => {
  describe('isOriented', () => {
    it('is always true if the orientation is not spatially oriented', () => {
      const anchorPoint = { x: 0, y: 10 };
      const targetPoint = { x: 10, y: 10 };
      expect(Orientation.PRIMARY.isOriented({ anchorPoint, targetPoint })).toBe(true);
      expect(Orientation.UNSPECIFIED.isOriented({ anchorPoint, targetPoint })).toBe(true);
    });

    it('indicates if the points are correctly oriented within an svg geometry', () => {
      const testCases = [
        {
          anchorPoint: { x: 10, y: 10 },
          targetPoint: { x: 10, y: 8 },
          expectedOrientation: Orientation.TOP,
        },
        {
          anchorPoint: { x: 10, y: 8 },
          targetPoint: { x: 10, y: 10 },
          expectedOrientation: Orientation.BOTTOM,
        },
        {
          anchorPoint: { x: 4, y: 10 },
          targetPoint: { x: 10, y: 10 },
          expectedOrientation: Orientation.RIGHT,
        },
        {
          anchorPoint: { x: 10, y: 10 },
          targetPoint: { x: 4, y: 10 },
          expectedOrientation: Orientation.LEFT,
        },
        {
          anchorPoint: { x: 10, y: 10 },
          targetPoint: { x: 12, y: 8 },
          expectedOrientation: Orientation.TOP_RIGHT,
        },
        {
          anchorPoint: { x: 10, y: 10 },
          targetPoint: { x: 8, y: 8 },
          expectedOrientation: Orientation.TOP_LEFT,
        },
        {
          anchorPoint: { x: 10, y: 10 },
          targetPoint: { x: 8, y: 12 },
          expectedOrientation: Orientation.BOTTOM_LEFT,
        },
        {
          anchorPoint: { x: 10, y: 10 },
          targetPoint: { x: 12, y: 12 },
          expectedOrientation: Orientation.BOTTOM_RIGHT,
        },
      ];

      testCases.forEach(({ anchorPoint, targetPoint, expectedOrientation }) => {
        expect(
          expectedOrientation.isOriented({ anchorPoint, targetPoint }),
          `expected ${JSON.stringify(targetPoint)} ` +
          `to be ${expectedOrientation.getName()}-oriented w.r.t. ` +
          `${JSON.stringify(anchorPoint)}`
        ).toBe(true);
        Object.values(Orientation)
          .filter(o => o !== expectedOrientation)
          .filter(o => o.isSpatiallyOriented())
          .forEach((notExpected) => {
            expect(
              notExpected.isOriented({ anchorPoint, targetPoint }),
              `expected ${JSON.stringify(targetPoint)} ` +
              `not to be ${notExpected.getName()}-oriented w.r.t. ` +
              `${JSON.stringify(anchorPoint)}`
            ).toBe(false);
          });
      });
    });
  });

  it('accepts a tolerance value to determine orientation', () => {
    const anchorPoint = { x: 0, y: 0 };
    const targetPoint = { x: 1, y: -1 };

    expect(Orientation.TOP.isOriented({ anchorPoint, targetPoint })).toBe(false);
    expect(Orientation.TOP.isOriented({
      anchorPoint,
      targetPoint,
      tolerance: Math.PI / 3
    })).toBe(true);
    expect(Orientation.BOTTOM.isOriented({
      anchorPoint,
      targetPoint,
      tolerance: Math.PI / 3
    })).toBe(false);
  });
});
