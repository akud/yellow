import Arrow from './Arrow';
import geometryUtils from 'geometry/geometry-utils';
import GraphElementType from 'graph/GraphElementType';
import SimulatedEdge from 'simulation/SimulatedEdge';
import PropTypes from 'prop-types';
import React from 'react';

export default class Edge extends React.Component {
  static elementType = GraphElementType.EDGE;
  static toSimulatedElement(props) {
    return new SimulatedEdge({
      sourceNodeId: props.fromNodeId,
      targetNodeId: props.toNodeId,
      distance: props.distance || Edge.defaultProps.distance,
    });
  }

  static propTypes = {
    fromNodeId: PropTypes.string.isRequired,
    toNodeId: PropTypes.string.isRequired,
    position: PropTypes.shape({
      from: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      to: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    }),
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
    const { color, thickness, position, directed, bidirectional } = this.props;
    if (position) {
      return (
        <g className="edge">
          {
            bidirectional &&
              <Arrow
                to={position.from}
                color={color}
                thickness={thickness}
                angle={
                  geometryUtils.computeHorizontalIntersectionAngle(position.to, position.from)
                }
              />
          }
          <line
            x1={position.from.x}
            y1={position.from.y}
            x2={position.to.x}
            y2={position.to.y}
            stroke={color}
            strokeWidth={thickness}
          />
          {
            (bidirectional || directed) &&
              <Arrow
                to={position.to}
                color={color}
                thickness={thickness}
                angle={
                  geometryUtils.computeHorizontalIntersectionAngle(position.from, position.to)
                }
              />
          }
        </g>
      );
    }
  }

}
