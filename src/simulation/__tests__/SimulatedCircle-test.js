jest.mock('../geometry');

import SimulatedCircle from '../SimulatedCircle';
import geometry from '../geometry';

describe('SimulatedCircle', () => {
  beforeEach(() => {

  });

  afterEach(() => {

  });

  describe('computeIntersectionWithLine', () => {
    it('uses the geometry module to compute the intersection', () => {
      const result = { x: 12, y: 34 };
      geometry.computeCircleIntersection.mockReturnValue(result);
      const body = new SimulatedCircle({
        id: '1',
        radius: 2,
        x: 45,
        y: 89,
      });

      expect(body.computeIntersectionWithLine({ x: 56, y: 78 })).toEqual(result);
      expect(geometry.computeCircleIntersection).toHaveBeenCalledWith({
        nearPoint: { x: 45, y:89 },
        farPoint: { x: 56, y: 78 },
        radius: 2,
      });
    });
  });
});
