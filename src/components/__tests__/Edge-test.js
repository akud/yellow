jest.mock('geometry/geometry-utils');

import Edge from '../Edge';
import geometryUtils from 'geometry/geometry-utils';
import React from 'react';
import SimulatedEdge from 'simulation/SimulatedEdge';

import { shallow } from 'enzyme';

describe('Edge', () => {
  it('renders a line between the provided points', () => {
    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={3}
        position={{
          from: { x: 1, y: 2 },
          to:   { x: 3, y: 4 },
        }}
      />
    );
    expect(wrapper.find('line').length).toBe(1);
    expect(wrapper.find('Arrow').length).toBe(0);

    expect(wrapper.find('line').prop('x1')).toBe(1);
    expect(wrapper.find('line').prop('y1')).toBe(2);
    expect(wrapper.find('line').prop('x2')).toBe(3);
    expect(wrapper.find('line').prop('y2')).toBe(4);

    expect(wrapper.find('line').prop('style')).toEqual({
      stroke: '#442200',
      strokeWidth: 3,
    });
  });

  it('Does not render anything if no position is passed', () => {
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
    geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
      Math.PI / 3
    );

    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={45}
        position={{
          from: { x: 1, y: 2 },
          to:   { x: 3, y: 4 },
        }}
        directed={true}
      />
    );
    expect(wrapper.find('Arrow').length).toBe(1);
    expect(wrapper.find('Arrow').prop('to')).toEqual({ x: 3, y: 4 });
    expect(wrapper.find('Arrow').prop('color')).toEqual('#442200');
    expect(wrapper.find('Arrow').prop('thickness')).toBe(45);
    expect(wrapper.find('Arrow').prop('angle')).toBeCloseTo(Math.PI / 3);

    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    );
  });

  it('renders an arrow at the source and target if bidirectional=true', () => {
    geometryUtils.computeHorizontalIntersectionAngle
      .mockReturnValueOnce(Math.PI / 3)
      .mockReturnValueOnce(Math.PI / 4);

    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={45}
        position={{
          from: { x: 1, y: 2 },
          to:   { x: 3, y: 4 },
        }}
        bidirectional={true}
      />
    );
    expect(wrapper.find('Arrow').length).toBe(2);

    expect(wrapper.find('Arrow').get(0).prop('to')).toEqual({ x: 1, y: 2 });
    expect(wrapper.find('Arrow').get(0).prop('color')).toEqual('#442200');
    expect(wrapper.find('Arrow').get(0).prop('thickness')).toBe(45);
    expect(wrapper.find('Arrow').get(0).prop('angle')).toBeCloseTo(Math.PI / 3);

    expect(wrapper.find('Arrow').get(1).prop('to')).toEqual({ x: 3, y: 4 });
    expect(wrapper.find('Arrow').get(1).prop('color')).toEqual('#442200');
    expect(wrapper.find('Arrow').get(1).prop('thickness')).toBe(45);
    expect(wrapper.find('Arrow').get(1).prop('angle')).toBeCloseTo(Math.PI / 4);

    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    );
    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 3, y: 4 },
      { x: 1, y: 2 },
    );
  });


  describe('toSimulatedElement', () => {
    it.only('converts the props to an edge object', () => {
      const edge = Edge.toSimulatedElement({
        fromNodeId: '53',
        toNodeId: '127',
      });
      expect(edge).toEqual(new SimulatedEdge({
        sourceNodeId: '53',
        targetNodeId: '127',
        distance: 100,
      }));
    });
  });
});
