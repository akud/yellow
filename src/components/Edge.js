import GraphElementType from 'graph/GraphElementType';
import PropTypes from 'prop-types';
import React from 'react';

export default class Edge extends React.Component {
  static elementType = GraphElementType.EDGE;

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
  }

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
    distance: 100,
  }

  render() {
    const { color, thickness, position } = this.props;
    if (position) {
      return (
        <line
          x1={position.from.x}
          y1={position.from.y}
          x2={position.to.x}
          y2={position.to.y}
          style={{
            stroke: color,
            strokeWidth: thickness,
          }}
        />
      );
    }
  }

}
