/**
 * Defines the interface simulations must support
*/
export default class Simulation {
  constructor(simulationConfig) {
    this.config = simulationConfig;
  }

  /**
   * Find the position of the given node in the current simulation
   *
   * returns: { position: { x: number, y: number }, shape: ShapeDefinition }
   */
  getElementData(id) {
    throw new Error('Subclasses must override getElementPosition');
  }
}
