import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import { withExtraProps } from 'components/component-utils';

import Point from 'shapes/Point';

import SimulationConfig from 'simulation/SimulationConfig';
import SimulationPropTypes from 'simulation/components/SimulationPropTypes';
import { PreventCollisionsConstraintDefinition } from 'simulation/ConstraintDefinition';

export default class Node extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    simulatedElements: SimulationPropTypes.simulatedElements,
  }

  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  render() {
    const { children } = this.props;
    const { ref } = this;
    return (
      <g className="node">
        {withExtraProps(children, () => ({ ref, position: this.position()}))}
      </g>
    );
  }

  getSimulationConfig() {
    const elementShapes = {};
    elementShapes[this.props.nodeId] = this.getShape();
    return new SimulationConfig({
      elementIds: [ this.props.nodeId ],
      elementShapes,
      constraints: [
        new PreventCollisionsConstraintDefinition({
          elementId: this.props.nodeId
        }),
      ]
    });
  }

  position() {
    const { simulatedElements, nodeId } = this.props;
    return simulatedElements ? simulatedElements[nodeId].position : null;
  }

  getShape() {
    return this.ref.current ? this.ref.current.getShapeDefinition() : new Point();
  }
}
