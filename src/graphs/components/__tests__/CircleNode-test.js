import CircleNode from '../CircleNode';
import React from 'react';

import { shallow } from 'enzyme';

describe('CircleNode', () => {
  it('renders a Circle inside a Node', () => {
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
});
