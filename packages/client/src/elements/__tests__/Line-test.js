import React from 'react';

jest.mock('../geometry/geometry-utils');

import { Line } from '../Line';

import { shallow, mount } from 'enzyme';

import geometryUtils from '../geometry/geometry-utils';

describe('Line', () => {
  beforeEach(() => {
    geometryUtils.mockReset();
  });

  it('renders a line between the provided points', () => {
    const wrapper = mount(
      <Line
        color='red'
        thickness={3}
        from={{ x: 23, y: 56 }}
        to={{ x: 98, y: -12 }}
      />
    );

    expect(wrapper.find('line').length).toBe(1);
    expect(wrapper.find('line').at(0).prop('x1')).toEqual(23);
    expect(wrapper.find('line').at(0).prop('y1')).toEqual(56);
    expect(wrapper.find('line').at(0).prop('x2')).toEqual(98);
    expect(wrapper.find('line').at(0).prop('y2')).toEqual(-12);
    expect(wrapper.find('line').at(0).prop('stroke')).toEqual('red');
    expect(wrapper.find('line').at(0).prop('strokeWidth')).toBe(3);
    expect(wrapper.find('Label').length).toBe(0);
    expect(geometryUtils.midpoint).not.toHaveBeenCalled();
    expect(geometryUtils.computeHorizontalIntersectionAngle).not.toHaveBeenCalled();
  });

  it('renders a label if provided', () => {
    const thickness = 4;
    const midpoint = newPosition();
    geometryUtils.midpoint.mockReturnValue(midpoint);
    geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
      PI_OVER_FOUR
    );

    const wrapper = mount(
      <Line
        color='red'
        thickness={thickness}
        from={{ x: 23, y: 56 }}
        to={{ x: 98, y: -12 }}
        label='hello'
      />
    );

    expect(wrapper.find('Label').length).toBe(1);
    expect(wrapper.find('Label').prop('text')).toEqual('hello');
    expect(wrapper.find('Label').prop('position')).toEqual({
      x: midpoint.x,
      y: midpoint.y - thickness - 1,
    });
    expect(wrapper.find('Label').prop('alignment')).toEqual('bottom');
    expect(wrapper.find('Label').prop('rotation')).toEqual(PI_OVER_FOUR);

    expect(geometryUtils.midpoint).toHaveBeenCalledOnceWith(
      { x: 23, y: 56 },
      { x: 98, y: -12 }
    );
    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledOnceWith(
      { x: 23, y: 56 },
      { x: 98, y: -12 }
    );
  });
});
