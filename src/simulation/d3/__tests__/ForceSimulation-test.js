jest.mock('d3-force');
jest.mock('simulation/SimulatedNode');
jest.mock('simulation/SimulatedEdge');

import * as d3 from 'd3-force';
import ForceSimulation from '../ForceSimulation';

import MockSimulatedNode from 'simulation/SimulatedNode';
import MockSimulatedEdge from 'simulation/SimulatedEdge';

describe('ForceSimulation', () => {
  let baseSimulation;
  let linkForce;
  let collisionForce;

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
      new MockSimulatedNode({ id: '1' }),
      new MockSimulatedNode({ id: '2' }),
      new MockSimulatedNode({ id: '3' }),
    ];
    const edges = [
      new MockSimulatedEdge({ source: '1', target: '2' }),
      new MockSimulatedEdge({ source: '3', target: '2' }),
    ];
    new ForceSimulation({
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
      { input: new MockSimulatedNode({ radius: 1 }), output: 1 },
      { input: new MockSimulatedNode({ radius: 45 }), output: 45 },
    ]));
  });

  it('can register listeners to fire on new layouts', () => {
    const listener = jest.fn();
    const simulation = new ForceSimulation().onNewLayout(listener);
    expect(baseSimulation.on).toHaveBeenCalledWith('tick', expect.functionWithSideEffect({
      before: () => expect(listener).not.toHaveBeenCalled(),
      after: () => expect(listener).toHaveBeenCalledWith(simulation),
      reset: () => listener.mockClear(),
    }));
  });
});
