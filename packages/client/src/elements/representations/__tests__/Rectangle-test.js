import Rectangle from '../Rectangle';
import RectangleDefinition from '../../RectangleDefinition';
import React from 'react';

import { mount } from 'enzyme';

describe('Rectangle', () => {
  it('renders with the given position, width, height, and fill color', () => {
    const wrapper = mount(
      <Rectangle
        width={20}
        height={18}
        color='#442200'
        config={{
          id: '123',
          position: { x: 420, y: 69 },
          postRender: () => {},
        }}
      />
    );
    expect(wrapper.find('rect').length).toBe(1);
    expect(wrapper.find('rect').prop('width')).toBe(20);
    expect(wrapper.find('rect').prop('height')).toBe(18);
    expect(wrapper.find('rect').prop('fill')).toBe('#442200');
    expect(wrapper.find('rect').prop('x')).toBe(410);
    expect(wrapper.find('rect').prop('y')).toBe(60);
    expect(wrapper.find('rect').prop('data-element-id')).toEqual('123');
  });

  it('registers a RectangleDefinition with the postRender callback', () => {
    const postRender = jest.fn();
    const wrapper = mount(
      <Rectangle
        width={20}
        height={18}
        color='#442200'
        config={{
          id: '123',
          position: { x: 420, y: 69 },
          postRender,
        }}
      />
    );

    expect(postRender).toHaveBeenCalledOnceWith(new RectangleDefinition({
      width: 20,
      height: 18,
    }));
  });
});
