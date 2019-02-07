import utils from 'utils';

export default class SimulatedEdge {
  constructor({ sourceNodeId, targetNodeId, distance }) {
    this.source = utils.requirePresent('sourceNodeId', sourceNodeId);
    this.target = utils.requirePresent('targetNodeId', targetNodeId);
    this.distance = utils.requirePresent('distance', distance);
  }

  getDistance() {
    return this.distance;
  }
}
