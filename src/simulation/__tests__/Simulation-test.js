jest.mock('../SimulatedEdge');
jest.mock('../SimulatedNode');

import Simulation from '../Simulation';
import MockSimulatedEdge from '../SimulatedEdge';
import MockSimulatedNode from '../SimulatedNode';

describe('Simulation', () => {
  it('can find node positions', () => {
    const nodes = [
      new MockSimulatedNode({ id: '1', center: { x: 1.2, y: 2.3 } }),
      new MockSimulatedNode({ id: '2', center: { x: 3.4, y: 4.5 } }),
      new MockSimulatedNode({ id: '3', center: { x: 5.6, y: 6.7 } }),
    ];
    const simulation = new Simulation({ nodes });
    expect(simulation.getNodePosition('1')).toEqual({ x: 1.2, y: 2.3 });
    expect(simulation.getNodePosition('2')).toEqual({ x: 3.4, y: 4.5 });
    expect(simulation.getNodePosition('3')).toEqual({ x: 5.6, y: 6.7 });
  });

  it('can find edge positions', () => {
    const nodes = [
      new MockSimulatedNode({ id: '1', intersectionPoint: { x: 1.2, y: 2.3 } }),
      new MockSimulatedNode({ id: '2', intersectionPoint: { x: 3.4, y: 4.5 } }),
      new MockSimulatedNode({ id: '3', intersectionPoint: { x: 5.6, y: 6.7 } }),
    ];
    const edges = [
      new MockSimulatedEdge({ source: '1', target: '2' }),
      new MockSimulatedEdge({ source: '1', target: '3' }),
      new MockSimulatedEdge({ source: '2', target: '3' }),
    ];
    const simulation = new Simulation({ nodes, edges });

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
