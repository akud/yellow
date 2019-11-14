import Point from '../Point';
import PointDefinition from '../../PointDefinition';
import React from 'react';

import { mount } from 'enzyme';

describe('Point', () => {
  it('registers a PointDefinition with the registerShape callback', () => {
    const registerShape = jest.fn();
    const wrapper = mount(
      <Point
        id='123'
        position={{ x: 420, y: 69 }}
        registerShape={registerShape}
      />
    );

    expect(registerShape).toHaveBeenCalledOnceWith('123', new PointDefinition());
  });
});
