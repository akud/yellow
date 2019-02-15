import React from 'react';
import PropTypes from 'prop-types';
import CircleShape from 'geometry/Circle';

export default class Circle extends React.Component {
  static getShape = props => new CircleShape({
    center: props.position || { x: 0, y: 0 },
    radius: props.radius || Circle.defaultProps.radius,
  });

  static propTypes = {
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
