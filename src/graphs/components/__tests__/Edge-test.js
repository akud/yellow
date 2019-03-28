jest.mock('elements/geometry-utils');
jest.mock('elements/ShapeDefinition');
jest.mock('simulation/Simulation');

import React from 'react';

import Edge from '../Edge';

import geometryUtils from 'elements/geometry-utils';
import MockShapeDefinition from 'elements/ShapeDefinition';

import MockSimulation, {
  getElementData,
  registerConstraint,
  resetMockSimulation
} from 'simulation/Simulation';


import { FixedDistanceConstraintDefinition } from 'simulation/ConstraintDefinition';
import SimulationContext from 'simulation/components/SimulationContext';

import { mount } from 'enzyme';

describe('Edge', () => {

  const newSimulatedElement = opts => Object.assign({
    id: '1',
    position: newPosition(),
    shape: new MockShapeDefinition(),
  }, opts);

  const selectElementFrom = (...elements) => id => elements.find(e => e.id === id);

  beforeEach(() => {
    resetMockSimulation();
  });

  it('renders a line between the provided points', () => {
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });

    getElementData.mockImplementation(selectElementFrom(
      newSimulatedElement({ id: '1', position: { x: 1, y: 2 }, shape: shape1 }),
      newSimulatedElement({ id: '2', position: { x: 3, y: 4 }, shape: shape2 }),
    ));

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Edge
          fromNodeId='1'
          toNodeId='2'
          color='#442200'
          thickness={3}
        />
      </SimulationContext.Provider>
    );
    expect(wrapper.find('line').length).toBe(1);
    expect(wrapper.find('Arrow').length).toBe(0);

    expect(wrapper.find('line').prop('x1')).toBe(45);
    expect(wrapper.find('line').prop('y1')).toBe(87);
    expect(wrapper.find('line').prop('x2')).toBe(123);
    expect(wrapper.find('line').prop('y2')).toBe(56);

    expect(wrapper.find('line').prop('stroke')).toEqual('#442200');
    expect(wrapper.find('line').prop('strokeWidth')).toEqual(3);

    expect(shape1.computeIntersectionWithRay).toHaveBeenCalledWith({ x: 1, y: 2 }, { x: 3, y: 4 });
    expect(shape2.computeIntersectionWithRay).toHaveBeenCalledWith({ x: 3, y: 4 }, { x: 1, y: 2 });
  });

  it('renders an arrow at the target if directed=true', () => {
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });
    geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
      Math.PI / 3
    );

    getElementData.mockImplementation(selectElementFrom(
      newSimulatedElement({ id: '1', position: { x: 1, y: 2 }, shape: shape1 }),
      newSimulatedElement({ id: '2', position: { x: 3, y: 4 }, shape: shape2 }),
    ));

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Edge
          fromNodeId='1'
          toNodeId='2'
          color='#442200'
          thickness={45}
          directed={true}
        />
      </SimulationContext.Provider>
    );
    expect(wrapper.find('Arrow').length).toBe(1);
    expect(wrapper.find('Arrow').prop('to')).toEqual({ x: 123, y: 56 });
    expect(wrapper.find('Arrow').prop('color')).toEqual('#442200');
    expect(wrapper.find('Arrow').prop('thickness')).toBe(45);
    expect(wrapper.find('Arrow').prop('angle')).toBeCloseTo(Math.PI / 3);

    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 45, y: 87 },
      { x: 123, y: 56 },
    );
  });

  it('renders an arrow at the source and target if bidirectional=true', () => {
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });
    geometryUtils.computeHorizontalIntersectionAngle
      .mockReturnValueOnce(Math.PI / 3)
      .mockReturnValueOnce(Math.PI / 4);

    getElementData.mockImplementation(selectElementFrom(
      newSimulatedElement({ id: '1', position: { x: 1, y: 2 }, shape: shape1 }),
      newSimulatedElement({ id: '2', position: { x: 3, y: 4 }, shape: shape2 }),
    ));

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Edge
          fromNodeId='1'
          toNodeId='2'
          color='#442200'
          thickness={45}
          bidirectional={true}
        />
      </SimulationContext.Provider>
    );
    expect(wrapper.find('Arrow').length).toBe(2);

    expect(wrapper.find('Arrow').at(0).prop('to')).toEqual({ x: 45, y: 87 });
    expect(wrapper.find('Arrow').at(0).prop('color')).toEqual('#442200');
    expect(wrapper.find('Arrow').at(0).prop('thickness')).toBe(45);
    expect(wrapper.find('Arrow').at(0).prop('angle')).toBeCloseTo(Math.PI / 3);

    expect(wrapper.find('Arrow').at(1).prop('to')).toEqual({ x: 123, y: 56 });
    expect(wrapper.find('Arrow').at(1).prop('color')).toEqual('#442200');
    expect(wrapper.find('Arrow').at(1).prop('thickness')).toBe(45);
    expect(wrapper.find('Arrow').at(1).prop('angle')).toBeCloseTo(Math.PI / 4);

    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 45, y: 87 },
      { x: 123, y: 56 },
    );
    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 123, y: 56 },
      { x: 45, y: 87 },
    );
  });

  it('registers a fixed distance constraint with the simulation', () => {
    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Edge
          fromNodeId='123'
          toNodeId='456'
          distance={324}
        />
      </SimulationContext.Provider>
    );
    expect(registerConstraint).toHaveBeenCalledOnceWith(
      new FixedDistanceConstraintDefinition({
        between: ['123', '456'],
        distance: 324,
      })
    );
  });
});
