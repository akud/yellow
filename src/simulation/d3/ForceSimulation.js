import Simulation from 'simulation/Simulation';

import * as d3 from 'd3-force';
import { RepellingForce, CenteringForce, CollisionForce, LinkForce } from './forces';

export default class ForceSimulation extends Simulation {
  /**
   * options:
   *   nodes: [
   *     SimulatedNode,
   *     SimulatedNode,
   *     ...
   *   edges: [
   *   ],
   *     SimulatedEdge,
   *     SimulatedEdge,
   *     ...
   *   ],
   *   center: { x: number, y: number } - the center of the simulation
   *   extraForces: [
   *     Force,
   *     Force,
   *     ...
   *   ]
   */
  constructor(options) {
    options = Object.assign({
      nodes: [],
      edges: [],
      center: { x: 0, y: 0 },
      extraForces: [],
    }, options);
    super(options);

    const forces = [
      new CenteringForce(options.center),
      new CollisionForce(),
      new LinkForce(this.edges),
    ].concat(options.extraForces);

    this.simulation = d3.forceSimulation(this.nodes)
    forces.forEach(f => {
      this.simulation = this.simulation.force(f.getName(), f.getForce());
    });
  }

  onNewLayout(listener) {
    this.simulation.on('tick', () => listener(this));
    return this;
  }
}

export const createDefaultGraphSimulation = ({nodes, edges, width, height}) => new ForceSimulation({
  nodes,
  edges,
  center: { x: width / 2, y: height / 2 },
  extraForces: [
    new RepellingForce(),
  ],
});
