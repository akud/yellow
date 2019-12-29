import React from 'react';

import Graph from '../Graph';
import GraphStyle from '../GraphStyle';

import { shallow } from 'enzyme';

describe('Graph', () => {
  it('renders children inside a simulation window', () => {
    const wrapper = shallow(
      <Graph>
        <p>Hello!</p>
      </Graph>
    );
    const simulationWindow = wrapper.find('SimulationWindow');

    expect(simulationWindow.prop('width')).toBe(500);
    expect(simulationWindow.prop('height')).toBe(500);
    expect(simulationWindow.prop('zoom')).toBe(1.0);
    expect(simulationWindow.prop('border')).toBe(false)

    expect(simulationWindow.find('p').length).toBe(1);
    expect(simulationWindow.find(GraphStyle.Default).length).toBe(1);
  });

  it('forwards props to the SimulationWindow', () => {
    const wrapper = shallow(
      <Graph
        width={1000}
        height={1500}
        zoom={2.0}
        border={true}
      >
        <p>Hello!</p>
      </Graph>
    );
    const simulationWindow = wrapper.find('SimulationWindow');
    expect(simulationWindow.prop('width')).toBe(1000);
    expect(simulationWindow.prop('height')).toBe(1500);
    expect(simulationWindow.prop('zoom')).toBe(2.0);
    expect(simulationWindow.prop('border')).toBe(true)
  });
});
