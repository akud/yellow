import GraphElementType from 'graph/GraphElementType';
import PropTypes from 'prop-types';
import SimulatedNode from 'simulation/SimulatedNode';
import React from 'react';

export default class Node extends React.Component {
  static elementType = GraphElementType.NODE;
  static toSimulatedElement(props) {
    return new SimulatedNode({
      id: props.nodeId,
      radius: props.radius || Node.defaultProps.radius,
    });
  }

  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    color: PropTypes.string,
    radius: PropTypes.number,
  }

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
  }

  render() {
    const { color, radius, position } = this.props;
    if (position) {
      return <circle r={radius} fill={color} cx={position.x} cy={position.y} />
    } else {
      return <circle r={radius} fill={color} />
    }
  }

}
