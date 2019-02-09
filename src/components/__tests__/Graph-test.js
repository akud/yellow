import Graph from '../Graph';
import React from 'react';
import GraphElementType from 'graph/GraphElementType';

import { shallow } from 'enzyme';


class Node extends React.Component {
  static elementType = GraphElementType.NODE;
  static toSimulatedElement = jest.fn();
}
class Edge extends React.Component {
  static elementType = GraphElementType.EDGE;
  static toSimulatedElement = jest.fn();
}

describe('Graph', () => {
  let simulationCreator;
  let simulation;

  beforeEach(() => {
    Node.toSimulatedElement.mockReset();
    Edge.toSimulatedElement.mockReset();
    simulation = {
      onNewLayout: jest.fn(),
      getNodePosition: jest.fn(),
      getEdgePosition: jest.fn(),
    };
    simulation.onNewLayout.mockReturnValue(simulation);
    simulationCreator = jest.fn().mockReturnValue(simulation);
  });

  it('renders with the provided width and height', () => {
    const wrapper = shallow(
      <Graph simulationCreator={simulationCreator} width={325} height={567} />
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(325);
    expect(wrapper.find('svg').prop('height')).toBe(567);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 325 567');
  });

  it('applies the zoom to width and height', () => {
    const wrapper = shallow(
      <Graph simulationCreator={simulationCreator} width={300} height={500} zoom={2.0}/>
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(300);
    expect(wrapper.find('svg').prop('height')).toBe(500);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 150 250');
    expect(simulationCreator).toHaveBeenCalledWith(expect.objectContaining({
      width: 150,
      height: 250,
    }));
  });

  it('does not render a boder by default', () => {
    const wrapper = shallow(
      <Graph simulationCreator={simulationCreator} />
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toBe(undefined);
  });

  it('renders a border if told to', () => {
    const wrapper = shallow(
      <Graph simulationCreator={simulationCreator} border={true} />
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toEqual('1px solid black');
  });


  it('passes data to the simulation creator', () => {
    Node.toSimulatedElement
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second')
      .mockReturnValueOnce('third');

    Edge.toSimulatedElement.mockReturnValueOnce('edge');

    const wrapper = shallow(
      <Graph simulationCreator={simulationCreator} width={500} height={1000}>
        <Node nodeId="1" />
        <Node nodeId="2" />
        <Node nodeId="3" />
        <Edge fromNodeId="2" toNodeId="3" />
      </Graph>
    );
    expect(simulationCreator).toHaveBeenCalledWith({
      nodes: [ 'first', 'second', 'third' ],
      edges: [ 'edge' ],
      width: 500,
      height: 1000,
    });
    expect(simulation.onNewLayout).toHaveBeenCalledWith(expect.any(Function));
    expect(Node.toSimulatedElement).toHaveBeenCalledWith({ nodeId: '1' });
    expect(Node.toSimulatedElement).toHaveBeenCalledWith({ nodeId: '2' });
    expect(Node.toSimulatedElement).toHaveBeenCalledWith({ nodeId: '3' });
    expect(Edge.toSimulatedElement).toHaveBeenCalledWith({
      fromNodeId: '2',
      toNodeId: '3'
    });
  });

  it('passes positions from the simulation to child elements', () => {
    simulation.getNodePosition
      .mockReturnValueOnce({ x: 34, y: 465 })
      .mockReturnValueOnce({ x: 67, y: 712 })
      .mockReturnValueOnce({ x: 9, y: 83475 });

    simulation.getEdgePosition
      .mockReturnValueOnce({
        from: { x: 34, y: 465 },
        to: { x: 67, y: 712 },
      });

    const wrapper = shallow(
      <Graph simulationCreator={simulationCreator}>
        <Node nodeId="1" />
        <Node nodeId="2" />
        <Node nodeId="3" />
        <Edge fromNodeId="2" toNodeId="3" />
      </Graph>
    );
    expect(wrapper.find(Node).length).toBe(3);
    expect(wrapper.find(Edge).length).toBe(1);

    expect(wrapper.find(Node).get(0).props).toEqual({
      nodeId: '1',
      position: { x: 34, y: 465 },
    });
    expect(wrapper.find(Node).get(1).props).toEqual({
      nodeId: '2',
      position: { x: 67, y: 712 },
    });
    expect(wrapper.find(Node).get(2).props).toEqual({
      nodeId: '3',
      position: { x: 9, y: 83475 },
    });
    expect(wrapper.find(Edge).get(0).props).toEqual({
      fromNodeId: '2',
      toNodeId: '3',
      position: {
        from: { x: 34, y: 465 },
        to: { x: 67, y: 712 },
      }
    });
  });

});
