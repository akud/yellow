import React from 'react';
import RectangleDefinition from './geometry/RectangleDefinition';
import PropTypes from 'prop-types';
import ElementProps from './ElementProps';
import ElementContext from './ElementContext';

export default class Rectangle extends React.Component {
  static contextType = ElementContext;

  static propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    ...ElementProps.BasePropTypes
  };

  static defaultProps = {
    color: '#4286f4',
    width: 10,
    height: 10,
    ...ElementProps.DefaultBaseProps
  };

  componentDidMount() {
    const { registerShape } = this.context;
    const { id, width, height } = this.props;
    registerShape(id, new RectangleDefinition({ width, height }));
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
