jest.mock('../../ForceSimulation');
jest.mock('../../../elements/ShapeDefinition');

import React from 'react';
import { mount } from 'enzyme';

import SimulatedElement from '../SimulatedElement';
import SimulationContext from '../SimulationContext';

import MockSimulation, {
  getElementData,
  registerElement,
  resetMockSimulation,
} from '../../../simulation/ForceSimulation';
import MockShapeDefinition from '../../../elements/ShapeDefinition';

describe('SimulatedElement', () => {
  let simulation;

  beforeEach(() => {
    resetMockSimulation();
    simulation = new MockSimulation();
  });

  it('calls the render prop with simulated element data', () => {
    const renderProp = jest.fn().mockReturnValue(<div id='asdf' />);
    getElementData.mockReturnValue({
      position: { x: 234, y: -124 },
      velocity: { x: 420, y: 69 },
    });

    const wrapper = mount(
      <SimulationContext.Provider value={simulation}>
        <SimulatedElement id='63532l' render={renderProp} />
      </SimulationContext.Provider>
    );

    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div').prop('id')).toEqual('asdf');

    expect(renderProp).toHaveBeenCalledOnceWith({
      position: { x: 234, y: -124 },
      velocity: { x: 420, y: 69 },
      registerShape: expect.any(Function),
    });
  });

  it('passes a shape registration callback to the render prop', () => {
    const shape = new MockShapeDefinition();
    const renderProp = jest.fn().mockReturnValue(<div />);
    const onShapeRegistration = jest.fn();
    getElementData.mockReturnValue({
      position: { x: 234, y: -124 },
      velocity: { x: 420, y: 69 },
    });

    const wrapper = mount(
      <SimulationContext.Provider value={simulation}>
        <SimulatedElement
          id='63532l'
          render={renderProp}
          onShapeRegistration={onShapeRegistration}
        />
      </SimulationContext.Provider>
    );

    const registerShapeCallback = renderProp.mock.calls[0][0].registerShape;

    registerShapeCallback(shape);

    expect(registerElement).toHaveBeenCalledOnceWith('63532l', shape);
    expect(onShapeRegistration).toHaveBeenCalledOnceWith('63532l', shape);
  });
});

