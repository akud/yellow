import Node from '../Node';
import React from 'react';
import SimulatedCircle from 'simulation/SimulatedCircle';

import { shallow } from 'enzyme';

describe('Node', () => {
  it('renders with the given radius and fill color', () => {
    const wrapper = shallow(<Node nodeId='2' radius={5} color='#442200' />);
    expect(wrapper.find('circle').length).toBe(1);
    expect(wrapper.find('circle').prop('r')).toBe(5);
    expect(wrapper.find('circle').prop('fill')).toBe('#442200');
  });

  it('renders with the given position if provided', () => {
    const wrapper = shallow(
      <Node
        nodeId='1'
        radius={5}
        color='#442200'
        position={ { x: 420, y: 69 } }
      />
    );
    expect(wrapper.find('circle').length).toBe(1);
    expect(wrapper.find('circle').prop('r')).toBe(5);
    expect(wrapper.find('circle').prop('fill')).toBe('#442200');
    expect(wrapper.find('circle').prop('cx')).toBe(420);
    expect(wrapper.find('circle').prop('cy')).toBe(69);
  });

  describe('toSimulatedElement', () => {
    it('converts the props to a graph node', () => {
      const result = Node.toSimulatedElement({
        nodeId: '827',
      });
      expect(result).toEqual(new SimulatedCircle({ id: '827', radius: 10 }));
    });
  });
});
