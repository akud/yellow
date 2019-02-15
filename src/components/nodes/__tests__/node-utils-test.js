import GraphElementType from 'graph/GraphElementType';
import SimulatedNode from 'simulation/SimulatedNode';

import { asNodeComponent } from '../node-utils';

describe('node-utils', () => {
  describe('asNodeComponent', () => {
    it('assigns static props', () => {
      const componentClass = {};
      const annotated = asNodeComponent(componentClass);
      expect(componentClass.elementType).toBe(GraphElementType.NODE);
      expect(componentClass.toSimulatedElement).toBeInstanceOf(Function);
    });

    it('gets the shape from the component class if it has a getShape method', () => {
      const shape = { prop: 'asdfadfa' };
      const componentClass = { getShape: jest.fn().mockReturnValue(shape) };
      const props = { nodeId: '1' };

      const simulatedElement = asNodeComponent(componentClass).toSimulatedElement(props);

      expect(simulatedElement).toEqual(new SimulatedNode({
        id: '1',
        shape: shape
      }));

      expect(componentClass.getShape).toHaveBeenCalledWith(props);
    });

    it('gets the shape from a shape providing child if the component doesn\'t have getShape', () => {
      const shape = { prop: 'asdfadfa' };
      const componentClass = { };
      const getShape = jest.fn().mockReturnValue(shape);
      const childProps = { asdf: 'hijk' };

      const props = {
        nodeId: '2',
        children: [
          { type: {} },
          { type: { getShape }, props: childProps },
          { type: {} },
        ]
      };

      const simulatedElement = asNodeComponent(componentClass).toSimulatedElement(props);

      expect(simulatedElement).toEqual(new SimulatedNode({
        id: '2',
        shape: shape
      }));

      expect(getShape).toHaveBeenCalledWith(childProps);
    });

    it('handles a single child object', () => {
      const shape = { prop: 'asdfadfa' };
      const componentClass = { };
      const getShape = jest.fn().mockReturnValue(shape);
      const childProps = { asdf: 'hijk' };

      const props = {
        nodeId: '2',
        children: {
          type: { getShape }, props: childProps
        },
      };

      const simulatedElement = asNodeComponent(componentClass).toSimulatedElement(props);

      expect(simulatedElement).toEqual(new SimulatedNode({
        id: '2',
        shape: shape
      }));

      expect(getShape).toHaveBeenCalledWith(childProps);
    });
  });
});
