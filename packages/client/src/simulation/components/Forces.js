import React from 'react';
import CustomPropTypes from '../../components/CustomPropTypes';
import { CenteringForceDefinition, RepellingForceDefinition } from '../ForceDefinition';
import SimulationContext from './SimulationContext';

export class CenteringForce extends React.Component {
  static contextType = SimulationContext
  static propTypes = {
    center: CustomPropTypes.position,
  }

  static defaultProps = {
    center: { x: 0, y: 0 },
  }

  componentDidMount() {
    const simulation = this.context;
    simulation.registerForce(new CenteringForceDefinition(this.props.center));
  }

  render() {
    return null;
  }
}

export class RepellingForce extends React.Component {
  static contextType = SimulationContext

  componentDidMount() {
    const simulation = this.context;
    simulation.registerForce(new RepellingForceDefinition());
  }

  render() {
    return null;
  }
}

export default {
  CenteringForce,
  RepellingForce,
}
