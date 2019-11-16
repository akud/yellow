import React from 'react';
import RectangleDefinition from '../RectangleDefinition';
import PropTypes from 'prop-types';
import ElementProps from './ElementProps';

export default class Image extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ...ElementProps.BasePropTypes
  };

  static defaultProps = {...ElementProps.DefaultBaseProps};

  componentDidMount() {
    const { registerShape, width, height } = this.props;
    registerShape(new RectangleDefinition({ width, height }));
  }

  render() {
    const { id, position, src, config, width, height } = this.props;
    const x = position.x - width / 2;
    const y = position.y - height / 2;
    return (
      <image
        x={x}
        y={y}
        width={width}
        height={height}
        href={src}
        data-element-id={id}
      />
    );
  }
}


