import React from 'react';
import RectangleDefinition from './geometry/RectangleDefinition';
import PropTypes from 'prop-types';

import ElementGroup from './ElementGroup';
import ElementProps from './ElementProps';
import ElementContext from './ElementContext';

export default class Label extends React.Component {
  static contextType = ElementContext;

  static propTypes = {
    text: PropTypes.string.isRequired,
    padding: PropTypes.number,
    border: PropTypes.bool,
    ...ElementProps.BasePropTypes
  };

  static defaultProps = {
    padding: 0,
    border: false,
    ...ElementProps.DefaultBaseProps
  };

  refCallback = element => {
    if (element) {
      const { registerShape } = this.context;
      const { id, padding } = this.props;
      const rect = element.getBoundingClientRect();
      this.setState({ width: rect.width, height: rect.height });
      registerShape(id, new RectangleDefinition({
        width: rect.width + padding,
        height: rect.height + padding,
      }));
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  render() {
    const { id, position, border, text, padding, link } = this.props;
    const { width, height } = this.state;
    const x = position.x - width / 2;
    const y = position.y + height / 4;
    return (
      <ElementGroup className="label" data-element-id={id} link={link}>
        { border && this.renderBorder({ position, width, height, padding }) }
        <text x={x} y={y} ref={this.refCallback}>{text}</text>
      </ElementGroup>
    );
  }

  renderBorder({ position, width, height, padding }) {
    width = width + padding;
    height = height + padding;
    const x = position.x - width / 2;
    const y = position.y - height / 2;
    return <rect x={x} y={y} width={width} height={height} stroke="black" fillOpacity={0} />;
  }
}
