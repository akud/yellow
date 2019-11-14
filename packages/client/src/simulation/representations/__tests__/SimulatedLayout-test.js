jest.mock('../../ForceSimulation');

import React from 'react'

import Circle from '../../../elements/representations/Circle';
import CircleDefinition from '../../../elements/CircleDefinition';

import SimulationContext from '../SimulationContext';
import SimulatedLayout from '../SimulatedLayout';

import ForceSimulation, {
  getElementData,
  registerElement,
  registerRule,
  setRepellingForceStrength,
  onNewLayout,
  resetMockSimulation,
} from '../../ForceSimulation';

import utils from '../../../utils';

import { mount } from 'enzyme';

describe('SimulatedLayout', () => {

  beforeEach(() => {
    resetMockSimulation();
  });

  it('wraps children in a SimulatedElement', () => {
    const onShapeRegistration1 = jest.fn();
    const onShapeRegistration2 = jest.fn();
    getElementData
      .mockReturnValueOnce({
        position: { x: 145, y: 85346 },
        velocity: { x: -53, y: 0 },
      })
      .mockReturnValueOnce({
        position: { x: 635, y: -81 },
        velocity: { x: 364, y: -6345 },
      });


    const wrapper = mount(
      <SimulatedLayout SimulationClass={ForceSimulation}>
        <Circle id='element-1' radius={5} onShapeRegistration={onShapeRegistration1} />
        <Circle id='element-2' radius={34} onShapeRegistration={onShapeRegistration2} />
      </SimulatedLayout>
    );

    expect(wrapper.find('SimulatedElement').length).toBe(2);

    const firstElement = wrapper.find('SimulatedElement').at(0);
    const secondElement = wrapper.find('SimulatedElement').at(1);

    expect(firstElement.prop('id')).toEqual('element-1');
    expect(firstElement.find('Circle').length).toBe(1);
    expect(firstElement.find('Circle').prop('id')).toEqual('element-1');
    expect(firstElement.find('Circle').prop('position')).toEqual({ x: 145, y: 85346 });
    expect(firstElement.find('Circle').prop('velocity')).toEqual({ x: -53, y: 0 });
    expect(firstElement.find('Circle').prop('registerShape')).toBeInstanceOf(Function);
    expect(registerElement).toHaveBeenCalledWith(
      'element-1', new CircleDefinition({ radius: 5})
    );
    expect(onShapeRegistration1).toHaveBeenCalledOnceWith(
      'element-1', new CircleDefinition({ radius: 5})
    );

    expect(secondElement.prop('id')).toEqual('element-2');
    expect(secondElement.find('Circle').length).toBe(1);
    expect(secondElement.find('Circle').prop('id')).toEqual('element-2');
    expect(secondElement.find('Circle').prop('position')).toEqual({ x: 635, y: -81 });
    expect(secondElement.find('Circle').prop('velocity')).toEqual({ x: 364, y: -6345 });
    expect(secondElement.find('Circle').prop('registerShape')).toBeInstanceOf(Function);

    expect(registerElement).toHaveBeenCalledWith(
      'element-2', new CircleDefinition({ radius: 34 })
    );
    expect(onShapeRegistration2).toHaveBeenCalledOnceWith(
      'element-2', new CircleDefinition({ radius: 34 })
    );

    expect(registerElement).toHaveBeenCalledTimes(2);
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
    expect(registerRule).not.toHaveBeenCalled();
    expect(setRepellingForceStrength).not.toHaveBeenCalled();

    expect(contextValue).toBeDefined();

    contextValue.registerElement();
    expect(registerElement).toHaveBeenCalled();

    contextValue.registerRule();
    expect(registerRule).toHaveBeenCalled();

    contextValue.setRepellingForceStrength();
    expect(setRepellingForceStrength).toHaveBeenCalled();
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
