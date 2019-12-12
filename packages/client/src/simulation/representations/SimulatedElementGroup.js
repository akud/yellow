import React from 'react';
import PropTypes from 'prop-types';

import Orientation from '../../elements/Orientation';
import ElementGroup from '../../elements/representations/ElementGroup';

import SimulationContext from './SimulationContext';
import SimulatedElement from './SimulatedElement';
import { createRelativePositioningRule } from '../PositioningRules';
import { createLinkingRule } from '../LinkingRule';

import utils from '../../utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('SimulatedElementGroup');

/**
 * Wrap a group of elements and keep them bound to each other around a primary element
 *
 */
export default class SimulatedElementGroup extends React.Component {
  static contextType = SimulationContext

  static propTypes = {
    elementIdPrefix: PropTypes.string.isRequired,
    className: PropTypes.string,
    bindingStrength: PropTypes.number,
  };

  static defaultProps = {
    className: 'simulated-element-group',
    bindingStrength: 2.5,
  };

  static getPrimaryElementId(prefix) {
    return prefix + '-primary';
  }

  constructor(props) {
    super(props);
    const { elementIdPrefix } = props;

    this.primaryElement = null;

    this.elements = utils.makeArray(props.children).map((c, i) => {
      const orientation = c.props.orientation || (
        !this.primaryElement ? Orientation.PRIMARY : Orientation.UNSPECIFIED
      );
      const id = orientation.isPrimary() ?
        SimulatedElementGroup.getPrimaryElementId(elementIdPrefix) :
        `${elementIdPrefix}-${i}`;

      const element = { id, orientation };
      if (element.orientation.isPrimary()) {
        this.primaryElement = element;
      }
      return element;
    });
    this.shapes = {};
  };

  render() {
    const { children, className } = this.props;
    return (
      <ElementGroup className={className}>
        {
          utils.makeArray(children).map((c, i) => {
            const elementId = this.elements[i].id;
            return (
              <SimulatedElement
                id={elementId}
                key={elementId}
                render={(elementData) => React.cloneElement(
                  c,
                  { id: elementId, ...elementData }
                )}
                onShapeRegistration={(shape) => {
                  this.registerShape(this.elements[i], shape);
                  this.registerRelativePositioningRules(this.elements[i]);
                }}
              />
            );
          })
        }
      </ElementGroup>
    );
  }

  registerShape(element, shape) {
    const simulation = this.context;
    const { primaryElement, elements, shapes } = this;
    const { bindingStrength } = this.props;

    shapes[element.id] = shape;
    if (this.hasRegisteredAllShapes()) {
      LOGGER.debug(
        'Registered {} shapes, adding distance setting rules',
        Object.values(shapes).length
      );
      const primaryElementRadius = shapes[primaryElement.id].getBoundingRadius();

      elements.forEach(e => {
        if (!e.orientation.isPrimary()) {
          const distance = primaryElementRadius + shapes[e.id].getBoundingRadius();
          simulation.registerRule(createLinkingRule({
            between: [primaryElement.id, e.id],
            distance,
            strength: bindingStrength,
          }));
          LOGGER.debug(
            'Set distance between {} and {} to {}',
            primaryElement.id,
            e.id,
            distance
          );
        }
      });
    }
  }

  registerRelativePositioningRules(element) {
    const { elementIdPrefix } = this.props;
    const simulation = this.context;
    if (element.orientation.isSpatiallyOriented()) {
      simulation.registerRule(
        createRelativePositioningRule({
          baseElementId: SimulatedElementGroup.getPrimaryElementId(elementIdPrefix),
          targetElementId: element.id,
          orientation: element.orientation
        })
      );
    }
  }

  hasRegisteredAllShapes() {
    return Object.values(this.shapes).length === this.elements.length;
  }
}
