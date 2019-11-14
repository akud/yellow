import React from 'react';

import RectangleDefinition from '../../RectangleDefinition';
import Image from '../Image';

import { mount } from 'enzyme';

describe('Image', () => {
  it('renders an svg image', () => {
    const wrapper = mount(
      <Image
        src="image_src"
        width={100}
        height={200}
        id='234'
        position={point(500, 700)}
      />
    );
    expect(wrapper.find('image').length).toBe(1);
    expect(wrapper.find('image').prop('href')).toEqual('image_src');
    expect(wrapper.find('image').prop('x')).toEqual(450);
    expect(wrapper.find('image').prop('y')).toEqual(600);
    expect(wrapper.find('image').prop('width')).toEqual(100);
    expect(wrapper.find('image').prop('height')).toEqual(200);
    expect(wrapper.find('image').prop('data-element-id')).toEqual('234');
  });

  it('registers a rectangle with element config', () => {
    const registerShape = jest.fn();
    const wrapper = mount(
      <Image
        src="image_src"
        width={100}
        height={200}
        id='234'
        position={point(500, 700)}
        registerShape={registerShape}
      />
    );
    expect(registerShape).toHaveBeenCalledOnceWith(
      '234', new RectangleDefinition({ width: 100, height: 200 })
    );
  });
});
