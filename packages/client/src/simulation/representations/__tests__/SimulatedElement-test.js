jest.mock('../../ForceSimulation');

import React from 'react';
import { mount } from 'enzyme';


import Circle from '../../../elements/representations/Circle';
import CircleDefinition from '../../../elements/CircleDefinition';

import SimulatedElement from '../SimulatedElement';
import SimulationContext from '../SimulationContext';

import MockSimulation, {
  getElementData,
  registerElement,
  resetMockSimulation,
} from '../../../simulation/ForceSimulation';

describe('SimulatedElement', () => {
  let simulation;

  beforeEach(() => {
    resetMockSimulation();
    simulation = new MockSimulation();
  });

  it('renders children with element data from the simulation and registers them', () => {
    getElementData.mockReturnValue({
      position: { x: 234, y: -124 },
      velocity: { x: 420, y: 69 },
    });

    const wrapper = mount(
      <SimulationContext.Provider value={simulation}>
        <SimulatedElement id='63532l'>
          <Circle radius={5} />
        </SimulatedElement>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('Circle').length).toBe(1);
    expect(wrapper.find('Circle').prop('id')).toEqual('63532l');
    expect(wrapper.find('Circle').prop('position')).toEqual({
      x: 234, y: -124
    });
    expect(wrapper.find('Circle').prop('velocity')).toEqual({
      x: 420, y: 69
    });

    expect(registerElement).toHaveBeenCalledOnceWith(
      '63532l', new CircleDefinition({ radius: 5 })
    );
  });
});

