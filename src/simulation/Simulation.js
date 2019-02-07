/**
 * Defines the interface simulations must support
*/
export default class Simulation {
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
   */
  constructor(options) {
    options = Object.assign({
      nodes: [],
      edges: [],
    }, options);

    this.nodes = options.nodes;
    this.edges = options.edges;

    this.nodeIndex = this.nodes.reduce((index, n, i) => {
      index[n.id] = n;
      return index;
    }, {});
  }

  /**
   * Attach a listener to run when new layouts are computed.
   *
   * returns: this
   *
   */
  onNewLayout(listener) {
    throw new Error('Subclasses must override onNewLayout');
  }

  /**
   * Find the position of the given node in the current simulation
   *
   * returns: { x: number, y: number }
   */
  getNodePosition(nodeId) {
    return this._getNodeById(nodeId).getCenter();
  }

  /**'
   * Find the position of the edge between the given nodes in the current simulation
   *
   * returns: { from: { x: number, y: number }, to: { x: number, y: number } }
   */
  getEdgePosition(sourceNodeId, targetNodeId) {
    const sourceNode = this._getNodeById(sourceNodeId);
    const targetNode = this._getNodeById(targetNodeId);
    return {
      from: sourceNode.computeEdgeIntersection(targetNode),
      to: targetNode.computeEdgeIntersection(sourceNode),
    }
  }

  _getNodeById(nodeId) {
    return this.nodeIndex[nodeId];
  }
}
