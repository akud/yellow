import React from 'react';
import PropTypes from 'prop-types';
import CircleDefinition from 'elements/CircleDefinition';
import CustomPropTypes from 'components/CustomPropTypes';

export default class Circle extends React.Component {
  static propTypes = {
    position: CustomPropTypes.position,
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
      return null;
    }
  }

  getShapeDefinition() {
    const { radius } = this.props;
    return new CircleDefinition({ radius });
  }
}
