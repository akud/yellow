import React from 'react';
import RectangleDefinition from './geometry/RectangleDefinition';
import PointDefinition from './geometry/PointDefinition';
import PropTypes from 'prop-types';

import ElementGroup from './ElementGroup';
import ElementProps from './ElementProps';
import ElementContext from './ElementContext';

import monitorElementShape from './geometry/monitor-element-shape';

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

  constructor(props) {
    super(props);
    this.childRef = React.createRef();
    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    const { id, padding } = this.props;
    this.shapeMonitor = monitorElementShape(
      this.childRef,
      ({ width, height }) => {
        this.setState({ width, height });
        this.registerShape({ width, height });
      }
    );
  }

  componentWillUnmount() {
    if (this.shapeMonitor) {
      this.shapeMonitor.stop();
    }
  }

  render() {
    const { id, position, border, text, padding, link } = this.props;
    const { width, height } = this.state;
    const x = position.x - width / 2;
    const y = position.y + height / 4;
    return (
      <ElementGroup className="label" data-element-id={id} link={link}>
        { border && this.renderBorder({ position, width, height, padding }) }
        <text x={x} y={y} ref={this.childRef}>{text}</text>
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

  registerShape({ width, height }) {
    const { registerShape } = this.context;
    const { id, padding } = this.props;
    if (registerShape) {
      registerShape(
        id,
        (width && height) ?
        new RectangleDefinition({
          width: width + padding,
          height: height + padding,
        }) :
        new PointDefinition()
      );
    }
  }
}
