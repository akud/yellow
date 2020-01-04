import React from 'react';

import RectangleDefinition from '../geometry/RectangleDefinition';
import Image from '../Image';
import ElementContext from '../ElementContext';

import { mount } from 'enzyme';

describe('Image', () => {
  let context;

  beforeEach(() => {
    context = { registerShape: jest.fn() };
  });

  it('renders an svg image', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Image
          src="image_src"
          width={100}
          height={200}
          id='234'
          position={point(500, 700)}
        />
      </ElementContext.Provider>
    );
    expect(wrapper.find('image').length).toBe(1);
    expect(wrapper.find('image').prop('href')).toEqual('image_src');
    expect(wrapper.find('image').prop('x')).toEqual(450);
    expect(wrapper.find('image').prop('y')).toEqual(600);
    expect(wrapper.find('image').prop('width')).toEqual(100);
    expect(wrapper.find('image').prop('height')).toEqual(200);
    expect(wrapper.find('image').prop('data-element-id')).toEqual('234');
  });

  it('registers a rectangle with element context', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Image
          src="image_src"
          id='image-register-id'
          width={100}
          height={200}
          position={point(500, 700)}
        />
      </ElementContext.Provider>
    );
    expect(context.registerShape).toHaveBeenCalledOnceWith(
      'image-register-id', new RectangleDefinition({ width: 100, height: 200 })
    );
  });

  it('renders the image inside a link if one is provided', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Image
          src="image_src"
          width={100}
          height={200}
          id='234'
          position={point(500, 700)}
          link='https://foo.bar.com'
        />
      </ElementContext.Provider>
    );

    const link = wrapper.find('Link');
    expect(link.length).toBe(1);
    expect(link.prop('href')).toEqual('https://foo.bar.com');
    expect(link.prop('inline')).toBe(false);

    expect(link.find('image').length).toBe(1);
  });

  it('handles object-style links', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Image
          src="image_src"
          width={100}
          height={200}
          id='234'
          position={point(500, 700)}
          link={{ href: 'https://foo.bar.com', inline: true }}
        />
      </ElementContext.Provider>
    );

    const link = wrapper.find('Link');
    expect(link.length).toBe(1);
    expect(link.prop('href')).toEqual('https://foo.bar.com');
    expect(link.prop('inline')).toBe(true);

    expect(link.find('image').length).toBe(1);
  });
});
