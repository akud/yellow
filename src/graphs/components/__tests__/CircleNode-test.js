import Circle from 'shapes/components/Circle';
import CircleNode from '../CircleNode';
import React from 'react';

import { shallow } from 'enzyme';

describe('CircleNode', () => {
  it('Renders a Circle inside a Node', () => {
    const wrapper = shallow(
      <CircleNode
        nodeId='1'
        radius={5}
        color='#442200'
      />
    );
    const node = wrapper.find('Node');
    expect(node.length).toBe(1);
    expect(node.find('Circle').length).toBe(1);
    expect(node.find('Circle').prop('radius')).toBe(5);
    expect(node.find('Circle').prop('color')).toEqual('#442200');
  });

  describe('getSimulationConfig', () => {
    it('calls the node\'s simulation config', () => {
      const getSimulationConfig = jest.fn().mockReturnValue({ foo: 'bar' });
      const wrapper = shallow(
        <CircleNode
          nodeId='1'
          radius={5}
          color='#442200'
        />
      );
      const nodeRef = wrapper.instance().nodeRef;
      expect(wrapper.instance().getSimulationConfig()).toBeFalsy();

      nodeRef.current = { getSimulationConfig };

      expect(wrapper.instance().getSimulationConfig()).toEqual({ foo: 'bar' });
      expect(getSimulationConfig).toHaveBeenCalled();
    });
  });
});
