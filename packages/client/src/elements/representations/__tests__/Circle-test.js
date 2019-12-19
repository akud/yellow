import Circle from '../Circle';
import ElementContext from '../ElementContext';
import CircleDefinition from '../../CircleDefinition';
import React from 'react';

import { mount } from 'enzyme';

describe('Circle', () => {
  let context;

  beforeEach(() => {
    context = { registerShape: jest.fn() };
  });

  it('renders with the given position, radius, and fill color', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Circle
          radius={5}
          color='#442200'
          id='45'
          position={{ x: 420, y: 69 }}
        />
      </ElementContext.Provider>
    );
    expect(wrapper.find('circle').length).toBe(1);
    expect(wrapper.find('circle').prop('r')).toBe(5);
    expect(wrapper.find('circle').prop('fill')).toBe('#442200');
    expect(wrapper.find('circle').prop('cx')).toBe(420);
    expect(wrapper.find('circle').prop('cy')).toBe(69);
    expect(wrapper.find('circle').prop('data-element-id')).toEqual('45');
  });

  it('passes a CircleDefinition to the registerShape callback', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <Circle
          id='circle-register-id'
          radius={5}
          color='#442200'
          position={{ x: 420, y: 69 }}
        />
      </ElementContext.Provider>
    );
    expect(context.registerShape).toHaveBeenCalledOnceWith(
      'circle-register-id', new CircleDefinition({ radius: 5 })
    );
  });
});
