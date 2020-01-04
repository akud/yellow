import React from 'react';
import RectangleDefinition from './geometry/RectangleDefinition';
import PropTypes from 'prop-types';
import ElementProps from './ElementProps';
import ElementContext from './ElementContext';
import Link from './Link';

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
    if (registerShape) {
      registerShape(id, new RectangleDefinition({ width, height }));
    }
  }

  render() {
    const { color, position, id, width, height, link } = this.props;
    const cornerX = position.x - width / 2;
    const cornerY = position.y - height / 2;
    const rect = (
      <rect
        x={cornerX}
        y={cornerY}
        fill={color}
        width={width}
        height={height}
        data-element-id={id}
      />
    );

    if (link && link.length) {
      return <Link href={link}>{rect}</Link>;
    } else {
      return rect;
    }
  }
}
