import * as d3 from 'd3-force';

import PointDefinition from '../elements/PointDefinition';

import utils from '../utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('ForceSimulation');

const EMPTY_ELEMENT_DATA = {
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0,
  },
  shape: PointDefinition.INSTANCE,
};

const DEFAULT_REPELLING_FORCE_STRENGTH = -30;

/**
 * Runs a force-directed d3 simulation for element positions.
 */
export default class ForceSimulation {
  constructor() {
    this.elements = {};
    this.listeners = [];
    this.rules = {};
    this.iterationNumber = 0;
    this.simulation = d3.forceSimulation()
      .force('ruleForce', (alpha) => this._applyRules(alpha))
      .force('preventCollisions', d3.forceCollide().radius(n => n.shape.getBoundingRadius()))
      .on('tick', () => {
        this.iterationNumber++;
        this._fireListeners()
      });
  }

  /**
   * Add a new element to the simulation
   */
  registerElement(elementId, shape) {
    this.elements[elementId] = {
      id: elementId,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      shape: shape || PointDefinition.INSTANCE,
    };
    this.simulation.nodes(Object.values(this.elements));
    return this;
  }

  /**
   * Register a new rule in the simulation. A rule is a function
   * `f: f(currentSimulation) => [StateChange, StateChange...]
   *
   * that optionally determines a set of state changes to apply to the simulation
   */
  registerRule(ruleId, rule) {
    this.rules[ruleId] = rule;
    return this;
  }

  /**
   * Create a force in the simulation that causes all elements to repel each other
   */
  setRepellingForceStrength(strength) {
    this.simulation.force(
      'repelling', d3.forceManyBody()
        .strength(DEFAULT_REPELLING_FORCE_STRENGTH * strength)
    );
  }


  /**
   * Get a list of all element ids in the simulation
   */
  getElementIds() {
    return Object.keys(this.elements);
  }

  /**
   * Return data about the given node in the current simulation
   *
   * returns: {
   *   shape: ShapeDefinition
   *   position: {
   *     x: number,
   *     y: number
   *   },
   *   velocity: {
   *     x: number,
   *     y: number
   *   },
   * }
   */
  getElementData(id) {
    const element = this.elements[id];
    if (element) {
      return {
        position: {
          x: element.x,
          y: element.y,
        },
        velocity: {
          x: element.vx,
          y: element.vy,
        },
        shape: element.shape,
      };
    } else {
      return EMPTY_ELEMENT_DATA;
    }
  }

  /**
   * Return the current iteration number of the simulation.
   */
  getCurrentIterationNumber() {
    return this.iterationNumber;
  }

  /**
   * Register a listener to be notified of layout changes
   */
  onNewLayout(listener) {
    this.listeners.push(listener);
    return this;
  }

  _applyRules(alpha) {
    utils.flatten(Object.values(this.rules).map(rule => rule(this)))
      .forEach(forceApplication => {
        forceApplication.getAffectedElementIds().forEach(elementId => {
          const element = this.elements[elementId];
          if (element) {
            element.vx += alpha * forceApplication.getXComponent();
            element.vy += alpha * forceApplication.getYComponent();
          } else {
            LOGGER.warn(
              "Got ForceApplication for unknown element {}", elementId
            );
          }
        });
      });
  }

  _fireListeners() {
    this.listeners.forEach(l => l(this));
  }
}
