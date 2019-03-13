import React from 'react';
import RectangleDefinition from 'shapes/RectangleDefinition';
import PropTypes from 'prop-types';
import CustomPropTypes from 'components/CustomPropTypes';

export default class Rectangle extends React.Component {
  static propTypes = {
    position: CustomPropTypes.position,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    color: '#4286f4',
    width: 10,
    height: 10
  }

  render() {
    const { color, position, width, height } = this.props;
    if (position) {
      const cornerX = position.x - width / 2;
      const cornerY = position.y - height / 2;
      return <rect
        x={cornerX}
        y={cornerY}
        fill={color}
        width={width}
        height={height}
      />;
    } else {
      return null;
    }
  }

  getShapeDefinition() {
    const { width, height } = this.props;
    return new RectangleDefinition({ width, height });
  }
}
