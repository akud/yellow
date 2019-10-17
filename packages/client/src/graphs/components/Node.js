import React from 'react';
import PropTypes from 'prop-types';

import { withExtraProps } from '../../components/component-utils';

import Orientation from '../../elements/Orientation';

import SimulationContext from '../../simulation/components/SimulationContext';
import { FixedDistanceConstraintDefinition } from '../../simulation/ConstraintDefinition';
import { DirectionalForceDefinition } from '../../simulation/ForceDefinition';

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
      <g className="node">
        {
          withExtraProps(
            children,
            (child, index) => {
              const element = elements[index];
              return {
                config: {
                  id: element.id,
                  position: simulation.getElementData(element.id).position,
                  postRender: shape => {
                    this.registerShape(element, shape);
                    this.registerDirectionalForces(element);
                  }
                }
              };
            }
          )
        }
      </g>
    );
  }

  registerShape(element, shape) {
    const simulation = this.context;
    const { primaryElement, elements, shapes } = this;

    simulation.registerElement(element.id, shape);
    this.shapes[element.id] = shape;
    if (this.hasRegisteredAllShapes()) {
      LOGGER.debug(
        'Registered {} shapes, adding fixed distance constraints',
        Object.values(shapes).length
      );
      const primaryElementRadius = shapes[primaryElement.id].getBoundingRadius();

      elements.forEach(e => {
        if (!e.orientation.isPrimary()) {
          const distance = primaryElementRadius + shapes[e.id].getBoundingRadius();
          simulation.registerConstraint(new FixedDistanceConstraintDefinition({
            between: [primaryElement.id, e.id],
            distance,
            strengthMultiplier: 2.5,
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

  registerDirectionalForces(element) {
    const simulation = this.context;
    if (element.orientation.hasDirections()) {
      simulation.registerForce(
        new DirectionalForceDefinition({
          elementId: element.id,
          directions: element.orientation.getDirections()
        })
      );
    }
  }

  hasRegisteredAllShapes() {
    return Object.values(this.shapes).length === this.elements.length;
  }
}
