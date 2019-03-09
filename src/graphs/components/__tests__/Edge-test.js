jest.mock('shapes/geometry-utils');
jest.mock('shapes/ShapeDefinition');

import React from 'react';

import Edge from '../Edge';

import geometryUtils from 'shapes/geometry-utils';
import MockShapeDefinition from 'shapes/ShapeDefinition';


import { FixedDistanceConstraintDefinition } from 'simulation/ConstraintDefinition';
import SimulationConfig from 'simulation/SimulationConfig';

import { shallow } from 'enzyme';

describe('Edge', () => {
  it('renders a line between the provided points', () => {
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });
    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={3}
        simulatedElements={{
          '1': { position: { x: 1, y: 2 }, shape: shape1 },
          '2': { position: { x: 3, y: 4 }, shape: shape2 },
        }}
      />
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

  it('Does not render anything if no simulated elements are passed', () => {
    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={3}
      />
    );
    expect(wrapper.find('line').length).toBe(0);
  });

  it('renders an arrow at the target if directed=true', () => {
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });
    geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
      Math.PI / 3
    );

    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={45}
        simulatedElements={{
          '1': { position: { x: 1, y: 2 }, shape: shape1 },
          '2': { position: { x: 3, y: 4 }, shape: shape2 },
        }}
        directed={true}
      />
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

    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={45}
        simulatedElements={{
          '1': { position: { x: 1, y: 2 }, shape: shape1 },
          '2': { position: { x: 3, y: 4 }, shape: shape2 },
        }}
        bidirectional={true}
      />
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


  describe('getSimulationConfig', () => {
    it('returns node ids as elements and a fixed distance constraint', () => {
      const wrapper = shallow(
        <Edge fromNodeId='1' toNodeId='2' distance={150} />
      );
      expect(wrapper.instance().getSimulationConfig()).toEqual(new SimulationConfig({
        elementIds: ['1', '2'],
        constraints: [
          new FixedDistanceConstraintDefinition({
            between: ['1', '2'],
            distance: 150
          }),
        ],
      }));
    });
  });
});
