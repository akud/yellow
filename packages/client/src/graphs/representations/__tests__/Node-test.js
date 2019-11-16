jest.mock('../../../elements/ShapeDefinition');
jest.mock('../../../simulation/ForceSimulation');
jest.mock('../../../simulation/PositioningRules');
jest.mock('../../../simulation/LinkingRule');

import Node from '../Node';

import Orientation from '../../../elements/Orientation';

import { createRelativePositioningRule } from '../../../simulation/PositioningRules';
import { createLinkingRule } from '../../../simulation/LinkingRule';
import MockSimulation, {
  getElementData,
  registerElement,
  registerRule,
  resetMockSimulation,
} from '../../../simulation/ForceSimulation'
import SimulationContext from '../../../simulation/representations/SimulationContext';

import MockShapeDefinition from '../../../elements/ShapeDefinition';

import React from 'react';
import { shallow, mount } from 'enzyme';

import utils from '../../../utils';

describe('Node', () => {

  const selectElementFrom = (...elements) => elementId => {
    return elements.find(e => e.id === elementId);
  };

  beforeEach(() => {
    resetMockSimulation();
    createRelativePositioningRule.mockReset();
    createLinkingRule.mockReset();
  });

  it.only('wraps children in a SimulatedElement', () => {
    const position = newPosition();

    getElementData.mockReturnValueOnce({ position });

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Node nodeId='2'>
          <p>Hello!</p>
        </Node>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('SimulatedElement').length).toBe(1);
    const simulatedElement = wrapper.find('SimulatedElement').at(0);

    expect(simulatedElement.prop('id')).toEqual('2');

    expect(simulatedElement.find('p').length).toBe(1);
    expect(simulatedElement.find('p').prop('position')).toEqual(position);
    expect(simulatedElement.find('p').prop('id')).toEqual('2');

    expect(getElementData).toHaveBeenCalledOnceWith('2');
  });

  it('assigns positions and ids to elements by their orientation', () => {
    const primaryElement = newSimulatedElement('2');
    const subElement1 = newSimulatedElement('2-0');
    const subElement2 = newSimulatedElement('2-2');

    getElementData.mockImplementation(selectElementFrom(
      primaryElement,
      subElement1,
      subElement2
    ));

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Node nodeId='2'>
          <p orientation={Orientation.TOP_LEFT}>Hello!</p>
          <p orientation={Orientation.PRIMARY}>Primary!</p>
          <p orientation={Orientation.TOP_RIGHT}>World!</p>
        </Node>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('p').length).toBe(3);
    expect(wrapper.find('p').at(0).prop('config').position).toEqual(subElement1.position);
    expect(wrapper.find('p').at(1).prop('config').position).toEqual(primaryElement.position);
    expect(wrapper.find('p').at(2).prop('config').position).toEqual(subElement2.position);

    expect(wrapper.find('p').at(0).prop('config').id).toEqual('2-0');
    expect(wrapper.find('p').at(1).prop('config').id).toEqual('2');
    expect(wrapper.find('p').at(2).prop('config').id).toEqual('2-2');

    expect(getElementData).toHaveBeenCalledWith('2-0');
    expect(getElementData).toHaveBeenCalledWith('2');
    expect(getElementData).toHaveBeenCalledWith('2-2');
    expect(getElementData).toHaveBeenCalledTimes(3);
  });

  it('can infer the primary element', () => {
    const primaryElement = newSimulatedElement('2');
    const subElement1 = newSimulatedElement('2-0');
    const subElement2 = newSimulatedElement('2-2');

    getElementData.mockImplementation(selectElementFrom(
      primaryElement,
      subElement1,
      subElement2
    ));

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Node nodeId='2'>
          <p orientation={Orientation.TOP_LEFT}>Hello!</p>
          <p>Primary!</p>
          <p orientation={Orientation.TOP_RIGHT}>World!</p>
        </Node>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('p').length).toBe(3);
    expect(wrapper.find('p').at(0).prop('config').position).toEqual(subElement1.position);
    expect(wrapper.find('p').at(1).prop('config').position).toEqual(primaryElement.position);
    expect(wrapper.find('p').at(2).prop('config').position).toEqual(subElement2.position);

    expect(wrapper.find('p').at(0).prop('config').id).toEqual('2-0');
    expect(wrapper.find('p').at(1).prop('config').id).toEqual('2');
    expect(wrapper.find('p').at(2).prop('config').id).toEqual('2-2');

    expect(getElementData).toHaveBeenCalledWith('2-0');
    expect(getElementData).toHaveBeenCalledWith('2');
    expect(getElementData).toHaveBeenCalledWith('2-2');
    expect(getElementData).toHaveBeenCalledTimes(3);
  });

  it('registers rules with the simulation based on element orientations', () => {
    const primaryShape = new MockShapeDefinition({ radius: 3 });
    const subElementShape1 = new MockShapeDefinition({ radius: 4 });
    const subElementShape2 = new MockShapeDefinition({ radius: 5 });
    const subElementShape3 = new MockShapeDefinition({ radius: 6 });

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Node nodeId='2'>
          <p orientation={Orientation.TOP_LEFT}>Hello!</p>
          <p>Primary!</p>
          <p orientation={Orientation.TOP_RIGHT}>World!</p>
          <p>Unspecified</p>
        </Node>
      </SimulationContext.Provider>
    );

    expect(wrapper.find('p').length).toBe(4);
    expect(wrapper.find('p').at(0).prop('config').postRender).toBeInstanceOf(Function);
    expect(wrapper.find('p').at(1).prop('config').postRender).toBeInstanceOf(Function);
    expect(wrapper.find('p').at(2).prop('config').postRender).toBeInstanceOf(Function);
    expect(wrapper.find('p').at(3).prop('config').postRender).toBeInstanceOf(Function);

    wrapper.find('p').at(0).prop('config').postRender(subElementShape1);
    wrapper.find('p').at(1).prop('config').postRender(primaryShape);
    wrapper.find('p').at(2).prop('config').postRender(subElementShape2);
    wrapper.find('p').at(3).prop('config').postRender(subElementShape3);

    expect(registerRule).toHaveBeenCalledTimes(5);

    expect(createLinkingRule).toHaveBeenCalledWith({
      between: ['2', '2-0'],
      distance: 7,
      strength: 2.5,
    });
    expect(createLinkingRule).toHaveBeenCalledWith({
      between: ['2', '2-2'],
      distance: 8,
      strength: 2.5,
    });
    expect(createLinkingRule).toHaveBeenCalledWith({
      between: ['2', '2-3'],
      distance: 9,
      strength: 2.5,
    });
    expect(createRelativePositioningRule).toHaveBeenCalledWith({
      baseElementId: '2',
      targetElementId: '2-0',
      orientation: Orientation.TOP_LEFT,
    });
    expect(createRelativePositioningRule).toHaveBeenCalledWith({
      baseElementId: '2',
      targetElementId: '2-2',
      orientation: Orientation.TOP_RIGHT,
    });
  });
});
