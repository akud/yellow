import React from 'react';

import Node from '../Node';

import Circle from '../../elements/Circle';

import { shallow } from 'enzyme';

describe('Node', () => {
  it('renders children inside a SimulatedElementGroup', () => {
    const wrapper = shallow(
      <Node nodeId='node-345'>
        <Circle radius={5} />
        <Circle radius={6} />
        <Circle radius={7} />
      </Node>
    );

    expect(wrapper.find('SimulatedElementGroup').length).toBe(1);

    const simulatedElementGroup = wrapper.find('SimulatedElementGroup').at(0);

    expect(simulatedElementGroup.prop('className')).toEqual('node');
    expect(simulatedElementGroup.prop('id')).toEqual('node-345');
    expect(simulatedElementGroup.find('Circle').length).toBe(3);
  });
});
