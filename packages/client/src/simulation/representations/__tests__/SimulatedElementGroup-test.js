jest.mock('../../ForceSimulation');
jest.mock('../../PositioningRules');
jest.mock('../../LinkingRule');

import SimulatedElementGroup from '../SimulatedElementGroup';

import Orientation from '../../../elements/Orientation';
import Circle from '../../../elements/representations/Circle';
import CircleDefinition from '../../../elements/CircleDefinition';

import { createRelativePositioningRule } from '../../PositioningRules';
import { createLinkingRule } from '../../LinkingRule';
import MockSimulation, {
  getElementData,
  registerElement,
  registerRule,
  resetMockSimulation,
} from '../../ForceSimulation'
import SimulationContext from '../../representations/SimulationContext';

import React from 'react';
import { shallow, mount } from 'enzyme';

describe('SimulatedElementGroup', () => {

  const newElementData = opts => Object.assign({
    position: newPosition(),
    velocity: newPosition(),
    shape: new CircleDefinition({ radius: 4 }),
  }, opts);

  beforeEach(() => {
    resetMockSimulation();
    createRelativePositioningRule.mockReset();
    createLinkingRule.mockReset();
    getElementData.mockImplementation(newElementData);
  });

  it('wraps children in a SimulatedElement', () => {
    const position = newPosition();

    getElementData.mockReturnValueOnce({ position });

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup elementIdPrefix='2'>
          <Circle radius={4.5}/>
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('SimulatedElement').length).toBe(1);
    const simulatedElement = wrapper.find('SimulatedElement').at(0);

    expect(simulatedElement.prop('id')).toEqual('2-primary');

    expect(simulatedElement.find('Circle').length).toBe(1);
    expect(simulatedElement.find('Circle').prop('position')).toEqual(position);
    expect(simulatedElement.find('Circle').prop('id')).toEqual('2-primary');

    expect(getElementData).toHaveBeenCalledOnceWith('2-primary');
    expect(registerElement).toHaveBeenCalledOnceWith(
      '2-primary', new CircleDefinition({ radius: 4.5 })
    );
  });

  it('assigns positions and ids to elements by their orientation', () => {
    const primaryElement = newElementData();
    const subElement1 = newElementData();
    const subElement2 = newElementData();

    getElementData.mockImplementation((elementId) => ({
      '2-0': subElement1,
      '2-primary': primaryElement,
      '2-2': subElement2,
    })[elementId]);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup elementIdPrefix='2'>
          <Circle radius={1} orientation={Orientation.TOP_LEFT} />
          <Circle radius={2} orientation={Orientation.PRIMARY} />
          <Circle radius={3} orientation={Orientation.TOP_RIGHT} />
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('SimulatedElement').length).toBe(3);
    expect(wrapper.find('Circle').length).toBe(3);

    expect(wrapper.find('Circle').at(0).prop('position')).toEqual(subElement1.position);
    expect(wrapper.find('Circle').at(1).prop('position')).toEqual(primaryElement.position);
    expect(wrapper.find('Circle').at(2).prop('position')).toEqual(subElement2.position);

    expect(wrapper.find('Circle').at(0).prop('id')).toEqual('2-0');
    expect(wrapper.find('Circle').at(1).prop('id')).toEqual('2-primary');
    expect(wrapper.find('Circle').at(2).prop('id')).toEqual('2-2');

    expect(wrapper.find('SimulatedElement').at(0).prop('id')).toEqual('2-0');
    expect(wrapper.find('SimulatedElement').at(1).prop('id')).toEqual('2-primary');
    expect(wrapper.find('SimulatedElement').at(2).prop('id')).toEqual('2-2');

    expect(getElementData).toHaveBeenCalledWith('2-0');
    expect(getElementData).toHaveBeenCalledWith('2-primary');
    expect(getElementData).toHaveBeenCalledWith('2-2');
    expect(getElementData).toHaveBeenCalledTimes(3);

    expect(registerElement).toHaveBeenCalledWith(
      '2-0', new CircleDefinition({ radius: 1 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      '2-primary', new CircleDefinition({ radius: 2 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      '2-2', new CircleDefinition({ radius: 3 })
    );
    expect(registerElement).toHaveBeenCalledTimes(3);
  });

  it('can infer the primary element', () => {
    const primaryElement = newElementData();
    const subElement1 = newElementData();
    const subElement2 = newElementData();

    getElementData.mockImplementation((elementId) => ({
      'inferred-0': subElement1,
      'inferred-primary': primaryElement,
      'inferred-2': subElement2,
    })[elementId]);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup elementIdPrefix='inferred'>
          <Circle radius={1} orientation={Orientation.TOP_LEFT} />
          <Circle radius={2} />
          <Circle radius={3} orientation={Orientation.TOP_RIGHT} />
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('SimulatedElement').length).toBe(3);
    expect(wrapper.find('Circle').length).toBe(3);

    expect(wrapper.find('Circle').at(0).prop('position')).toEqual(subElement1.position);
    expect(wrapper.find('Circle').at(1).prop('position')).toEqual(primaryElement.position);
    expect(wrapper.find('Circle').at(2).prop('position')).toEqual(subElement2.position);

    expect(wrapper.find('Circle').at(0).prop('id')).toEqual('inferred-0');
    expect(wrapper.find('Circle').at(1).prop('id')).toEqual('inferred-primary');
    expect(wrapper.find('Circle').at(2).prop('id')).toEqual('inferred-2');

    expect(wrapper.find('SimulatedElement').at(0).prop('id')).toEqual('inferred-0');
    expect(wrapper.find('SimulatedElement').at(1).prop('id')).toEqual('inferred-primary');
    expect(wrapper.find('SimulatedElement').at(2).prop('id')).toEqual('inferred-2');

    expect(getElementData).toHaveBeenCalledWith('inferred-0');
    expect(getElementData).toHaveBeenCalledWith('inferred-primary');
    expect(getElementData).toHaveBeenCalledWith('inferred-2');
    expect(getElementData).toHaveBeenCalledTimes(3);

    expect(registerElement).toHaveBeenCalledWith(
      'inferred-0', new CircleDefinition({ radius: 1 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      'inferred-primary', new CircleDefinition({ radius: 2 })
    );
    expect(registerElement).toHaveBeenCalledWith(
      'inferred-2', new CircleDefinition({ radius: 3 })
    );
    expect(registerElement).toHaveBeenCalledTimes(3);
  });

  it('registers rules with the simulation based on element orientations', () => {
    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedElementGroup
          elementIdPrefix='rules'
          bindingStrength={4.3}
        >
          <Circle radius={3} orientation={Orientation.TOP_LEFT} />
          <Circle radius={4} />
          <Circle radius={5} orientation={Orientation.TOP_RIGHT} />
          <Circle radius={6} />
        </SimulatedElementGroup>
      </SimulationContext.Provider>
    );
    expect(registerRule).toHaveBeenCalledTimes(5);

    expect(createLinkingRule).toHaveBeenCalledWith({
      between: ['rules-primary', 'rules-0'],
      distance: 7,
      strength: 4.3,
    });
    expect(createLinkingRule).toHaveBeenCalledWith({
      between: ['rules-primary', 'rules-2'],
      distance: 9,
      strength: 4.3,
    });
    expect(createLinkingRule).toHaveBeenCalledWith({
      between: ['rules-primary', 'rules-3'],
      distance: 10,
      strength: 4.3,
    });
    expect(createRelativePositioningRule).toHaveBeenCalledWith({
      baseElementId: 'rules-primary',
      targetElementId: 'rules-0',
      orientation: Orientation.TOP_LEFT,
    });
    expect(createRelativePositioningRule).toHaveBeenCalledWith({
      baseElementId: 'rules-primary',
      targetElementId: 'rules-2',
      orientation: Orientation.TOP_RIGHT,
    });
  });
});
