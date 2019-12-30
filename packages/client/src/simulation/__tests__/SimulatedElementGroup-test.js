jest.mock('../force/ForceSimulation');
jest.mock('../force/PositioningRules');
jest.mock('../force/LinkingRules');

import Orientation from '../Orientation';
import SimulatedElementGroup from '../SimulatedElementGroup';

import Circle from '../../elements/Circle';
import CircleDefinition from '../../elements/geometry/CircleDefinition';

import { createOrientingRule } from '../force/PositioningRules';
import { createBindingRule } from '../force/LinkingRules';
import MockSimulation, {
  getElementData,
  registerElement,
  registerRule,
  registerGroup,
  resetMockSimulation,
} from '../force/ForceSimulation'
import SimulationContext from '../SimulationContext';

import React from 'react';
import { mount } from 'enzyme';

describe('SimulatedElementGroup', () => {

  const newElementData = opts => Object.assign({
    position: newPosition(),
    velocity: newPosition(),
    shape: new CircleDefinition({ radius: 4 }),
  }, opts);

  beforeEach(() => {
    resetMockSimulation();
    createOrientingRule.mockReset();
    createBindingRule.mockReset();
    getElementData.mockImplementation(newElementData);
  });

  it('registers children in the simulation and passes data to them', () => {
    const elementData = newElementData();

    getElementData.mockReturnValue(elementData);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup id='2'>
          <Circle radius={4.5}/>
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('Circle').length).toBe(1);
    expect(wrapper.find('Circle').prop('position')).toEqual(elementData.position);
    expect(wrapper.find('Circle').prop('id')).toEqual('2_primary');

    expect(getElementData).toHaveBeenCalledOnceWith('2_primary');
    expect(registerElement).toHaveBeenCalledOnceWith(
      '2_primary', new CircleDefinition({ radius: 4.5 })
    );
  });

  it('assigns element ids to children based on orientation', () => {
    const primaryElement = newElementData();
    const subElement1 = newElementData();
    const subElement2 = newElementData();

    getElementData.mockImplementation((elementId) => ({
      '2_0': subElement1,
      '2_primary': primaryElement,
      '2_2': subElement2,
    })[elementId]);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup id='2'>
          <Circle radius={1} orientation={Orientation.TOP_LEFT} />
          <Circle radius={2} orientation={Orientation.PRIMARY} />
          <Circle radius={3} orientation={Orientation.TOP_RIGHT} />
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('Circle').length).toBe(3);

    expect(wrapper.find('Circle').at(0).prop('position')).toEqual(subElement1.position);
    expect(wrapper.find('Circle').at(1).prop('position')).toEqual(primaryElement.position);
    expect(wrapper.find('Circle').at(2).prop('position')).toEqual(subElement2.position);

    expect(wrapper.find('Circle').at(0).prop('id')).toEqual('2_0');
    expect(wrapper.find('Circle').at(1).prop('id')).toEqual('2_primary');
    expect(wrapper.find('Circle').at(2).prop('id')).toEqual('2_2');

    expect(getElementData).toHaveBeenCalledWith('2_0');
    expect(getElementData).toHaveBeenCalledWith('2_primary');
    expect(getElementData).toHaveBeenCalledWith('2_2');

    expect(registerElement).toHaveBeenCalledWith(
      '2_0', new CircleDefinition({ radius: 1 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      '2_primary', new CircleDefinition({ radius: 2 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      '2_2', new CircleDefinition({ radius: 3 })
    );
    expect(registerElement).toHaveBeenCalledTimes(3);
  });

  it('can infer the primary element', () => {
    const primaryElement = newElementData();
    const subElement1 = newElementData();
    const subElement2 = newElementData();

    getElementData.mockImplementation((elementId) => ({
      'inferred_0': subElement1,
      'inferred_primary': primaryElement,
      'inferred_2': subElement2,
    })[elementId]);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup id='inferred'>
          <Circle radius={1} orientation={Orientation.TOP_LEFT} />
          <Circle radius={2} />
          <Circle radius={3} orientation={Orientation.TOP_RIGHT} />
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('Circle').length).toBe(3);

    expect(wrapper.find('Circle').at(0).prop('position')).toEqual(subElement1.position);
    expect(wrapper.find('Circle').at(1).prop('position')).toEqual(primaryElement.position);
    expect(wrapper.find('Circle').at(2).prop('position')).toEqual(subElement2.position);

    expect(wrapper.find('Circle').at(0).prop('id')).toEqual('inferred_0');
    expect(wrapper.find('Circle').at(1).prop('id')).toEqual('inferred_primary');
    expect(wrapper.find('Circle').at(2).prop('id')).toEqual('inferred_2');

    expect(getElementData).toHaveBeenCalledWith('inferred_0');
    expect(getElementData).toHaveBeenCalledWith('inferred_primary');
    expect(getElementData).toHaveBeenCalledWith('inferred_2');

    expect(registerElement).toHaveBeenCalledWith(
      'inferred_0', new CircleDefinition({ radius: 1 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      'inferred_primary', new CircleDefinition({ radius: 2 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      'inferred_2', new CircleDefinition({ radius: 3 })
    );
    expect(registerElement).toHaveBeenCalledTimes(3);
  });

  it('registers data with the simulation to set up element bindings', () => {
    const bindingRule1 = jest.fn();
    const bindingRule2 = jest.fn();
    const bindingRule3 = jest.fn();
    const relativePositioningRule1 = jest.fn();
    const relativePositioningRule2 = jest.fn();

    createBindingRule
      .mockReturnValueOnce(bindingRule1)
      .mockReturnValueOnce(bindingRule2)
      .mockReturnValueOnce(bindingRule3);
    createOrientingRule
      .mockReturnValueOnce(relativePositioningRule1)
      .mockReturnValueOnce(relativePositioningRule2);

    getElementData.mockImplementation((elementId) => ({
      'rules_0': newElementData({ shape: new CircleDefinition({ radius: 3 }) }),
      'rules_primary': newElementData({ shape: new CircleDefinition({ radius: 4 }) }),
      'rules_2': newElementData({ shape: new CircleDefinition({ radius: 5 }) }),
      'rules_3': newElementData({ shape: new CircleDefinition({ radius: 6 }) }),
    })[elementId]);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup
          id='rules'
          bindingStrength={4.3}
        >
          <Circle radius={3} orientation={Orientation.TOP_LEFT} />
          <Circle radius={4} />
          <Circle radius={5} orientation={Orientation.TOP_RIGHT} />
          <Circle radius={6} />
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );

    expect(registerGroup).toHaveBeenCalledOnceWith(
      'rules', ['rules_0', 'rules_primary', 'rules_2', 'rules_3']
    );

    expect(registerRule).toHaveBeenCalledWith(
      'rules:binding:rules_0-rules_primary', bindingRule1
    );
    expect(registerRule).toHaveBeenCalledWith(
      'rules:binding:rules_2-rules_primary', bindingRule2
    );
    expect(registerRule).toHaveBeenCalledWith(
      'rules:binding:rules_3-rules_primary', bindingRule3
    );
    expect(registerRule).toHaveBeenCalledWith(
      'rules:positioning:rules_primary-rules_0', relativePositioningRule1
    );
    expect(registerRule).toHaveBeenCalledWith(
      'rules:positioning:rules_primary-rules_2', relativePositioningRule2
    );
    expect(registerRule).toHaveBeenCalledTimes(5);

    expect(createBindingRule).toHaveBeenCalledWith({
      baseElementId: 'rules_primary',
      targetElementId: 'rules_0',
      distance: 7,
      strength: 4.3,
    });
    expect(createBindingRule).toHaveBeenCalledWith({
      baseElementId: 'rules_primary',
      targetElementId: 'rules_2',
      distance: 9,
      strength: 4.3,
    });
    expect(createBindingRule).toHaveBeenCalledWith({
      baseElementId: 'rules_primary',
      targetElementId: 'rules_3',
      distance: 10,
      strength: 4.3,
    });
    expect(createOrientingRule).toHaveBeenCalledWith({
      baseElementId: 'rules_primary',
      targetElementId: 'rules_0',
      orientation: Orientation.TOP_LEFT,
    });
    expect(createOrientingRule).toHaveBeenCalledWith({
      baseElementId: 'rules_primary',
      targetElementId: 'rules_2',
      orientation: Orientation.TOP_RIGHT,
    });
  });
});
