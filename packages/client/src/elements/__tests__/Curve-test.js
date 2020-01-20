jest.mock('../geometry/geometry-utils');

import React from 'react';

import Curve from '../Curve';

import geometryUtils from '../geometry/geometry-utils';

import { shallow } from 'enzyme';


describe('Curve', () => {
  beforeEach(() => {
    geometryUtils.mockReset();
  });

  it('renders a curve between the provided points with the given curvature', () => {
    geometryUtils.distance.mockReturnValue(150);
    geometryUtils.computeHorizontalIntersectionAngle
      .mockReturnValueOnce(PI_OVER_FOUR)
      .mockReturnValueOnce(THREE_PI_OVER_FOUR);
    geometryUtils.pointAwayFrom
      .mockReturnValueOnce({ x: 160, y: 130 })
      .mockReturnValueOnce({ x: 190, y: 130 });

    const wrapper = shallow(
      <Curve
        from={{ x: 150, y: 150 }}
        to={{ x: 200, y: 100 }}
        curvature='3'
        id='test-123'
      />
    );
    expect(wrapper.find('path').length).toBe(1);
    expect(wrapper.find('path').prop('d')).toEqual(
      'M 150 150 C 160 130, 190 130, 200 100'
    );
    expect(wrapper.find('path').prop('data-element-id')).toEqual('test-123');

    expect(geometryUtils.distance).toHaveBeenCalledOnceWith(
      { x: 150, y: 150 },
      { x: 200, y: 100 }
    );

    expect(geometryUtils.pointAwayFrom).toHaveBeenCalledWith({
      base: { x: 150, y: 150 },
      angle: PI_OVER_TWO,
      distance: 75,
    });
    expect(geometryUtils.pointAwayFrom).toHaveBeenCalledWith({
      base: { x: 200, y: 100 },
      angle: PI_OVER_TWO,
      distance: 75,
    });
    expect(geometryUtils.pointAwayFrom).toHaveBeenCalledTimes(2);
  });

  describe('getAngleOfApproach', () => {
    it('computes the angle of approach to the specified point', () => {
      const testCases = [
        {
          from: { x: 150, y: 350 },
          to: { x: 250, y: 350 },
          curvature: -4,
          naturalAngle: Math.PI / 6,
          expected: Math.PI / 2,
        },
        {
          from: { x: 250, y: 350 },
          to: { x: 150, y: 350 },
          curvature: '-4',
          naturalAngle: Math.PI / 6,
          expected: - Math.PI / 6,
        },
      ];
      testCases.forEach(({ from, to, curvature, naturalAngle, expected }) => {
        geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
          naturalAngle
        );
        expect(
          Curve.getAngleOfApproach(from, to, curvature),
          "Failed testing " +
            JSON.stringify(from) + " to " +
            JSON.stringify(to) + " at " + curvature
        ).toBeCloseTo(
          expected
        );
      });
    });
  });
});
