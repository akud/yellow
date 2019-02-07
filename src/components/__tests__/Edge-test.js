import Edge from '../Edge';
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
