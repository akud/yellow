import Circle from 'geometry/Circle';
import CircleNode from '../CircleNode';
import React from 'react';
import SimulatedNode from 'simulation/SimulatedNode';

import { shallow } from 'enzyme';

describe('CircleNode', () => {
  it('Passes props to a Circle', () => {
    const wrapper = shallow(
      <CircleNode
        nodeId='1'
        radius={5}
        color='#442200'
        position={ { x: 420, y: 69 } }
      />
    );
    expect(wrapper.find('Circle').length).toBe(1);
    expect(wrapper.find('Circle').prop('radius')).toBe(5);
    expect(wrapper.find('Circle').prop('color')).toEqual('#442200');
    expect(wrapper.find('Circle').prop('position')).toEqual({ x: 420, y: 69 });
  });

  describe('toSimulatedElement', () => {
    it('converts the props to a simulated node', () => {
      const result = CircleNode.toSimulatedElement({
        nodeId: '827',
      });

      expect(result).toEqual(
        new SimulatedNode({
          id: '827',
          shape: new Circle({
            center: { x: 0, y: 0 },
            radius: 10,
          })
        })
      );
    });
  });
});
