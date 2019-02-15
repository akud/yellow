import Node from '../Node';
import React from 'react';
import SimulatedNode from 'simulation/SimulatedNode';

import { shallow } from 'enzyme';

class ShapedChildComponent extends React.Component {
  static getShape = jest.fn()
}

describe('Node', () => {
  it('renders children with position', () => {
    const wrapper = shallow(
      <Node nodeId='2' position={{ x: 123, y: 9234 }}>
        <ShapedChildComponent />
      </Node>
    );
    expect(wrapper.find(ShapedChildComponent).length).toBe(1);
    expect(wrapper.find(ShapedChildComponent).prop('position')).toEqual({ x: 123, y: 9234 });
  });

  describe('toSimulatedElement', () => {
    it('delegates to child elements to get the shape', () => {
      const shape = { asdf: 'hijk' };
      const childProps = { ltk: '24523432' };
      const props = {
        nodeId: '827',
        children: {
          type: ShapedChildComponent,
          props: childProps
        }
      };
      ShapedChildComponent.getShape.mockReturnValue(shape);
      const result = Node.toSimulatedElement(props);

      expect(result).toEqual(
        new SimulatedNode({
          id: '827',
          shape
        })
      );
      expect(ShapedChildComponent.getShape).toHaveBeenCalledWith(childProps);
    });
  });
});
