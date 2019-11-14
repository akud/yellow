import Circle from '../Circle';
import CircleDefinition from '../../CircleDefinition';
import React from 'react';

import { mount } from 'enzyme';

describe('Circle', () => {
  it('renders with the given position, radius, and fill color', () => {
    const wrapper = mount(
      <Circle
        radius={5}
        color='#442200'
        id='45'
        position={{ x: 420, y: 69 }}
      />
    );
    expect(wrapper.find('circle').length).toBe(1);
    expect(wrapper.find('circle').prop('r')).toBe(5);
    expect(wrapper.find('circle').prop('fill')).toBe('#442200');
    expect(wrapper.find('circle').prop('cx')).toBe(420);
    expect(wrapper.find('circle').prop('cy')).toBe(69);
    expect(wrapper.find('circle').prop('data-element-id')).toEqual('45');
  });

  it('passes a CircleDefinition to the registerShape callback', () => {
    const registerShape = jest.fn();
    const wrapper = mount(
      <Circle
        radius={5}
        color='#442200'
        id='45'
        position={{ x: 420, y: 69 }}
        registerShape={registerShape}
      />
    );
    expect(registerShape).toHaveBeenCalledOnceWith('45', new CircleDefinition({ radius: 5 }));
  });
});
