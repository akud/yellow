import geometryUtils from 'elements/geometry-utils';
import PropTypes from 'prop-types';
import React from 'react';

import Arrow from './Arrow';

import { FixedDistanceConstraintDefinition }  from 'simulation/ConstraintDefinition';
import SimulationPropTypes from 'simulation/components/SimulationPropTypes';
import SimulationConfig from 'simulation/SimulationConfig';

export default class Edge extends React.Component {
  static propTypes = {
    fromNodeId: PropTypes.string.isRequired,
    toNodeId: PropTypes.string.isRequired,
    simulatedElements: SimulationPropTypes.simulatedElements,
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

  render() {
    const {
      color,
      thickness,
      directed,
      bidirectional,
      simulatedElements,
    } = this.props;

    if (simulatedElements) {
      const sourcePosition = this.getSourcePosition();
      const targetPosition = this.getTargetPosition();
      return (
        <g className="edge">
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
    } else {
      return null;
    }
  }

  getSimulationConfig() {
    const { fromNodeId, toNodeId, distance } = this.props;
    return new SimulationConfig({
      elementIds: [ fromNodeId, toNodeId ],
      constraints: [
        new FixedDistanceConstraintDefinition({
          between: [ fromNodeId, toNodeId ],
          distance: distance
        }),
      ],
    });
  }

  getSourcePosition() {
    const { fromNodeId, toNodeId, simulatedElements } = this.props;
    const sourceNodeCenter = simulatedElements[fromNodeId].position;
    const targetNodeCenter = simulatedElements[toNodeId].position;
    const sourceNodeShape = simulatedElements[fromNodeId].shape;

    return sourceNodeShape.computeIntersectionWithRay(sourceNodeCenter, targetNodeCenter);
  }

  getTargetPosition() {
    const { fromNodeId, toNodeId, simulatedElements } = this.props;
    const sourceNodeCenter = simulatedElements[fromNodeId].position;
    const targetNodeCenter = simulatedElements[toNodeId].position;
    const targetNodeShape = simulatedElements[toNodeId].shape;

    return targetNodeShape.computeIntersectionWithRay(targetNodeCenter, sourceNodeCenter);
  }
}
