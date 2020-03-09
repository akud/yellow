import React from 'react';
import PointDefinition from '../elements/geometry/PointDefinition';

export default React.createContext({

  /**
   * String identifying the current simulation context
   */
  contextId: 'default-simulation-context',

  /**
   * Add an element to the underlying simulation, specifying it's id and shape
   */
  registerElement: (elementId, shape) => {},

  /**
   * Get a list of ids of all the elements in the simulation
   */
  getElementIds: () => simulation.getElementIds(),

  /**
   * Retrieve a blob of data about an element in the underlying simulation:
   *
   * {
   *   position: {
   *     x: <current x position>,
   *     y: < current y position>,
   *   },
   *   shape: elementShape
   *   }
   *
   */
  getElementData: elementId => ({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    shape: PointDefinition.INSTANCE,
  }),

  /**
   * Register a new rule in the simulation. A rule is a function
   * `f: f(currentSimulation) => [ForceApplication, ForceApplication...]
   *
   * thata optionally determines a set of forces to apply to the next state
   * in the simulation
   */
  registerRule: (ruleId, rule) => {},

  /**
   * Register a group of elements with the simulation, which can be retrieved with
   * getGroupElementIds
   */
  registerGroup: (groupId, elementIds) => simulation.registerGroup(groupId, elementIds),

  /**
   * Retrieve a list of a previously defined element group
   */
  getGroupElementIds: (groupId) => simulation.getGroupElementIds(groupId),

  /**
   * Set the strength of the simulation-wide force that causes elements to repel
   * or attract each other. 1.0 is the base repelling force strength, -1.0 would
   * be an equivalent attractive force.
   */
  setRepellingForceStrength: (strength) => simulation.setRepellingForceStrength(strength),
});
