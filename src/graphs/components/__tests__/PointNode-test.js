import React from 'react';
import { shallow } from 'enzyme';

import PointNode from '../PointNode';

describe('PointNode', () => {
  it('renders a Point inside of a Node', () => {
    const wrapper = shallow(<PointNode nodeId='1234' />);
    expect(wrapper.find('Node').length).toBe(1);
    const node = wrapper.find('Node');
    expect(node.prop('nodeId')).toEqual('1234');
    expect(node.find('Point').length).toBe(1);
  });
});
