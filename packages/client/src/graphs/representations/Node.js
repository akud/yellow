import React from 'react';
import PropTypes from 'prop-types';

import { withExtraProps } from '../../representations/component-utils';

import Orientation from '../../elements/Orientation';
import ElementGroup from '../../elements/representations/ElementGroup';

import SimulationContext from '../../simulation/representations/SimulationContext';
import SimulatedElement from '../../simulation/representations/SimulatedElement';
import { createRelativePositioningRule } from '../../simulation/PositioningRules';
import { createLinkingRule } from '../../simulation/LinkingRule';

import utils from '../../utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('Node');

export default class Node extends React.Component {
  static contextType = SimulationContext

  static propTypes = {
    nodeId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { nodeId } = props;

    this.primaryElement = null;

    this.elements = utils.makeArray(props.children).map((c, i) => {
      const orientation = c.props.orientation || (
        !this.primaryElement ? Orientation.PRIMARY : Orientation.UNSPECIFIED
      );
      const id = orientation.isPrimary() ? nodeId : `${nodeId}-${i}`;
      const element = { id, orientation };
      if (element.orientation.isPrimary()) {
        this.primaryElement = element;
      }
      return element;
    });
    this.shapes = {};
  };

  render() {
    const simulation = this.context;
    const { elements } = this;
    const { children } = this.props;
    return (
      <ElementGroup className="node">
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
                onShapeRegistration={(shape) => this.registerShape(this.elements[i], shape)}
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

    this.shapes[element.id] = shape;
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
            strength: 2.5,
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
    const { nodeId } = this.props;
    const simulation = this.context;
    if (element.orientation.isSpatiallyOriented()) {
      simulation.registerRule(
        createRelativePositioningRule({
          baseElementId: nodeId,
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
