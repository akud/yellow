import React from 'react';
import PropTypes from 'prop-types';

import ElementGroup from '../elements/ElementGroup';
import ElementContext from '../elements/ElementContext';

import Orientation from './Orientation';
import SimulationContext from './SimulationContext';
import { createOrientingRule } from './force/PositioningRules';
import { createBindingRule } from './force/LinkingRules';

import utils from '../utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('SimulatedElementGroup');

/**
 * Wrap a group of elements and keep them bound to each other around a primary element
 *
 */
export default class SimulatedElementGroup extends React.Component {
  static contextType = SimulationContext

  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    bindingStrength: PropTypes.number,
  };

  static defaultProps = {
    className: 'simulated-element-group',
    bindingStrength: 5.0,
  };

  static getPrimaryElementId(groupId) {
    return groupId + '_primary';
  }

  constructor(props) {
    super(props);
    this.groupId = props.id;

    this.primaryElement = null;

    this.registeredElementIds = new Set();
    this.elements = utils.makeArray(props.children).map((c, i) => {
      const orientation = c.props.orientation || (
        !this.primaryElement ? Orientation.PRIMARY : Orientation.UNSPECIFIED
      );
      const id = orientation.isPrimary() ?
        SimulatedElementGroup.getPrimaryElementId(this.groupId) :
        `${this.groupId}_${i}`;

      const element = { id, orientation };
      if (element.orientation.isPrimary()) {
        this.primaryElement = element;
      }
      return element;
    });
  }

  render() {
    const simulation = this.context;
    const { children, id, className } = this.props;

    const registerShape = (id, shape) => {
      simulation.registerElement(id, shape);
      this.registeredElementIds = this.registeredElementIds.add(id);
      if (this.registeredElementIds.size === this.elements.length) {
        this.registerWithSimulation();
      }
    };

    return (
      <ElementGroup className={className} data-group-id={id} >
        <ElementContext.Provider value={{ registerShape }}>
          {
            utils.makeArray(children).map((c, i) => {
              const elementId = this.elements[i].id;
              const elementData = simulation.getElementData(elementId);
              return React.cloneElement(
                c,
                { id: elementId, key: elementId, ...elementData }
              );
            })
          }
        </ElementContext.Provider>
      </ElementGroup>
    );
  }

  registerWithSimulation() {
    LOGGER.debug(
      'Registered {} elements, adding grouping rules for group {}',
      this.registeredElementIds.size,
      this.props.id
    );

    this.context.registerGroup(
      this.groupId,
      this.elements.map(e => e.id)
    );

    this.elements.forEach(e => {
      if (!e.orientation.isPrimary()) {
        this.registerBindingRule(e);
        if (e.orientation.isSpatiallyOriented()) {
          this.registerOrientingRule(e);
        }
      }
    }, this);
  }

  registerBindingRule(element) {
    const simulation = this.context;
    const { primaryElement, groupId } = this;
    const { bindingStrength } = this.props;

    const distance =  this.getBoundingRadius(primaryElement.id) + this.getBoundingRadius(element.id);
    simulation.registerRule(
      `${groupId}:binding:${element.id}-${primaryElement.id}`,
      createBindingRule({
        baseElementId: primaryElement.id,
        targetElementId: element.id,
        distance,
        strength: bindingStrength,
      })
    );
    LOGGER.debug(
      'Set distance between {} and {} to {}',
      primaryElement.id,
      element.id,
      distance
    );
  }

  registerOrientingRule(element) {
    const simulation = this.context;
    const { primaryElement, groupId } = this;
    simulation.registerRule(
      `${groupId}:positioning:${primaryElement.id}-${element.id}`,
      createOrientingRule({
        baseElementId: primaryElement.id,
        targetElementId: element.id,
        orientation: element.orientation
      })
    );
  }

  getBoundingRadius(elementId) {
    return this.context.getElementData(elementId).shape.getBoundingRadius();
  }
}
