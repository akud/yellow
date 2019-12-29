import React from 'react';

import Line from '../Line';

import { shallow } from 'enzyme';

describe('Line', () => {
  it('renders a line between the provided points', () => {
    const wrapper = shallow(
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
  });
});
