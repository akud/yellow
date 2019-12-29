import React from 'react';

import SimulationWindow from '../SimulationWindow';

import { mount } from 'enzyme';

describe('SimulationWindow', () => {
  it('renders a SimulatedLayout inside a DisplayWindow and passes context', () => {
    const wrapper = mount(
      <SimulationWindow border={true} width={500} height={1000} zoom={2.0}>
        <p>hello!</p>
      </SimulationWindow>
    );

    const displayWindow = wrapper.find('DisplayWindow');
    expect(displayWindow.length).toBe(1);
    expect(displayWindow.prop('border')).toBe(true);
    expect(displayWindow.prop('width')).toBe(500);
    expect(displayWindow.prop('height')).toBe(1000);

    const simulatedLayout = displayWindow.find('SimulatedLayout');
    expect(simulatedLayout.length).toBe(1);
    expect(simulatedLayout.prop('width')).toBe(250);
    expect(simulatedLayout.prop('height')).toBe(500);
    expect(simulatedLayout.prop('center')).toEqual({ x: 125, y: 250 });

    expect(simulatedLayout.find('p').length).toBe(1);
    expect(simulatedLayout.find('p').text()).toEqual('hello!');
  });
});
