import Simulation from '../Simulation';

import * as d3 from 'd3-force';
import { ForceType } from '../ForceDefinition';
import { RuleType } from '../RuleDefinition';
import PointDefinition from '../../elements/PointDefinition';
import DirectionalForce from './DirectionalForce';
import PositioningRule from './PositioningRule';
import RelativePositioningRule from './RelativePositioningRule';
import Direction from '../Direction';
import logging from '@akud/logging';

const LOGGER = new logging.Logger('d3ForceSimulation');

const EMPTY_ELEMENT_DATA = {
  position: { x: 0, y: 0 },
  shape: new PointDefinition(),
};

export default class ForceSimulation extends Simulation {
  constructor() {
    super();
    this.elements = {};
    this.listeners = [];
    this.links = [];
    this.linkForce = createLinkForce(this.links);
    this.simulation = d3.forceSimulation()
      .force('preventCollisions', d3.forceCollide().radius(n => n.shape.getBoundingRadius()))
      .force('link', this.linkForce)
      .on('tick', () => this.fireListeners());
  }

  getElementData(id) {
    const element = this.elements[id];
    if (element) {
      return { position: { x: element.x, y: element.y }, shape: element.shape };
    } else {
      return EMPTY_ELEMENT_DATA;
    }
  }

  registerElement(elementId, shape) {
    this.elements[elementId] = {
      id: elementId,
      x: 0,
      y: 0,
      shape,
    };
    this.simulation.nodes(Object.values(this.elements));
    return this;
  }

  onNewLayout(listener) {
    this.listeners.push(listener);
    return this;
  }

  registerForce(force) {
    switch(force.type) {
      case ForceType.CENTERING:
        this.simulation.force(
          'center', d3.forceCenter(force.center.x, force.center.y)
        );
        break;
      case ForceType.REPELLING:
        this.simulation.force(
          'repelling',
          d3.forceManyBody()
          .strength(() => -force.strengthMultiplier * 30)
        );
        break;
      case ForceType.DIRECTIONAL:
        force.directions.forEach(direction => this.simulation.force(
          force.elementId + '-' + Direction.stringify(direction),
          DirectionalForce.create({
            elementId: force.elementId,
            direction,
            strengthMultiplier: force.strengthMultiplier,
          })
        ));
        break;
      default:
        LOGGER.warn('unrecognized force {}', force);
    }
    return this;
  }

  registerRule(rule) {
    switch(rule.type) {
      case RuleType.DISTANCE_SETTING:
        this.links.push({
          source: rule.between[0],
          target: rule.between[1],
          distance: rule.distance,
          strengthMultiplier: rule.strengthMultiplier,
        });
        this.linkForce.links(this.links);
        break;
      case RuleType.POSITIONING:
        this.simulation.force(
          rule.elementId + '-fixed-position',
          PositioningRule.create({
            elementId: rule.elementId,
            x: rule.x,
            y: rule.y,
          })
        );
        break;
      case RuleType.RELATIVE_POSITIONING:
        this.simulation.force(
          rule.baseElementId + '-' + rule.targetElementId + '-relative-position',
          RelativePositioningRule.create({
            baseElementId: rule.baseElementId,
            targetElementId: rule.targetElementId,
            directions: rule.directions,
            strengthMultiplier: rule.strengthMultiplier,
          })
        );
        break;
      default:
        LOGGER.warn('unrecognized rule {}', rule);
    }
    return this;
  }

  fireListeners() {
    this.listeners.forEach(l => l(this));
  }
}

const createLinkForce = (links) => {
  const linkForce = d3.forceLink(links)
    .id(n => n.id)
    .distance(l => l.distance);

  const defaultLinkForceStrength = linkForce.strength();

  return linkForce.strength(function() {
    const link = arguments[0];
    const result = link.strengthMultiplier * defaultLinkForceStrength.apply(null, arguments)
    LOGGER.debug('strength between {} and {}: {}', link.source.id, link.target.id, result);
    return result;
  });
}

