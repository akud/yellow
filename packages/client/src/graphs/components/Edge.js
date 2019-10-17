import geometryUtils from '../../elements/geometry-utils';
import PropTypes from 'prop-types';
import React from 'react';

import Arrow from '../../elements/components/Arrow';

import { DistanceSettingRuleDefinition }  from '../../simulation/RuleDefinition';
import SimulationContext from '../../simulation/components/SimulationContext';

export default class Edge extends React.Component {
  static contextType = SimulationContext

  static propTypes = {
    fromNodeId: PropTypes.string.isRequired,
    toNodeId: PropTypes.string.isRequired,
    color: PropTypes.string,
    thickness: PropTypes.number,
    distance: PropTypes.number,
    directed: PropTypes.bool,
    bidirectional: PropTypes.bool,
  }

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
    distance: 100,
    directed: false,
    bidirectional: false,
  }

  componentDidMount() {
    const { fromNodeId, toNodeId, distance } = this.props;
    const simulation = this.context;
    simulation.registerRule(
      new DistanceSettingRuleDefinition({
        between: [ fromNodeId, toNodeId ],
        distance: distance
      })
    );
  }

  render() {
    const {
      fromNodeId,
      toNodeId,
      color,
      thickness,
      directed,
      bidirectional,
    } = this.props;

    const sourcePosition = this.getSourcePosition();
    const targetPosition = this.getTargetPosition();
    return (
      <g className="edge" data-from-element-id={fromNodeId} data-to-element-id={toNodeId}>
        {
          bidirectional &&
            <Arrow
              to={sourcePosition}
              color={color}
              thickness={thickness}
              angle={
                geometryUtils.computeHorizontalIntersectionAngle(
                  targetPosition, sourcePosition
                )
              }
            />
        }
        <line
          x1={sourcePosition.x}
          y1={sourcePosition.y}
          x2={targetPosition.x}
          y2={targetPosition.y}
          stroke={color}
          strokeWidth={thickness}
        />
        {
          (bidirectional || directed) &&
            <Arrow
              to={targetPosition}
              color={color}
              thickness={thickness}
              angle={
                geometryUtils.computeHorizontalIntersectionAngle(
                  sourcePosition, targetPosition
                )
              }
            />
        }
      </g>
    );
  }

  getSourcePosition() {
    const { fromNodeId, toNodeId } = this.props;
    const simulation = this.context;
    const sourceNodeCenter = simulation.getElementData(fromNodeId).position;
    const targetNodeCenter = simulation.getElementData(toNodeId).position;
    const sourceNodeShape = simulation.getElementData(fromNodeId).shape;

    return sourceNodeShape.computeIntersectionWithRay(sourceNodeCenter, targetNodeCenter);
  }

  getTargetPosition() {
    const { fromNodeId, toNodeId } = this.props;
    const simulation = this.context;
    const sourceNodeCenter = simulation.getElementData(fromNodeId).position;
    const targetNodeCenter = simulation.getElementData(toNodeId).position;
    const targetNodeShape = simulation.getElementData(toNodeId).shape;

    return targetNodeShape.computeIntersectionWithRay(targetNodeCenter, sourceNodeCenter);
  }
}
