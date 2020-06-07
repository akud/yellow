import Orientation from '../Orientation';

describe('Orientation', () => {
  describe('getOrientationRating', () => {
    it('is always 1.0 if the orientation is not spatially oriented', () => {
      const anchorPoint = { x: 0, y: 10 };
      const targetPoint = { x: 10, y: 10 };
      expect(Orientation.PRIMARY.getOrientationRating({ anchorPoint, targetPoint })).toBeCloseTo(1.0);
      expect(Orientation.UNSPECIFIED.getOrientationRating({ anchorPoint, targetPoint })).toBeCloseTo(1.0);
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
        let orientationRating = expectedOrientation.getOrientationRating({
          anchorPoint,
          targetPoint,
          range: PI_OVER_FOUR
        });
        expect(
          orientationRating,
          `expected ${JSON.stringify(targetPoint)} ` +
          `to be ${expectedOrientation.getName()}-oriented w.r.t. ` +
          `${JSON.stringify(anchorPoint)} (value: ${orientationRating})`
        ).toBeCloseTo(1);
        Object.values(Orientation)
          .filter(o => o !== expectedOrientation)
          .filter(o => o.isSpatiallyOriented())
          .forEach((notExpected) => {
            orientationRating = notExpected.getOrientationRating({
              anchorPoint,
              targetPoint,
              range: PI_OVER_FOUR,
            });
            expect(
              orientationRating,
              `expected ${JSON.stringify(targetPoint)} ` +
              `not to be ${notExpected.getName()}-oriented w.r.t. ` +
              `${JSON.stringify(anchorPoint)}`
            ).toBeCloseTo(0);
          });
      });
    });
  });

  it('returns a range of orientation ratings up to the specified range', () => {
    const testCases = [
      {
        anchorPoint: { x: 0, y: 0 },
        targetPoint: { x: 0, y: 1 },
        orientation: Orientation.RIGHT,
        range: PI_OVER_THREE,
        expectedRating: 0,
      },
      {
        anchorPoint: { x: 1, y: 1 },
        targetPoint: { x: 0, y: 1.5 },
        orientation: Orientation.BOTTOM_LEFT, //svg geometry
        range: PI_OVER_FOUR,
        expectedRating: 0.6,
      },
      {
        anchorPoint: { x: 4, y: 5 },
        targetPoint: { x: 4 + ROOT_THREE, y: 4 },
        orientation: Orientation.TOP_RIGHT, //svg geometry
        range: PI_OVER_FOUR,
        expectedRating: 0.7,
      },
      {
        anchorPoint: { x: 0, y: 0 },
        targetPoint: { x: -1, y: 0.1 },
        orientation: Orientation.LEFT,
        range: PI_OVER_THREE,
        expectedRating: 0.9,
      },
      {
        anchorPoint: { x: 0, y: 0 },
        targetPoint: { x: ROOT_THREE, y: -1 },
        orientation: Orientation.RIGHT,
        range: PI_OVER_FOUR,
        expectedRating: 0.3,
      },
    ];

    testCases.forEach(({ anchorPoint, targetPoint, orientation, range, expectedRating }) => {
      const orientationRating = orientation.getOrientationRating({
        anchorPoint,
        targetPoint,
        range
      });
      expect(
        orientationRating,
        `${orientation.name}.getOrientationRating({ ` +
        `anchorPoint=${JSON.stringify(anchorPoint)}, ` +
        `targetPoint=${JSON.stringify(targetPoint)}, ` +
        `range=${range} ` +
        `}) == ${orientationRating} (!~ ${expectedRating})`
      ).toBeCloseTo(expectedRating, 1);
    });
  });
});
