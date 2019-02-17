jest.mock('d3-force');
jest.mock('simulation/d3/forces');
jest.mock('simulation/SimulatedNode');
jest.mock('simulation/SimulatedEdge');


import ForceSimulation from '../ForceSimulation';

import * as d3 from 'd3-force';
import * as forces from 'simulation/d3/forces';
import MockSimulatedEdge from 'simulation/SimulatedEdge';
import MockSimulatedNode from 'simulation/SimulatedNode';

describe('ForceSimulation', () => {
  let baseSimulation;

  beforeEach(() => {
    baseSimulation = {
      force: jest.fn(),
      on: jest.fn(),
    };
    baseSimulation.force.mockReturnValue(baseSimulation);
    d3.forceSimulation.mockReturnValue(baseSimulation);

    forces.CollisionForce.mockClear();
    forces.CenteringForce.mockClear();
    forces.LinkForce.mockClear();
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
    const extraForce = {
      getName: jest.fn().mockReturnValue('extra'),
      getForce: jest.fn().mockReturnValue('extraforcevalue')
    };

    new ForceSimulation({
      nodes: nodes,
      edges: edges,
      center: { x: 50, y: 100 },
      extraForces: [ extraForce ],
    });

    expect(d3.forceSimulation).toHaveBeenCalledWith(nodes);

    expect(baseSimulation.force).toHaveBeenCalledWith(
      forces.centeringForceName, forces.centeringForceValue
    );
    expect(baseSimulation.force).toHaveBeenCalledWith(
      forces.collisionForceName, forces.collisionForceValue
    );
    expect(baseSimulation.force).toHaveBeenCalledWith(
      forces.linkForceName, forces.linkForceValue
    );
    expect(baseSimulation.force).toHaveBeenCalledWith(
      'extra', 'extraforcevalue'
    );

    expect(forces.CenteringForce).toHaveBeenCalledWith({ x: 50, y: 100 });
    expect(forces.CollisionForce).toHaveBeenCalled();
    expect(forces.LinkForce).toHaveBeenCalledWith(edges);

    expect(extraForce.getName).toHaveBeenCalled();
    expect(extraForce.getForce).toHaveBeenCalled();
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
