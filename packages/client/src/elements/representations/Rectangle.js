import React from 'react';
import RectangleDefinition from '../RectangleDefinition';
import PropTypes from 'prop-types';
import ElementProps from './ElementProps';

export default class Rectangle extends React.Component {
  static propTypes = Object.assign(
    {
      color: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    },
    ElementProps.BasePropTypes
  );

  static defaultProps = Object.assign(
    {
      color: '#4286f4',
      width: 10,
      height: 10
    },
    ElementProps.DefaultBaseProps
  );

  componentDidMount() {
    const { registerShape, width, height } = this.props;
    registerShape(new RectangleDefinition({ width, height }));
  }

  render() {
    const { color, position, id, width, height } = this.props;
    const cornerX = position.x - width / 2;
    const cornerY = position.y - height / 2;
    return <rect
      x={cornerX}
      y={cornerY}
      fill={color}
      width={width}
      height={height}
      data-element-id={id}
    />;
  }
}
