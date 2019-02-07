import geometryUtils from '../geometry-utils';

describe('geometry utils', () => {
  describe('slope', () => {
    it('computes the slope of the line between two points', () => {
      expect(geometryUtils.slope({ x: 2, y: 3 }, { x: 7, y: 10 })).toBeCloseTo(7 / 5);
    });
  });

  describe('angle', () => {
    it('computes the angle of the line formed by the two points', () => {
      expect(geometryUtils.angle({ x: 1, y: 1 }, { x: 5, y: 5 })).toBeCloseTo(Math.PI / 4);
      expect(geometryUtils.angle({ x: 1, y: 1 }, { x: 4, y: 1 + 3 * Math.sqrt(3) })).toBeCloseTo(Math.PI / 3);
      expect(geometryUtils.angle({ x: 1, y: 1 }, { x: 1 + 3 * Math.sqrt(3), y: 4 })).toBeCloseTo(Math.PI / 6);
    });
  });

  describe('approximatelyEqual', () => {
    it('compares numbers up to two decimal points', () => {
      expect(geometryUtils.approximatelyEqual(2.01324, 2.01259)).toBe(true);
      expect(geometryUtils.approximatelyEqual(2.01324, 2.02259)).toBe(false);
    });
  });
});
