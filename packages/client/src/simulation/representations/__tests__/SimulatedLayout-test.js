jest.mock('../../ForceSimulation');

import React from 'react'

import SimulationContext from '../SimulationContext';
import SimulatedLayout from '../SimulatedLayout';

import ForceSimulation, {
  getElementData,
  registerElement,
  registerForce,
  registerRule,
  onNewLayout,
  resetMockSimulation,
} from '../../ForceSimulation';

import utils from '../../../utils';

import { mount } from 'enzyme';

describe('SimulatedLayout', () => {

  beforeEach(() => {
    resetMockSimulation();
  });

  it('Initializes a simulation and passes it via context', () => {
    let contextValue;
    const wrapper = mount(
      <SimulatedLayout SimulationClass={ForceSimulation}>
        <SimulationContext.Consumer>
          { value => { contextValue = value; return null; } }
        </SimulationContext.Consumer>
      </SimulatedLayout>
    );

    expect(ForceSimulation).toHaveBeenCalled();
    expect(onNewLayout).toHaveBeenCalled();
    expect(registerElement).not.toHaveBeenCalled();
    expect(registerForce).not.toHaveBeenCalled();
    expect(registerRule).not.toHaveBeenCalled();

    expect(contextValue).toBeDefined();

    contextValue.registerElement();
    expect(registerElement).toHaveBeenCalled();

    contextValue.registerForce();
    expect(registerForce).toHaveBeenCalled();

    contextValue.registerRule();
    expect(registerRule).toHaveBeenCalled();
  });

  it('Passes a new instance to the context on every simulation update', () => {
    const contextValues = [];
    const wrapper = mount(
      <SimulatedLayout SimulationClass={ForceSimulation}>
        <SimulationContext.Consumer>
          { value => { contextValues.push(value); return null; } }
        </SimulationContext.Consumer>
      </SimulatedLayout>
    );

    const layoutListener = onNewLayout.mock.calls[0][0];

    layoutListener(new ForceSimulation());

    wrapper.update()
    expect(contextValues.length).toBe(2);
    expect(contextValues[1]).not.toBe(contextValues[0]);
  });
});
