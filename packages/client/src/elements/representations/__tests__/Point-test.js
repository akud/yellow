import Point from '../Point';
import PointDefinition from '../../PointDefinition';
import React from 'react';

import { mount } from 'enzyme';

describe('Point', () => {
  it('registers a PointDefinition with the registerShape callback', () => {
    const registerShape = jest.fn();
    const wrapper = mount(
      <Point registerShape={registerShape} />
    );

    expect(registerShape).toHaveBeenCalledOnceWith(new PointDefinition());
  });
});
