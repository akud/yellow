import React from 'react';
import PropTypes from 'prop-types';
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

  static propTypes = {
    strengthMultiplier: PropTypes.number,
  }

  static defaultProps = {
    strengthMultiplier: 1.0,
  }

  componentDidMount() {
    const { strengthMultiplier } = this.props;
    const simulation = this.context;
    simulation.registerForce(new RepellingForceDefinition({ strengthMultiplier }));
  }

  render() {
    return null;
  }
}

export default {
  CenteringForce,
  RepellingForce,
}
