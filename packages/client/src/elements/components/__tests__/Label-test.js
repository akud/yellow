import React from 'react';
import Label from '../Label';
import RectangleDefinition from 'elements/RectangleDefinition';

import { mount } from 'enzyme';

describe('Label', () => {
  let mockBoundingClientRect;

  const newElementConfig = opts => Object.assign({
    id: '123',
    position: newPosition(),
    postRender: () => {},
  }, opts);

  beforeEach(() => {
    mockBoundingClientRect = registerBoundingClientRectMock();
  });

  afterEach(() => {
    unregisterBoundingClientRectMock();
  });

  it('renders the provided text without element config', () => {
    const wrapper = mount(<Label text="Hello World!" />);

    expect(wrapper.find('text').length).toBe(1);
    expect(wrapper.find('text').text()).toEqual('Hello World!');
  });

  it('passes the correct element id to the g element', () => {
    const wrapper = mount(
      <Label text="Hello World!" config={newElementConfig({ id: '124' })} />
    );

    expect(wrapper.find('g').length).toBe(1);
    expect(wrapper.find('g').prop('data-element-id')).toEqual('124');
  });

  it('does not render a border by default', () => {
    const wrapper = mount(<Label text="Hello World!" />);

    expect(wrapper.find('rect').length).toBe(0);
  });

  it('positions the text based on actual width and height', () => {
    mockBoundingClientRect.mockReturnValue({
      width: 42,
      height: 24
    });
    const wrapper = mount(
      <Label
        text="Hello World!"
        config={newElementConfig({ position: point(10, 56) })}
      />
    ).update();

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(62);
  });

  it('renders a border with padding if specified', () => {
    mockBoundingClientRect.mockReturnValue({
      width: 44,
      height: 24
    });
    const wrapper = mount(
      <Label
        text="Hello World!"
        border={true}
        padding={12}
        config={newElementConfig({ position: point(10, 56) })}
      />
    ).update();

    expect(wrapper.find('rect').length).toBe(1);
    expect(wrapper.find('rect').at(0).props()).toEqual({
      x: -18,
      y: 38,
      width: 56,
      height: 36,
      stroke: 'black',
      fillOpacity: 0,
    });
  });

  it('registers a rectangle defined by actual size and padding', () => {
    mockBoundingClientRect.mockReturnValue({
      width: 100,
      height: 29
    });
    const postRender = jest.fn();
    const wrapper = mount(
      <Label
        text="Hello World!"
        padding={5}
        config={newElementConfig({ postRender })}
      />
    );
    expect(postRender).toHaveBeenCalledOnceWith(
      new RectangleDefinition({ width: 105, height: 34 })
    );
  });
});
