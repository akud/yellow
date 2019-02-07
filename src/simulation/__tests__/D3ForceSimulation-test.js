jest.mock('d3-force');

import * as d3 from 'd3-force';
import D3ForceSimulation from '../D3ForceSimulation';

describe('D3ForceSimulation', () => {
  let baseSimulation;
  let linkForce;
  let collisionForce;
  let sSequence = 1;

  beforeEach(() => {
    baseSimulation = {
      force: jest.fn(),
      on: jest.fn(),
    };
    baseSimulation.force.mockReturnValue(baseSimulation);
    d3.forceSimulation.mockReturnValue(baseSimulation);

    linkForce = {
      distance: jest.fn(),
      id: jest.fn(),
    };
    collisionForce = {
      radius: jest.fn(),
    };

    linkForce.distance.mockReturnValue(linkForce);
    linkForce.id.mockReturnValue(linkForce);

    collisionForce.radius.mockReturnValue(collisionForce);

    d3.forceManyBody.mockReturnValue('forceManyBody');
    d3.forceLink.mockReturnValue(linkForce);
    d3.forceCenter.mockReturnValue('forceCenter');
    d3.forceCollide.mockReturnValue(collisionForce);
  });

  it('initializes a simulation in the constructor', () => {
    const nodes = [
      mockNode({ id: '1' }),
      mockNode({ id: '2' }),
      mockNode({ id: '3' }),
    ];
    const edges = [
      mockEdge({ source: '1', target: '2' }),
      mockEdge({ source: '3', target: '2' }),
    ];
    new D3ForceSimulation({
      nodes: nodes,
      edges: edges,
      width: 100,
      height: 200,
    });
    expect(d3.forceSimulation).toHaveBeenCalledWith(nodes);
    expect(d3.forceManyBody).toHaveBeenCalled();
    expect(d3.forceLink).toHaveBeenCalledWith(edges);
    expect(d3.forceCenter).toHaveBeenCalledWith(50, 100);
    expect(d3.forceCollide).toHaveBeenCalled();
    expect(baseSimulation.force).toHaveBeenCalledWith('charge', 'forceManyBody');
    expect(baseSimulation.force).toHaveBeenCalledWith('link', linkForce);
    expect(baseSimulation.force).toHaveBeenCalledWith('collision', collisionForce);
    expect(baseSimulation.force).toHaveBeenCalledWith('center', 'forceCenter');

    expect(linkForce.distance).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { getDistance: () => 1 }, output: 1 },
      { input: { getDistance: () => 45 }, output: 45 },
    ]));
    expect(linkForce.id).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { id: 1 }, output: 1 },
      { input: { id: 45 }, output: 45 },
    ]));

    expect(collisionForce.radius).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { radius: 1 }, output: 1 },
      { input: { radius: 45 }, output: 45 },
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
      mockNode({ id: '1', center: { x: 1.2, y: 2.3 } }),
      mockNode({ id: '2', center: { x: 3.4, y: 4.5 } }),
      mockNode({ id: '3', center: { x: 5.6, y: 6.7 } }),
    ];
    const simulation = new D3ForceSimulation({ nodes });
    expect(simulation.getNodePosition('1')).toEqual({ x: 1.2, y: 2.3 });
    expect(simulation.getNodePosition('2')).toEqual({ x: 3.4, y: 4.5 });
    expect(simulation.getNodePosition('3')).toEqual({ x: 5.6, y: 6.7 });
  });

  it('can find edge positions', () => {
    const nodes = [
      mockNode({ id: '1', intersectionPoint: { x: 1.2, y: 2.3 } }),
      mockNode({ id: '2', intersectionPoint: { x: 3.4, y: 4.5 } }),
      mockNode({ id: '3', intersectionPoint: { x: 5.6, y: 6.7 } }),
    ];
    const edges = [
      mockEdge({ source: '1', target: '2' }),
      mockEdge({ source: '1', target: '3' }),
      mockEdge({ source: '2', target: '3' }),
    ];
    const simulation = new D3ForceSimulation({ nodes, edges });
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


  const mockNode = opts => {
    opts = Object.assign({
      id: (++sSequence).toString(),
      center: { x: 45, y: 12 },
      intersectionPoint: { x: 19, y: 345 },
      radius: 12,
    }, opts);

    return {
      id: opts.id,
      getCollisionRadius: jest.fn().mockReturnValue(opts.radius),
      getCenter: jest.fn().mockReturnValue(opts.center),
      computeIntersectionWithLine: jest.fn().mockReturnValue(opts.intersectionPoint),
    };
  };

  const mockEdge = opts => {
    opts = Object.assign({
      source: (++sSequence).toString(),
      target: (++sSequence).toString(),
      distance: 20,
    }, opts);

    return {
      source: opts.source,
      target: opts.target,
      getDistance: jest.fn().mockReturnValue(opts.distance),
    };
  };

});
