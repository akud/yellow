import React from 'react';
import Label from '../Label';
import RectangleDefinition from '../../RectangleDefinition';
import ElementContext from '../ElementContext';

import { mount } from 'enzyme';

describe('Label', () => {
  let mockBoundingClientRect;
  let context;

  const baseElementProps = opts => Object.assign({
    id: '123',
    position: newPosition(),
  }, opts);

  beforeEach(() => {
    mockBoundingClientRect = registerBoundingClientRectMock();
    context = {
      registerShape: jest.fn()
    };
  });

  afterEach(() => {
    unregisterBoundingClientRectMock();
  });

  it('renders the provided text', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Label text="Hello World!" />
      </ElementContext.Provider>
    );

    expect(wrapper.find('text').length).toBe(1);
    expect(wrapper.find('text').text()).toEqual('Hello World!');
  });

  it('passes the correct element id to the ElementGroup', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Label text="Hello World!" {...baseElementProps({ id: '124' })} />
      </ElementContext.Provider>
    );

    expect(wrapper.find('ElementGroup').length).toBe(1);
    expect(wrapper.find('ElementGroup').prop('data-element-id')).toEqual('124');
  });

  it('does not render a border by default', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Label text="Hello World!" />
      </ElementContext.Provider>
    );

    expect(wrapper.find('rect').length).toBe(0);
  });

  it('positions the text based on actual width and height', () => {
    mockBoundingClientRect.mockReturnValue({
      width: 42,
      height: 24
    });
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Label
          text="Hello World!"
          {...baseElementProps({ position: point(10, 56) })}
        />
      </ElementContext.Provider>
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
      <ElementContext.Provider value={context}>
        <Label
          text="Hello World!"
          border={true}
          padding={12}
          {...baseElementProps({ position: point(10, 56) })}
        />
      </ElementContext.Provider>
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
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Label
          id='asdf'
          text="Hello World!"
          padding={5}
        />
      </ElementContext.Provider>
    );
    expect(context.registerShape).toHaveBeenCalledOnceWith(
      'asdf', new RectangleDefinition({ width: 105, height: 34 })
    );
  });
});
