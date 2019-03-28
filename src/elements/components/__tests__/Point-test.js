import Point from '../Point';
import PointDefinition from 'elements/PointDefinition';
import React from 'react';

import { mount } from 'enzyme';

describe('Point', () => {
  it('registers a PointDefinition with the postRender callback', () => {
    const postRender = jest.fn();
    const wrapper = mount(
      <Point
        config={{
          id: '123',
          position: { x: 420, y: 69 },
          postRender,
        }}
      />
    );

    expect(postRender).toHaveBeenCalledOnceWith(new PointDefinition());
  });
});
