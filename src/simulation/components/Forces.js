import React from 'react';
import CustomPropTypes from 'components/CustomPropTypes';
import { CenteringForceDefinition, RepellingForceDefinition } from 'simulation/ForceDefinition';
import SimulationConfig from 'simulation/SimulationConfig';

export class CenteringForce extends React.Component {
  static propTypes = {
    center: CustomPropTypes.position,
  }

  static defaultProps = {
    center: { x: 0, y: 0 },
  }

  constructor(props) {
    super(props);
    this.force = new CenteringForceDefinition(this.props.center);
  }

  render() {
    return null;
  }

  getSimulationConfig() {
    return new SimulationConfig({
      forces: [ this.force ]
    })
  }
}

export class RepellingForce extends React.Component {

  constructor(props) {
    super(props);
    this.force = new RepellingForceDefinition();
  }

  render() {
    return null;
  }

  getSimulationConfig() {
    return new SimulationConfig({
      forces: [ this.force ],
    });
  }
}

export default {
  CenteringForce,
  RepellingForce,
}
