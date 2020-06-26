import React from 'react';

import { Curve } from '../Curve';

import geometryUtils from '../geometry/geometry-utils';

import { mount } from 'enzyme';

describe('Curve Labels', () => {
  it('renders labels if provided', () => {
    const wrapper = mount(
      <Curve
        from={{ x: 150, y: 150 }}
        to={{ x: 200, y: 100 }}
        curvature='3'
        id='test-123'
        label='hello'
      />
    );
    expect(wrapper.find('Label').length).toBe(1);

    expect(wrapper.find('Label').prop('position')).toBeTruthy();
    expect(wrapper.find('Label').prop('position').x).toBeTruthy();
    expect(wrapper.find('Label').prop('position').y).toBeTruthy();

    expect(wrapper.find('Label').prop('text')).toEqual('hello');

    expect(wrapper.find('Label').prop('rotation') >= 0).toBeTruthy();
    expect(wrapper.find('Label').prop('rotation') <= TWO_PI).toBeTruthy();
  });
});
