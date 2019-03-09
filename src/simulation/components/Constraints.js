import React from 'react';
import PropTypes from 'prop-types';
import {
  FixedDistanceConstraintDefinition,
  PreventCollisionsConstraintDefinition
} from 'simulation/ConstraintDefinition';

import SimulationConfig from 'simulation/SimulationConfig';

export class FixedDistanceConstraint  extends React.Component {
  static propTypes = {
    firstElementId: PropTypes.string.isRequired,
    secondElementId: PropTypes.string.isRequired,
    distance: PropTypes.number,
  }

  static defaultProps = {
    distance: 10,
  }

  constructor(props) {
    super(props);
    this.constraint = new FixedDistanceConstraintDefinition({
      between: [ props.firstElementId, props.secondElementId ],
      distance: props.distance,
    });
  }

  render() {
    return null;
  }

  getSimulationConfig() {
    return new SimulationConfig({
      constraints: [ this.constraint ]
    })
  }
}

export class PreventCollisionsConstraint extends React.Component {
  static propTypes = {
    elementId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    distance: 10,
  }

  constructor(props) {
    super(props);
    this.constraint = new PreventCollisionsConstraintDefinition({
      elementId: props.elementId,
    });
  }

  render() {
    return null;
  }

  getSimulationConfig() {
    return new SimulationConfig({
      constraints: [ this.constraint ],
    });
  }
}

export default {
  FixedDistanceConstraint,
  PreventCollisionsConstraint,
}
