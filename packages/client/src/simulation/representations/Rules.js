import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';
import Direction from '../Direction';
import {
  PositioningRuleDefinition,
  RelativePositioningRuleDefinition,
} from '../RuleDefinition';
import SimulationContext from './SimulationContext';

export class PositioningRule extends React.Component {
  static contextType = SimulationContext
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    position: CustomPropTypes.position,
  }

  static defaultProps = {
    position: { x: 0, y: 0 },
  }

  componentDidMount() {
    const simulation = this.context;
    simulation.registerRule(
      new PositioningRuleDefinition({
        elementId: this.props.nodeId, //picking the primary element for the node
        x: this.props.position.x,
        y: this.props.position.y,
      })
    );
  }

  render() {
    return null;
  }
}

export class RelativePositioningRule extends React.Component {
  static contextType = SimulationContext
  static propTypes = {
    baseNodeId: PropTypes.string.isRequired,
    targetNodeId: PropTypes.string.isRequired,
    directions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(Direction))).isRequired,
    strengthMultiplier: PropTypes.number,
  }

  static defaultProps = {
    strengthMultiplier: 1.0,
  }

  componentDidMount() {
    const simulation = this.context;
    simulation.registerRule(
      new RelativePositioningRuleDefinition({
        baseElementId: this.props.baseNodeId, //picking the primary element for the node
        targetElementId: this.props.targetNodeId, //picking the primary element for the node
        directions: this.props.directions,
        strengthMultiplier: this.props.strengthMultiplier,
      })
    );
  }

  render() {
    return null;
  }
}
