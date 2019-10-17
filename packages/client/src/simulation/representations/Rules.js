import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';
import { PositioningRuleDefinition } from '../RuleDefinition';
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
