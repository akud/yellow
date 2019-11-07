import React from 'react';
import PointDefinition from '../../elements/PointDefinition';

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
  registerRule: rule => {},
});
