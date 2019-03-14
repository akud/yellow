import React from 'react';
import Label from '../Label';
import RectangleDefinition from 'elements/RectangleDefinition';

import { mount } from 'enzyme';

describe('Label', () => {
  let oldBoundingClientRect;
  let mockBoundingClientRect;

  beforeEach(() => {
    oldBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = mockBoundingClientRect = jest.fn()
      .mockReturnValue({ width: 0, height: 0 });
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = oldBoundingClientRect;
  });

  it('renders the provided text', () => {
    const wrapper = mount(
      <Label text="Hello World!" position={point(10, 56)} />
    ).update();

    expect(wrapper.find('text').length).toBe(1);
    expect(wrapper.find('text').text()).toEqual('Hello World!');
  });

  it('subtracts actual width and height from the position', () => {
    mockBoundingClientRect.mockReturnValue({
      width: 42,
      height: 24
    });
    const wrapper = mount(
      <Label text="Hello World!" position={point(10, 56)} />
    ).update();

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(44);
  });

  describe('getShapeDefinition', () => {
    it('returns a rectangle with width and height defined by the text size', () => {
      mockBoundingClientRect.mockReturnValue({
        width: 100,
        height: 29
      });
      const wrapper = mount(
        <Label text="Hello World!" position={point(10, 56)} />
      ).update();
      expect(wrapper.instance().getShapeDefinition()).toEqual(
        new RectangleDefinition({ width: 100, height: 29 })
      );
    });
  });
});
