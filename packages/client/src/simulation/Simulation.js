/**
 * Defines the interface simulations must support
*/
export default class Simulation {

  /**
   * Add a new element to the simulation
   */
  registerElement(elementId, shape) {
    throw new Error('Subclasses must override registerElement');
  }

  /**
   * Find the position of the given node in the current simulation
   *
   * returns: { position: { x: number, y: number }, shape: ShapeDefinition }
   */
  getElementData(id) {
    throw new Error('Subclasses must override getElementData');
  }

  /**
   * Register a listener to be notified of layout changes
   */
  onNewLayout(listener) {
    throw new Error('Subclasses must override onNewLayout');
  }

  /**
   * Register a new force in the simulation
   */
  registerForce(force) {
    throw new Error('Subclasses must override registerForce');
  }

  /**
   * Register a new constraint in the simulation
   */
  registerConstraint(constraint) {
    throw new Error('Subclasses must override registerConstraint');
  }
}
