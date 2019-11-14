import React from 'react';
import Label from '../Label';
import RectangleDefinition from '../../RectangleDefinition';

import { mount } from 'enzyme';

describe('Label', () => {
  let mockBoundingClientRect;

  const baseElementProps = opts => Object.assign({
    id: '123',
    position: newPosition(),
    registerShape: jest.fn(),
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

  it('passes the correct element id to the ElementGroup', () => {
    const wrapper = mount(
      <Label text="Hello World!" {...baseElementProps({ id: '124' })} />
    );

    expect(wrapper.find('ElementGroup').length).toBe(1);
    expect(wrapper.find('ElementGroup').prop('data-element-id')).toEqual('124');
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
        {...baseElementProps({ position: point(10, 56) })}
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
        {...baseElementProps({ position: point(10, 56) })}
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
    const registerShape = jest.fn();
    const wrapper = mount(
      <Label
        text="Hello World!"
        padding={5}
        {...baseElementProps({ id: 'asdf', registerShape })}
      />
    );
    expect(registerShape).toHaveBeenCalledOnceWith(
      'asdf', new RectangleDefinition({ width: 105, height: 34 })
    );
  });
});
