import Simulation from 'simulation/Simulation';
import * as d3 from 'd3-force';

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
   *   width: the width of the graph,
   *   height: the height of the graph
   */
  constructor(options) {
    options = Object.assign({
      nodes: [],
      edges: [],
      width: 100,
      height: 100,
    }, options);
    super(options);
    this.simulation = d3.forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody())
      .force(
        'link', d3.forceLink(this.edges)
                  .distance(d => d.getDistance())
                  .id(n => n.id)
      )
      .force('center', d3.forceCenter(options.width / 2, options.height / 2))
      .force('collision', d3.forceCollide().radius(n => n.getCollisionRadius()));
  }

  onNewLayout(listener) {
    this.simulation.on('tick', () => listener(this));
    return this;
  }
}
