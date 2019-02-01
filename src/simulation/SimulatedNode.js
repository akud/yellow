export default class SimulatedNode {
  constructor({ id, radius }) {
    this.id = id;
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }
}
