import Graph from '../Graph';
import React from 'react';
import GraphElementType from 'graph/GraphElementType';

import { shallow } from 'enzyme';


class Node extends React.Component {
  static elementType = GraphElementType.NODE;
}
class Edge extends React.Component {
  static elementType = GraphElementType.EDGE;
}

describe('Graph', () => {
  let simulationCreator;
  let simulation;

  beforeEach(() => {
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
    const wrapper = shallow(
      <Graph simulationCreator={simulationCreator} width={500} height={1000}>
        <Node nodeId="1" />
        <Node nodeId="2" />
        <Node nodeId="3" />
        <Edge fromNodeId="2" toNodeId="3" />
      </Graph>
    );
    expect(simulationCreator).toHaveBeenCalledWith({
      nodes: [{ nodeId: '1' }, { nodeId: '2' }, { nodeId: '3' }],
      edges: [{ fromNodeId: '2', toNodeId: '3' }],
      width: 500,
      height: 1000,
    });
    expect(simulation.onNewLayout).toHaveBeenCalledWith(expect.any(Function));
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
