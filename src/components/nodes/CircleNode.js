import Circle from '../shapes/Circle';

import PropTypes from 'prop-types';
import React from 'react';

import { asNodeComponent } from './node-utils';

class CircleNode extends React.Component {
  static getShape = Circle.getShape;

  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    color: PropTypes.string,
    radius: PropTypes.number,
  };

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
  }

  render() {
    const { color, radius, position } = this.props;
    return (
      <Circle color={color} radius={radius} position={position} />
    );
  }
}

export default asNodeComponent(CircleNode);
