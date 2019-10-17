jest.mock('../../../elements/ShapeDefinition');
jest.mock('../../../simulation/Simulation');

import Node from '../Node';

import Orientation from '../../../elements/Orientation';

import {
  FixedDistanceConstraintDefinition,
} from '../../../simulation/ConstraintDefinition';
import { DirectionalForceDefinition } from '../../../simulation/ForceDefinition';
import Direction from '../../../simulation/Direction';
import MockSimulation, {
  getElementData,
  registerElement,
  registerForce,
  registerConstraint,
  resetMockSimulation,
} from '../../../simulation/Simulation'
import SimulationContext from '../../../simulation/components/SimulationContext';

import MockShapeDefinition from '../../../elements/ShapeDefinition';

import React from 'react';
import { shallow, mount } from 'enzyme';

import utils from '../../../utils';

describe('Node', () => {

  const newSimulatedElement = elementId => ({
    id: elementId || '1',
    position: newPosition(),
    shape: new MockShapeDefinition(),
  });

  const selectElementFrom = (...elements) => elementId => {
    return elements.find(e => e.id === elementId);
  };

  beforeEach(() => {
    resetMockSimulation();
  });

  it('renders children with position from the simulation', () => {
    const element = newSimulatedElement();

    getElementData.mockReturnValueOnce(element);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Node nodeId='2'>
          <p>Hello!</p>
        </Node>
      </SimulationContext.Provider>
    );
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').prop('config').position).toEqual(element.position);
    expect(wrapper.find('p').prop('config').id).toEqual('2');
    expect(getElementData).toHaveBeenCalledWith('2');
    expect(getElementData).toHaveBeenCalledTimes(1);
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

  it('registers data with the simulation based on element orientations', () => {
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

    expect(registerConstraint).toHaveBeenCalledWith(new FixedDistanceConstraintDefinition({
      between: ['2', '2-0'],
      distance: 7,
      strengthMultiplier: 2.5,
    }));
    expect(registerConstraint).toHaveBeenCalledWith(new FixedDistanceConstraintDefinition({
      between: ['2', '2-2'],
      distance: 8,
      strengthMultiplier: 2.5,
    }));
    expect(registerConstraint).toHaveBeenCalledWith(new FixedDistanceConstraintDefinition({
      between: ['2', '2-3'],
      distance: 9,
      strengthMultiplier: 2.5,
    }));
    expect(registerConstraint).toHaveBeenCalledTimes(3);

    expect(registerForce).toHaveBeenCalledWith(new DirectionalForceDefinition({
      elementId: '2-0',
      directions: Orientation.TOP_LEFT.getDirections(),
    }));
    expect(registerForce).toHaveBeenCalledWith(new DirectionalForceDefinition({
      elementId: '2-2',
      directions: Orientation.TOP_RIGHT.getDirections(),
    }));
    expect(registerForce).toHaveBeenCalledTimes(2)
  });
});
