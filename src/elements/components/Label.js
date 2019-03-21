import React, { createRef } from 'react';
import RectangleDefinition from 'elements/RectangleDefinition';
import PropTypes from 'prop-types';
import CustomPropTypes from 'components/CustomPropTypes';

export default class Label extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    position: CustomPropTypes.position,
    padding: PropTypes.number,
    border: PropTypes.bool,
  }

  static defaultProps = {
    padding: 0,
    border: false,
  }

  refCallback = element => {
    if (element) {
      const rect = element.getBoundingClientRect();
      this.setState({ width: rect.width, height: rect.height });
      this.resolveShapePromise(new RectangleDefinition({
        width: rect.width + this.props.padding,
        height: rect.height + this.props.padding,
      }));
    }
  }

  constructor(props) {
    super(props);
    this.shapePromise = new Promise(resolve => { this.resolveShapePromise = resolve; });
    this.state = {
      width: 0,
      height: 0,
    };
  }

  render() {
    const { border, position, text, padding } = this.props;
    const { width, height } = this.state;
    if (position) {
      const x = position.x - width / 2;
      const y = position.y + height / 4;
      return (
        <g className="label">
          { border && this.renderBorder({ position, width, height, padding }) }
          <text x={x} y={y}>{text}</text>
        </g>
      );
    } else {
      return <text ref={this.refCallback}>{text}</text>;
    }
  }

  renderBorder({ position, width, height, padding }) {
    width = width + padding;
    height = height + padding;
    const x = position.x - width / 2;
    const y = position.y - height / 2;
    return <rect x={x} y={y} width={width} height={height} stroke="black" fill-opacity={0} />;
  }

  getShapeDefinition() {
    return this.shapePromise;
  }
}
