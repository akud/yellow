export default class SimulatedEdge {
  constructor({ source, target, distance }) {
    this.source = source;
    this.target = target;
    this.distance = distance;
  }

  getDistance() {
    return this.distance;
  }

}
