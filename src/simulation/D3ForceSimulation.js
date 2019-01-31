import * as d3 from 'd3-force';

export default class D3ForceSimulation {
  /**
   * options:
   *   nodes: [
   *     { nodeId: "string" },
   *     ...
   *   ],
   *   edges: [
   *     { from: "nodeId", to: "nodeId" },
   *     ...
   *   ],
   *   width: the width of the graph,
   *   height: the height of the graph
   */
  constructor(options) {
    options = Object.assign({
      nodes: [],
      edges: [],
      width: 0,
      height: 0,
    }, options);

    this.nodes = options.nodes;

    this.nodeIndex = this.nodes.reduce((obj, n, i) => {
      obj[n.nodeId] = i;
      return obj;
    }, {});

    this.edges = options.edges.map(e => Object.assign(
      {
        source: this.nodeIndex[e.fromNodeId],
        target: this.nodeIndex[e.toNodeId],
      },
      e
    ));

    this.simulation = d3.forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody())
      .force(
        'link', d3.forceLink(this.edges).distance(d => d.distance)
      )
      .force('center', d3.forceCenter(options.width / 2, options.height / 2))
      .force('collision', d3.forceCollide().radius(n => n.radius));
  }

  /**
   * Attach a listener to run when new layouts are computed.
   *
   */
  onNewLayout(listener) {
    this.simulation.on('tick', () => listener(this));
    return this;
  }

  /**
   * Find the position of the given node in the current simulation
   */
  getNodePosition(nodeId) {
    const node = this._getNodeById(nodeId);
    return { x: node.x, y: node.y };
  }

  /**'
   * Find the position of the edge between the given nodes in the current simulation
   */
  getEdgePosition(sourceNodeId, targetNodeId) {
    return {
      from: this.getNodePosition(sourceNodeId),
      to: this.getNodePosition(targetNodeId),
    };
  }

  _getNodeById(nodeId) {
    return this.nodes[this.nodeIndex[nodeId]];
  }
}
