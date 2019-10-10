import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../components/CustomPropTypes';
import { FixedPositionConstraintDefinition } from '../ConstraintDefinition';
import SimulationContext from './SimulationContext';

export class FixedPositionConstraint extends React.Component {
  static contextType = SimulationContext
  static propTypes = {
    nodeId: PropTypes.string,
    position: CustomPropTypes.position,
  }

  static defaultProps = {
    position: { x: 0, y: 0 },
  }

  componentDidMount() {
    const simulation = this.context;
    simulation.registerConstraint(
      new FixedPositionConstraintDefinition({
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
