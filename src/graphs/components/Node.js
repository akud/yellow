import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import { withExtraProps } from 'components/component-utils';

import Point from 'elements/Point';
import Orientation from 'elements/Orientation';


import SimulationConfig from 'simulation/SimulationConfig';
import SimulationPropTypes from 'simulation/components/SimulationPropTypes';
import {
  FixedDistanceConstraintDefinition,
  PreventCollisionsConstraintDefinition
} from 'simulation/ConstraintDefinition';
import { DirectionalForceDefinition } from 'simulation/ForceDefinition';

import utils from 'utils';

export default class Node extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    simulatedElements: SimulationPropTypes.simulatedElements,
  }

  constructor(props) {
    super(props);
    const { nodeId } = props;

    this.childRefs = utils.makeArray(props.children).map(createRef);
    this.elements = utils.makeArray(props.children).map((c, i) => {
      const orientation = c.props.orientation || Orientation.PRIMARY;
      const id = orientation.isPrimary() ? nodeId : `${nodeId}-${i}`;
      return { id, orientation };
    });
  };

  render() {
    const { children } = this.props;
    const { childRefs } = this;
    return (
      <g className="node">
        {
          withExtraProps(
            children,
            (child, index) => ({
              ref: childRefs[index],
              position: this.positionAt(index)
            })
          )
        }
      </g>
    );
  }

  getSimulationConfig() {
    return this.getElementShapesPromise().then(elementShapes => new SimulationConfig({
      elementIds: this.elements.map(e => e.id),
      elementShapes,
      constraints: this.getConstraints(elementShapes),
      forces: this.getForces(),
    }));
  }

  positionAt(index) {
    const { simulatedElements } = this.props;
    const elementId = this.elements[index].id;
    return simulatedElements ? simulatedElements[elementId].position : null;
  }

  getElementShapesPromise() {
    const shapePromises = this.childRefs.map(ref => {
      if (ref.current && ref.current.getShapeDefinition) {
        return ref.current.getShapeDefinition();
      } else {
        return Promise.resolve(new Point());
      }
    });

    return Promise.all(shapePromises).then(shapes => shapes.reduce((obj, shape, index) => {
      const elementId = this.elements[index].id;
      obj[elementId] = shape;
      return obj;
    }, {}));
  }

  getConstraints(elementShapes) {
    const constraints = [];
    const primaryElement = this.elements.find(e => e.orientation.isPrimary());
    const primaryElementRadius = elementShapes[primaryElement.id].getBoundingRadius();

    this.elements.forEach(e => {
      constraints.push(new PreventCollisionsConstraintDefinition({ elementId: e.id }));
      if (!e.orientation.isPrimary()) {
        constraints.push(new FixedDistanceConstraintDefinition({
          between: [primaryElement.id, e.id],
          distance: primaryElementRadius + elementShapes[e.id].getBoundingRadius(),
        }));
      }
    });
    return constraints;
  }

  getForces() {
    const forces = [];
    this.elements.forEach(e => {
      if (!e.orientation.isPrimary()) {
        forces.push(new DirectionalForceDefinition(e.id, e.orientation.directions));
      }
    });
    return forces;
  }
}
