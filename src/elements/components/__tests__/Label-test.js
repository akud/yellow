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
      .mockReturnValue({ width: 10, height: 10 });
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = oldBoundingClientRect;
  });

  it('renders the provided text', async () => {
    const wrapper = await render(
      <Label text="Hello World!" position={point(10, 56)} />
    );

    expect(wrapper.find('text').length).toBe(1);
    expect(wrapper.find('text').text()).toEqual('Hello World!');
  });

  it('does not render a border by default', async () => {
    const wrapper = await render(
      <Label text="Hello World!" position={point(10, 56)} />
    );

    expect(wrapper.find('rect').length).toBe(0);
  });

  it('positions the text based on actual width and height', async () => {
    mockBoundingClientRect.mockReturnValue({
      width: 42,
      height: 24
    });
    const wrapper = await render(
      <Label text="Hello World!" position={point(10, 56)} />
    );

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(44);
  });

  it('renders a border with padding if specified', async () => {
    mockBoundingClientRect.mockReturnValue({
      width: 44,
      height: 24
    });
    const wrapper = await render(
      <Label
        text="Hello World!"
        position={point(10, 56)}
        border={true}
        padding={12}
      />
    );

    expect(wrapper.find('rect').length).toBe(1);
    expect(wrapper.find('rect').at(0).props()).toEqual({
      x: -18,
      y: 38,
      width: 56,
      height: 36,
      stroke: 'black',
      'fill-opacity': 0,
    });
  });

  describe('getShapeDefinition', () => {
    it('returns a rectangle defined by actual size and padding', async () => {
      mockBoundingClientRect.mockReturnValue({
        width: 100,
        height: 29
      });
      const wrapper = await render(
        <Label text="Hello World!" position={point(10, 56) padding={5}} />
      );
      const shapeDefinition = await wrapper.instance().getShapeDefinition();
      expect(shapeDefinition).toEqual(
        new RectangleDefinition({ width: 105, height: 34 })
      );
    });
  });
});
