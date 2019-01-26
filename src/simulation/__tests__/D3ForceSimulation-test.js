jest.mock('d3-force');

import * as d3 from 'd3-force';
import D3ForceSimulation from '../D3ForceSimulation';

describe('D3ForceSimulation', () => {
  let baseSimulation;
  let linkForce;

  beforeEach(() => {
    baseSimulation = {
      force: jest.fn(),
      on: jest.fn(),
    };
    baseSimulation.force.mockReturnValue(baseSimulation);
    d3.forceSimulation.mockReturnValue(baseSimulation);

    linkForce = {
      distance: jest.fn().mockReturnValue('forceLinkWithDistance'),
    };
    d3.forceManyBody.mockReturnValue('forceManyBody');
    d3.forceLink.mockReturnValue(linkForce);
    d3.forceCenter.mockReturnValue('forceCenter');
    d3.forceCollide.mockReturnValue('forceCollide');
  });

  it('initializes a simulation in the constructor', () => {
    new D3ForceSimulation({
      nodes: [
        { nodeId: '1' },
        { nodeId: '2' },
        { nodeId: '3' },
      ],
      edges: [
        { fromNodeId: '1', toNodeId: '2' },
        { fromNodeId: '3', toNodeId: '2' },
      ],
      width: 100,
      height: 200,
    });
    expect(d3.forceSimulation).toHaveBeenCalledWith([
        { nodeId: '1' },
        { nodeId: '2' },
        { nodeId: '3' },
    ]);
    expect(d3.forceManyBody).toHaveBeenCalled();
    expect(d3.forceLink).toHaveBeenCalledWith([
      expect.objectContaining({ source: 0, target: 1 }),
      expect.objectContaining({ source: 2, target: 1 }),
    ]);
    expect(d3.forceCenter).toHaveBeenCalledWith(50, 100);
    expect(d3.forceCollide).toHaveBeenCalled();
    expect(baseSimulation.force).toHaveBeenCalledWith('charge', 'forceManyBody');
    expect(baseSimulation.force).toHaveBeenCalledWith('link', 'forceLinkWithDistance');
    expect(baseSimulation.force).toHaveBeenCalledWith('collision', 'forceCollide');
    expect(baseSimulation.force).toHaveBeenCalledWith('center', 'forceCenter');

    expect(linkForce.distance).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { distance: 1 }, output: 1 },
      { input: { distance: 45 }, output: 45 },
    ]));
  });

  it('can register listeners to fire on new layouts', () => {
    const listener = jest.fn();
    const simulation = new D3ForceSimulation().onNewLayout(listener);
    expect(baseSimulation.on).toHaveBeenCalledWith('tick', expect.functionWithSideEffect({
      before: () => expect(listener).not.toHaveBeenCalled(),
      after: () => expect(listener).toHaveBeenCalledWith(simulation),
      reset: () => listener.mockClear(),
    }));
  });

  it('can find node positions', () => {
    const nodes = [
      { nodeId: '1' },
      { nodeId: '2' },
      { nodeId: '3' },
    ];
    const simulation = new D3ForceSimulation({ nodes });
    Object.assign(nodes[0], { x: 1.2, y: 2.3 });
    Object.assign(nodes[1], { x: 3.4, y: 4.5 });
    Object.assign(nodes[2], { x: 5.6, y: 6.7 });
    expect(simulation.getNodePosition('1')).toEqual({ x: 1.2, y: 2.3 });
    expect(simulation.getNodePosition('2')).toEqual({ x: 3.4, y: 4.5 });
    expect(simulation.getNodePosition('3')).toEqual({ x: 5.6, y: 6.7 });
  });

  it('can find edge positions', () => {
    const nodes = [
      { nodeId: '1' },
      { nodeId: '2' },
      { nodeId: '3' },
    ];
    const edges = [
      { fromNodeId: '1', toNodeId: '2' },
      { fromNodeId: '1', toNodeId: '3' },
      { fromNodeId: '2', toNodeId: '3' },
    ];
    const simulation = new D3ForceSimulation({ nodes, edges });
    Object.assign(nodes[0], { x: 1.2, y: 2.3 });
    Object.assign(nodes[1], { x: 3.4, y: 4.5 });
    Object.assign(nodes[2], { x: 5.6, y: 6.7 });
    expect(simulation.getEdgePosition('1', '2')).toEqual({
      from: { x: 1.2, y: 2.3 },
      to:   { x: 3.4, y: 4.5 },
    });
    expect(simulation.getEdgePosition('1', '3')).toEqual({
      from: { x: 1.2, y: 2.3 },
      to:   { x: 5.6, y: 6.7 },
    });
    expect(simulation.getEdgePosition('2', '3')).toEqual({
      from: { x: 3.4, y: 4.5 },
      to:   { x: 5.6, y: 6.7 },
    });
  });


});
