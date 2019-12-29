import React from 'react';
import RectangleDefinition from './geometry/RectangleDefinition';
import PropTypes from 'prop-types';
import ElementProps from './ElementProps';
import ElementContext from './ElementContext';

export default class Image extends React.Component {
  static contextType = ElementContext;
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ...ElementProps.BasePropTypes
  };

  static defaultProps = {...ElementProps.DefaultBaseProps};

  componentDidMount() {
    const { registerShape } = this.context;
    const { id, width, height } = this.props;
    registerShape(id, new RectangleDefinition({ width, height }));
  }

  render() {
    const { id, position, src, width, height } = this.props;
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


