jest.mock('../../../elements/geometry-utils');
jest.mock('../../../elements/ShapeDefinition');
jest.mock('../../../simulation/ForceSimulation');
jest.mock('../../../simulation/LinkingRule');

import React from 'react';

import Edge from '../Edge';

import geometryUtils from '../../../elements/geometry-utils';
import MockShapeDefinition from '../../../elements/ShapeDefinition';

import MockSimulation, {
  getElementData,
  registerRule,
  resetMockSimulation
} from '../../../simulation/ForceSimulation';


import { createLinkingRule } from '../../../simulation/LinkingRule';
import SimulationContext from '../../../simulation/representations/SimulationContext';

import { mount } from 'enzyme';

describe('Edge', () => {

  const newElementData = opts => Object.assign({
    position: newPosition(),
    velocity: newPosition(),
    shape: new MockShapeDefinition(),
  }, opts);

  const selectElementFrom = (elements) => id => elements[id];

  beforeEach(() => {
    resetMockSimulation();
    createLinkingRule.mockReset();
  });

  it('renders a line between the provided points', () => {
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });

    getElementData.mockImplementation(selectElementFrom({
      '1-primary': newElementData({ position: { x: 1, y: 2 }, shape: shape1 }),
      '2-primary': newElementData({ position: { x: 3, y: 4 }, shape: shape2 }),
    }));

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
    expect(wrapper.find('Line').length).toBe(1);
    expect(wrapper.find('Arrow').length).toBe(0);

    expect(wrapper.find('Line').prop('from')).toEqual({
      x: 45, y: 87
    });
    expect(wrapper.find('Line').prop('to')).toEqual({
      x: 123, y: 56
    });

    expect(wrapper.find('Line').prop('color')).toEqual('#442200');
    expect(wrapper.find('Line').prop('thickness')).toEqual(3);

    expect(shape1.computeIntersectionWithRay).toHaveBeenCalledWith({ x: 1, y: 2 }, { x: 3, y: 4 });
    expect(shape2.computeIntersectionWithRay).toHaveBeenCalledWith({ x: 3, y: 4 }, { x: 1, y: 2 });
  });

  it('renders an arrow at the target if directed=true', () => {
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });
    geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
      Math.PI / 3
    );

    getElementData.mockImplementation(selectElementFrom({
      '1-primary': newElementData({ position: { x: 1, y: 2 }, shape: shape1 }),
      '2-primary': newElementData({ position: { x: 3, y: 4 }, shape: shape2 }),
    }));

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

    getElementData.mockImplementation(selectElementFrom({
      '1-primary': newElementData({ position: { x: 1, y: 2 }, shape: shape1 }),
      '2-primary': newElementData({ position: { x: 3, y: 4 }, shape: shape2 }),
    }));

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

  it('registers a distance setting rule with the simulation', () => {
    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <Edge
          fromNodeId='123'
          toNodeId='456'
          distance={324}
          bindingStrength={4.5}
        />
      </SimulationContext.Provider>
    );
    expect(registerRule).toHaveBeenCalledOnce();
    expect(createLinkingRule).toHaveBeenCalledOnceWith({
      between: ['123-primary', '456-primary'],
      distance: 324,
      strength: 4.5,
    });
  });
});
